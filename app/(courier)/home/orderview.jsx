import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

// Services & Libs
import { supabase } from '../../../lib/supabase';
import OrderDispatch from '../../../services/OrderDispatch';
import { useTheme } from '../../../context/ThemeContext';

// Assets
const backimg = require("@/assets/images/back.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");
const urgent = require("@/assets/images/urgent.png");

const OrderView = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { colors } = useTheme();

  const [order, setOrder] = useState(null);
  const [fareConfig, setFareConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);

      // Fetch Fare Config
      const { data: configData, error: configError } = await supabase
        .from('fare_configuration')
        .select('*')
        .eq('is_active', true)
        .single();

      if (configError) {
        console.warn("Could not fetch fare config:", configError.message);
      } else {
        setFareConfig(configData);
      }

      // Fetch Order
      if (!orderId) return;

      const { data: orderData, error: orderError } = await supabase
        .from('order')
        .select('*, type_vehicle(*)')
        .eq('order_id', orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

    } catch (error) {
      console.error("Error fetching order:", error);
      Alert.alert("Error", "Could not load order details.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const getVehicleDisplay = () => {
    if (!order) return '';
    if (order.type_vehicle && order.type_vehicle.vehicle_name) {
      return order.type_vehicle.vehicle_name;
    }
    return order.vehicle_id ? `Vehicle #${order.vehicle_id}` : 'Any Vehicle';
  };

  const handleAccept = async () => {
    if (processing) return;
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Error", "You must be logged in to accept orders.");
        return;
      }

      const result = await OrderDispatch.attemptAcceptOrder(orderId, user.id);

      if (result.success) {
        Alert.alert("Success", "Order accepted!");
        router.replace('/(courier)/home/deliverongoing');
      } else {
        Alert.alert("Missed", "This order has already been taken.");
        router.back();
      }
    } catch (error) {
      console.error("Accept error:", error);
      Alert.alert("Error", "Failed to accept order.");
    } finally {
      setProcessing(false);
    }
  };

  const renderGoodsImage = (uri, index) => {
    if (!uri) return null;
    return (
      <Image
        key={index}
        source={{ uri: uri }}
        style={[styles.goodsImage, { borderColor: colors.border, backgroundColor: colors.inputBackground }]}
        onError={(e) => console.log(`Failed to load image ${index}`, e.nativeEvent.error)}
      />
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  if (!order) return null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>

          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.card }]}>
              <Image source={backimg} style={[styles.backIcon, { tintColor: colors.text }]} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Order Request</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.content}>
            {/* Fare Card */}
            <View style={[styles.fareCard, { backgroundColor: colors.card, borderColor: '#3BF579' }]}>
              <Text style={[styles.fareTitle, { color: colors.subText }]}>Estimated Earnings</Text>
              <Text style={styles.fareAmount}>₱ {order.total_fare}</Text>
              {order.bonus_charge_component > 0 && (
                <View style={styles.bonusTag}>
                  <Image source={urgent} style={styles.iconTiny} />
                  <Text style={styles.bonusText}>Includes ₱{order.bonus_charge_component} Bonus</Text>
                </View>
              )}
            </View>

            {/* Details */}
            <View style={[styles.detailsContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionHeader, { color: colors.subText }]}>Route Details</Text>

              <View style={styles.locationRow}>
                <Image source={geopick} style={[styles.icon, { tintColor: colors.icon }]} />
                <View style={styles.textBlock}>
                  <Text style={[styles.label, { color: colors.subText }]}>Pickup</Text>
                  <Text style={[styles.address, { color: colors.text }]}>{order.pickup_address}</Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <Image source={geodrop} style={[styles.icon, { tintColor: colors.icon }]} />
                <View style={styles.textBlock}>
                  <Text style={[styles.label, { color: colors.subText }]}>Dropoff</Text>
                  <Text style={[styles.address, { color: colors.text }]}>{order.dropoff_address}</Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.locationRow}>
                <Image source={urgent} style={[styles.icon, { tintColor: colors.subText }]} />
                <View style={styles.textBlock}>
                  <Text style={[styles.label, { color: colors.subText }]}>Required Vehicle</Text>
                  <Text style={[styles.address, { color: colors.text }]}>{getVehicleDisplay()}</Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <Image source={goods} style={[styles.icon, { tintColor: colors.icon }]} />
                <View style={styles.textBlock}>
                  <Text style={[styles.label, { color: colors.subText }]}>Items</Text>
                  <Text style={[styles.address, { color: colors.text }]}>{order.other_details || 'No item description provided.'}</Text>

                  {(order.goods_image1 || order.goods_image2 || order.goods_image3) && (
                    <View style={styles.imageContainer}>
                      {renderGoodsImage(order.goods_image1, 1)}
                      {renderGoodsImage(order.goods_image2, 2)}
                      {renderGoodsImage(order.goods_image3, 3)}
                    </View>
                  )}
                </View>
              </View>

              {fareConfig && (
                <Text style={[styles.rateInfo, { color: colors.subText }]}>
                  Rate applied: ₱{fareConfig.time_rate_per_minute}/min • Comm: {fareConfig.platform_commission_percentage * 100}%
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        {processing ? (
          <ActivityIndicator color={colors.text} />
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
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: verticalScale(40), marginBottom: 20 },
  backButton: { padding: 10, borderRadius: 12 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  fareCard: { borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20, borderWidth: 1 },
  fareTitle: { fontSize: 14, textTransform: 'uppercase' },
  fareAmount: { color: '#3BF579', fontSize: 36, fontWeight: 'bold', marginVertical: 5 },
  bonusTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59, 245, 121, 0.1)', padding: 5, borderRadius: 5 },
  bonusText: { color: '#3BF579', fontSize: 12, marginLeft: 5, fontWeight: 'bold' },
  iconTiny: { width: 12, height: 12 },
  detailsContainer: { borderRadius: 16, padding: 20 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  locationRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  icon: { width: 24, height: 24, marginRight: 15, resizeMode: 'contain' },
  textBlock: { flex: 1 },
  label: { fontSize: 12, marginBottom: 2 },
  address: { fontSize: 16 },
  divider: { height: 1, marginVertical: 10 },
  rateInfo: { fontSize: 10, textAlign: 'center', marginTop: 10 },
  imageContainer: { flexDirection: 'row', marginTop: 12, gap: 10, flexWrap: 'wrap' },
  goodsImage: { width: 70, height: 70, borderRadius: 8, borderWidth: 1 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 },
  acceptButton: { backgroundColor: '#3BF579', padding: 16, borderRadius: 12, alignItems: 'center' },
  acceptButtonText: { color: '#141519', fontSize: 18, fontWeight: 'bold' }
});

export default OrderView;