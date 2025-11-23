import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
import { useOrder } from '../../../context/OrderContext';

// Assets
const backimg = require("@/assets/images/back.png");
const headerlogo = require("@/assets/images/headerlogo.png");
const headerheart = require("@/assets/images/heart.png");
const cancel = require("@/assets/images/cancel.png");
const report = require("@/assets/images/report.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");
const calculator = require("@/assets/images/calculator.png");

const SEARCH_TIMEOUT_SECONDS = 300; // 5 Minutes

const OrderSearch = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  // 2. Get Context Setters
  const { setPickupLocation, setDropoffLocation, setGoodsDetails } = useOrder();

  const snapPoints = useMemo(() => ['15%', '40%', '60%'], []);
  const bottomSheetRef = useRef(null);

  // State
  const [orderDetails, setOrderDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(SEARCH_TIMEOUT_SECONDS);
  const [loading, setLoading] = useState(true);

  // Modals
  const [modalVisible, setModalVisible] = useState(false); // Fare Details
  const [timeoutModalVisible, setTimeoutModalVisible] = useState(false); // Timeout Modal

  // Helper for currency formatting
  const fmt = (amount) => {
    return '₱' + parseFloat(amount || 0).toFixed(2);
  };

  // --- 1. FETCH ORDER DATA & SUBSCRIBE ---
  useEffect(() => {
    // RESET STATE on new order load
    setTimeLeft(SEARCH_TIMEOUT_SECONDS);
    setTimeoutModalVisible(false);
    setModalVisible(false);
    setLoading(true);
    setOrderDetails(null);

    let channel;

    const fetchAndSubscribe = async () => {
      try {
        let targetId = orderId;

        if (!targetId) {
          const { data: { user } } = await supabase.auth.getUser();
          const { data } = await supabase
            .from('order')
            .select('*')
            .eq('user_id', user.id)
            .eq('deliverystatus_id', 1) // Pending
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          if (data) {
            targetId = data.order_id;
            setOrderDetails(data);
          } else {
             Alert.alert("No Active Search", "Returning to home.");
             router.replace('/(customer)/home/index');
             return;
          }
        } else {
           const { data, error } = await supabase
             .from('order')
             .select('*')
             .eq('order_id', targetId)
             .single();

           if (error || !data) {
             console.log("Order not found or already processed");
             router.replace('/(customer)/home/index');
             return;
           }
           setOrderDetails(data);
        }

        setLoading(false);

        // Subscribe to Changes
        channel = supabase
          .channel(`order_updates_${targetId}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'order',
              filter: `order_id=eq.${targetId}`,
            },
            (payload) => {
              const newStatus = payload.new.deliverystatus_id;
              if (newStatus === 2) {
                router.replace({ pathname: '/(customer)/home/orderongoing', params: { orderId: targetId } });
              } else if (newStatus === 5) {
                router.replace('/(customer)/home/ordercancel');
              }
            }
          )
          .subscribe();

      } catch (err) {
        console.error("Search Error:", err);
      }
    };

    fetchAndSubscribe();

    // Countdown Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeoutModalVisible(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (channel) supabase.removeChannel(channel);
      clearInterval(timer);
    };
  }, [orderId]);

  // --- 2. HANDLERS ---
  const handleRetry = async () => {
    if (!orderDetails) return;

    try {
        const { error } = await supabase
            .from('order')
            .update({ deliverystatus_id: 5 })
            .eq('order_id', orderDetails.order_id);

        if (error) throw error;

        setPickupLocation({
            latitude: orderDetails.pickup_latitude,
            longitude: orderDetails.pickup_longitude,
            address: orderDetails.pickup_address
        });

        setDropoffLocation({
            latitude: orderDetails.dropoff_latitude,
            longitude: orderDetails.dropoff_longitude,
            address: orderDetails.dropoff_address
        });

        const images = [];
        if (orderDetails.goods_image1) images.push({ uri: orderDetails.goods_image1 });
        if (orderDetails.goods_image2) images.push({ uri: orderDetails.goods_image2 });
        if (orderDetails.goods_image3) images.push({ uri: orderDetails.goods_image3 });

        setGoodsDetails({
            category_id: orderDetails.category_id,
            other_details: orderDetails.other_details,
            rush_fee: orderDetails.rush_fee?.toString() || "0",
            images: images
        });

        setTimeoutModalVisible(false);
        router.replace('/(customer)/home');

    } catch (error) {
        Alert.alert("Error", "Failed to retry order. " + error.message);
    }
  };

  const handleFinalCancel = async () => {
    if (orderDetails) {
        await supabase
            .from('order')
            .update({ deliverystatus_id: 5 })
            .eq('order_id', orderDetails.order_id);
    }
    setTimeoutModalVisible(false);
    router.replace('/(customer)/orders/index');
  };

  const handleManualCancel = async () => {
    Alert.alert(
      "Cancel Search",
      "Are you sure you want to cancel looking for a driver?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: 'destructive',
          onPress: async () => {
            await supabase.rpc('cancel_order', { target_order_id: orderDetails.order_id });
            router.replace('/(customer)/home/ordercancel');
          }
        }
      ]
    );
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.headerbutton} onPress={() => router.back()}>
             <Image source={backimg} style={styles.backIcon}/>
          </Pressable>
          <Image source={headerlogo} style={styles.logo}/>
          <Pressable style={styles.headerbutton}>
             <Image source={headerheart} style={styles.heartIcon}/>
          </Pressable>
        </View>

        <View style={styles.mainContent}>
          <ActivityIndicator size={80} color="#0AB3FF" />
          <Text style={styles.title}>Searching for Driver...</Text>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <Text style={styles.subtitle}>Please wait while we connect you.</Text>
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

              <View style={styles.orderinfo}>
                <View style={styles.info}>
                  <Text style={styles.infotext}>Looking for nearby couriers...</Text>
                  <Text style={styles.infosubtext}>Order ID: #{orderDetails?.order_id}</Text>
                </View>
                <View style={styles.farecontainer}>
                  <Text style={styles.totalfare}>{fmt(orderDetails?.total_fare)}
                    {"\n"}<Text style={{fontSize:12, color:'#8796AA'}}>Cash</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.optionbtn}>
                <Pressable style={styles.optionItem} onPress={handleManualCancel}>
                  <View style={styles.optionCircle}>
                    <Image source={cancel} style={styles.cancelicon}/>
                  </View>
                  <Text style={styles.optionLabel}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.optionItem} onPress={() => setModalVisible(true)}>
                  <View style={styles.optionCircle}>
                    <Image source={calculator} style={styles.calculatoricon}/>
                  </View>
                  <Text style={styles.optionLabel}>Fare Details</Text>
                </Pressable>
              </View>

              <View style={styles.locationcontainer}>
                <View style={styles.sublocationcontainer}>
                  <Image source={geopick} style={styles.geopickicon}/>
                  <Text style={styles.sublocationtext} numberOfLines={2}>
                    {orderDetails?.pickup_address}
                  </Text>
                </View>
                <View style={styles.sublocationcontainer}>
                  <Image source={geodrop} style={styles.geodropicon}/>
                  <Text style={styles.sublocationtext} numberOfLines={2}>
                    {orderDetails?.dropoff_address}
                  </Text>
                </View>
                <View style={styles.sublocationcontainer}>
                  <Image source={goods} style={styles.goodsicon}/>
                  <Text style={styles.sublocationtext} numberOfLines={1}>
                    {orderDetails?.other_details}
                  </Text>
                </View>
              </View>

            </View>

            {/* --- TIMEOUT MODAL --- */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={timeoutModalVisible}
              onRequestClose={() => {}}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Driver Not Found</Text>
                  <Text style={styles.modalText}>
                    We couldn't find a driver in time. Would you like to retry with the same details?
                  </Text>

                  <View style={{flexDirection:'row', gap: 15, marginTop: 10}}>
                    <Pressable style={[styles.button, {backgroundColor: '#FF4444'}]} onPress={handleFinalCancel}>
                       <Text style={styles.textStyle}>Cancel Order</Text>
                    </Pressable>
                    <Pressable style={[styles.button, {backgroundColor: '#3BF579'}]} onPress={handleRetry}>
                       <Text style={[styles.textStyle, {color:'black'}]}>Retry</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

            {/* --- UPDATED FARE BREAKDOWN MODAL --- */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>

                    {/* Modal Header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: '100%' }}>
                      <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                        <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                      </Pressable>
                      <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Fare Breakdown</Text>
                    </View>

                    {/* Modal Content - Dynamic Data */}
                    <View style={{ marginBottom: 18, width: '100%' }}>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ color: '#b0c4d4' }}>Base Fare</Text>
                        <Text style={{ color: '#fff' }}>{fmt(orderDetails?.base_fare_component)}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ color: '#b0c4d4' }}>
                          Distance ({parseFloat(orderDetails?.distance || 0).toFixed(1)} km)
                        </Text>
                        <Text style={{ color: '#fff' }}>{fmt(orderDetails?.distance_charge_component)}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ color: '#b0c4d4' }}>Time Cost</Text>
                        <Text style={{ color: '#fff' }}>{fmt(orderDetails?.time_charge_component)}</Text>
                      </View>

                      {/* Optional Charges */}
                      {(parseFloat(orderDetails?.vehicle_charge_component) > 0) && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Text style={{ color: '#b0c4d4' }}>Vehicle Charge</Text>
                          <Text style={{ color: '#fff' }}>{fmt(orderDetails?.vehicle_charge_component)}</Text>
                        </View>
                      )}

                      {(parseFloat(orderDetails?.bonus_charge_component) > 0) && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Text style={{ color: '#b0c4d4' }}>Bonus/Rush</Text>
                          <Text style={{ color: '#fff' }}>{fmt(orderDetails?.bonus_charge_component)}</Text>
                        </View>
                      )}

                      {(parseFloat(orderDetails?.penalty_amount) > 0) && (
                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Text style={{ color: '#FF4444' }}>Penalty</Text>
                          <Text style={{ color: '#FF4444' }}>{fmt(orderDetails?.penalty_amount)}</Text>
                        </View>
                      )}

                      <View style={{ borderTopWidth: 1, borderTopColor: '#2a3a4d', marginVertical: 8 }} />

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#b0c4d4', fontWeight: 'bold' }}>Total Payment</Text>
                        <Text style={{ color: '#0AB3FF', fontWeight: 'bold' }}>{fmt(orderDetails?.total_fare)}</Text>
                      </View>
                    </View>

                    <Pressable
                      style={{ alignSelf: 'center', backgroundColor: '#22262F', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={{ color: '#0AB3FF', fontWeight: 'bold', fontSize: 16 }}>Minimize</Text>
                    </Pressable>
                  </View>
               </View>
            </Modal>

          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
  },
  mainContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  header1:{
  },
  headerbutton:{
    width:37,
    height:36,
    borderRadius: 10,
    backgroundColor:'#22262F',
    alignItems:'center',
    justifyContent:'center',
  },
  backIcon:{
    width:30,
    height:30,
    resizeMode:'contain',
  },
  logo:{
    width:120,
    height:28,
    resizeMode:'contain',
  },
  heartIcon:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3BF579',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
  },
  bottomSheetBackground: {
    backgroundColor: '#363D47',
  },
  handleIndicator: {
    backgroundColor: '#0AB3FF',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 20,
  },
  orderinfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  info:{
    width:'60%'
  },
  infotext:{
    fontFamily:'Roboto-Bold',
    fontWeight:'bold',
    fontSize:16,
    color:'#ffffff',
    overflow:'hidden'
  },
  infosubtext:{
    fontFamily:'Roboto-Regular',
    fontSize:14,
    color:'#8796AA',
    overflow:'hidden'
  },
  farecontainer:{
    flexDirection:'row',
    backgroundColor:'#192028',
    paddingHorizontal:12,
    paddingVertical:10,
    borderRadius:12,
    alignItems:'center'
  },
  totalfare:{
    fontFamily:'Roboto-Regular',
    fontSize:18,
    color:'#87AFB9',
    overflow:'hidden',
  },
  eyeicon:{
    width:22,
    height:22,
    resizeMode:'contain',
  },
  optionbtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    gap:48,
    marginTop:20,
    marginBottom: 20,
  },
  optionItem:{
    alignItems:'center',
    justifyContent:'center',
  },
  optionCircle:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#22262F',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 5,
  },
  cancelicon:{
    width:28,
    height:28,
    resizeMode:'contain',
  },
  reporticon:{
    width:28,
    height:28,
    resizeMode:'contain',
  },
  calculatoricon:{
    width:28,
    height:28,
    resizeMode:'contain',
  },
  optionLabel:{
    color:'#8796AA',
    textAlign:'center',
    fontSize:12,
  },
  locationcontainer:{
    flexDirection:'column',
    gap: 15,
  },
  sublocationcontainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
  },
  sublocationtext:{
    fontFamily:'Roboto-Regular',
    fontSize:14,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
  },
  geopickicon:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  geodropicon:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  goodsicon:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  bottomshtcontainer:{
  },
  bottomsheetcontainer:{
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  modalView: {
    margin: 20,
    width: '85%',
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#B0C4D4',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

export default OrderSearch;