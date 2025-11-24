import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useCourierDispatch = () => {
  // Use a Map to prevent duplicates and ensure fast updates
  const [openOrders, setOpenOrders] = useState(new Map());
  const [loading, setLoading] = useState(true);

  // 1. Define the Refresh Function (Critical for your error)
  const refreshOrders = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch all 'Pending' orders (Status ID = 1)
      const { data, error } = await supabase
        .from('order')
        .select('*')
        .eq('deliverystatus_id', 1)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert Array to Map
      const newMap = new Map();
      if (data) {
        data.forEach((order) => newMap.set(order.order_id, order));
      }
      setOpenOrders(newMap);

    } catch (err) {
      console.error('Fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Initial Fetch & Realtime Subscription
  useEffect(() => {
    refreshOrders();

    const channel = supabase
      .channel('courier_dispatch_feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'order' },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          if (eventType === 'INSERT' && newRecord.deliverystatus_id === 1) {
            // New order appeared -> Add to list
            setOpenOrders((prev) => {
                const next = new Map(prev);
                next.set(newRecord.order_id, newRecord);
                return next;
            });
          }
          else if (eventType === 'UPDATE') {
             // If order is no longer pending (Accepted/Cancelled) -> Remove it
             if (newRecord.deliverystatus_id !== 1) {
               setOpenOrders((prev) => {
                 const next = new Map(prev);
                 next.delete(newRecord.order_id);
                 return next;
               });
             } else {
               // If still pending but details changed -> Update it
               setOpenOrders((prev) => {
                   const next = new Map(prev);
                   next.set(newRecord.order_id, newRecord);
                   return next;
               });
             }
          }
          else if (eventType === 'DELETE') {
             // Order deleted -> Remove it
             setOpenOrders((prev) => {
               const next = new Map(prev);
               next.delete(oldRecord.order_id);
               return next;
             });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshOrders]);

  // 3. Convert Map to Array for FlatList
  const openOrdersList = Array.from(openOrders.values());

  // 4. RETURN THE FUNCTION (Fixes the "undefined" error)
  return {
    openOrders: openOrdersList,
    loading,
    refreshOrders
  };
};