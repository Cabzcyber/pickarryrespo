import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';

// --- ROBUSTNESS: Local Status Map ---
// This allows us to display status names without needing a complex Database Join.
// IDs based on your app logic: 1=Pending, 2=Accepted/Ongoing, 5=Cancelled.
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

  // Assets
  const headerlogo = require("@/assets/images/headerlogo.png");
  const money = require("@/assets/images/money.png");
  const time = require("@/assets/images/time.png");
  const geopick = require("@/assets/images/geopick.png");
  const geodrop = require("@/assets/images/geodrop.png");
  const goods = require("@/assets/images/goods.png");
  const heartIcon = require("@/assets/images/heart.png");

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
    {label: 'All', value: 'All'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Accepted', value: 'Accepted'},
    {label: 'Ongoing', value: 'Ongoing'},
    {label: 'Completed', value: 'Completed'},
    {label: 'Cancelled', value: 'Cancelled'},
    {label: 'Favorites', value: 'Favorites'},
  ]);

  // --- 1. FETCH FAVORITES ---
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

  // --- 2. TOGGLE FAVORITE ---
  const toggleFavorite = async (orderId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const isFavorited = favoriteIds.includes(orderId);

      // Optimistic Update
      if (isFavorited) {
        setFavoriteIds(prev => prev.filter(id => id !== orderId));
        // If viewing Favorites tab, remove immediately from view
        if (statusFilter === 'Favorites') {
            setOrders(prev => prev.filter(o => o.order_id !== orderId));
        }

        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('order_id', orderId);
        if (error) throw error;
      } else {
        setFavoriteIds(prev => [...prev, orderId]);
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, order_id: orderId });
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      Alert.alert("Error", "Could not update favorites");
      fetchFavorites();
    }
  };

  // --- 3. FETCH ORDERS (FIXED) ---
  const fetchOrders = async (pageNumber = 0, isRefresh = false) => {
    if (!isRefresh && (!hasMore || loadingMore)) return;

    try {
      if (pageNumber === 0) setLoading(true);
      else setLoadingMore(true);

      let fetchedData = [];

      // BRANCH LOGIC: Favorites vs Standard RPC
      if (statusFilter === 'Favorites') {
        if (favoriteIds.length === 0) {
            fetchedData = [];
        } else {
            // FIX: Removed "deliverystatus ( status_name )" join to prevent schema error.
            const { data, error } = await supabase
                .from('order')
                .select('*')
                .in('order_id', favoriteIds)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // FIX: Manually map status_name using local STATUS_MAP
            fetchedData = data.map(order => ({
                ...order,
                status_name: STATUS_MAP[order.deliverystatus_id] || 'Unknown'
            }));
        }
        setHasMore(false);

      } else {
        // Standard Case: Use existing RPC
        const { data, error } = await supabase.rpc('get_customer_orders', {
            status_filter: statusFilter,
            search_query: searchQuery,
            page_number: pageNumber,
            page_size: PAGE_SIZE
        });

        if (error) throw error;
        fetchedData = data;

        if (fetchedData && fetchedData.length < PAGE_SIZE) setHasMore(false);
        else setHasMore(true);
      }

      // State Updates
      if (fetchedData && fetchedData.length > 0) {
        if (isRefresh || pageNumber === 0) {
          setOrders(fetchedData);
        } else {
          setOrders(prev => [...prev, ...fetchedData]);
        }
        setPage(pageNumber + 1);
      } else {
        if (isRefresh || pageNumber === 0) setOrders([]);
      }

    } catch (error) {
      console.error("Error fetching orders:", error.message);
      // Optional: Alert user roughly what went wrong (dev mode only)
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
          // Manually triggering fetchOrders via effect dependency update usually works,
          // but we ensure clean state here.
      });
    }, [])
  );

  React.useEffect(() => {
      setPage(0);
      setHasMore(true);
      fetchOrders(0, true);
  }, [statusFilter, searchQuery, favoriteIds.length]);

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

  const handleViewOrder = (order) => {
    const status = order.status_name?.toLowerCase() || '';
    const params = { orderId: order.order_id };

    if (status === 'pending') {
      router.push({ pathname: '/(customer)/home/ordersearch', params });
    } else if (status === 'accepted' || status === 'ongoing' || status === 'picked up') {
      router.push({ pathname: '/(customer)/home/orderongoing', params });
    } else if (status === 'completed') {
      router.push({ pathname: '/(customer)/home/ordercomplete', params });
    } else if (status === 'cancelled' || status === 'failed' || status === 'timeout') {
      router.push({ pathname: '/(customer)/home/ordercancel', params });
    } else {
      router.push({ pathname: '/(customer)/home/ordersearch', params });
    }
  };

  const getStatusColor = (statusName) => {
    const status = statusName?.toLowerCase();
    if (status === 'completed') return '#3BF579';
    if (status === 'cancelled') return '#FF4444';
    if (status === 'pending') return '#FFA500';
    return '#0AB3FF';
  };

  const renderOrderCard = ({ item }) => {
    const rawDate = item.scheduled_time || item.created_at;
    let dateStr = "Date N/A";
    if (rawDate) {
        const dateObj = new Date(rawDate);
        if (!isNaN(dateObj.getTime())) {
            dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    }

    const statusColor = getStatusColor(item.status_name);
    const isFavorited = favoriteIds.includes(item.order_id);

    return (
      <View style={styles.ordercard}>
        <View style={styles.orderinfo}>

          <View style={styles.productRow}>
            <View style={styles.productInfo}>
              <Image source={goods} style={styles.ordericon}/>
              <Text style={styles.productText} numberOfLines={1}>
                {item.goods_details || "No details"}
              </Text>
            </View>

            <View style={[styles.statusBadge, { borderColor: statusColor }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>{item.status_name}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Image source={geopick} style={styles.locationIcon}/>
            <Text style={styles.locationText} numberOfLines={1}>{item.pickup_address}</Text>
          </View>
          <View style={styles.locationRow}>
            <Image source={geodrop} style={styles.locationIcon}/>
            <Text style={styles.locationText} numberOfLines={1}>{item.dropoff_address}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.footerRow}>
            <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                    <Image source={money} style={styles.metaIcon}/>
                    <Text style={styles.metaText}>₱ {item.total_fare}</Text>
                </View>
                <View style={styles.metaRow}>
                    <Image source={time} style={styles.metaIcon}/>
                    <Text style={styles.metaText} numberOfLines={1}>{dateStr}</Text>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <Pressable
                    onPress={() => toggleFavorite(item.order_id)}
                    style={styles.heartButton}
                >
                    <Image
                        source={heartIcon}
                        style={[
                            styles.heartIcon,
                            { tintColor: isFavorited ? '#FF4444' : '#8796AA' }
                        ]}
                    />
                </Pressable>

                <Pressable
                style={styles.viewButton}
                onPress={() => handleViewOrder(item)}
                >
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
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color="#0AB3FF" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={headerlogo} style={styles.logo}/>
      </View>

      <View style={styles.mainContent}>
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

              maxHeight={300}
              autoScroll={true}
              dropDownDirection="BOTTOM"

              style={styles.dropdown}
              textStyle={styles.dropdownText}
              placeholderStyle={styles.placeholderText}
              dropDownContainerStyle={styles.dropdownContainer}
              selectedItemContainerStyle={styles.selectedItemContainer}
              selectedItemLabelStyle={styles.selectedItemLabel}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>
        </View>

        <View style={styles.ordercontent}>
          {loading && page === 0 ? (
            <ActivityIndicator size="large" color="#0AB3FF" style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.order_id.toString()}
              renderItem={renderOrderCard}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={<Text style={styles.emptyText}>No orders found.</Text>}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
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
  container:{ flex: 1, backgroundColor: '#141519' },
  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo:{ width:120, height:28, resizeMode:'contain' },
  mainContent:{ flex: 1, padding: 15 },

  filtercontainer:{
    backgroundColor:'#363D47',
    borderColor:'#363D47',
    borderWidth:1,
    borderRadius:11,
    width:'100%',
    height:'auto',
    marginTop: verticalScale(20),
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 2000,
  },
  searchcontainer:{ flex: 2, paddingHorizontal: 5 },
  searchbar:{ backgroundColor: '#22262F', borderRadius: 8, height: 40 },
  searchInput:{ color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn:{ flex: 1, paddingHorizontal: 5, paddingVertical: 5 },

  dropdown: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },

  dropdownContainer: {
    backgroundColor: '#22262F',
    borderColor: '#4B5563',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 300
  },
  selectedItemContainer: { backgroundColor: '#4B5563' },
  selectedItemLabel: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Medium' },

  ordercontent:{ flex: 1, marginTop: verticalScale(10), zIndex: 1000 },
  emptyText: { color: '#87AFB9', textAlign: 'center', marginTop: 50, fontSize: 16 },

  ordercard:{
    width:'100%',
    backgroundColor:'#363D47',
    borderRadius:14,
    marginBottom: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4B5563'
  },
  orderinfo:{ flexDirection:'column' },

  productRow:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  productInfo:{ flexDirection:'row', alignItems:'center', flex:1, marginRight: 10 },
  ordericon:{ width:20, height:20, resizeMode:'contain', marginRight:8 },
  productText:{ fontFamily:'Roboto-Bold', fontSize:16, color:'#FFFFFF', flexShrink: 1 },

  statusBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { fontSize: 11, fontFamily: 'Roboto-Bold', textTransform: 'uppercase' },

  locationRow:{ flexDirection:'row', alignItems:'center', marginBottom:8 },
  locationIcon:{ width:18, height:18, resizeMode:'contain', marginRight:10, opacity: 0.8 },
  locationText:{ fontFamily:'Roboto-Regular', fontSize:14, color:'#B0C4D4', flexShrink: 1 },

  separator: { height: 1, backgroundColor: '#4B5563', marginVertical: 12 },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaContainer: {
    flex: 1,
    marginRight: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
    tintColor: '#87AFB9'
  },
  metaText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    color: '#87AFB9',
  },

  actionButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
  },
  heartButton: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  heartIcon: {
      width: 28,
      height: 28,
      resizeMode: 'contain'
  },

  viewButton:{
    backgroundColor:'#3BF579',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems:'center',
    elevation: 2
  },
  viewButtonText:{
    fontSize:14,
    color:'#000000',
    fontFamily: 'Roboto-Bold',
  },
});