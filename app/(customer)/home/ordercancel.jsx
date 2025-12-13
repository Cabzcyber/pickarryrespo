import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useOrderDetails } from '../../../hooks/useOrderDetails';
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';
import { useTheme } from '../../../context/ThemeContext';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const cancelIcon = require("@/assets/images/cancel.png");

const OrderCancel = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { order } = useOrderDetails(orderId);
  const { colors } = useTheme();

  const pickupCoords = order ? { latitude: order.pickup_latitude, longitude: order.pickup_longitude } : null;
  const dropoffCoords = order ? { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude } : null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.error }]}>
            <Image source={cancelIcon} style={[styles.icon, { tintColor: colors.error }]} />
            <Text style={[styles.title, { color: colors.error }]}>Order Cancelled</Text>
            <Text style={[styles.subtitle, { color: colors.subText }]}>
              This order has been cancelled.
            </Text>

            <Pressable
              style={[styles.homeButton, { backgroundColor: colors.error }]}
              onPress={() => router.push('/(customer)/home')}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Find New Courier</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' },

  contentWrapper: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginTop: verticalScale(40) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: {
    width: '100%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
  },
  icon: { width: 60, height: 60, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 },

  homeButton: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: { fontWeight: 'bold', fontSize: 16 }
});

export default OrderCancel;