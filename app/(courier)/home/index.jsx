import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

// Hooks
import { useCourierDispatch } from '../../../hooks/useCourierDispatch';

export default function CourierHome() {
  const router = useRouter();

  // 1. Use the Dispatch Hook to get real-time open orders
  const { openOrders, loading, refreshOrders } = useCourierDispatch();

  // State for Pull-to-Refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshOrders();
    setRefreshing(false);
  };

  // Assets
  const headerlogo = require("@/assets/images/headerlogo.png");
  const money = require("@/assets/images/money.png");
  const geopick = require("@/assets/images/geopick.png");
  const geodrop = require("@/assets/images/geodrop.png");

  // 2. Render Single Order Item
  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      {/* Header: Order ID & Fare */}
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Order #{item.order_id}</Text>
        <View style={styles.fareBadge}>
          <Image source={money} style={styles.moneyIcon} />
          <Text style={styles.fareText}>₱{item.total_fare}</Text>
        </View>
      </View>

      {/* Locations */}
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Image source={geopick} style={styles.iconSmall} />
          <Text style={styles.locationText} numberOfLines={1}>{item.pickup_address}</Text>
        </View>
        <View style={styles.locationRow}>
          <Image source={geodrop} style={styles.iconSmall} />
          <Text style={styles.locationText} numberOfLines={1}>{item.dropoff_address}</Text>
        </View>
      </View>

      {/* 3. ACTION BUTTON: Navigate to Order View instead of direct accept */}
      <Pressable
        style={styles.viewButton}
        onPress={() => router.push({
          pathname: '/(courier)/home/orderview',
          params: { orderId: item.order_id }
        })}
      >
        <Text style={styles.viewButtonText}>View Details & Accept</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={headerlogo} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Available Orders</Text>

        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#3BF579" style={{marginTop: 50}} />
        ) : (
          <FlatList
            data={openOrders}
            renderItem={renderItem}
            keyExtractor={(item) => item.order_id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3BF579" />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No active orders in your area.</Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  header: { alignItems: 'center', marginTop: verticalScale(40), marginBottom: 20 },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  content: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  orderCard: {
    backgroundColor: '#22262F',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#363D47'
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderId: { color: '#8796AA', fontWeight: 'bold', fontSize: 16 },
  fareBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#192028', padding: 5, borderRadius: 8 },
  moneyIcon: { width: 16, height: 16, marginRight: 5 },
  fareText: { color: '#3BF579', fontWeight: 'bold' },
  locationContainer: { gap: 8, marginBottom: 15 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconSmall: { width: 18, height: 18, resizeMode: 'contain' },
  locationText: { color: 'white', fontSize: 14, flex: 1 },
  viewButton: {
    backgroundColor: '#0AB3FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  viewButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#8796AA', textAlign: 'center', marginTop: 50 }
});