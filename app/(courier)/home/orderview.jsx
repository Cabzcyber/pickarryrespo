import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

// Services & Libs
import { supabase } from '../../../lib/supabase';
import OrderDispatch from '../../../services/OrderDispatch';

// Assets
const backimg = require("@/assets/images/back.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");
const urgent = require("@/assets/images/urgent.png");

const OrderView = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  const [order, setOrder] = useState(null);
  const [fareConfig, setFareConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // 1. Fetch Order & Fare Configuration
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // A. Fetch Order Details
        const { data: orderData, error: orderError } = await supabase
          .from('order')
          .select('*')
          .eq('order_id', orderId)
          .single();

        if (orderError) throw orderError;

        // B. Fetch Fare Config (As requested)
        // We usually fetch the active config or the one linked to the order if stored
        const { data: configData, error: configError } = await supabase
          .from('fare_configuration')
          .select('*')
          .eq('is_active', true)
          .single();

        if (configError) console.warn("Could not fetch fare config:", configError.message);

        setOrder(orderData);
        setFareConfig(configData);

      } catch (err) {
        Alert.alert("Error", "Order no longer available.");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchData();
  }, [orderId]);

  // 2. Handle Accept Logic (Race-Condition Safe)
  const handleAccept = async () => {
    if (!order) return;
    setProcessing(true);

    try {
      // Get Current Courier ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Call the Service to Attempt Accept
      const result = await OrderDispatch.attemptAcceptOrder(order.order_id, user.id);

      if (result.success) {
        Alert.alert("Success", "You have accepted the order!");
        // Navigate to Delivery Tracking Screen
        router.replace({
          pathname: '/(courier)/home/deliverongoing',
          params: { orderId: order.order_id }
        });
      } else {
        Alert.alert("Too Late", result.message || "Order was taken by another driver.");
        router.replace('/(courier)/home/index');
      }

    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3BF579" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>

          {/* Navbar */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Image source={backimg} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.headerTitle}>Order Request</Text>
            <View style={{width: 40}} />
          </View>

          <View style={styles.content}>

            {/* Fare Card */}
            <View style={styles.fareCard}>
              <Text style={styles.fareTitle}>Estimated Earnings</Text>
              <Text style={styles.fareAmount}>₱ {order.total_fare}</Text>
              {order.bonus_charge_component > 0 && (
                 <View style={styles.bonusTag}>
                   <Image source={urgent} style={styles.iconTiny}/>
                   <Text style={styles.bonusText}>Includes ₱{order.bonus_charge_component} Bonus</Text>
                 </View>
              )}
            </View>

            {/* Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionHeader}>Route Details</Text>

              <View style={styles.locationRow}>
                <Image source={geopick} style={styles.icon} />
                <View style={styles.textBlock}>
                   <Text style={styles.label}>Pickup</Text>
                   <Text style={styles.address}>{order.pickup_address}</Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <Image source={geodrop} style={styles.icon} />
                <View style={styles.textBlock}>
                   <Text style={styles.label}>Dropoff</Text>
                   <Text style={styles.address}>{order.dropoff_address}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.locationRow}>
                <Image source={goods} style={styles.icon} />
                <View style={styles.textBlock}>
                   <Text style={styles.label}>Items</Text>
                   <Text style={styles.address}>{order.other_details || 'No item description provided.'}</Text>
                </View>
              </View>

              {/* Show Rate Config info if available (as requested) */}
              {fareConfig && (
                <Text style={styles.rateInfo}>
                   Rate applied: ₱{fareConfig.time_rate_per_minute}/min • Comm: {fareConfig.platform_commission_percentage * 100}%
                </Text>
              )}
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        {processing ? (
          <ActivityIndicator color="black" />
        ) : (
          <Pressable style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptButtonText}>ACCEPT ORDER</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  loadingContainer: { flex: 1, backgroundColor: '#141519', justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: verticalScale(40), marginBottom: 20 },
  backButton: { padding: 10, backgroundColor: '#22262F', borderRadius: 12 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  content: { paddingHorizontal: 20, paddingBottom: 100 },

  fareCard: { backgroundColor: '#22262F', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#3BF579' },
  fareTitle: { color: '#8796AA', fontSize: 14, textTransform: 'uppercase' },
  fareAmount: { color: '#3BF579', fontSize: 36, fontWeight: 'bold', marginVertical: 5 },
  bonusTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59, 245, 121, 0.1)', padding: 5, borderRadius: 5 },
  bonusText: { color: '#3BF579', fontSize: 12, marginLeft: 5, fontWeight: 'bold' },
  iconTiny: { width: 12, height: 12 },

  detailsContainer: { backgroundColor: '#22262F', borderRadius: 16, padding: 20 },
  sectionHeader: { color: '#87AFB9', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  locationRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  icon: { width: 24, height: 24, marginRight: 15, resizeMode: 'contain' },
  textBlock: { flex: 1 },
  label: { color: '#8796AA', fontSize: 12, marginBottom: 2 },
  address: { color: 'white', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#363D47', marginVertical: 10 },
  rateInfo: { color: '#555', fontSize: 10, textAlign: 'center', marginTop: 10 },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#141519' },
  acceptButton: { backgroundColor: '#3BF579', padding: 16, borderRadius: 12, alignItems: 'center' },
  acceptButtonText: { color: '#141519', fontSize: 18, fontWeight: 'bold' }
});

export default OrderView;