import { useRouter } from 'expo-router';
import React, { useState, useMemo, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, RefreshControl, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
import { useCourierDispatch } from '../../../hooks/useCourierDispatch';
import { useTheme } from '../../../context/ThemeContext';

export default function CourierHome() {
  const router = useRouter();
  const { openOrders, loading, refreshOrders } = useCourierDispatch();
  const { colors, isDarkMode } = useTheme();

  // State
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ unlockTime: '', scheduledTime: '' });
  const [currentUserId, setCurrentUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown State
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'All', value: null },
    { label: 'Pasundo', value: 'Pasundo' },
    { label: 'Pasugo', value: 'Pasugo' },
    { label: 'Scheduled', value: 'Scheduled' },
  ]);

  // Assets
  const headerlogo = require("@/assets/images/headerlogo.png");
  const money = require("@/assets/images/money.png");
  const time = require("@/assets/images/time.png");
  const geopick = require("@/assets/images/geopick.png");
  const geodrop = require("@/assets/images/geodrop.png");
  const goods = require("@/assets/images/goods.png");
  const clockIcon = require("@/assets/images/time.png");

  // --- 1. AUTO-REFRESH LOGIC ---
  useEffect(() => {
    // Refresh orders every 10 seconds (10000 ms)
    const intervalId = setInterval(() => {
      refreshOrders();
      // console.log("Auto-refreshing orders..."); // Optional debug log
    }, 10000);

    // Cleanup interval when screen unmounts
    return () => clearInterval(intervalId);
  }, [refreshOrders]);

  // User Fetch Logic
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshOrders();
    setRefreshing(false);
  };

  // --- FILTERING ---
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

  // --- SCHEDULING LOGIC ---
  const checkScheduleLock = (order) => {
    if (!order.is_scheduled || !order.scheduled_pickup_time) return { isLocked: false };
    const bufferMinutes = 60;
    const scheduledTime = new Date(order.scheduled_pickup_time);
    const unlockTime = new Date(scheduledTime.getTime() - bufferMinutes * 60000);
    const now = new Date();
    return { isLocked: now < unlockTime, scheduledTime, unlockTime };
  };

  // --- ACTION HANDLER ---
  const handleAction = (item) => {
    const isMyJob = currentUserId && item.courier_id === currentUserId;
    if (currentUserId && item.user_id === currentUserId) {
      Alert.alert("Conflict of Interest", "Switch to Customer account.");
      return;
    }
    if (isMyJob) {
      const { isLocked, unlockTime, scheduledTime } = checkScheduleLock(item);
      if (isLocked) {
        setModalData({
          scheduledTime: scheduledTime.toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          unlockTime: unlockTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
        });
        setModalVisible(true);
        return;
      }
      router.push({
        pathname: '/(courier)/home/deliverongoing',
        params: { orderId: item.order_id }
      });
      return;
    }
    router.push({
      pathname: '/(courier)/home/orderview',
      params: { orderId: item.order_id }
    });
  };

  // --- RENDER ITEM ---
  const renderOrderCard = ({ item }) => {
    const dateStr = item.created_at
      ? new Date(item.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      : "Just now";
    const isOwnRequest = currentUserId && item.user_id === currentUserId;
    const isMyJob = currentUserId && item.courier_id === currentUserId;
    const { isLocked } = checkScheduleLock(item);

    let buttonStyle = styles.activeButton;
    let buttonText = "VIEW";

    if (isOwnRequest) {
      buttonStyle = styles.disabledButton;
      buttonText = "OWN\nORDER";
    } else if (isMyJob) {
      if (isLocked) {
        buttonStyle = styles.lockedButton;
        buttonText = "WAIT";
      } else {
        buttonStyle = styles.proceedButton;
        buttonText = "PROCEED";
      }
    }

    return (
      <View style={[
        styles.ordercard,
        { backgroundColor: colors.card, borderColor: colors.border },
        isOwnRequest && { borderColor: '#FFA500', borderWidth: 1.5 },
        isMyJob && { borderColor: '#3BF579', borderWidth: 1.5 }
      ]}>
        {isOwnRequest && (
          <View style={styles.badgeContainer}><Text style={styles.badgeText}>YOUR REQUEST</Text></View>
        )}
        {item.is_scheduled && (
          <View style={[styles.badgeContainer, isOwnRequest && { top: 40 }, { backgroundColor: '#0AB3FF' }]}>
            <Image source={clockIcon} style={{ width: 10, height: 10, tintColor: 'black', marginRight: 4 }} />
            <Text style={styles.badgeText}>SCHEDULED</Text>
          </View>
        )}

        <View style={styles.orderinfo}>
          <View style={styles.rowItem}>
            <Image source={goods} style={[styles.ordericon, { tintColor: colors.icon }]} />
            <Text style={[styles.ordersubtext, { color: colors.subText }]} numberOfLines={1}>{item.other_details || "No Description"}</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={geopick} style={[styles.ordericon, { tintColor: colors.icon }]} />
            <Text style={[styles.ordersubtext, { color: colors.subText }]} numberOfLines={1}>{item.pickup_address}</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={geodrop} style={[styles.ordericon, { tintColor: colors.icon }]} />
            <Text style={[styles.ordersubtext, { color: colors.subText }]} numberOfLines={1}>{item.dropoff_address}</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={money} style={[styles.ordericon, { tintColor: colors.icon }]} />
            <Text style={[styles.ordersubtext, { color: colors.subText }]}>₱{parseFloat(item.total_fare || 0).toFixed(2)} • Cash</Text>
          </View>
          <View style={styles.rowItem}>
            <Image source={time} style={[styles.ordericon, { tintColor: colors.icon }]} />
            <Text style={[styles.ordersubtext, { color: colors.subText }]}>
              {item.is_scheduled
                ? `Pickup: ${new Date(item.scheduled_pickup_time).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                : dateStr}
            </Text>
          </View>
        </View>

        <Pressable style={[styles.actionButtonAbsolute, buttonStyle]} onPress={() => handleAction(item)}>
          <Text style={[styles.maintextbutton, (isOwnRequest || isLocked) ? { color: 'black' } : { color: 'black' }]}>{buttonText}</Text>
        </Pressable>
      </View>
    );
  };

  // --- 2. EMPTY STATE COMPONENT ---
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image source={goods} style={[styles.emptyIcon, { tintColor: colors.subText }]} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Active Requests</Text>
      <Text style={[styles.emptySubtitle, { color: colors.subText }]}>
        {searchQuery
          ? "No orders match your search criteria."
          : "Scanning for new orders..."}
      </Text>
      {/* Optional: Add a small loading indicator inside the empty state to show it's "live" */}
      <ActivityIndicator size="small" color={colors.tint} style={{ marginTop: 10 }} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.tint }]}>
            <Image source={time} style={{ width: 50, height: 50, marginBottom: 15, tintColor: colors.tint }} />
            <Text style={[styles.modalTitle, { color: colors.text }]}>Too Early to Start</Text>
            <Text style={[styles.modalText, { color: colors.subText }]}>Scheduled for <Text style={{ fontWeight: 'bold', color: '#3BF579' }}>{modalData.scheduledTime}</Text>.</Text>
            <Text style={[styles.modalText, { color: colors.subText }]}>Unlock time:</Text>
            <Text style={styles.modalTimeBig}>{modalData.unlockTime}</Text>
            <Pressable style={[styles.modalButton, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, { color: colors.text }]}>OK, I'LL WAIT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Image source={headerlogo} style={[styles.logo, { tintColor: isDarkMode ? undefined : colors.text }]} />
      </View>

      <View style={styles.mainContent}>
        <View style={[styles.filtercontainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.searchcontainer}>
            <Searchbar
              placeholder="Search orders..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={[styles.searchbar, { backgroundColor: colors.inputBackground }]}
              iconColor={colors.subText}
              inputStyle={[styles.searchInput, { color: colors.text }]}
              placeholderTextColor={colors.subText}
            />
          </View>
          <View style={styles.filterbtn}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="All"
              style={[styles.dropdown, { backgroundColor: colors.inputBackground, borderColor: colors.inputBackground }]}
              textStyle={[styles.dropdownText, { color: colors.text }]}
              placeholderStyle={[styles.placeholderText, { color: colors.subText }]}
              dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: colors.card, borderColor: colors.border }]}
              selectedItemContainerStyle={[styles.selectedItemContainer, { backgroundColor: isDarkMode ? '#4B5563' : colors.border }]}
              selectedItemLabelStyle={[styles.selectedItemLabel, { color: colors.tint }]}
              listMode="SCROLLVIEW"
              theme={isDarkMode ? "DARK" : "LIGHT"}
            />
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && !refreshing && openOrders.length === 0 ? (
            <ActivityIndicator size="large" color={colors.tint} style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={filteredOrders}
              keyExtractor={(item) => item.order_id.toString()}
              renderItem={renderOrderCard}
              contentContainerStyle={{ paddingBottom: 100, paddingTop: 10, flexGrow: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.tint} />
              }
              ListEmptyComponent={renderEmptyState}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, padding: 15 },
  filtercontainer: { borderWidth: 1, borderRadius: 11, width: '100%', height: 'auto', marginTop: verticalScale(20), padding: 5, flexDirection: 'row', alignItems: 'center', gap: 10, zIndex: 1000 },
  searchcontainer: { flex: 2, paddingHorizontal: 5 },
  searchbar: { borderRadius: 8, height: 40 },
  searchInput: { fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn: { flex: 1, paddingHorizontal: 5, paddingVertical: 5 },
  dropdown: { borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { borderWidth: 1, borderRadius: 8, marginTop: 5 },
  selectedItemContainer: {},
  selectedItemLabel: { fontSize: 14, fontFamily: 'Roboto-Medium' },
  listContainer: { flex: 1, zIndex: 1 },
  ordercard: { width: '100%', borderRadius: 14, marginBottom: 15, borderWidth: 1, position: 'relative', minHeight: 180, paddingBottom: 15 },
  orderinfo: { flexDirection: 'column', padding: 20, paddingRight: 10 },
  rowItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingRight: 80 },
  ordersubtext: { fontFamily: 'Roboto-Light', fontSize: 15, fontWeight: '300', flexShrink: 1, flex: 1 },
  ordericon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 10 },
  actionButtonAbsolute: { position: 'absolute', bottom: 15, right: 15, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center', minWidth: 90, elevation: 4 },
  maintextbutton: { fontSize: 14, color: '#000000', fontFamily: 'Roboto-Bold', textAlign: 'center', lineHeight: 16 },
  activeButton: { backgroundColor: '#3BF579' },
  proceedButton: { backgroundColor: '#0AB3FF' },
  lockedButton: { backgroundColor: '#B0BEC5' },
  disabledButton: { backgroundColor: '#666666' },
  badgeContainer: { position: 'absolute', top: 15, right: 15, backgroundColor: '#FFA500', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, zIndex: 10, flexDirection: 'row', alignItems: 'center' },
  badgeText: { color: 'black', fontSize: 10, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', borderRadius: 20, padding: 25, alignItems: 'center', borderWidth: 1 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 14, textAlign: 'center', marginBottom: 5 },
  modalTimeBig: { color: '#3BF579', fontSize: 32, fontWeight: 'bold', marginVertical: 15 },
  modalButton: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, borderWidth: 1 },
  modalButtonText: { fontWeight: 'bold' },

  // --- EMPTY STATE STYLES ---
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(50), paddingHorizontal: 20 },
  emptyIcon: { width: 100, height: 100, opacity: 0.4, marginBottom: 15, resizeMode: 'contain' },
  emptyTitle: { fontSize: 20, fontFamily: 'Roboto-Bold', marginBottom: 8, textAlign: 'center' },
  emptySubtitle: { fontSize: 15, fontFamily: 'Roboto-Regular', textAlign: 'center', lineHeight: 22 }
});