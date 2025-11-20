import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // State matching DB columns
  const [pickupLocation, setPickupLocation] = useState(null); // { latitude, longitude, address }
  const [dropoffLocation, setDropoffLocation] = useState(null); // { latitude, longitude, address }

  // Metrics matching DB columns
  const [orderMetrics, setOrderMetrics] = useState({
    distanceKm: 0,
    durationMin: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Routing Logic
  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      fetchRoute(pickupLocation, dropoffLocation);
    } else {
      // Reset metrics if one location is removed
      setOrderMetrics({ distanceKm: 0, durationMin: 0 });
    }
  }, [pickupLocation, dropoffLocation]);

  const fetchRoute = async (start, end) => {
    setIsLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
      if (!apiKey) {
        console.warn("Geoapify API Key is missing");
        return;
      }
      const url = `https://api.geoapify.com/v1/routing?waypoints=${start.latitude},${start.longitude}|${end.latitude},${end.longitude}&mode=drive&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const properties = data.features[0].properties;

        // Map API response to DB columns
        // distance is in meters -> convert to km
        // time is in seconds -> convert to minutes
        setOrderMetrics({
          distanceKm: (properties.distance / 1000).toFixed(2),
          durationMin: Math.ceil(properties.time / 60),
        });
      }
    } catch (error) {
      console.error("Routing Error:", error);
      Alert.alert("Error", "Failed to calculate route.");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for createOrder - to be implemented or kept if existing
  const createOrder = async (orderDetails) => {
    // This will be handled in index.jsx or here depending on architecture.
    // For now, we just return true to simulate success if needed by UI
    return true;
  };

  return (
    <OrderContext.Provider
      value={{
        pickupLocation,
        setPickupLocation,
        dropoffLocation,
        setDropoffLocation,
        orderMetrics,
        isLoading,
        createOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};