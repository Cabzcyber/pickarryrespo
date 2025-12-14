import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { verticalScale } from 'react-native-size-matters';
import { decode } from 'base64-arraybuffer';

import { useOrderDetails } from '../../../hooks/useOrderDetails';
import { broadcastLocation } from '../../../services/LocationService';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';
import { useDeliveryTimer } from '../../../hooks/useDeliveryTimer';

// Components
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const viewIcon = require("@/assets/images/eye.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goodimg = require("@/assets/images/goodimg.png");
const urgent = require("@/assets/images/urgent.png");

const DeliverOngoing = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { colors, isDarkMode } = useTheme();

  // DESTUCTURE 'refetch' HERE
  const { order, loading, refetch } = useOrderDetails(orderId);

  const [assets, setAssets] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [graceModalVisible, setGraceModalVisible] = useState(false);
  const [fareConfig, setFareConfig] = useState(null);

  // 0. FETCH FARE CONFIG
  useEffect(() => {
    const fetchConfig = async () => {
      const { data, error } = await supabase
        .from('fare_configuration')
        .select('*')
        .eq('is_active', true)
        .single();
      if (!error && data) {
        setFareConfig(data);
      }
    };
    fetchConfig();
  }, []);

  // --- TIMER LOGIC ---
  const { timeLeft, status, isPenaltyActive, graceTimeLeft } = useDeliveryTimer(
    order?.accepted_at,
    order?.estimated_duration,
    fareConfig?.grace_period_minutes || 10
  );

  // Grace Period Modal Trigger
  useEffect(() => {
    if (status === 'grace' && !graceModalVisible) {
      setGraceModalVisible(true);
    }
  }, [status]);

  // Format Time Helper
  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 1. LOCATION TRACKING
  useEffect(() => {
    let sub;
    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      sub = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 10000, distanceInterval: 20
      }, (loc) => {
        if (orderId) broadcastLocation(orderId, loc.coords.latitude, loc.coords.longitude);
      });
    };
    startTracking();
    return () => sub?.remove();
  }, [orderId]);

  // 2. PICK IMAGE
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5, base64: true,
    });
    if (!result.canceled) setAssets(result.assets);
  };

  // --- 3. ACTION HANDLER (WITH FORCED REFRESH) ---
  const handleAction = async () => {
    if (!order) return;

    // CASE A: Pickup -> Ongoing
    if (Number(order.deliverystatus_id) === 2) {
      try {
        setIsSubmitting(true);
        const { error } = await supabase
          .from('order')
          .update({ deliverystatus_id: 3 })
          .eq('order_id', orderId);

        if (error) throw error;

        Alert.alert("Picked Up", "Proceed to dropoff location.");


        await refetch();

      } catch (e) {
        Alert.alert("Error", e.message);
      } finally {
        setIsSubmitting(false);
      }
    }
    // CASE B: Dropoff -> Complete
    else if (Number(order.deliverystatus_id) === 3) {
      if (assets.length === 0) {
        Alert.alert("Proof Required", "Please upload a photo.");
        return;
      }

      try {
        setIsSubmitting(true);
        const { data: { user } } = await supabase.auth.getUser();
        const imageFile = assets[0];
        const fileName = `${user.id}/proof_${orderId}_${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from('licenses')
          .upload(fileName, decode(imageFile.base64), { contentType: 'image/jpeg' });
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('licenses').getPublicUrl(fileName);

        // --- PENALTY CALCULATION ---
        let penalty = 0;
        if (isPenaltyActive && fareConfig) {
          // Calculate overdue minutes
          const acceptedTime = new Date(order.accepted_at).getTime();
          const durationMs = order.estimated_duration * 60 * 1000;
          const gracePeriodMs = (fareConfig.grace_period_minutes || 2) * 60 * 1000;
          const deadline = acceptedTime + durationMs + gracePeriodMs;
          const now = Date.now();

          if (now > deadline) {
            const overdueMs = now - deadline;
            const overdueMinutes = Math.ceil(overdueMs / 60000);
            const rate = parseFloat(fareConfig.penalty_rate_per_minute) || 0;
            penalty = (overdueMinutes * rate).toFixed(2);
          }
        }

        const { error: updateError } = await supabase
          .from('order')
          .update({
            deliverystatus_id: 4,
            goods_receivedimg: publicUrl,
            penalty_amount: penalty
          })
          .eq('order_id', orderId);

        if (updateError) throw updateError;

        router.replace({ pathname: '/(courier)/home/delivercomplete', params: { orderId } });

      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading || !order) return <ActivityIndicator size="large" color="#3BF579" style={{ marginTop: 50 }} />;

  const goodsImages = order.goods_image1 ? [{ uri: order.goods_image1 }] : [];

  // Status Logic
  const isPickupPhase = Number(order.deliverystatus_id) === 2;
  const isDropoffPhase = Number(order.deliverystatus_id) === 3;

  // Map Coords
  const pickupCoords = { latitude: order.pickup_latitude, longitude: order.pickup_longitude };
  const dropoffCoords = { latitude: order.dropoff_latitude, longitude: order.dropoff_longitude };

  // Timer UI Colors
  let timerColor = '#3BF579'; // Green
  let timerText = formatTime(timeLeft);
  let statusText = "ON TIME";

  if (status === 'grace') {
    timerColor = '#FFA500'; // Orange
    timerText = formatTime(graceTimeLeft);
    statusText = "GRACE PERIOD";
  } else if (status === 'penalty') {
    timerColor = '#FF4444'; // Red
    timerText = "00:00";
    statusText = "PENALTY APPLIED";
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.mapContainer}>
          <GeoapifyRouteMap pickup={pickupCoords} dropoff={dropoffCoords} interactive={true} />
          {showDetails && <View style={styles.dimOverlay} />}
        </View>

        <View style={styles.header}>
          <Image source={headerlogo} style={[styles.logo, { tintColor: isDarkMode ? undefined : colors.text }]} />
          <Pressable
            style={[styles.headerbutton, { backgroundColor: colors.surface }, !showDetails && styles.headerButtonActive]}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Image source={viewIcon} style={[styles.iconSmall, { tintColor: colors.subText }, !showDetails && { tintColor: '#3BF579' }]} />
            <Text style={[styles.viewText, { color: colors.subText }]}>{showDetails ? "Hide" : "View"}</Text>
          </Pressable>
        </View>

        {showDetails && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
            <View style={styles.mainContent}>

              <View style={[styles.cardContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>

                {/* TIMER CARD (Moved Inside) */}
                <View style={[styles.timerCard, { backgroundColor: colors.inputBackground, borderColor: timerColor, borderWidth: 1, marginBottom: 20 }]}>
                  <Text style={[styles.timerLabel, { color: timerColor }]}>{statusText}</Text>
                  <Text style={[styles.timerValue, { color: timerColor }]}>{timerText}</Text>
                </View>

                <View style={styles.orderinfo}>
                  <View style={styles.info}>
                    <Text style={[styles.infotext, { color: colors.text }]}>Delivery #{order.order_id}</Text>
                    <Text style={[styles.infosubtext, { color: colors.subText }]}>
                      {isPickupPhase ? 'Heading to Pickup' : 'Heading to Dropoff'} (Status: {order.deliverystatus_id})
                    </Text>
                  </View>
                  <View style={[styles.farecontainer, { backgroundColor: colors.inputBackground }]}>
                    <Text style={[styles.totalfare, { color: colors.tint }]}>₱ {order.total_fare}</Text>
                  </View>
                </View>

                <View style={[styles.locationcontainer1, { backgroundColor: colors.inputBackground }]}>
                  <View style={[styles.sublocationcontainer, { opacity: isPickupPhase ? 1 : 0.5 }]}>
                    <Image source={geopick} style={[styles.geopickicon, { tintColor: colors.icon }]} />
                    <Text style={[styles.sublocationtext, { color: colors.text }]}>{order.pickup_address}</Text>
                  </View>
                  <View style={[styles.sublocationcontainer, { opacity: isDropoffPhase ? 1 : 0.5 }]}>
                    <Image source={geodrop} style={[styles.geodropicon, { tintColor: colors.icon }]} />
                    <Text style={[styles.sublocationtext, { color: colors.text }]}>{order.dropoff_address}</Text>
                  </View>
                </View>

                {/* Upload Proof Section */}
                {isDropoffPhase && (
                  <View style={[styles.imagePickerContainer, { backgroundColor: colors.inputBackground }]}>
                    <Pressable onPress={pickImage} style={[styles.imgbutton, { backgroundColor: colors.surface }]}>
                      <Text style={[styles.uploadButtonText, { color: colors.subText }]}>
                        {assets.length > 0 ? 'Photo Selected' : 'Take Proof Photo'}
                      </Text>
                    </Pressable>
                    <View style={styles.imageListContainer}>
                      {assets.map((item, idx) => (
                        <Image key={idx} source={{ uri: item.uri }} style={styles.selectedImage} />
                      ))}
                    </View>
                  </View>
                )}

                {/* Actions */}
                {isSubmitting ? (
                  <ActivityIndicator size="large" color="#3BF579" style={{ marginTop: 20 }} />
                ) : (
                  <View style={{ gap: 10, marginTop: 20 }}>
                    <Pressable style={styles.mainbutton} onPress={handleAction}>
                      <Text style={styles.maintextbutton}>
                        {isPickupPhase ? 'Confirm Pickup' : 'Confirm Delivery'}
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}

        {/* GRACE PERIOD MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={graceModalVisible}
          onRequestClose={() => setGraceModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: '#FFA500' }]}>Grace Period Active!</Text>
              <Text style={[styles.modalText, { color: colors.text }]}>
                You have exceeded the estimated time. Please complete the delivery within {fareConfig?.grace_period_minutes || 10} minutes to avoid a penalty.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setGraceModalVisible(false)}
              >
                <Text style={styles.textStyle}>Understood</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapContainer: { ...StyleSheet.absoluteFillObject, zIndex: 0 },
  dimOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: verticalScale(30), zIndex: 100 },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  headerbutton: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 10, gap: 6 },
  headerButtonActive: { borderColor: '#3BF579', borderWidth: 1 },
  iconSmall: { width: 18, height: 18, resizeMode: 'contain' },
  viewText: { fontSize: 12 },
  scrollView: { flex: 1, zIndex: 10 },
  mainContent: { padding: 20, paddingTop: 10 },
  cardContainer: { borderRadius: 20, padding: 20, borderWidth: 1 },
  orderinfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  infotext: { fontSize: 20, fontWeight: 'bold' },
  infosubtext: { fontSize: 14 },
  farecontainer: { padding: 10, borderRadius: 10 },
  totalfare: { fontSize: 18 },
  locationcontainer1: { marginTop: 16, borderRadius: 14, padding: 12 },
  sublocationcontainer: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  sublocationtext: { flex: 1 },
  geopickicon: { width: 22, height: 22 },
  geodropicon: { width: 22, height: 22 },
  imagePickerContainer: { alignItems: 'center', marginTop: 20, borderRadius: 11, padding: 10 },
  imgbutton: { width: '100%', height: 45, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  uploadButtonText: {},
  imageListContainer: { flexDirection: 'row', marginTop: 10 },
  selectedImage: { width: 60, height: 60, borderRadius: 5, margin: 5 },
  mainbutton: { backgroundColor: '#3BF579', padding: 15, borderRadius: 10, alignItems: 'center' },
  maintextbutton: { color: 'black', fontWeight: 'bold', fontSize: 16 },
  timerCard: { padding: 15, borderRadius: 12, borderWidth: 2, alignItems: 'center', marginBottom: 15 },
  timerLabel: { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  timerValue: { fontSize: 32, fontWeight: 'bold' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalText: { marginBottom: 15, textAlign: 'center' },
  button: { borderRadius: 20, padding: 10, elevation: 2 },
  buttonClose: { backgroundColor: '#2196F3' },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' }
});

export default DeliverOngoing;