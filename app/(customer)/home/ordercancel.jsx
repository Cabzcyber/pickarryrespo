// app/(customer)/home/ordercancel.jsx
import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

// Hooks
import { useOrderDetails } from '../../../hooks/useOrderDetails';
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const cancelIcon = require("@/assets/images/cancel.png");

const OrderCancel = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { order } = useOrderDetails(orderId);

  const pickupCoords = order ? { latitude: order.pickup_latitude, longitude: order.pickup_longitude } : null;
  const dropoffCoords = order ? { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude } : null;

  return (
    <View style={styles.container}>
      {/* 1. Map Background */}
      <View style={styles.mapContainer}>
        {order && <GeoapifyRouteMap pickup={pickupCoords} dropoff={dropoffCoords} />}
        <View style={styles.darkOverlay} />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Image source={headerlogo} style={styles.logo} />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.card}>
            <Image source={cancelIcon} style={styles.icon} />
            <Text style={styles.title}>Order Cancelled</Text>
            <Text style={styles.subtitle}>
              This order has been cancelled.
            </Text>

            <Pressable
              style={styles.homeButton}
              onPress={() => router.push('/(customer)/home')}
            >
              <Text style={styles.buttonText}>Find New Courier</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  mapContainer: { ...StyleSheet.absoluteFillObject},
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' },

  contentWrapper: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginTop: verticalScale(40) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: {
    width: '100%',
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4444'
  },
  icon: { width: 60, height: 60, marginBottom: 20, tintColor: '#FF4444' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF4444', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#CCCCCC', textAlign: 'center', marginBottom: 30 },

  homeButton: {
    width: '100%',
    backgroundColor: '#FF4444',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default OrderCancel;