import supabase from '../lib/supabase';

/**
 * OrderDispatch Service
 * Handles realtime order listening and atomic acceptance.
 */
const OrderDispatch = {
  /**
   * Subscribes to the 'order' table for a specific region (GeoHash).
   * Currently listens to ALL pending orders if geoHash is not fully implemented on backend.
   * 
   * @param {string} geoHash - The geohash to filter by (optional/future use)
   * @param {function} onInsert - Callback when a new order is created
   * @param {function} onDelete - Callback when an order is taken/cancelled
   * @returns {object} - The Supabase RealtimeChannel
   */
  subscribeToOrders: (geoHash, onInsert, onDelete) => {
    // Channel name can be dynamic based on region
    const channelId = geoHash ? `orders:region:${geoHash}` : 'orders:all';

    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'order',
          filter: 'deliverystatus_id=eq.1', // Only listen for Pending orders
        },
        (payload) => {
          console.log('New Order Received:', payload.new);
          if (onInsert) onInsert(payload.new);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'order',
          filter: 'deliverystatus_id=neq.1', // Listen for status changing FROM 1 TO something else
        },
        (payload) => {
          // If an order status changes from 1 (Pending) to anything else (Accepted/Cancelled),
          // we should remove it from the list.
          console.log('Order Status Changed (Remove):', payload.new);
          if (onDelete) onDelete(payload.new.order_id);
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for ${channelId}:`, status);
      });

    return channel;
  },

  /**
   * Attempts to accept an order atomically using the backend RPC.
   * 
   * @param {number} orderId - The ID of the order to accept
   * @param {string} driverId - The UUID of the driver
   * @returns {Promise<{success: boolean, error: any}>}
   */
  attemptAcceptOrder: async (orderId, driverId) => {
    try {
      const { data, error } = await supabase.rpc('accept_order_atomic', {
        p_order_id: orderId,
        p_driver_id: driverId,
      });

      if (error) {
        console.error('RPC Error:', error);
        return { success: false, error };
      }

      // data is boolean (TRUE = won race, FALSE = lost race)
      return { success: data, error: null };
    } catch (err) {
      console.error('Network/System Error:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Unsubscribes from the channel.
   * @param {object} channel - The Supabase RealtimeChannel
   */
  unsubscribe: (channel) => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  }
};

export default OrderDispatch;
