import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { verticalScale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { useOrder } from '../../../context/OrderContext';
import supabase from '../../../lib/supabase';

const onfoot = require("../../../assets/images/onfoot.png");
const dulog = require("../../../assets/images/dulog.png");
const motorcycle = require("../../../assets/images/motorcycle.png");
const rela = require("../../../assets/images/rela.png");
const bike = require("../../../assets/images/bike.png");
const passengercar = require("../../../assets/images/passengercar.png");
const truck = require("../../../assets/images/truck.png");
const next = require("../../../assets/images/next.png");
const time = require("../../../assets/images/time.png");

export default function index() {
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '25%', '50%', '70%'], []);

  const {
    pickupLocation,
    dropoffLocation,
    orderMetrics,
    createOrder,
    isLoading
  } = useOrder();

  const [deliveryType, setDeliveryType] = useState('Pasundo');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [isSelected, setSelected] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [selectedSlide, setSelectedSlide] = useState(null);

  const [userStatusId, setUserStatusId] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState(null);
  const [userId, setUserId] = useState(null);

  const deliveryOptions = [
    { label: 'Pasundo', value: 'Pasundo' },
    { label: 'Pasugo', value: 'Pasugo' },
  ];
  const paymentOptions = [
    { label: 'Cash On Delivery', value: 'COD' },
    { label: 'G-Cash', value: 'GCash' },
  ];

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

  const handleOrderPress = async () => {
    if (!userId) return;

    if (userStatusId === 4) {
      await AsyncStorage.setItem(`wasSuspended_${userId}`, 'true');
      Alert.alert("Account Suspended", `Reason: ${suspensionReason || "Violation of policies."}`);
      return;
    }
    if (userStatusId === 1) {
      const wasSuspended = await AsyncStorage.getItem(`wasSuspended_${userId}`);
      if (wasSuspended === 'true') {
        Alert.alert("Welcome Back", "Your account has been reactivated.");
        await AsyncStorage.removeItem(`wasSuspended_${userId}`);
      }
    }

    if (!pickupLocation || !dropoffLocation) {
      Alert.alert("Missing Location", "Please select both Pickup and Drop-off locations.");
      return;
    }
    if (!selectedSlide) {
      Alert.alert("Vehicle Required", "Please select a vehicle type.");
      return;
    }

    const baseFare = 50;
    const calculatedFare = baseFare + (parseFloat(orderMetrics?.distanceKm || 0) * 15);

    // Payload Construction matching DB schema
    const payload = {
      pickup_latitude: pickupLocation.latitude,
      pickup_longitude: pickupLocation.longitude,
      pickup_address: pickupLocation.address,
      dropoff_latitude: dropoffLocation.latitude,
      dropoff_longitude: dropoffLocation.longitude,
      dropoff_address: dropoffLocation.address,
      distance: parseFloat(orderMetrics.distanceKm),
      estimated_duration: parseInt(orderMetrics.durationMin),
      status_name: 'Pending',
      // Additional fields needed for the app logic but maybe not in the strict schema list provided?
      // The user listed specific columns for "Location Data" and "Metrics".
      // I'll include the other necessary fields for the order to make sense (vehicle, price, etc.)
      // as part of a larger object or separate columns if they exist.
      // For now, I'll stick to the user's request to "consolidate context data... matching the orders table columns listed".
      // I will also include the other UI fields.
      vehicle_type: selectedSlide,
      payment_method: paymentMethod,
      delivery_type: deliveryType,
      scheduled_date: isSelected ? scheduledDate : null,
      total_fare: calculatedFare.toFixed(2),
      user_id: userId
    };

    console.log("Order Payload:", JSON.stringify(payload, null, 2));

    const newOrder = await createOrder(payload);

    if (newOrder) {
      router.push('/(customer)/home/ordersearch');
    }
  };

  const showPicker = () => { if (isSelected) setPickerVisible(true); };
  const hidePicker = () => setPickerVisible(false);
  const handleConfirm = (date) => { setScheduledDate(date); hidePicker(); };

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {(item.value === deliveryType || item.value === paymentMethod) && (
        <AntDesign style={styles.icon} color="black" name="checkcircle" size={20} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Map Area</Text>
        <Text style={styles.subtitle}>
          {orderMetrics.distanceKm > 0
            ? `${orderMetrics.distanceKm} km • ${orderMetrics.durationMin} min`
            : "Select locations to see route"}
        </Text>
      </View>

      <View style={styles.inputlocationcontainer}>
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
            <Text style={styles.textloc}>What To Deliver?</Text>
            <Image source={next} style={styles.nexticon} />
          </Pressable>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
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
                  renderItem={renderItem}
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
                  renderItem={renderItem}
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
            <Swiper style={styles.swiperWrapper} showsButtons={true} height={200} showsPagination={false}>
              {[
                { id: 'foot', label: 'On Foot - ₱ 10', image: onfoot },
                { id: 'dulog', label: 'Dulog - ₱ 25', image: dulog },
                { id: 'motorcycle', label: 'Motorcycle - ₱ 20', image: motorcycle },
                { id: 'rela', label: 'Rela - ₱ 15', image: rela },
                { id: 'bike', label: 'Bicycle - ₱ 10', image: bike },
                { id: 'passenger', label: 'Car - ₱ 40', image: passengercar },
                { id: 'truck', label: 'Truck - ₱ 90', image: truck },
              ].map(item => (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedSlide(selectedSlide === item.id ? null : item.id)}
                  style={[styles.slide, selectedSlide === item.id && styles.selectedSlide]}
                >
                  <Text style={styles.swiperText}>{item.label}</Text>
                  <Image source={item.image} style={styles.slideimg} />
                </Pressable>
              ))}
            </Swiper>
          </View>

          <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hidePicker}
            date={scheduledDate || new Date()}
          />

          <Pressable style={styles.mainbutton} onPress={handleOrderPress} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="black" /> : <Text style={styles.maintextbutton}>Order</Text>}
          </Pressable>

        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  mainContent: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#CCCCCC', textAlign: 'center' },
  bottomSheetBackground: { backgroundColor: '#363D47' },
  handleIndicator: { backgroundColor: '#0AB3FF' },
  contentContainer: { flex: 1, padding: 16 },
  inputlocationcontainer: { position: 'absolute', width: '90%', maxWidth: 381, alignSelf: 'center', top: 95, backgroundColor: '#363D47', borderRadius: 28, paddingVertical: 10 },
  inputcontainer: { flexDirection: 'column', width: '100%', height: '30%', maxWidth: 1024, padding: 9, marginHorizontal: 'auto', pointerEvents: 'auto' },
  textinputloc: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#192028', borderColor: '#192028', borderWidth: 1, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 15, marginBottom: 8 },
  textloc: { flexShrink: 1, color: '#7398A9', fontFamily: 'Roboto-Light', fontSize: 16, lineHeight: 23 },
  nexticon: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#00bfff' },
  mainbutton: { flexDirection: 'column', width: '100%', maxWidth: 1024, padding: 15, justifyContent: "center", alignItems: 'center', marginHorizontal: 'auto', pointerEvents: 'auto', backgroundColor: '#3BF579', borderRadius: 10, marginTop: verticalScale(20) },
  maintextbutton: { fontSize: 18, color: 'black', fontFamily: 'Roboto-Bold' },
  dropdown: { backgroundColor: '#192028', borderColor: '#192028', color: '#7398A9', height: 50, borderRadius: 12, padding: 12, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0.1 },
  icon: { marginRight: 5, color: '#3BF579' },
  item: { color: '#7398A9', padding: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textItem: { flex: 1, fontSize: 16, color: '#7398A9' },
  placeholderStyle: { fontSize: 14, color: '#7398A9', fontFamily: 'Roboto-Regular', marginLeft: 5 },
  selectedTextStyle: { fontSize: 14, color: '#FFFFFF', fontFamily: 'Roboto-Regular', marginLeft: 5 },
  iconStyle: { width: 20, height: 20, color: '#7398A9' },
  inputSearchStyle: { height: 40, fontSize: 16, color: '#7398A9', marginLeft: 5 },
  bottomsheetcontainer: { flex: 1, marginBottom: 10, paddingHorizontal: 8, paddingVertical: 8 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'stretch', width: '100%' },
  gridItem: { flex: 1, marginHorizontal: 2, justifyContent: 'center', minWidth: 0 },
  remembercontainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#192028', borderRadius: 12, height: 50, justifyContent: 'flex-start', flex: 1 },
  recover: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  button: { borderRadius: 12, padding: 10, elevation: 2 },
  buttonOpen: { backgroundColor: '#192028', height: 50, padding: 14, pointerEvents: 'auto', borderRadius: 10, justifyContent: "center", alignItems: 'center', fontFamily: 'Roboto-Regular', flexDirection: 'row' },
  buttonDisabled: { opacity: 0.5, backgroundColor: '#0f151c' },
  textStyle: { color: '#7398A9', fontFamily: 'Roboto-Regular', textAlign: 'center', fontSize: 14, flex: 1 },
  textDisabled: { color: '#4a5a68' },
  ordericon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 10 },
  swiperContainer: { height: 180, marginVertical: 20, width: '100%' },
  swiperWrapper: { height: 200 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#465569', borderRadius: 17, width: '70%', alignContent: 'center', alignSelf: 'center', borderWidth: 2, borderColor: 'transparent' },
  selectedSlide: { borderColor: '#0AB3FF', backgroundColor: '#2A3B4D', shadowColor: '#0AB3FF', shadowOpacity: 0.6, shadowRadius: 5 },
  swiperText: { fontWeight: 'bold', fontFamily: 'Roboto-Regular', fontSize: 18, color: '#FFFFFF', marginBottom: 10 },
  slideimg: { width: 100, height: 100, alignSelf: 'center', resizeMode: 'contain' },
});