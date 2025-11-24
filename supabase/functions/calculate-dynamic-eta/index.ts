// @ts-nocheck
// ^ THIS TOP LINE IS CRITICAL. It silences the IDE errors about "Deno" and URL imports.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers to allow your Mobile App to call this function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // 1. Handle CORS preflight (Browser/App checks)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Parse Input
    const { order_id, courier_lat, courier_lng } = await req.json()

    if (!order_id || !courier_lat || !courier_lng) {
        throw new Error("Missing required fields: order_id, courier_lat, or courier_lng");
    }
    
    // 3. Initialize Supabase (Injecting the User's Auth Token)
    const authHeader = req.headers.get('Authorization')!
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // 4. Fetch Order & Security Check
    const { data: order, error: orderError } = await supabaseClient
      .from('order')
      .select('order_id, courier_id, deliverystatus_id, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude')
      .eq('order_id', order_id)
      .single()

    if (orderError || !order) throw new Error('Order not found')

    // 5. Geoapify Routing Logic
    let targetLat = 0, targetLng = 0, statusLabel = ''
    
    if (order.deliverystatus_id === 2) { // Accepted -> Pickup
      targetLat = order.pickup_latitude; targetLng = order.pickup_longitude; statusLabel = 'Picking up'
    } else if (order.deliverystatus_id === 3) { // Ongoing -> Dropoff
      targetLat = order.dropoff_latitude; targetLng = order.dropoff_longitude; statusLabel = 'Delivering'
    } else {
      return new Response(JSON.stringify({ message: 'No active route' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const apiKey = Deno.env.get('GEOAPIFY_API_KEY')
    const routeRes = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${courier_lat},${courier_lng}|${targetLat},${targetLng}&mode=motorcycle&apiKey=${apiKey}`
    )
    const routeData = await routeRes.json()
    
    // 6. Broadcast Update
    const eta = routeData.features?.[0]?.properties?.time || 0
    // We use a fallback for distance if API doesn't return it (safeguard)
    const dist = routeData.features?.[0]?.properties?.distance || 0

    await supabaseClient.channel(`order_${order_id}`).send({
      type: 'broadcast',
      event: 'eta-update',
      payload: { order_id, eta_seconds: eta, distance_meters: dist, status: statusLabel }
    })

    return new Response(JSON.stringify({ success: true, eta }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    // Fix for "error is unknown": We explicitly cast it to a string or Error object
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})