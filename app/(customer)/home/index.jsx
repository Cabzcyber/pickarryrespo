import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { verticalScale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { decode } from 'base64-arraybuffer';

import { useOrder } from '../../../context/OrderContext';
import supabase from '../../../lib/supabase';
import { calculateAndPrepareOrder } from '../../../services/FareCalculator';
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';
import { sanitizeGoodsDetails } from '../../../utils/InputSanitizer';
import { useTheme } from '../../../context/ThemeContext';

const onfoot = require("../../../assets/images/onfoot.png");
const dulog = require("../../../assets/images/dulog.png");
const motorcycle = require("../../../assets/images/motorcycle.png");
const rela = require("../../../assets/images/rela.png");
const bike = require("../../../assets/images/bike.png");
const passengercar = require("../../../assets/images/passengercar.png");
const truck = require("../../../assets/images/truck.png");
const next = require("../../../assets/images/next.png");
const time = require("../../../assets/images/time.png");

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

export default function index() {
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['15%', '40%', '85%'], []);
  const { colors } = useTheme();

  const {
    pickupLocation,
    dropoffLocation,
    goodsDetails,
    orderMetrics,
    setPickupLocation,
    setDropoffLocation,
    setGoodsDetails,
    isLoading: isOrderLoading
  } = useOrder();

  const [deliveryType, setDeliveryType] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [isSelected, setSelected] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);

  const [uiVisible, setUiVisible] = useState(true);

  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userStatusId, setUserStatusId] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState(null);
  const [userId, setUserId] = useState(null);

  const deliveryOptions = [
    { label: 'Pasundo', value: 1 },
    { label: 'Pasugo', value: 2 },
  ];
  const paymentOptions = [
    { label: 'Cash On Delivery', value: 1 },
    { label: 'G-Cash', value: 2 },
  ];

  const vehicleImageMap = {
    'onfoot': onfoot,
    'motorcycle': motorcycle,
    'bicycle': bike,
    'rela': rela,
    'dulog': dulog,
    'passenger-car': passengercar,
    'truck': truck
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoadingVehicles(true);
        const { data, error } = await supabase
          .from('type_vehicle')
          .select('vehicle_id, vehicle_name, slug, base_fare, distance_rate_per_km')
          .order('vehicle_id', { ascending: true });

        if (error) throw error;
        if (data) setVehicleList(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      } finally {
        setLoadingVehicles(false);
      }
    };
    fetchVehicles();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          const { data } = await supabase
            .from('service_user')
            .select('userstatus_id, suspension_reason')
            .eq('user_id', user.id)
            .single();

          if (data) {
            setUserStatusId(data.userstatus_id);
            setSuspensionReason(data.suspension_reason);
          }
        }
      };
      checkStatus();
    }, [])
  );

  const toggleUiVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUiVisible(!uiVisible);
  };

  const uploadImageToSupabase = async (base64, fileExt = 'jpg') => {
    try {
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error } = await supabase.storage
        .from('goods_images')
        .upload(filePath, decode(base64), {
          contentType: `image/${fileExt}`,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from('goods_images')
        .getPublicUrl(filePath);

      return data.publicUrl;

    } catch (error) {
      console.error("Image Upload Failed:", error);
      return null;
    }
  };

  const handleOrderPress = async () => {
    if (!userId) return;

    if (userStatusId === 4) {
      await AsyncStorage.setItem(`wasSuspended_${userId}`, 'true');
      Alert.alert("Account Suspended", `Reason: ${suspensionReason}`);
      return;
    }
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert("Missing Location", "Please select locations.");
      return;
    }
    if (!goodsDetails) {
      Alert.alert("Missing Details", "Please specify 'What To Deliver?'.");
      return;
    }

    if (!deliveryType) {
      Alert.alert("Missing Detail", "Please select a Delivery Type.");
      return;
    }
    if (!paymentMethod) {
      Alert.alert("Missing Detail", "Please select a Payment Method.");
      return;
    }

    if (!selectedVehicle) {
      Alert.alert("Vehicle Required", "Please select a vehicle type.");
      return;
    }

    try {
      setIsSubmitting(true);

      const uploadedImageUrls = [];
      if (goodsDetails.images && goodsDetails.images.length > 0) {
        console.log("Uploading images...");
        for (const asset of goodsDetails.images) {
          if (asset.base64) {
            const publicUrl = await uploadImageToSupabase(asset.base64);
            if (publicUrl) {
              uploadedImageUrls.push(publicUrl);
            } else {
              throw new Error("Failed to upload one of the images. Please try again.");
            }
          }
        }
      }

      const cleanGoods = sanitizeGoodsDetails(goodsDetails);

      const orderInputs = {
        pickupLocation,
        dropoffLocation,
        goodsDetails: cleanGoods,
        orderMetrics,
        vehicleId: selectedVehicle.vehicle_id,
        serviceId: deliveryType,
        paymentId: paymentMethod,
        userId,
        isScheduled: isSelected,
        scheduledDate
      };

      const payload = await calculateAndPrepareOrder(orderInputs);

      payload.goods_image1 = uploadedImageUrls[0] || null;
      payload.goods_image2 = uploadedImageUrls[1] || null;
      payload.goods_image3 = uploadedImageUrls[2] || null;

      const { data, error } = await supabase
        .from('order')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      setPickupLocation(null);
      setDropoffLocation(null);
      setGoodsDetails(null);
      setSelectedVehicle(null);
      setSelected(false);
      setScheduledDate(null);
      setDeliveryType(null);
      setPaymentMethod(null);

      Alert.alert("Order Submitted!", `Total: ₱${payload.total_fare}`, [
        {
          text: "OK",
          onPress: () => router.push({
            pathname: '/(customer)/home/ordersearch',
            params: { orderId: data.order_id }
          })
        }
      ]);

    } catch (error) {
      console.error("Order Error:", error);
      Alert.alert("Error", "Failed to submit order. " + (error.message || ""));
    } finally {
      setIsSubmitting(false);
    }
  };

  const showPicker = () => { if (isSelected) setPickerVisible(true); };
  const hidePicker = () => setPickerVisible(false);
  const handleConfirm = (date) => { setScheduledDate(date); hidePicker(); };

  const getFareEstimate = () => {
    if (!selectedVehicle || !orderMetrics.distanceKm) return null;

    const base = Number(selectedVehicle.base_fare);
    const distRate = Number(selectedVehicle.distance_rate_per_km || 0);
    const distCost = (Number(orderMetrics.distanceKm) * distRate);
    const total = base + distCost;

    return {
      base: base.toFixed(2),
      distCost: distCost.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const fareEst = getFareEstimate();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.mainContent}>
        <View style={styles.mapWrapper}>
          <GeoapifyRouteMap
            pickup={pickupLocation}
            dropoff={dropoffLocation}
          />

          <Pressable style={[styles.viewModeButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={toggleUiVisibility}>
            <AntDesign name={uiVisible ? "eye" : "eye-invisible"} size={24} color={colors.tint} />
          </Pressable>

          {orderMetrics.distanceKm > 0 && uiVisible && (
            <View style={[styles.statsOverlay, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statsText, { color: colors.text }]}>
                {orderMetrics.distanceKm} km • {orderMetrics.durationMin} min
              </Text>

              {fareEst && (
                <View style={styles.fareBreakdown}>
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  <Text style={[styles.fareTitle, { color: colors.tint }]}>Est. Total: ₱ {fareEst.total}</Text>
                  <Text style={[styles.fareSub, { color: colors.subText }]}>
                    Base: ₱{fareEst.base} + Dist: ₱{fareEst.distCost}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>

      {uiVisible && (
        <View style={[styles.inputlocationcontainer, { backgroundColor: colors.surface }]} pointerEvents="box-none">
          <View style={styles.inputcontainer}>
            <Pressable style={[styles.textinputloc, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => router.push('/(customer)/home/pickup')}>
              <Text style={[styles.textloc, { color: pickupLocation ? colors.text : colors.subText }, pickupLocation && { fontFamily: 'Roboto-Regular' }]} numberOfLines={1}>
                {pickupLocation ? pickupLocation.address : "Where To Pickup?"}
              </Text>
              <Image source={next} style={styles.nexticon} />
            </Pressable>
          </View>
          <View style={styles.inputcontainer}>
            <Pressable style={[styles.textinputloc, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => router.push('/(customer)/home/dropoff')}>
              <Text style={[styles.textloc, { color: dropoffLocation ? colors.text : colors.subText }, dropoffLocation && { fontFamily: 'Roboto-Regular' }]} numberOfLines={1}>
                {dropoffLocation ? dropoffLocation.address : "Where To Drop-off?"}
              </Text>
              <Image source={next} style={styles.nexticon} />
            </Pressable>
          </View>
          <View style={styles.inputcontainer}>
            <Pressable style={[styles.textinputloc, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => router.push('/(customer)/home/setgoods')}>
              <Text style={[styles.textloc, { color: goodsDetails ? colors.text : colors.subText }, goodsDetails && { fontFamily: 'Roboto-Regular' }]}>
                {goodsDetails ? `${goodsDetails.other_details.substring(0, 20)}...` : "What To Deliver?"}
              </Text>
              <Image source={next} style={styles.nexticon} />
            </Pressable>
          </View>
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={styles.handleIndicator}
        style={{ zIndex: 50 }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.bottomsheetcontainer}>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Dropdown
                  style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.card }]}
                  placeholderStyle={[styles.placeholderStyle, { color: colors.subText }]}
                  selectedTextStyle={[styles.selectedTextStyle, { color: colors.text }]}
                  inputSearchStyle={[styles.inputSearchStyle, { color: colors.text }]}
                  iconStyle={[styles.iconStyle, { color: colors.subText }]}
                  data={deliveryOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Delivery Type"
                  value={deliveryType}
                  onChange={item => setDeliveryType(item.value)}
                />
              </View>
              <View style={styles.gridItem}>
                <View style={[styles.remembercontainer, { backgroundColor: colors.card }]}>
                  <View style={styles.recover}>
                    <CheckBox
                      checked={isSelected}
                      onPress={() => setSelected(!isSelected)}
                      checkedColor={colors.tint}
                      uncheckedColor={colors.subText}
                      size={20}
                      containerStyle={{ padding: 0, margin: 0, marginLeft: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                    <Text style={{ color: colors.subText, marginLeft: 5, flex: 1, fontSize: 11 }} numberOfLines={1}>Book For Delivery</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Dropdown
                  style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.card }]}
                  placeholderStyle={[styles.placeholderStyle, { color: colors.subText }]}
                  selectedTextStyle={[styles.selectedTextStyle, { color: colors.text }]}
                  inputSearchStyle={[styles.inputSearchStyle, { color: colors.text }]}
                  iconStyle={[styles.iconStyle, { color: colors.subText }]}
                  data={paymentOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Payment"
                  value={paymentMethod}
                  onChange={item => setPaymentMethod(item.value)}
                />
              </View>
              <View style={styles.gridItem}>
                <Pressable
                  style={[styles.button, styles.buttonOpen, !isSelected && styles.buttonDisabled, { backgroundColor: colors.card }]}
                  onPress={showPicker}
                  disabled={!isSelected}>
                  <Text style={[styles.textStyle, !isSelected && styles.textDisabled, { color: colors.subText }]}>
                    {scheduledDate ? scheduledDate.toLocaleDateString() : "Set Schedule"}
                  </Text>
                  <Image source={time} style={styles.ordericon} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.swiperContainer}>
            {loadingVehicles ? (
              <ActivityIndicator size="large" color={colors.tint} style={{ marginTop: 50 }} />
            ) : (
              <Swiper
                style={styles.swiperWrapper}
                showsButtons={true}
                height={240}
                showsPagination={false}
                loop={false}
                removeClippedSubviews={false}
                containerStyle={{ overflow: 'visible' }}
                // --- FIX: Add padding to button wrapper to bring arrows inside screen ---
                buttonWrapperStyle={{ paddingHorizontal: 20 }}
                nextButton={<Text style={{ fontSize: 50, color: colors.tint, fontWeight: 'bold' }}>›</Text>}
                prevButton={<Text style={{ fontSize: 50, color: colors.tint, fontWeight: 'bold' }}>‹</Text>}
              >
                {vehicleList.map((item) => {
                  const isSelected = selectedVehicle?.vehicle_id === item.vehicle_id;
                  const imageSource = vehicleImageMap[item.slug] || onfoot;
                  return (
                    <View key={item.vehicle_id} style={styles.slideOuter}>
                      <Pressable
                        onPress={() => setSelectedVehicle(isSelected ? null : item)}
                        style={[styles.slide, isSelected && styles.selectedSlide, { backgroundColor: colors.card, borderColor: isSelected ? colors.tint : 'transparent', shadowColor: isSelected ? colors.tint : '#000' }]}
                      >
                        <Text style={[styles.swiperText, { color: colors.text }]}>{item.vehicle_name} - ₱ {item.base_fare}</Text>
                        <Image source={imageSource} style={styles.slideimg} />
                      </Pressable>
                    </View>
                  );
                })}
              </Swiper>
            )}
          </View>

          <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hidePicker}
            date={scheduledDate || new Date()}
          />

          <Pressable style={[styles.mainbutton, { backgroundColor: colors.success }]} onPress={handleOrderPress} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator color={colors.buttonText} /> : <Text style={[styles.maintextbutton, { color: colors.buttonText }]}>Order</Text>}
          </Pressable>

        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContent: { flex: 1, padding: 0, alignItems: 'center', justifyContent: 'flex-start' },
  mapWrapper: { flex: 1, width: '100%', marginBottom: 0 },
  viewModeButton: { position: 'absolute', top: 340, right: 20, backgroundColor: 'rgba(30, 30, 30, 0.9)', padding: 12, borderRadius: 30, zIndex: 100, borderWidth: 1, borderColor: '#363D47' },

  statsOverlay: {
    position: 'absolute',
    top: 330,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    zIndex: 10,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8
  },
  statsText: { fontFamily: 'Roboto-Bold', fontSize: 16, marginBottom: 2 },

  fareBreakdown: { alignItems: 'center', width: '100%' },
  divider: { height: 1, width: '80%', marginVertical: 8 },
  fareTitle: { fontFamily: 'Roboto-Bold', fontSize: 18, marginBottom: 2 },
  fareSub: { fontFamily: 'Roboto-Regular', fontSize: 12 },

  inputlocationcontainer: { position: 'absolute', width: '90%', maxWidth: 381, alignSelf: 'center', top: 70, borderRadius: 28, paddingVertical: 10, zIndex: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8 },
  inputcontainer: { flexDirection: 'column', width: '100%', maxWidth: 1024, padding: 9, marginHorizontal: 'auto', pointerEvents: 'auto' },
  textinputloc: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 15, marginBottom: 8 },
  textloc: { flexShrink: 1, fontFamily: 'Roboto-Light', fontSize: 16, lineHeight: 23 },
  nexticon: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#00bfff' },
  bottomSheetBackground: {},
  handleIndicator: { backgroundColor: '#0AB3FF' },
  contentContainer: { flex: 1, padding: 16 },

  bottomsheetcontainer: { flex: 1, marginBottom: 10, paddingHorizontal: 8, paddingVertical: 8 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'stretch', width: '100%' },
  gridItem: { flex: 1, marginHorizontal: 2, justifyContent: 'center', minWidth: 0 },
  dropdown: { height: 50, borderRadius: 12, padding: 12, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0.1 },
  icon: { marginRight: 5, color: '#3BF579' },
  item: { padding: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textItem: { flex: 1, fontSize: 16 },
  placeholderStyle: { fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5 },
  selectedTextStyle: { fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5 },
  iconStyle: { width: 20, height: 20 },
  inputSearchStyle: { height: 40, fontSize: 16, marginLeft: 5 },
  remembercontainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, height: 50, justifyContent: 'flex-start', flex: 1 },
  recover: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  button: { borderRadius: 12, padding: 10, elevation: 2 },
  buttonOpen: { height: 50, padding: 14, pointerEvents: 'auto', borderRadius: 10, justifyContent: "center", alignItems: 'center', fontFamily: 'Roboto-Regular', flexDirection: 'row' },
  buttonDisabled: { opacity: 0.5 },
  textStyle: { fontFamily: 'Roboto-Regular', textAlign: 'center', fontSize: 14, flex: 1 },
  textDisabled: {},
  ordericon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 10 },

  swiperContainer: { height: 220, marginVertical: 20, width: width },
  swiperWrapper: { height: 240 },
  slideOuter: { width: width, flex: 1, alignItems: 'center', justifyContent: 'center' },
  slide: { width: width * 0.75, height: 180, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 2, marginVertical: 10 },
  selectedSlide: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 8, elevation: 10 },
  swiperText: { fontWeight: 'bold', fontFamily: 'Roboto-Regular', fontSize: 18, marginBottom: 10, textAlign: 'center' },
  slideimg: { width: 100, height: 100, alignSelf: 'center', resizeMode: 'contain' },

  mainbutton: { flexDirection: 'column', width: '100%', maxWidth: 1024, padding: 15, justifyContent: "center", alignItems: 'center', marginHorizontal: 'auto', pointerEvents: 'auto', borderRadius: 10, marginTop: verticalScale(20) },
  maintextbutton: { fontSize: 18, fontFamily: 'Roboto-Bold' },
});
