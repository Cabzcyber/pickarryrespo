// app/(customer)/home/ordersearch.jsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

// Assets
const backimg = require("@/assets/images/back.png");
const headerlogo = require("@/assets/images/headerlogo.png");
const cancelIcon = require("@/assets/images/cancel.png");

const SEARCH_TIMEOUT_SECONDS = 300; // 5 Minutes

const OrderSearch = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

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
      <View style={styles.container}>
        <View style={styles.header}>
           <Image source={headerlogo} style={styles.logo} />
        </View>

        <View style={styles.mainContent}>
           <View style={styles.rippleContainer}>
              <ActivityIndicator size="large" color="#3BF579" style={{ transform: [{ scale: 2 }] }} />
           </View>
           <Text style={styles.searchingText}>Connecting to Drivers...</Text>
           <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
           {isRedirecting && <Text style={styles.redirectText}>Driver Found! Connecting...</Text>}
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
             <Text style={styles.sheetTitle}>Finding you a courier</Text>
             <Text style={styles.sheetSubtitle}>Please wait while we broadcast your request.</Text>

             <Pressable
               style={styles.cancelButton}
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
  container: { flex: 1, backgroundColor: '#141519' },
  header: { alignItems: 'center', marginTop: verticalScale(40) },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  rippleContainer: { marginBottom: 30 },
  searchingText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  timerText: { color: '#8796AA', fontSize: 16 },
  redirectText: { color: '#3BF579', fontSize: 14, marginTop: 10, fontWeight: 'bold' },
  bottomSheetBackground: { backgroundColor: '#363D47' },
  handleIndicator: { backgroundColor: '#0AB3FF' },
  contentContainer: { flex: 1, padding: 20, alignItems: 'center' },
  sheetTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  sheetSubtitle: { color: '#8796AA', fontSize: 14, textAlign: 'center', marginBottom: 25 },
  cancelButton: {
    backgroundColor: '#22262F',
    paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FF4444'
  },
  cancelText: { color: '#FF4444', fontSize: 16, fontWeight: 'bold' },
  iconSmall: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#FF4444' }
});

export default OrderSearch;