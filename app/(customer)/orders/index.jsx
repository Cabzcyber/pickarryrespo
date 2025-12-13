import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

// --- ROBUSTNESS: Local Status Map ---
const STATUS_MAP = {
  1: 'Pending',
  2: 'Accepted',
  3: 'Ongoing',
  4: 'Completed',
  5: 'Cancelled',
  6: 'Failed',
  7: 'Timeout'
};

export default function OrderHistory() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  // Assets
  const headerlogo = require("@/assets/images/headerlogo.png");
  const money = require("@/assets/images/money.png");
  const time = require("@/assets/images/time.png");
  const geopick = require("@/assets/images/geopick.png");
  const geodrop = require("@/assets/images/geodrop.png");
  const goods = require("@/assets/images/goods.png");
  const heartIcon = require("@/assets/images/heart.png");
  const clockIcon = require("@/assets/images/time.png");

  // State
  const [orders, setOrders] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Ongoing', value: 'Ongoing' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Favorites', value: 'Favorites' },
  ]);

  // --- 1. ROBUST DATE PARSER HELPER ---
  const parseDateSafe = (dateString) => {
    if (!dateString) return null;
    const isoString = dateString.replace(' ', 'T');
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return null;
    return dateObj;
  };

  // --- 2. FETCH FAVORITES ---
  const fetchFavorites = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('favorites')
        .select('order_id')
        .eq('user_id', user.id);
      if (error) throw error;
      const ids = data.map(item => item.order_id);
      setFavoriteIds(ids);
    } catch (err) {
      console.error("Error fetching favorites:", err.message);
    }
  };

  // --- 3. TOGGLE FAVORITE ---
  const toggleFavorite = async (orderId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const isFavorited = favoriteIds.includes(orderId);
      if (isFavorited) {
        setFavoriteIds(prev => prev.filter(id => id !== orderId));
        if (statusFilter === 'Favorites') {
          setOrders(prev => prev.filter(o => o.order_id !== orderId));
        }
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('order_id', orderId);
      } else {
        setFavoriteIds(prev => [...prev, orderId]);
        await supabase.from('favorites').insert({ user_id: user.id, order_id: orderId });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      Alert.alert("Error", "Could not update favorites");
      fetchFavorites();
    }
  };

  // --- 4. FETCH ORDERS ---
  const fetchOrders = async (pageNumber = 0, isRefresh = false) => {
    if (!isRefresh && (!hasMore || loadingMore)) return;
    try {
      if (pageNumber === 0) setLoading(true);
      else setLoadingMore(true);

      let fetchedData = [];

      if (statusFilter === 'Favorites') {
        if (favoriteIds.length === 0) {
          fetchedData = [];
        } else {
          const { data, error } = await supabase
            .from('order')
            .select('*')
            .in('order_id', favoriteIds)
            .order('created_at', { ascending: false });
          if (error) throw error;
          fetchedData = data.map(order => ({
            ...order,
            status_name: STATUS_MAP[order.deliverystatus_id] || 'Unknown'
          }));
        }
        setHasMore(false);
      } else {
        const { data, error } = await supabase.rpc('get_customer_orders', {
          status_filter: statusFilter,
          search_query: searchQuery,
          page_number: pageNumber,
          page_size: PAGE_SIZE
        });
        if (error) throw error;
        fetchedData = data || [];
        if (fetchedData.length < PAGE_SIZE) setHasMore(false);
        else setHasMore(true);
      }

      if (fetchedData.length > 0) {
        if (isRefresh || pageNumber === 0) setOrders(fetchedData);
        else setOrders(prev => [...prev, ...fetchedData]);
        setPage(pageNumber + 1);
      } else {
        if (isRefresh || pageNumber === 0) setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites().then(() => {
        setPage(0);
        setHasMore(true);
        fetchOrders(0, true);
      });
    }, [])
  );

  React.useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchOrders(0, true);
  }, [statusFilter, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavorites().then(() => {
      setPage(0);
      setHasMore(true);
      fetchOrders(0, true);
    });
  };

  const loadMore = () => {
    if (!loadingMore && !loading && hasMore && statusFilter !== 'Favorites') {
      fetchOrders(page);
    }
  };

  const handleViewOrder = (item) => {
    let statusId = item.deliverystatus_id;
    if (!statusId && item.status_name) {
      const lowerName = item.status_name.toLowerCase();
      if (lowerName === 'pending') statusId = 1;
      else if (lowerName === 'accepted') statusId = 2;
      else if (lowerName === 'ongoing') statusId = 3;
      else if (lowerName === 'completed') statusId = 4;
      else if (lowerName === 'cancelled') statusId = 5;
    }
    const params = { orderId: item.order_id };
    if (statusId === 1) router.push({ pathname: '/(customer)/home/ordersearch', params });
    else if (statusId === 2 || statusId === 3) router.push({ pathname: '/(customer)/home/orderongoing', params });
    else if (statusId === 4) router.push({ pathname: '/(customer)/home/ordercomplete', params });
    else if (statusId === 5 || statusId === 6 || statusId === 7) router.push({ pathname: '/(customer)/home/ordercancel', params });
    else router.push({ pathname: '/(customer)/home/ordersearch', params });
  };

  const getStatusColor = (statusName, isScheduled) => {
    if (isScheduled) return '#0AB3FF';
    const status = statusName?.toLowerCase();
    if (status === 'completed') return '#10B981';
    if (status === 'cancelled') return '#FF4444';
    if (status === 'pending') return '#F59E0B';
    return '#8796AA';
  };

  // --- UPDATED RENDER FUNCTION ---
  const renderOrderCard = ({ item }) => {
    const isScheduled = item.is_scheduled === true;
    const statusName = item.status_name || "Unknown";

    // --- CONDITION LOGIC ---
    // 1. Identify if order is finished
    const isTerminalState = ['Completed', 'Cancelled', 'Failed', 'Timeout'].includes(statusName);

    // 2. Decide: Show Reserved Badge ONLY if scheduled AND NOT finished
    const showReservedBadge = isScheduled && !isTerminalState;

    // 3. Decide: Show Standard Badge ONLY if NOT showing Reserved Badge
    const showStandardBadge = !showReservedBadge;
    // -----------------------

    // Date Parsing
    const rawDate = isScheduled
      ? (item.scheduled_pickup_time || item.scheduled_time || item.created_at)
      : item.created_at;
    const dateObj = parseDateSafe(rawDate);
    let dateStr = "Date N/A";
    if (dateObj) {
      dateStr = dateObj.toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
      });
    }

    const statusColor = getStatusColor(item.status_name, isScheduled);
    const isFavorited = favoriteIds.includes(item.order_id);

    return (
      <View style={[styles.ordercard, {
        backgroundColor: colors.card,
        borderColor: showReservedBadge ? colors.tint : colors.border
      }]}>

        {/* CONDITION 1: Show Reserved Badge (Absolute) */}
        {showReservedBadge && (
          <View style={[styles.scheduledBadge, { backgroundColor: colors.tint }]}>
            <Image source={clockIcon} style={styles.badgeIcon} />
            <Text style={styles.badgeText}>RESERVED</Text>
          </View>
        )}

        <View style={styles.orderinfo}>
          <View style={[styles.productRow, showReservedBadge && { paddingRight: 60 }]}>
            <View style={styles.productInfo}>
              <Image source={goods} style={styles.ordericon} />
              <Text style={[styles.productText, { color: colors.text }]} numberOfLines={1}>
                {item.goods_details || item.other_details || "No details"}
              </Text>
            </View>

            {/* CONDITION 2: Show Standard Badge (Inline) */}
            {showStandardBadge && (
              <View style={[styles.statusBadge, { borderColor: statusColor }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {statusName}
                </Text>
              </View>
            )}

          </View>

          <View style={styles.locationRow}>
            <Image source={geopick} style={styles.locationIcon} />
            <Text style={[styles.locationText, { color: colors.subText }]} numberOfLines={1}>{item.pickup_address}</Text>
          </View>
          <View style={styles.locationRow}>
            <Image source={geodrop} style={styles.locationIcon} />
            <Text style={[styles.locationText, { color: colors.subText }]} numberOfLines={1}>{item.dropoff_address}</Text>
          </View>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <View style={styles.footerRow}>
            <View style={styles.metaContainer}>
              <View style={styles.metaRow}>
                <Image source={money} style={styles.metaIcon} />
                <Text style={[styles.metaText, { color: colors.subText }]}>₱ {item.total_fare}</Text>
              </View>
              <View style={styles.metaRow}>
                <Image source={time} style={[styles.metaIcon, showReservedBadge && { tintColor: colors.tint }]} />
                <Text style={[styles.metaText, { color: colors.subText }, showReservedBadge && { color: colors.tint, fontWeight: 'bold' }]} numberOfLines={1}>
                  {dateStr}
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Pressable onPress={() => toggleFavorite(item.order_id)} style={styles.heartButton}>
                <Image source={heartIcon} style={[styles.heartIcon, { tintColor: isFavorited ? colors.error : colors.subText }]} />
              </Pressable>

              <Pressable style={[styles.viewButton, { backgroundColor: colors.success }, showReservedBadge && { backgroundColor: colors.tint }]} onPress={() => handleViewOrder(item)}>
                <Text style={styles.viewButtonText}>View</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return <View style={{ height: 50 }} />;
    return <View style={{ paddingVertical: 20 }}><ActivityIndicator size="small" color={colors.tint} /></View>;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={headerlogo} style={[styles.logo, { tintColor: isDarkMode ? undefined : colors.text }]} />
      </View>
      <View style={styles.mainContent}>
        <View style={[styles.filtercontainer, { backgroundColor: colors.surface, borderColor: colors.surface }]}>
          <View style={styles.searchcontainer}>
            <Searchbar
              placeholder="Search orders..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={[styles.searchbar, { backgroundColor: colors.inputBackground }]}
              iconColor={colors.subText}
              inputStyle={[styles.searchInput, { color: colors.text }]}
              placeholderTextColor={colors.subText}
              onSubmitEditing={() => { setPage(0); fetchOrders(0, true); }}
            />
          </View>
          <View style={styles.filterbtn}>
            <DropDownPicker
              open={open}
              value={statusFilter}
              items={items}
              setOpen={setOpen}
              setValue={setStatusFilter}
              setItems={setItems}
              placeholder="Status"
              maxHeight={400}
              autoScroll={true}
              dropDownDirection="BOTTOM"
              style={[styles.dropdown, { backgroundColor: colors.inputBackground, borderColor: colors.inputBackground }]}
              textStyle={[styles.dropdownText, { color: colors.text }]}
              placeholderStyle={[styles.placeholderText, { color: colors.subText }]}
              dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}
              selectedItemContainerStyle={[styles.selectedItemContainer, { backgroundColor: isDarkMode ? '#4B5563' : colors.border }]}
              selectedItemLabelStyle={[styles.selectedItemLabel, { color: colors.tint }]}
              listMode="SCROLLVIEW"
              scrollViewProps={{ nestedScrollEnabled: true }}
              theme={isDarkMode ? "DARK" : "LIGHT"}
            />
          </View>
        </View>
        <View style={styles.ordercontent}>
          {loading && page === 0 ? (
            <ActivityIndicator size="large" color={colors.tint} style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.order_id.toString()}
              renderItem={renderOrderCard}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.subText }]}>No orders found.</Text>}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.tint} />
              }
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
  filtercontainer: { borderWidth: 1, borderRadius: 11, width: '100%', height: 'auto', marginTop: verticalScale(20), padding: 5, flexDirection: 'row', alignItems: 'center', gap: 10, zIndex: 2000 },
  searchcontainer: { flex: 2, paddingHorizontal: 5 },
  searchbar: { borderRadius: 8, height: 40 },
  searchInput: { fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn: { flex: 1, paddingHorizontal: 5, paddingVertical: 5 },
  dropdown: { borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { borderWidth: 1, borderRadius: 8, marginTop: 5, maxHeight: 300 },
  selectedItemContainer: {},
  selectedItemLabel: { fontSize: 14, fontFamily: 'Roboto-Medium' },
  ordercontent: { flex: 1, marginTop: verticalScale(10), zIndex: 1000 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  ordercard: { width: '100%', borderRadius: 14, marginBottom: 15, padding: 16, borderWidth: 1, position: 'relative' },
  orderinfo: { flexDirection: 'column' },
  scheduledBadge: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, zIndex: 10 },
  badgeIcon: { width: 10, height: 10, tintColor: 'black', marginRight: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: 'black' },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  productInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  ordericon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 8 },
  productText: { fontFamily: 'Roboto-Bold', fontSize: 16, flexShrink: 1 },
  statusBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { fontSize: 11, fontFamily: 'Roboto-Bold', textTransform: 'uppercase' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationIcon: { width: 18, height: 18, resizeMode: 'contain', marginRight: 10, opacity: 0.8 },
  locationText: { fontFamily: 'Roboto-Regular', fontSize: 14, flexShrink: 1 },
  separator: { height: 1, marginVertical: 12 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaContainer: { flex: 1, marginRight: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  metaIcon: { width: 16, height: 16, resizeMode: 'contain', marginRight: 8 },
  metaText: { fontFamily: 'Roboto-Medium', fontSize: 13 },
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heartButton: { padding: 5, justifyContent: 'center', alignItems: 'center' },
  heartIcon: { width: 28, height: 28, resizeMode: 'contain' },
  viewButton: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  viewButtonText: { fontSize: 14, color: '#000000', fontFamily: 'Roboto-Bold' },
});