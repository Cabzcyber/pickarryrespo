// app/(courier)/home/delivercomplete.jsx
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

// Hooks
import { useOrderDetails } from '../../../hooks/useOrderDetails';

// Assets
const headerlogo = require("@/assets/images/headerlogo.png");
const checkmark = require("@/assets/images/feature.png"); // Assuming you have a checkmark or similar

const DeliverComplete = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { order, loading, refetch } = useOrderDetails(orderId);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3BF579" />
      </View>
    );
  }

  // Calculate Net Earnings
  // Formula: Total - Commission - Penalty + Bonus
  const netEarnings = (
    Number(order.total_fare) -
    Number(order.commission_amount) -
    Number(order.penalty_amount) +
    Number(order.bonus_charge_component)
  ).toFixed(2);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3BF579" />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={headerlogo} style={styles.logo} />
          </View>

          <View style={styles.mainContent}>
            <Image source={checkmark} style={styles.successIcon} />
            <Text style={styles.title}>Delivery Success!</Text>
            <Text style={styles.subtitle}>Job ID: {order.order_id}</Text>

            {/* Earnings Card */}
            <View style={styles.earningsCard}>
              <Text style={styles.earningsTitle}>You Earned</Text>
              <Text style={styles.earningsAmount}>₱ {netEarnings}</Text>

              <View style={styles.divider} />

              <View style={styles.breakdownRow}>
                <Text style={styles.label}>Customer Paid</Text>
                <Text style={styles.value}>₱ {order.total_fare}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.label}>Commission (Deducted)</Text>
                <Text style={[styles.value, { color: '#FF4444' }]}>- ₱ {order.commission_amount}</Text>
              </View>
              {order.bonus_charge_component > 0 && (
                <View style={styles.breakdownRow}>
                  <Text style={styles.label}>Bonus</Text>
                  <Text style={[styles.value, { color: '#3BF579' }]}>+ ₱ {order.bonus_charge_component}</Text>
                </View>
              )}
            </View>

            {/* Next Action */}
            <Pressable
              style={styles.mainButton}
              onPress={() => router.push('/(courier)/home')}
            >
              <Text style={styles.mainButtonText}>Find New Orders</Text>
            </Pressable>

          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
    padding: 24
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#141519',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginBottom: 20
  },
  logo: {
    width: 120,
    height: 28,
    resizeMode: 'contain'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: '#3BF579' // Optional: Tint it green
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#8796AA',
    marginBottom: 30
  },
  earningsCard: {
    width: '100%',
    backgroundColor: '#22262F',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#3BF579'
  },
  earningsTitle: {
    color: '#8796AA',
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 5
  },
  earningsAmount: {
    color: '#3BF579',
    fontSize: 42,
    fontWeight: 'bold'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#4a5568',
    marginVertical: 20
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8
  },
  label: {
    color: '#ccc',
    fontSize: 16
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  mainButton: {
    width: '100%',
    backgroundColor: '#3BF579',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  mainButtonText: {
    color: '#141519',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default DeliverComplete;