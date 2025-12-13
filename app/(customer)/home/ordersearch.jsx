// app/(customer)/home/ordersearch.jsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

// Assets
const backimg = require("@/assets/images/back.png");
const headerlogo = require("@/assets/images/headerlogo.png");
const cancelIcon = require("@/assets/images/cancel.png");

const SEARCH_TIMEOUT_SECONDS = 300; // 5 Minutes

const OrderSearch = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { colors } = useTheme();

  const [timeLeft, setTimeLeft] = useState(SEARCH_TIMEOUT_SECONDS);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const snapPoints = useMemo(() => ['15%', '30%'], []);
  const bottomSheetRef = useRef(null);

  // --- NAVIGATION HANDLER ---
  const proceedToOngoing = useCallback(() => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    console.log("✅ Order Accepted! Redirecting to Ongoing...");
    router.replace({
      pathname: '/(customer)/home/orderongoing',
      params: { orderId: orderId }
    });
  }, [isRedirecting, orderId, router]);

  // --- 1. STRICT SYNC: Check Status Immediately ---
  const checkOrderStatus = async () => {
    if (!orderId || isRedirecting) return;

    try {
      const { data, error } = await supabase
        .from('order')
        .select('deliverystatus_id')
        .eq('order_id', orderId)
        .single();

      // If status is Accepted (2) or Ongoing (3), redirect immediately
      if (data && (data.deliverystatus_id === 2 || data.deliverystatus_id === 3)) {
        proceedToOngoing();
      }
    } catch (err) {
      console.log("Sync check failed (ignoring):", err.message);
    }
  };

  // --- 2. REALTIME LISTENER ---
  useEffect(() => {
    if (!orderId) return;

    // A. Initial Check (Fixes Race Condition)
    checkOrderStatus();

    // B. Realtime Listener (The main trigger)
    const subscription = supabase
      .channel(`order_search_${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'order',
          filter: `order_id=eq.${orderId}`
        },
        (payload) => {
          const newStatus = payload.new.deliverystatus_id;
          console.log("⚡ Realtime Update:", newStatus);

          // Redirect on Accepted (2) OR Ongoing (3)
          if (newStatus === 2 || newStatus === 3) {
            proceedToOngoing();
          }
        }
      )
      .subscribe();

    // C. Polling Backup (Every 3s)
    const pollingInterval = setInterval(checkOrderStatus, 3000);

    // D. Timer
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      supabase.removeChannel(subscription);
      clearInterval(pollingInterval);
      clearInterval(timerInterval);
    };
  }, [orderId, proceedToOngoing]);

  const handleTimeout = async () => {
    if (isCancelling || isRedirecting) return;
    Alert.alert("Timeout", "No drivers found. Please try again later.");
    await handleCancelOrder();
  };

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      await supabase.from('order').update({ deliverystatus_id: 5 }).eq('order_id', orderId);
      router.replace('/(customer)/home/index');
    } catch (err) {
      Alert.alert("Error", "Could not cancel: " + err.message);
      setIsCancelling(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Image source={headerlogo} style={styles.logo} />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.rippleContainer}>
            <ActivityIndicator size="large" color={colors.tint} style={{ transform: [{ scale: 2 }] }} />
          </View>
          <Text style={[styles.searchingText, { color: colors.text }]}>Connecting to Drivers...</Text>
          <Text style={[styles.timerText, { color: colors.subText }]}>{formatTime(timeLeft)}</Text>
          {isRedirecting && <Text style={styles.redirectText}>Driver Found! Connecting...</Text>}
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: colors.surface }}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>Finding you a courier</Text>
            <Text style={[styles.sheetSubtitle, { color: colors.subText }]}>Please wait while we broadcast your request.</Text>

            <Pressable
              style={[styles.cancelButton, { backgroundColor: colors.card }]}
              onPress={() => {
                Alert.alert("Cancel Request", "Are you sure you want to cancel?", [
                  { text: "No", style: "cancel" },
                  { text: "Yes", onPress: handleCancelOrder }
                ]);
              }}
              disabled={isCancelling || isRedirecting}
            >
              {isCancelling ? (
                <ActivityIndicator color="white" />
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={cancelIcon} style={styles.iconSmall} />
                  <Text style={styles.cancelText}>Cancel Request</Text>
                </View>
              )}
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', marginTop: verticalScale(40) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  rippleContainer: { marginBottom: 30 },
  searchingText: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  timerText: { fontSize: 16 },
  redirectText: { color: '#3BF579', fontSize: 14, marginTop: 10, fontWeight: 'bold' },
  handleIndicator: { backgroundColor: '#0AB3FF' },
  contentContainer: { flex: 1, padding: 20, alignItems: 'center' },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  sheetSubtitle: { fontSize: 14, textAlign: 'center', marginBottom: 25 },
  cancelButton: {
    paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FF4444'
  },
  cancelText: { color: '#FF4444', fontSize: 16, fontWeight: 'bold' },
  iconSmall: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#FF4444' }
});

export default OrderSearch;