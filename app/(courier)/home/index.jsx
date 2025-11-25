import { useRouter } from 'expo-router';
import React, { useState, useMemo, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, RefreshControl, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
import { useCourierDispatch } from '../../../hooks/useCourierDispatch';

export default function CourierHome() {
  const router = useRouter();

  // 1. Initialize Dispatch Logic
  // NOTE: Ensure your useCourierDispatch hook fetches 'is_scheduled', 'scheduled_pickup_time', 'courier_id', and 'deliverystatus_id'
  const { openOrders, loading, refreshOrders } = useCourierDispatch();

  // State for Pull-to-Refresh
  const [refreshing, setRefreshing] = useState(false);

  // State for Schedule Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ unlockTime: '', scheduledTime: '' });

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshOrders();
    setRefreshing(false);
  };

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  // Assets
  const headerlogo = require("@/assets/images/headerlogo.png");
  const money = require("@/assets/images/money.png");
  const time = require("@/assets/images/time.png");
  const geopick = require("@/assets/images/geopick.png");
  const geodrop = require("@/assets/images/geodrop.png");
  const goods = require("@/assets/images/goods.png");
  // New Asset Suggestion (Use generic time icon if specific one unavailable)
  const clockIcon = require("@/assets/images/time.png");

  // Filter State
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'All Categories', value: null},
    {label: 'Pasundo', value: 'Pasundo'},
    {label: 'Pasugo', value: 'Pasugo'},
    // ... (rest of your items)
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  // Client-Side Filtering
  const filteredOrders = useMemo(() => {
    return openOrders.filter(order => {
      const categoryMatch = value ? order.category === value : true;
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery ||
        (order.other_details && order.other_details.toLowerCase().includes(searchLower)) ||
        (order.pickup_address && order.pickup_address.toLowerCase().includes(searchLower)) ||
        (order.dropoff_address && order.dropoff_address.toLowerCase().includes(searchLower));

      return categoryMatch && searchMatch;
    });
  }, [openOrders, value, searchQuery]);

  // --- LOGIC: TIME GATING ---
  const checkScheduleLock = (order) => {
    if (!order.is_scheduled || !order.scheduled_pickup_time) return { isLocked: false };

    const bufferMinutes = 60; // Driver can start 1 hour before
    const scheduledTime = new Date(order.scheduled_pickup_time);
    const unlockTime = new Date(scheduledTime.getTime() - bufferMinutes * 60000);
    const now = new Date();

    const isLocked = now < unlockTime;

    return {
        isLocked,
        scheduledTime,
        unlockTime
    };
  };

  // --- HANDLE ACTION ---
  const handleAction = (item) => {
    const isMyJob = currentUserId && item.courier_id === currentUserId; // Accepted Job

    // 1. Security Check: Self-Dealing (Customer side)
    if (currentUserId && item.user_id === currentUserId) {
        Alert.alert("Conflict of Interest", "Switch to Customer account.");
        return;
    }

    // 2. Logic: Proceeding to Delivery (Accepted Orders)
    if (isMyJob) {
        const { isLocked, unlockTime, scheduledTime } = checkScheduleLock(item);

        if (isLocked) {
            // SHOW MODAL
            setModalData({
                scheduledTime: scheduledTime.toLocaleString([], { hour: '2-digit', minute:'2-digit', month: 'short', day: 'numeric'}),
                unlockTime: unlockTime.toLocaleString([], { hour: '2-digit', minute:'2-digit' })
            });
            setModalVisible(true);
            return;
        }

        // UNLOCKED: Go to active delivery
        router.push({
            pathname: '/(courier)/home/deliverongoing',
            params: { orderId: item.order_id }
        });
        return;
    }

    // 3. Logic: Viewing to Accept (Available Orders)
    router.push({
        pathname: '/(courier)/home/orderview',
        params: { orderId: item.order_id }
    });
  };

  const renderOrderCard = ({ item }) => {
    const dateStr = item.created_at
      ? new Date(item.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})
      : "Just now";

    // Distinguish "My Request" (Conflict) vs "My Job" (Work)
    const isOwnRequest = currentUserId && item.user_id === currentUserId;
    const isMyJob = currentUserId && item.courier_id === currentUserId;

    // Check Lock Status for UI Styling
    const { isLocked } = checkScheduleLock(item);

    // Determine Button Style & Text
    let buttonStyle = styles.activeButton; // Default Green
    let buttonText = "VIEW";

    if (isOwnRequest) {
        buttonStyle = styles.disabledButton;
        buttonText = "OWN\nORDER";
    } else if (isMyJob) {
        if (isLocked) {
            buttonStyle = styles.lockedButton; // Grey
            buttonText = "WAIT";
        } else {
            buttonStyle = styles.proceedButton; // Different Green or Orange
            buttonText = "PROCEED";
        }
    }

    return (
      <View style={[
          styles.ordercard,
          isOwnRequest && { borderColor: '#FFA500', borderWidth: 1.5 },
          isMyJob && { borderColor: '#3BF579', borderWidth: 1.5 }
      ]}>

        {/* --- BADGES --- */}
        {isOwnRequest && (
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>YOUR REQUEST</Text>
            </View>
        )}

        {/* NEW: Scheduled Badge */}
        {item.is_scheduled && (
            <View style={[styles.badgeContainer, isOwnRequest && { top: 40 }, { backgroundColor: '#0AB3FF' }]}>
                <Image source={clockIcon} style={{width: 10, height: 10, tintColor: 'black', marginRight: 4}} />
                <Text style={styles.badgeText}>SCHEDULED</Text>
            </View>
        )}

        <View style={styles.orderinfo}>
          {/* Order Content */}
          <View style={styles.rowItem}>
              <Image source={goods} style={styles.ordericon}/>
              <Text style={styles.ordersubtext} numberOfLines={1}>
                 {item.other_details || "No Description"}
              </Text>
          </View>

          <View style={styles.rowItem}>
            <Image source={geopick} style={styles.ordericon}/>
            <Text style={styles.ordersubtext} numberOfLines={1}>{item.pickup_address}</Text>
          </View>

          <View style={styles.rowItem}>
            <Image source={geodrop} style={styles.ordericon}/>
            <Text style={styles.ordersubtext} numberOfLines={1}>{item.dropoff_address}</Text>
          </View>

          <View style={styles.rowItem}>
            <Image source={money} style={styles.ordericon}/>
            <Text style={styles.ordersubtext}>₱{parseFloat(item.total_fare || 0).toFixed(2)} • Cash</Text>
          </View>

          <View style={styles.rowItem}>
            <Image source={time} style={styles.ordericon}/>
            <Text style={styles.ordersubtext}>
                {item.is_scheduled
                    ? `Pickup: ${new Date(item.scheduled_pickup_time).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}`
                    : dateStr}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <Pressable
            style={[styles.actionButtonAbsolute, buttonStyle]}
            onPress={() => handleAction(item)}
        >
            <Text style={[styles.maintextbutton, (isOwnRequest || isLocked) ? {color: 'black'} : {color: 'black'}]}>
                {buttonText}
            </Text>
        </Pressable>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* --- SCHEDULE MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Image source={time} style={{width: 50, height: 50, marginBottom: 15, tintColor: '#0AB3FF'}} />
                <Text style={styles.modalTitle}>Too Early to Start</Text>
                <Text style={styles.modalText}>
                    This is a scheduled order for <Text style={{fontWeight:'bold', color: '#3BF579'}}>{modalData.scheduledTime}</Text>.
                </Text>
                <Text style={styles.modalText}>
                    You can proceed to pickup starting at:
                </Text>
                <Text style={styles.modalTimeBig}>{modalData.unlockTime}</Text>

                <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>OK, I'LL WAIT</Text>
                </Pressable>
            </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Image source={headerlogo} style={styles.logo}/>
      </View>

      <View style={styles.mainContent}>
        {/* Filter/Search Views ... (Same as original) */}
        <View style={styles.filtercontainer}>
          <View style={styles.searchcontainer}>
            <Searchbar
              placeholder="Search orders..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              iconColor="#0AB3FF"
              inputStyle={styles.searchInput}
              placeholderTextColor="#0AB3FF"
            />
          </View>
          <View style={styles.filterbtn}>
             {/* Dropdown ... (Same as original) */}
             <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Category"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              placeholderStyle={styles.placeholderText}
              dropDownContainerStyle={styles.dropdownContainer}
              selectedItemContainerStyle={styles.selectedItemContainer}
              selectedItemLabelStyle={styles.selectedItemLabel}
              listMode="SCROLLVIEW"
            />
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && !refreshing ? (
             <ActivityIndicator size="large" color="#0AB3FF" style={{marginTop: 50}} />
          ) : (
             <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.order_id.toString()}
                renderItem={renderOrderCard}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0AB3FF" />
                }
             />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (Keep existing styles)
  container:{ flex: 1, backgroundColor: '#141519' },
  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo:{ width:120, height:28, resizeMode:'contain' },
  mainContent:{ flex: 1, padding: 15 },
  filtercontainer:{ backgroundColor:'#363D47', borderColor:'#363D47', borderWidth:1, borderRadius:11, width:'100%', height:'auto', marginTop: verticalScale(20), padding: 5, flexDirection: 'row', alignItems: 'center', gap: 10, zIndex: 1000 },
  searchcontainer:{ flex: 2, paddingHorizontal: 5 },
  searchbar:{ backgroundColor: '#22262F', borderRadius: 8, height: 40 },
  searchInput:{ color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn:{ flex: 1, paddingHorizontal: 5, paddingVertical: 5 },
  dropdown: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { backgroundColor: '#22262F', borderColor: '#4B5563', borderWidth: 1, borderRadius: 8, marginTop: 5 },
  selectedItemContainer: { backgroundColor: '#4B5563' },
  selectedItemLabel: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Medium' },
  listContainer: { flex: 1, zIndex: 1 },
  ordercard:{ width:'100%', backgroundColor:'#363D47', borderRadius:14, marginBottom: 15, borderWidth: 1, borderColor: '#4B5563', position: 'relative', minHeight: 180, paddingBottom: 15 },
  orderinfo:{ flexDirection:'column', padding:20, paddingRight: 10 },
  rowItem:{ flexDirection:'row', alignItems:'center', marginBottom: 12, paddingRight: 80 },
  ordersubtext:{ fontFamily:'Roboto-Light', fontSize:15, fontWeight:'300', color:'#87AFB9', flexShrink: 1, flex: 1 },
  ordericon:{ width:20, height:20, resizeMode:'contain', marginRight:10 },

  actionButtonAbsolute: { position: 'absolute', bottom: 15, right: 15, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center', minWidth: 90, elevation: 4 },
  maintextbutton:{ fontSize:14, color:'#000000', fontFamily: 'Roboto-Bold', textAlign: 'center', lineHeight: 16 },

  // --- BUTTON VARIANTS ---
  activeButton: { backgroundColor:'#3BF579' }, // Standard View
  proceedButton: { backgroundColor:'#0AB3FF' }, // Start Job
  lockedButton: { backgroundColor: '#B0BEC5' }, // Wait
  disabledButton: { backgroundColor: '#666666' }, // Own Order

  // --- BADGE STYLES ---
  badgeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  badgeText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold'
  },

  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#22262F',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0AB3FF'
  },
  modalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { color: '#8796AA', fontSize: 14, textAlign: 'center', marginBottom: 5 },
  modalTimeBig: { color: '#3BF579', fontSize: 32, fontWeight: 'bold', marginVertical: 15 },
  modalButton: { backgroundColor: '#363D47', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, borderWidth: 1, borderColor: '#4B5563' },
  modalButtonText: { color: 'white', fontWeight: 'bold' }
});