import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useOrderDetails = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courier, setCourier] = useState(null);

  // 1. Define Fetch Function (Reusable)
  const fetchOrderData = useCallback(async () => {
    if (!orderId) return;
    try {
      // Don't set loading=true here to avoid UI flickering on background refresh

      // Fetch Order
      const { data: orderData, error: orderError } = await supabase
        .from('order')
        .select('*, vehicle:vehicle_id(vehicle_name)')
        .eq('order_id', orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      // Fetch Courier
      if (orderData.courier_id) {
         const { data: cData, error: courierError } = await supabase
           .from('service_user')
           .select('full_name, phone_number, courier(plate_number, vehicle_color, vehicle_brand)')
           .eq('user_id', orderData.courier_id)
           .single();

         if (!courierError && cData) {
           const courierDetails = Array.isArray(cData.courier) ? cData.courier[0] : cData.courier;
           setCourier({
             name: cData.full_name,
             phone: cData.phone_number,
             ...courierDetails
           });
         }
      }
    } catch (err) {
      console.log('Order fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  // 2. Initial Load & Realtime Subscription
  useEffect(() => {
    setLoading(true); // Only show loading on first mount
    fetchOrderData();

    // Active Listener
    const sub = supabase.channel(`order_detail_${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'order', filter: `order_id=eq.${orderId}` },
        (payload) => {
          console.log("⚡ Hook Received Update:", payload.new.deliverystatus_id);
          setOrder(prev => ({ ...prev, ...payload.new }));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [orderId, fetchOrderData]);

  // 3. Return refetch
  return { order, courier, loading, refetch: fetchOrderData };
};