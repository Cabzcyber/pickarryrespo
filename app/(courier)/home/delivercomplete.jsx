import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator, BackHandler } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

// Assets
// const success = require("@/assets/images/success.png");

const DeliverComplete = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { colors } = useTheme();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('order')
          .select('*')
          .eq('order_id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();

    const backAction = () => {
      router.replace('/(courier)/home');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();

  }, [orderId]);

  const handleDone = () => {
    router.replace('/(courier)/home');
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#3BF579" />
      </View>
    );
  }

  // --- FINANCIAL CALCULATIONS ---
  const originalTotal = Number(order?.total_fare || 0);
  const penaltyDiscount = Number(order?.penalty_amount || 0);
  const cashToCollect = originalTotal - penaltyDiscount;
  const commission = Number(order?.commission_amount || 0);
  const netEarnings = cashToCollect - commission;

  return (
    <>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          {/* <Image source={success} style={[styles.successIcon, { tintColor: colors.primary }]} /> */}
          <Text style={[styles.title, { color: colors.text }]}>Delivery Complete!</Text>
          <Text style={[styles.subtitle, { color: colors.subText }]}>Great job!</Text>

          <View style={[styles.earningsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>

            {/* Breakdown Rows */}
            <View style={styles.breakdownContainer}>
              <View style={styles.row}>
                <Text style={[styles.label, { color: colors.subText }]}>Base Fare</Text>
                <Text style={[styles.value, { color: colors.text }]}>₱ {order?.base_fare_component}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { color: colors.subText }]}>Distance Charge</Text>
                <Text style={[styles.value, { color: colors.text }]}>₱ {order?.distance_charge_component}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { color: colors.subText }]}>Time Charge</Text>
                <Text style={[styles.value, { color: colors.text }]}>₱ {order?.time_charge_component}</Text>
              </View>
              {Number(order?.bonus_charge_component) > 0 && (
                <View style={styles.row}>
                  <Text style={[styles.label, { color: colors.subText }]}>Rush Fee</Text>
                  <Text style={[styles.value, { color: colors.text }]}>₱ {order?.bonus_charge_component}</Text>
                </View>
              )}
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Financial Summary */}
            <View style={styles.summaryContainer}>
              <View style={styles.row}>
                <Text style={[styles.summaryLabel, { color: colors.text }]}>Total Order Amount</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>₱ {originalTotal.toFixed(2)}</Text>
              </View>

              {penaltyDiscount > 0 && (
                <View style={styles.row}>
                  <Text style={[styles.deductionLabel, { color: '#FF4444' }]}>Less: Late Penalty</Text>
                  <Text style={[styles.deductionValue, { color: '#FF4444' }]}>- ₱ {penaltyDiscount.toFixed(2)}</Text>
                </View>
              )}

              <View style={[styles.row, styles.highlightRow]}>
                <Text style={[styles.highlightLabel, { color: colors.tint }]}>CASH TO COLLECT</Text>
                <Text style={[styles.highlightValue, { color: colors.tint }]}>
                  ₱ {cashToCollect.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Net Earnings Calculation */}
            <View style={styles.netEarningsContainer}>
              {commission > 0 && (
                <View style={styles.row}>
                  <Text style={[styles.label, { color: colors.subText }]}>Less: Platform Commission</Text>
                  <Text style={[styles.value, { color: colors.text }]}>- ₱ {commission.toFixed(2)}</Text>
                </View>
              )}

              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={[styles.earningsTitle, { color: colors.subText }]}>NET EARNINGS</Text>
                <Text style={styles.earningsAmount}>
                  ₱ {netEarnings.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.mainButton} onPress={handleDone}>
            <Text style={styles.mainButtonText}>BACK TO DASHBOARD</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -50 },
  successIcon: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 },
  earningsCard: { width: '100%', borderRadius: 16, padding: 30, alignItems: 'center', marginBottom: 40, borderWidth: 1 },
  earningsTitle: { fontSize: 14, letterSpacing: 1, marginBottom: 10 },
  earningsAmount: { color: '#3BF579', fontSize: 48, fontWeight: 'bold' },
  mainButton: { backgroundColor: '#3BF579', padding: 18, borderRadius: 12, alignItems: 'center', width: '100%' },
  mainButtonText: { color: '#141519', fontSize: 16, fontWeight: 'bold' },
  deductionLabel: { fontSize: 14 },
  deductionValue: { fontSize: 14, fontWeight: 'bold' },
  breakdownContainer: { width: '100%', marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { fontSize: 14 },
  value: { fontSize: 14, fontWeight: 'bold' },
  divider: { height: 1, width: '100%', marginBottom: 15 },
  summaryContainer: { width: '100%', marginBottom: 15 },
  summaryLabel: { fontSize: 14, fontWeight: 'bold' },
  summaryValue: { fontSize: 14, fontWeight: 'bold' },
  highlightRow: { marginTop: 10, padding: 10, backgroundColor: 'rgba(59, 245, 121, 0.1)', borderRadius: 8 },
  highlightLabel: { fontSize: 16, fontWeight: 'bold' },
  highlightValue: { fontSize: 18, fontWeight: 'bold' },
  netEarningsContainer: { width: '100%' }
});

export default DeliverComplete;