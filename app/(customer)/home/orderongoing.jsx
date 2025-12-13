// app/(customer)/home/orderongoing.jsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator, Modal, Alert } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

// Hooks
import { useOrderDetails } from '../../../hooks/useOrderDetails';
import { useDynamicETA } from '../../../hooks/useDynamicETA';
import { useTheme } from '../../../context/ThemeContext';

// Components
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");
const call = require("@/assets/images/call.png");
const calculator = require("@/assets/images/calculator.png");
const report = require("@/assets/images/report.png");

const OrderOngoing = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { colors, isDarkMode } = useTheme();

  // Hooks
  const { order, courier, loading, refetch } = useOrderDetails(orderId);
  const { formattedTime, status: etaStatus } = useDynamicETA(orderId);

  // Navigation Guard State (Prevents infinite loops)
  const [isNavigating, setIsNavigating] = useState(false);

  const snapPoints = useMemo(() => ['15%', '40%', '80%'], []);
  const bottomSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);

  // 1. NAVIGATION HANDLER
  const handleRedirect = (targetPath) => {
    if (isNavigating) return; // Stop if already going
    setIsNavigating(true);
    console.log(`🚀 Redirecting to: ${targetPath}`);
    router.replace({
      pathname: targetPath,
      params: { orderId }
    });
  };

  // 2. POLLING (Safety Net)
  useEffect(() => {
    if (!orderId || isNavigating) return; // Stop polling if moving
    const interval = setInterval(() => {
      // Only refetch if we aren't already complete
      if (order?.deliverystatus_id !== 4 && order?.deliverystatus_id !== 5) {
        console.log("♻️ Polling for status update...");
        refetch();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [orderId, refetch, isNavigating, order?.deliverystatus_id]);

  // 3. STRICT STATUS MONITOR
  useEffect(() => {
    if (!order || isNavigating) return;

    const status = order.deliverystatus_id;
    console.log("👀 UI Status Check:", status);

    if (status === 4) {
      handleRedirect('/(customer)/home/ordercomplete');
    } else if (status === 5) {
      handleRedirect('/(customer)/home/ordercancel');
    }
  }, [order, isNavigating]);

  if (loading || !order) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Tracking Delivery...</Text>
      </View>
    );
  }

  // Helper for Status Text
  const getStatusLabel = () => {
    if (order.deliverystatus_id === 2) return "Courier is heading to pickup";
    if (order.deliverystatus_id === 3) return "Courier is heading to dropoff";
    return etaStatus || "On the way";
  };

  const pickupCoords = { latitude: order.pickup_latitude, longitude: order.pickup_longitude };
  const dropoffCoords = { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>

        {/* MAP BACKGROUND */}
        <View style={styles.mapContainer}>
          <GeoapifyRouteMap pickup={pickupCoords} dropoff={dropoffCoords} />
        </View>

        {/* HEADER */}
        <View style={styles.header}>
          <Image source={headerlogo} style={styles.logo} />
        </View>

        {/* OVERLAY UI */}
        <View style={styles.overlayInfo}>
          <View style={[styles.statusPill, { backgroundColor: isDarkMode ? 'rgba(20, 21, 25, 0.85)' : 'rgba(255, 255, 255, 0.95)', borderColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Delivery in Progress</Text>
            <Text style={[styles.subtitle, { color: colors.subText }]}>{getStatusLabel()}</Text>
            <Text style={[styles.etaText, { color: colors.tint }]}>ETA: {formattedTime()}</Text>
          </View>
        </View>

        {/* BOTTOM SHEET */}
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: colors.surface }}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.orderinfo}>
              <View style={styles.info}>
                <Text style={[styles.infotext, { color: colors.text }]}>
                  {courier ? `${courier.name}` : 'Courier Assigned'}
                </Text>
                <Text style={[styles.infosubtext, { color: colors.subText }]}>
                  {courier ? `${courier.vehicle_color} ${courier.vehicle_brand} • ${courier.plate_number}` : 'Loading info...'}
                </Text>
              </View>
              <View style={[styles.farecontainer, { backgroundColor: colors.card }]}>
                <Text style={[styles.totalfare, { color: colors.tint }]}>₱ {order.total_fare}</Text>
              </View>
            </View>

            <View style={styles.optionbtn}>
              <Pressable style={styles.optionItem} onPress={() => Alert.alert("Call", "Calling driver...")}>
                <View style={[styles.optionCircle, { backgroundColor: colors.card }]}>
                  <Image source={call} style={styles.cancelicon} />
                </View>
                <Text style={[styles.optionLabel, { color: colors.subText }]}>Call</Text>
              </Pressable>

              <View style={styles.optionItem}>
                <View style={[styles.optionCircle, { backgroundColor: colors.card }]}>
                  <Pressable onPress={() => setReportVisible(true)}>
                    <Image source={report} style={styles.reporticon} />
                  </Pressable>
                </View>
                <Text style={[styles.optionLabel, { color: colors.subText }]}>Report</Text>
              </View>

              <View style={styles.optionItem}>
                <View style={[styles.optionCircle, { backgroundColor: colors.card }]}>
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Image source={calculator} style={styles.calculatoricon} />
                  </Pressable>
                </View>
                <Text style={[styles.optionLabel, { color: colors.subText }]}>Details</Text>
              </View>
            </View>

            <View style={styles.locationcontainer}>
              <View style={styles.sublocationcontainer}>
                <Image source={geopick} style={styles.geopickicon} />
                <Text style={[styles.sublocationtext, { color: colors.text }]} numberOfLines={2}>{order.pickup_address}</Text>
              </View>
              <View style={styles.sublocationcontainer}>
                <Image source={geodrop} style={styles.geodropicon} />
                <Text style={[styles.sublocationtext, { color: colors.text }]} numberOfLines={2}>{order.dropoff_address}</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Order Details</Text>
            <View style={styles.breakdownContainer}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.subText }]}>Base Fare</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>₱ {order?.base_fare_component}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.subText }]}>Distance</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>₱ {order?.distance_charge_component}</Text>
              </View>
              <View style={[styles.breakdownRow, styles.totalRow, { borderColor: colors.border }]}>
                <Text style={[styles.breakdownLabel, styles.activeText, { color: colors.tint }]}>Total</Text>
                <Text style={[styles.breakdownValue, styles.activeText, { color: colors.tint }]}>₱ {order?.total_fare}</Text>
              </View>
            </View>
            <Pressable style={[styles.closeBtn, { backgroundColor: colors.card }]} onPress={() => setModalVisible(false)}>
              <Text style={{ color: colors.text }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10 },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  overlayInfo: { position: 'absolute', top: verticalScale(90), left: 0, right: 0, alignItems: 'center', zIndex: 10, paddingHorizontal: 20 },
  statusPill: { paddingVertical: 20, paddingHorizontal: 30, borderRadius: 16, alignItems: 'center', width: '100%', borderWidth: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 14, textAlign: 'center' },
  etaText: { fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  handleIndicator: { backgroundColor: '#0AB3FF' },
  contentContainer: { flex: 1, padding: 16 },
  orderinfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { width: '60%' },
  infotext: { fontFamily: 'Roboto-Bold', fontWeight: 'bold', fontSize: 18 },
  infosubtext: { fontFamily: 'Roboto-Regular', fontSize: 16 },
  farecontainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  totalfare: { fontFamily: 'Roboto-Regular', fontSize: 20, marginRight: 8 },
  optionbtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 48, marginTop: 16 },
  optionItem: { alignItems: 'center', justifyContent: 'center' },
  optionCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  cancelicon: { width: 34, height: 34, resizeMode: 'contain' },
  reporticon: { width: 30, height: 30, resizeMode: 'contain' },
  calculatoricon: { width: 30, height: 30, resizeMode: 'contain' },
  optionLabel: { marginTop: 6, textAlign: 'center', fontSize: 12 },
  locationcontainer: { flexDirection: 'column', marginTop: 16 },
  sublocationcontainer: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12 },
  sublocationtext: { fontFamily: 'Roboto-Regular', fontSize: 17, flex: 1 },
  geopickicon: { width: 22, height: 22, resizeMode: 'contain' },
  geodropicon: { width: 22, height: 22, resizeMode: 'contain' },
  goodsicon: { width: 22, height: 22, resizeMode: 'contain' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, width: '80%', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  breakdownContainer: { width: '100%' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  breakdownLabel: { fontSize: 16 },
  breakdownValue: { fontSize: 16, fontWeight: 'bold' },
  totalRow: { borderTopWidth: 1, paddingTop: 10 },
  activeText: { color: '#0AB3FF' },
  closeBtn: { marginTop: 20, padding: 10, borderRadius: 8 },
});

export default OrderOngoing;