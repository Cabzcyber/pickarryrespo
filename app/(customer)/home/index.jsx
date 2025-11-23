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
import { useOrder } from '../../../context/OrderContext';
import supabase from '../../../lib/supabase';
import { calculateAndPrepareOrder } from '../../../services/FareCalculator';
import GeoapifyRouteMap from '../../../components/GeoapifyRouteMap';
import { sanitizeGoodsDetails } from '../../../utils/InputSanitizer';

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

  const [deliveryType, setDeliveryType] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(1);
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
          .select('vehicle_id, vehicle_name, slug, base_fare')
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
    if (!selectedVehicle) {
      Alert.alert("Vehicle Required", "Please select a vehicle type.");
      return;
    }

    try {
      setIsSubmitting(true);

      const cleanGoods = sanitizeGoodsDetails(goodsDetails);
      console.log("Sanitized Goods:", JSON.stringify(cleanGoods));

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

      // --- CRITICAL FIX: Get the new Order ID ---
      const { data, error } = await supabase
        .from('order')
        .insert([payload])
        .select() // Need this to get the ID back
        .single();

      if (error) throw error;

      // Reset Form
      setPickupLocation(null);
      setDropoffLocation(null);
      setGoodsDetails(null);
      setSelectedVehicle(null);
      setSelected(false);
      setScheduledDate(null);

      // --- CRITICAL FIX: Pass the new Order ID to the search screen ---
      Alert.alert("Order Submitted!", `Total: ₱${payload.total_fare}`, [
          {
            text: "OK",
            onPress: () => router.push({
              pathname: '/(customer)/home/ordersearch',
              params: { orderId: data.order_id } // Pass explicit ID
            })
          }
      ]);

    } catch (error) {
      console.error("Order Error:", error);
      Alert.alert("Error", "Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showPicker = () => { if (isSelected) setPickerVisible(true); };
  const hidePicker = () => setPickerVisible(false);
  const handleConfirm = (date) => { setScheduledDate(date); hidePicker(); };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.mapWrapper}>
          <GeoapifyRouteMap
            pickup={pickupLocation}
            dropoff={dropoffLocation}
          />

          <Pressable style={styles.viewModeButton} onPress={toggleUiVisibility}>
             <AntDesign name={uiVisible ? "eye" : "eyeo"} size={24} color="#0AB3FF" />
          </Pressable>

          {orderMetrics.distanceKm > 0 && uiVisible && (
            <View style={styles.statsOverlay}>
              <Text style={styles.statsText}>
                {orderMetrics.distanceKm} km • {orderMetrics.durationMin} min
              </Text>
            </View>
          )}
        </View>
      </View>

      {uiVisible && (
        <View style={styles.inputlocationcontainer} pointerEvents="box-none">
          <View style={styles.inputcontainer}>
            <Pressable style={styles.textinputloc} onPress={() => router.push('/(customer)/home/pickup')}>
              <Text style={[styles.textloc, pickupLocation && { color: '#FFFFFF', fontFamily: 'Roboto-Regular' }]} numberOfLines={1}>
                {pickupLocation ? pickupLocation.address : "Where To Pickup?"}
              </Text>
              <Image source={next} style={styles.nexticon} />
            </Pressable>
          </View>
          <View style={styles.inputcontainer}>
            <Pressable style={styles.textinputloc} onPress={() => router.push('/(customer)/home/dropoff')}>
              <Text style={[styles.textloc, dropoffLocation && { color: '#FFFFFF', fontFamily: 'Roboto-Regular' }]} numberOfLines={1}>
                {dropoffLocation ? dropoffLocation.address : "Where To Drop-off?"}
              </Text>
              <Image source={next} style={styles.nexticon} />
            </Pressable>
          </View>
          <View style={styles.inputcontainer}>
            <Pressable style={styles.textinputloc} onPress={() => router.push('/(customer)/home/setgoods')}>
              <Text style={[styles.textloc, goodsDetails && { color: '#FFFFFF', fontFamily: 'Roboto-Regular' }]}>
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
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        style={{ zIndex: 50 }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.bottomsheetcontainer}>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
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
                <View style={styles.remembercontainer}>
                  <View style={styles.recover}>
                    <CheckBox
                      checked={isSelected}
                      onPress={() => setSelected(!isSelected)}
                      checkedColor='#1976d2'
                      uncheckedColor='#aaa'
                      size={20}
                      containerStyle={{ padding: 0, margin: 0, marginLeft: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                    <Text style={{ color: '#7398A9', marginLeft: 5, flex: 1, fontSize: 11 }} numberOfLines={1}>Book For Delivery</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
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
                  style={[styles.button, styles.buttonOpen, !isSelected && styles.buttonDisabled]}
                  onPress={showPicker}
                  disabled={!isSelected}>
                  <Text style={[styles.textStyle, !isSelected && styles.textDisabled]}>
                    {scheduledDate ? scheduledDate.toLocaleDateString() : "Set Schedule"}
                  </Text>
                  <Image source={time} style={styles.ordericon} />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.swiperContainer}>
            {loadingVehicles ? (
              <ActivityIndicator size="large" color="#0AB3FF" style={{ marginTop: 50 }} />
            ) : (
              <Swiper
                style={styles.swiperWrapper}
                showsButtons={true}
                height={240}
                showsPagination={false}
                loop={false}
                removeClippedSubviews={false}
                containerStyle={{ overflow: 'visible' }}
                nextButton={<Text style={{ fontSize: 40, color: '#0AB3FF' }}>›</Text>}
                prevButton={<Text style={{ fontSize: 40, color: '#0AB3FF' }}>‹</Text>}
              >
                {vehicleList.map((item) => {
                  const isSelected = selectedVehicle?.vehicle_id === item.vehicle_id;
                  const imageSource = vehicleImageMap[item.slug] || onfoot;
                  return (
                    <View key={item.vehicle_id} style={styles.slideOuter}>
                      <Pressable
                        onPress={() => setSelectedVehicle(isSelected ? null : item)}
                        style={[styles.slide, isSelected && styles.selectedSlide]}
                      >
                        <Text style={styles.swiperText}>{item.vehicle_name} - ₱ {item.base_fare}</Text>
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

          <Pressable style={styles.mainbutton} onPress={handleOrderPress} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator color="black" /> : <Text style={styles.maintextbutton}>Order</Text>}
          </Pressable>

        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  mainContent: { flex: 1, padding: 0, alignItems: 'center', justifyContent: 'flex-start' },
  mapWrapper: { flex: 1, width: '100%', marginBottom: 0 },
  viewModeButton: { position: 'absolute', top: 340, right: 20, backgroundColor: 'rgba(30, 30, 30, 0.9)', padding: 12, borderRadius: 30, zIndex: 100, borderWidth: 1, borderColor: '#363D47' },
  statsOverlay: { position: 'absolute', top: 340, alignSelf: 'center', backgroundColor: 'rgba(20, 21, 25, 0.9)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, zIndex: 10, borderWidth: 1, borderColor: '#363D47' },
  statsText: { color: '#0AB3FF', fontFamily: 'Roboto-Bold', fontSize: 14 },
  inputlocationcontainer: { position: 'absolute', width: '90%', maxWidth: 381, alignSelf: 'center', top: 70, backgroundColor: '#363D47', borderRadius: 28, paddingVertical: 10, zIndex: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8 },
  inputcontainer: { flexDirection: 'column', width: '100%', maxWidth: 1024, padding: 9, marginHorizontal: 'auto', pointerEvents: 'auto' },
  textinputloc: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#192028', borderColor: '#192028', borderWidth: 1, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 15, marginBottom: 8 },
  textloc: { flexShrink: 1, color: '#7398A9', fontFamily: 'Roboto-Light', fontSize: 16, lineHeight: 23 },
  nexticon: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#00bfff' },
  bottomSheetBackground: { backgroundColor: '#363D47' },
  handleIndicator: { backgroundColor: '#0AB3FF' },
  contentContainer: { flex: 1, padding: 16 },

  bottomsheetcontainer: { flex: 1, marginBottom: 10, paddingHorizontal: 8, paddingVertical: 8 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'stretch', width: '100%' },
  gridItem: { flex: 1, marginHorizontal: 2, justifyContent: 'center', minWidth: 0 },
  dropdown: { backgroundColor: '#192028', borderColor: '#192028', color: '#7398A9', height: 50, borderRadius: 12, padding: 12, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0.1 },
  icon: { marginRight: 5, color: '#3BF579' },
  item: { color: '#7398A9', padding: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textItem: { flex: 1, fontSize: 16, color: '#7398A9' },
  placeholderStyle: { fontSize: 14, color: '#7398A9', fontFamily: 'Roboto-Regular', marginLeft: 5 },
  selectedTextStyle: { fontSize: 14, color: '#FFFFFF', fontFamily: 'Roboto-Regular', marginLeft: 5 },
  iconStyle: { width: 20, height: 20, color: '#7398A9' },
  inputSearchStyle: { height: 40, fontSize: 16, color: '#7398A9', marginLeft: 5 },
  remembercontainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#192028', borderRadius: 12, height: 50, justifyContent: 'flex-start', flex: 1 },
  recover: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  button: { borderRadius: 12, padding: 10, elevation: 2 },
  buttonOpen: { backgroundColor: '#192028', height: 50, padding: 14, pointerEvents: 'auto', borderRadius: 10, justifyContent: "center", alignItems: 'center', fontFamily: 'Roboto-Regular', flexDirection: 'row' },
  buttonDisabled: { opacity: 0.5, backgroundColor: '#0f151c' },
  textStyle: { color: '#7398A9', fontFamily: 'Roboto-Regular', textAlign: 'center', fontSize: 14, flex: 1 },
  textDisabled: { color: '#4a5a68' },
  ordericon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 10 },

  swiperContainer: { height: 220, marginVertical: 20, width: width },
  swiperWrapper: { height: 240 },
  slideOuter: { width: width, flex: 1, alignItems: 'center', justifyContent: 'center' },
  slide: { width: width * 0.75, height: 180, backgroundColor: '#465569', borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'transparent', marginVertical: 10 },
  selectedSlide: { borderColor: '#0AB3FF', backgroundColor: '#2A3B4D', shadowColor: '#0AB3FF', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 8, elevation: 10 },
  swiperText: { fontWeight: 'bold', fontFamily: 'Roboto-Regular', fontSize: 18, color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  slideimg: { width: 100, height: 100, alignSelf: 'center', resizeMode: 'contain' },

  mainbutton: { flexDirection: 'column', width: '100%', maxWidth: 1024, padding: 15, justifyContent: "center", alignItems: 'center', marginHorizontal: 'auto', pointerEvents: 'auto', backgroundColor: '#3BF579', borderRadius: 10, marginTop: verticalScale(20) },
  maintextbutton: { fontSize: 18, color: 'black', fontFamily: 'Roboto-Bold' },
});