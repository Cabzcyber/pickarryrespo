import { supabase } from '../lib/supabase';

export const broadcastLocation = async (orderId, latitude, longitude) => {
  try {
    // Call the Edge Function
    const { data, error } = await supabase.functions.invoke('calculate-dynamic-eta', {
      body: { order_id: orderId, courier_lat: latitude, courier_lng: longitude },
    });
    if (error) console.error('Broadcast Error:', error);
  } catch (err) {
    console.error('Location Service Error:', err.message);
  }
};