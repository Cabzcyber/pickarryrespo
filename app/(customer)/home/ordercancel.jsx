import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';

// Assets
const backimg = require("@/assets/images/back.png");
const headerlogo = require("@/assets/images/headerlogo.png");
const headerheart = require("@/assets/images/heart.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");
const calculator = require("@/assets/images/calculator.png");

const OrderCancel = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['10%', '25%', '50%', '60%'], []);
  const [modalVisible, setModalVisible] = useState(false);

  // State for Dynamic Data
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Order Details on Mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('order')
          .select('*')
          .eq('order_id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error.message);
        Alert.alert("Error", "Could not load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleRetry = () => {
    router.push('/(customer)/home');
  };

  const handleSheetChanges = (index) => {
    console.log('Bottom sheet index changed to:', index);
  };

  // Helper for currency formatting
  const fmt = (amount) => {
    return '₱' + parseFloat(amount || 0).toFixed(2);
  };

  // Loading State UI
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  // Fallback if no order found
  if (!order) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={{ color: 'white' }}>Order not found.</Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 20, padding: 10, backgroundColor: '#333' }}>
           <Text style={{ color: '#0AB3FF' }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.headerbutton} onPress={() => router.replace('/(customer)/orders')}>
            <Image source={backimg} style={styles.backIcon} />
          </Pressable>

          <Image source={headerlogo} style={styles.logo} />

          <Pressable style={styles.headerbutton} onPress={() => {}}>
            <Image source={headerheart} style={styles.heartIcon} />
          </Pressable>
        </View>

        <View style={styles.mainContent}>
          {/* Placeholder for Map */}
          <Text style={styles.title}>Map Area</Text>
          <Text style={styles.subtitle}>Order #{order.order_id}</Text>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={3}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          onChange={handleSheetChanges}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.bottomsheetcontainer}>

              {/* Dynamic Order Status Info */}
              <View style={styles.orderinfo}>
                <View style={styles.info}>
                  <Text style={styles.infotext}>
                    Order {order.status || 'Canceled'}
                  </Text>
                  <Text style={styles.infosubtext}>
                    {order.cancellation_reason || "Driver Search Failed..."}
                  </Text>
                </View>
                <View style={styles.farecontainer}>
                  <Text style={styles.totalfare}>{fmt(order.total_fare)}
                        {"\n"}<Text style={{fontSize:12, color:'#8796AA'}}>Cash</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.optionbtn}>
                <Pressable style={styles.optionItem} onPress={() => setModalVisible(true)}>
                  <View style={styles.optionCircle}>
                    <Image source={calculator} style={styles.calculatoricon}/>
                  </View>
                  <Text style={styles.optionLabel}>Fare Details</Text>
                </Pressable>
              </View>

              {/* Dynamic Location & Goods */}
              <View style={styles.locationcontainer}>
                <View style={styles.sublocationcontainer}>
                  <Image source={geopick} style={styles.geopickicon} />
                  <Text style={styles.sublocationtext} numberOfLines={2}>
                    {order.pickup_address}
                  </Text>
                </View>
                <View style={styles.sublocationcontainer}>
                  <Image source={geodrop} style={styles.geodropicon} />
                  <Text style={styles.sublocationtext} numberOfLines={2}>
                    {order.dropoff_address}
                  </Text>
                </View>
                <View style={styles.sublocationcontainer}>
                  <Image source={goods} style={styles.goodsicon} />
                  <Text style={styles.sublocationtext} numberOfLines={2}>
                    {order.other_details || "No items details available"}
                  </Text>
                </View>
              </View>

              {/* Retry Button */}
              <Pressable style={styles.mainbutton} onPress={handleRetry}>
                <Text style={styles.maintextbutton}>Retry Order</Text>
              </Pressable>

            </View>

            {/* --- UPDATED FARE BREAKDOWN MODAL --- */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
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
                      <Text style={{ color: '#fff' }}>{fmt(order.base_fare_component)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ color: '#b0c4d4' }}>
                        Distance ({parseFloat(order.distance || 0).toFixed(1)} km)
                      </Text>
                      <Text style={{ color: '#fff' }}>{fmt(order.distance_charge_component)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ color: '#b0c4d4' }}>Time Cost</Text>
                      <Text style={{ color: '#fff' }}>{fmt(order.time_charge_component)}</Text>
                    </View>

                    {/* Combine Vehicle/Bonus into "Other Charges" or separate if preferred */}
                    {(parseFloat(order.vehicle_charge_component) > 0) && (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ color: '#b0c4d4' }}>Vehicle Charge</Text>
                        <Text style={{ color: '#fff' }}>{fmt(order.vehicle_charge_component)}</Text>
                      </View>
                    )}

                    {(parseFloat(order.bonus_charge_component) > 0) && (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ color: '#b0c4d4' }}>Bonus/Rush</Text>
                        <Text style={{ color: '#fff' }}>{fmt(order.bonus_charge_component)}</Text>
                      </View>
                    )}

                    {(parseFloat(order.penalty_amount) > 0) && (
                       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ color: '#FF4444' }}>Penalty</Text>
                        <Text style={{ color: '#FF4444' }}>{fmt(order.penalty_amount)}</Text>
                      </View>
                    )}

                    <View style={{ borderTopWidth: 1, borderTopColor: '#2a3a4d', marginVertical: 8 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#b0c4d4', fontWeight: 'bold' }}>Total Payment</Text>
                      <Text style={{ color: '#0AB3FF', fontWeight: 'bold' }}>{fmt(order.total_fare)}</Text>
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
};

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  headerbutton: {
    width: 37,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#22262F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: 120,
    height: 28,
    resizeMode: 'contain',
  },
  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
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
  orderinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  info: {
    width: '60%'
  },
  infotext: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 21,
    color: '#ffffff',
  },
  infosubtext: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#8796AA',
  },
  farecontainer: {
    flexDirection: 'row',
    backgroundColor: '#192028',
    width: 'auto',
    minWidth: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  totalfare: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#87AFB9',
  },
  locationcontainer: {
    flexDirection: 'column',
    marginTop: 16,
  },
  sublocationcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  sublocationtext: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
    flexWrap: 'wrap',
  },
  geopickicon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
  },
  geodropicon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
  },
  goodsicon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
  },
  mainbutton: {
    flexDirection: 'column',
    width: '100%',
    padding: 14,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#3BF579',
    borderRadius: 10,
    marginTop: verticalScale(20),
  },
  maintextbutton: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  bottomsheetcontainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    width: '85%',
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  calculatoricon:{
    width:29,
    height:29,
    resizeMode:'contain',
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
  optionbtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center', // Changed to flex-end to align right or keep space-around if other buttons exist
    marginRight: 10,
    marginTop:20,
    marginBottom: 20,
  },
  optionLabel:{
    color:'#8796AA',
    textAlign:'center',
    fontSize:14,
  },
});

export default OrderCancel;