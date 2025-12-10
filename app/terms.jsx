import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator, Image } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../lib/supabase'; // Adjust path if needed (e.g. '../../lib/supabase')
import { useEffect, useState } from 'react';

export default function Terms() {
  const router = useRouter();

  // Reuse the same assets as the About page
  const backimg = require("@/assets/images/back.png");
  const aboutlogo = require("@/assets/images/aboutlogo.png");

  const [isLoading, setIsLoading] = useState(true);
  const [contentMap, setContentMap] = useState({
    'about': '',
    'terms': '',
    'contact': '',
    'terms-and-policies': '',
    'courier-policies': '',
    'customer-policies': '',
    'fare-policies': ''
  });

  useEffect(() => {
    // 1. Real-Time Subscription
    const channel = supabase
      .channel('terms-global-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'overview'
        },
        (payload) => {
          // Immediate UI update
          if (payload.new && payload.new.slug) {
            setContentMap((prev) => ({
              ...prev,
              [payload.new.slug]: payload.new.content,
            }));
          }
        }
      )
      .subscribe();

    // 2. Initial Data Fetch
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from('overview')
          .select('slug, content');

        if (error) throw error;

        if (data) {
          const map = data.reduce((acc, row) => {
            acc[row.slug] = row.content || '';
            return acc;
          }, {});
          setContentMap(map);
        }

      } catch (error) {
        console.error("Fetch Terms Error:", error.message);
        Alert.alert('Error', 'Could not load terms content.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Changed from router.replace to router.back() since this is likely a modal/stack from Auth */}
        <Pressable onPress={() => router.back()}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>
      <View style={styles.separator} />

      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoContainer}>
          <Image source={aboutlogo} style={styles.aboutlogo}/>
        </View>

        {/* --- Content Sections (Same structure as About Page) --- */}

        {/* Section 1: About */}
        <Text style={styles.descriptionText}>{contentMap['about']}</Text>

        {/* Section 2: General Terms */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>General Terms & Conditions</Text>
          <Text style={styles.descriptionText}>{contentMap['terms']}</Text>
        </View>

        {/* Section 3: Contact */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.descriptionText}>{contentMap['contact']}</Text>
        </View>

        {/* Section 4: Terms of Use */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Terms of Use</Text>
          <Text style={styles.descriptionText}>{contentMap['terms-and-policies']}</Text>
        </View>

        {/* Section 5: Customer Policies */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer Policies</Text>
          <Text style={styles.descriptionText}>{contentMap['customer-policies']}</Text>
        </View>

        {/* Section 6: Courier Policies */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Courier Policies</Text>
          <Text style={styles.descriptionText}>{contentMap['courier-policies']}</Text>
        </View>

        {/* Section 7: Fare Policies */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Fare Policies</Text>
          <Text style={styles.descriptionText}>{contentMap['fare-policies']}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(31) },
  backicon: { width: 35, height: 35, resizeMode: 'contain' },
  separator: { height: 1, backgroundColor: '#363D47', width: '100%', marginBottom: 1, marginTop: verticalScale(6) },
  mainContent: { flex: 1, paddingHorizontal: 15, marginTop: verticalScale(8) },
  scrollContent: { paddingBottom: 30 },
  title: { fontFamily: 'Roboto-Bold', fontSize: 24, color: '#0AB3FF' },
  logoContainer: { alignItems: 'center', marginVertical: 20 },
  aboutlogo: { width: 200, height: 60, resizeMode: 'contain' },
  descriptionText: { fontFamily: 'Roboto-Light', fontSize: 13, color: '#d1d5db', lineHeight: 20, textAlign: 'justify', marginBottom: 20 },
  sectionCard: { backgroundColor: '#1f2937', borderRadius: 20, padding: 15, marginBottom: 15 },
  sectionTitle: { fontFamily: 'Roboto-Bold', fontSize: 18, color: '#ffffff', marginBottom: 10 },
});