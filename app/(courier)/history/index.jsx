import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchbar } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const money = require("@/assets/images/money.png");
const time = require("@/assets/images/time.png");
const geopick = require("@/assets/images/geopick.png");
const geodrop = require("@/assets/images/geodrop.png");
const goods = require("@/assets/images/goods.png");

// Status Map for Display
const STATUS_MAP = {
  2: 'Accepted',
  3: 'Ongoing',
  4: 'Completed',
  5: 'Cancelled'
};

export default function CourierHistory() {
  const router = useRouter();

  // State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter State
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [items, setItems] = useState([
    { label: 'All Orders', value: 'All' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Ongoing', value: 'Ongoing' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' },
  ]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('order')
        .select('*')
        .eq('courier_id', user.id)
        .order('created_at', { ascending: false });

      // Apply Status Filter
      if (statusFilter !== 'All') {
        // Map string filter to ID(s)
        if (statusFilter === 'Accepted') query = query.eq('deliverystatus_id', 2);
        else if (statusFilter === 'Ongoing') query = query.eq('deliverystatus_id', 3);
        else if (statusFilter === 'Completed') query = query.eq('deliverystatus_id', 4);
        else if (statusFilter === 'Cancelled') query = query.eq('deliverystatus_id', 5);
      } else {
        // Show all relevant courier statuses (exclude Pending=1)
        query = query.in('deliverystatus_id', [2, 3, 4, 5]);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side search filtering (simple implementation)
      let filteredData = data || [];
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredData = filteredData.filter(item =>
          (item.order_id && item.order_id.toString().includes(lowerQuery)) ||
          (item.pickup_address && item.pickup_address.toLowerCase().includes(lowerQuery)) ||
          (item.dropoff_address && item.dropoff_address.toLowerCase().includes(lowerQuery))
        );
      }

      setOrders(filteredData);

    } catch (err) {
      console.error("Error fetching courier history:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [statusFilter]) // Refetch when filter changes
  );

  // Handle Refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  // Handle Navigation
  const handleViewOrder = (item) => {
    const statusId = item.deliverystatus_id;
    const params = { orderId: item.order_id };

    if (statusId === 2 || statusId === 3) {
      // Accepted or Ongoing -> Go to Delivery Ongoing Screen
      router.push({ pathname: '/(courier)/home/deliverongoing', params });
    } else if (statusId === 4) {
      // Completed -> Go to Delivery Complete Summary
      router.push({ pathname: '/(courier)/home/delivercomplete', params });
    } else {
      // Fallback (e.g. Cancelled) - Just stay or show alert
      // For now, maybe just show details? Or do nothing.
      // Let's allow viewing completed screen for cancelled if we had one, but we don't.
      // So we'll just do nothing for cancelled for now as per plan "Alert or No Action"
      // actually, let's just alert.
      if (statusId === 5) alert("This order was cancelled.");
    }
  };

  const getStatusColor = (statusId) => {
    if (statusId === 4) return '#3BF579'; // Completed
    if (statusId === 5) return '#FF4444'; // Cancelled
    if (statusId === 2) return '#FFA500'; // Accepted
    if (statusId === 3) return '#0AB3FF'; // Ongoing
    return '#8796AA';
  };

  const renderItem = ({ item }) => {
    const statusColor = getStatusColor(item.deliverystatus_id);
    const statusName = STATUS_MAP[item.deliverystatus_id] || 'Unknown';

    const dateObj = new Date(item.created_at);
    const dateStr = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : "Date N/A";

    return (
      <View style={styles.ordercard}>
        <View style={styles.orderinfo}>

          {/* Header: Goods & Status */}
          <View style={styles.productRow}>
            <View style={styles.productInfo}>
              <Image source={goods} style={styles.ordericon} />
              <Text style={styles.productText} numberOfLines={1}>
                {item.goods_details || item.other_details || "Delivery"}
              </Text>
            </View>
            <View style={[styles.statusBadge, { borderColor: statusColor }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>{statusName}</Text>
            </View>
          </View>

          {/* Locations */}
          <View style={styles.locationRow}>
            <Image source={geopick} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>{item.pickup_address}</Text>
          </View>
          <View style={styles.locationRow}>
            <Image source={geodrop} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>{item.dropoff_address}</Text>
          </View>

          <View style={styles.separator} />

          {/* Footer: Meta & Action */}
          <View style={styles.footerRow}>
            <View style={styles.metaContainer}>
              <View style={styles.metaRow}>
                <Image source={money} style={styles.metaIcon} />
                <Text style={styles.metaText}>₱ {item.total_fare}</Text>
              </View>
              <View style={styles.metaRow}>
                <Image source={time} style={styles.metaIcon} />
                <Text style={styles.metaText}>{dateStr}</Text>
              </View>
            </View>

            <Pressable
              style={styles.viewButton}
              onPress={() => handleViewOrder(item)}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </Pressable>
          </View>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={headerlogo} style={styles.logo} />
      </View>

      <View style={styles.mainContent}>
        {/* Filter Section */}
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
              onSubmitEditing={fetchOrders}
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

        {/* List Section */}
        <View style={styles.ordercontent}>
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color="#3BF579" style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.order_id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={<Text style={styles.emptyText}>No orders found.</Text>}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3BF579" />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(30) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, padding: 15 },

  filtercontainer: {
    backgroundColor: '#363D47',
    borderColor: '#363D47',
    borderWidth: 1,
    borderRadius: 11,
    width: '100%',
    height: 'auto',
    marginTop: verticalScale(20),
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 2000,
  },
  searchcontainer: { flex: 2, paddingHorizontal: 5 },
  searchbar: { backgroundColor: '#22262F', borderRadius: 8, height: 40 },
  searchInput: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular', minHeight: 0 },
  filterbtn: { flex: 1, paddingHorizontal: 5, paddingVertical: 5 },

  dropdown: { backgroundColor: '#22262F', borderColor: '#22262F', borderWidth: 0, borderRadius: 8, minHeight: 40 },
  dropdownText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  placeholderText: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Regular' },
  dropdownContainer: { backgroundColor: '#22262F', borderColor: '#4B5563', borderWidth: 1, borderRadius: 8, marginTop: 5 },
  selectedItemContainer: { backgroundColor: '#4B5563' },
  selectedItemLabel: { color: '#0AB3FF', fontSize: 14, fontFamily: 'Roboto-Medium' },

  ordercontent: { flex: 1, marginTop: verticalScale(10), zIndex: 1000 },
  emptyText: { color: '#87AFB9', textAlign: 'center', marginTop: 50, fontSize: 16 },

  ordercard: {
    width: '100%',
    backgroundColor: '#363D47',
    borderRadius: 14,
    marginBottom: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4B5563'
  },
  orderinfo: { flexDirection: 'column' },

  productRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  productInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  ordericon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 8 },
  productText: { fontFamily: 'Roboto-Bold', fontSize: 16, color: '#FFFFFF', flexShrink: 1 },

  statusBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { fontSize: 11, fontFamily: 'Roboto-Bold', textTransform: 'uppercase' },

  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationIcon: { width: 18, height: 18, resizeMode: 'contain', marginRight: 10, opacity: 0.8 },
  locationText: { fontFamily: 'Roboto-Regular', fontSize: 14, color: '#B0C4D4', flexShrink: 1 },

  separator: { height: 1, backgroundColor: '#4B5563', marginVertical: 12 },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaContainer: { flex: 1, marginRight: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  metaIcon: { width: 16, height: 16, resizeMode: 'contain', marginRight: 8, tintColor: '#87AFB9' },
  metaText: { fontFamily: 'Roboto-Medium', fontSize: 13, color: '#87AFB9' },

  viewButton: {
    backgroundColor: '#3BF579',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
  viewButtonText: { fontSize: 14, color: '#000000', fontFamily: 'Roboto-Bold' },
});
