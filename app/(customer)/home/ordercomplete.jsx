// app/(customer)/home/ordercomplete.jsx
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import ImageViewing from 'react-native-image-viewing';

// Hooks
import { useOrderDetails } from '../../../hooks/useOrderDetails';
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const cameraIcon = require("@/assets/images/feature.png");

const OrderComplete = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { order, courier, loading, refetch } = useOrderDetails(orderId);

  const [viewerVisible, setViewerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0AB3FF" />
        <Text style={styles.loadingText}>Generating Receipt...</Text>
      </View>
    );
  }

  const proofImages = order.goods_receivedimg ? [{ uri: order.goods_receivedimg }] : [];
  const pickupCoords = { latitude: order.pickup_latitude, longitude: order.pickup_longitude };
  const dropoffCoords = { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* 1. MAP BACKGROUND (Fixed) */}
        <View style={styles.mapContainer}>
           <GeoapifyRouteMap pickup={pickupCoords} dropoff={dropoffCoords} />
           {/* Dark Overlay for readability */}
           <View style={styles.darkOverlay} />
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0AB3FF" />}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.header}>
              <Image source={headerlogo} style={styles.logo}/>
            </View>

            <View style={styles.mainContent}>
              <View style={styles.statusPill}>
                <Text style={styles.title}>Order Completed!</Text>
                <Text style={styles.subtitle}>Thank you for using Pickarry</Text>
              </View>

              <View style={styles.receiptCard}>
                <View style={styles.courierSection}>
                  <Text style={styles.sectionTitle}>Delivered By</Text>
                  <Text style={styles.courierName}>{courier?.name || 'Unknown Driver'}</Text>
                  <Text style={styles.courierVehicle}>
                     {courier ? `${courier.vehicle_color} ${courier.vehicle_brand} • ${courier.plate_number}` : ''}
                  </Text>
                </View>

                <View style={styles.divider} />

                {order.goods_receivedimg && (
                  <>
                    <Pressable style={styles.proofButton} onPress={() => setViewerVisible(true)}>
                       <Image source={cameraIcon} style={{width: 20, height: 20, tintColor: '#0AB3FF', marginRight: 10}} />
                       <Text style={styles.proofButtonText}>View Proof of Delivery</Text>
                    </Pressable>
                    <View style={styles.divider} />
                  </>
                )}

                <View style={styles.paymentSection}>
                  <Text style={styles.sectionTitle}>Payment Summary</Text>
                  <View style={styles.row}>
                    <Text style={styles.label}>Total Paid</Text>
                    <Text style={styles.totalValue}>₱ {order.total_fare}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                 <Pressable style={styles.homeButton} onPress={() => router.push('/(customer)/home')}>
                    <Text style={styles.homeButtonText}>Back to Home</Text>
                 </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <ImageViewing
        images={proofImages}
        imageIndex={0}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }, // Darken map for receipt legibility

  contentWrapper: { padding: 20, paddingBottom: 50 },
  loadingContainer: { flex: 1, backgroundColor: '#141519', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: 'white', marginTop: 10 },

  header: { alignItems: 'center', marginTop: verticalScale(30), marginBottom: 20 },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, alignItems: 'center' },

  statusPill: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#3BF579', marginBottom: 5, textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },
  subtitle: { fontSize: 16, color: '#EEE', marginBottom: 10, textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },

  receiptCard: { width: '100%', backgroundColor: '#363D47', borderRadius: 16, padding: 20, marginBottom: 30, elevation: 5 },
  sectionTitle: { color: '#87AFB9', fontSize: 14, marginBottom: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  courierName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  courierVehicle: { color: '#ccc', fontSize: 14, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#4a5568', marginVertical: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#ccc', fontSize: 16 },
  totalValue: { color: '#0AB3FF', fontSize: 22, fontWeight: 'bold' },

  buttonContainer: { width: '100%', gap: 15 },
  homeButton: { backgroundColor: '#0AB3FF', padding: 15, borderRadius: 12, alignItems: 'center' },
  homeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  proofButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#22262F', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#0AB3FF' },
  proofButtonText: { color: '#0AB3FF', fontWeight: 'bold', fontSize: 16 }
});

export default OrderComplete;