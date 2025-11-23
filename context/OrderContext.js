import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // Location State
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);

  // Goods Details State
  const [goodsDetails, setGoodsDetails] = useState(null);

  // Metrics
  const [orderMetrics, setOrderMetrics] = useState({
    distanceKm: 0,
    durationMin: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  // REF: Keep track of the last coordinates we fetched to prevent duplicate calls
  const lastFetchedRoute = useRef({ start: null, end: null });

  // Routing Logic
  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      // Create simple string keys to compare coordinates efficiently
      const startKey = `${pickupLocation.latitude},${pickupLocation.longitude}`;
      const endKey = `${dropoffLocation.latitude},${dropoffLocation.longitude}`;

      // CHECK: Only fetch if coordinates are DIFFERENT from the last successful fetch
      if (
        lastFetchedRoute.current.start !== startKey ||
        lastFetchedRoute.current.end !== endKey
      ) {
        fetchRoute(pickupLocation, dropoffLocation, startKey, endKey);
      }
    } else {
      // Reset metrics if a location is removed
      setOrderMetrics({ distanceKm: 0, durationMin: 0 });
    }
  }, [pickupLocation, dropoffLocation]);

  const fetchRoute = async (start, end, startKey, endKey) => {
    setIsLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
      if (!apiKey) {
        console.error("Missing Geoapify API Key");
        return;
      }

      const url = `https://api.geoapify.com/v1/routing?waypoints=${start.latitude},${start.longitude}|${end.latitude},${end.longitude}&mode=drive&apiKey=${apiKey}`;

      console.log("🔌 Fetching Route from Geoapify..."); // Debug Log
      const response = await fetch(url);

      if (!response.ok) {
         if (response.status === 429) {
             Alert.alert("Limit Reached", "Daily map limit reached. Please try again tomorrow.");
             return;
         }
         throw new Error("Route fetch failed");
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const properties = data.features[0].properties;

        setOrderMetrics({
          distanceKm: (properties.distance / 1000).toFixed(2),
          durationMin: Math.ceil(properties.time / 60),
        });

        // UPDATE REF: Mark this route as "Fetched" so we don't pay for it again
        lastFetchedRoute.current = { start: startKey, end: endKey };
      }
    } catch (error) {
      console.error("Routing Error:", error);
      // Do not alert the user for every background error, but log it.
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderDetails) => {
    // Logic handled in index or separate service
    return true;
  };

  return (
    <OrderContext.Provider
      value={{
        pickupLocation,
        setPickupLocation,
        dropoffLocation,
        setDropoffLocation,
        goodsDetails,
        setGoodsDetails,
        orderMetrics,
        isLoading,
        createOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};