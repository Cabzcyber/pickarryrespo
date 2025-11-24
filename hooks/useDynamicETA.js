import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Adjust path if needed

export const useDynamicETA = (orderId) => {
  const [eta, setEta] = useState(null); // ETA in seconds
  const [distance, setDistance] = useState(null); // Distance in meters
  const [status, setStatus] = useState('Pending');
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    console.log(`📡 Subscribing to dynamic ETA for order: ${orderId}`);

    // Subscribe to the specific order channel
    const channel = supabase
      .channel(`order_${orderId}`)
      .on(
        'broadcast',
        { event: 'eta-update' },
        (payload) => {
          console.log('⏱️ Realtime Update Received:', payload);
          const { eta_seconds, distance_meters, status: newStatus, is_fallback } = payload.payload;

          setEta(eta_seconds);
          setDistance(distance_meters);
          setStatus(newStatus);
          setIsFallback(is_fallback);
        }
      )
      .subscribe();

    return () => {
      console.log('Unsubscribing from ETA updates...');
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  // Helper to format seconds into "MM:SS" or "H MM"
  const formattedTime = () => {
    if (!eta) return '-- mins';
    const minutes = Math.floor(eta / 60);
    return `${minutes} mins`;
  };

  return { eta, distance, status, isFallback, formattedTime };
};