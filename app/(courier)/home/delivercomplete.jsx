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

  return (
    <>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          {/* <Image source={success} style={[styles.successIcon, { tintColor: colors.primary }]} /> */}
          <Text style={[styles.title, { color: colors.text }]}>Delivery Complete!</Text>
          <Text style={[styles.subtitle, { color: colors.subText }]}>Great job!</Text>

          <View style={[styles.earningsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.earningsTitle, { color: colors.subText }]}>TOTAL EARNINGS</Text>
            <Text style={styles.earningsAmount}>₱ {order?.total_fare}</Text>
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
  mainButtonText: { color: '#141519', fontSize: 16, fontWeight: 'bold' }
});

export default DeliverComplete;