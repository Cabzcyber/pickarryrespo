import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator, Image } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function About() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();
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
    // We declare the channel outside the async function to ensure cleanup works reliably
    const channel = supabase
      .channel('overview-global-channel')
      .on(
        'postgres_changes',
        {
          event: '*', // CHANGED: Listen to INSERT, UPDATE, and DELETE
          schema: 'public',
          table: 'overview'
        },
        (payload) => {
          console.log("Realtime Update Received:", payload); // Debug log

          // Check if there is new data (payload.new exists on INSERT and UPDATE)
          if (payload.new && payload.new.slug) {
            setContentMap((prev) => ({
              ...prev,
              [payload.new.slug]: payload.new.content,
            }));
          }
        }
      )
      .subscribe();

    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        // 1. Initial Fetch
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
        console.error("Fetch Overview Error:", error.message);
        Alert.alert('Error', 'Could not load page content.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(customer)/menu')}>
          <Image source={backimg} style={[styles.backicon, { tintColor: isDarkMode ? undefined : colors.text }]} />
        </Pressable>
        <Text style={[styles.title, { color: colors.tint }]}>About</Text>
      </View>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoContainer}>
          <Image source={aboutlogo} style={styles.aboutlogo} />
        </View>

        {/* Section 1: About */}
        <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['about']}</Text>

        {/* Section 2: Terms */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>General Terms & Conditions</Text>
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['terms']}</Text>
        </View>

        {/* Section 3: Contact */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['contact']}</Text>
        </View>

        {/* Additional Sections */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Terms of Use</Text>
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['terms-and-policies']}</Text>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Customer Policies</Text>
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['customer-policies']}</Text>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Courier Policies</Text>
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['courier-policies']}</Text>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Fare Policies</Text>
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['fare-policies']}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 12, paddingTop: 12, marginTop: verticalScale(31) },
  backicon: { width: 35, height: 35, resizeMode: 'contain' },
  separator: { height: 1, width: '100%', marginBottom: 1, marginTop: verticalScale(6) },
  mainContent: { flex: 1, paddingHorizontal: 15, marginTop: verticalScale(8) },
  scrollContent: { paddingBottom: 30 },
  title: { fontFamily: 'Roboto-Bold', fontSize: 24 },
  logoContainer: { alignItems: 'center', marginVertical: 20 },
  aboutlogo: { width: 200, height: 60, resizeMode: 'contain' },
  descriptionText: { fontFamily: 'Roboto-Light', fontSize: 13, lineHeight: 20, textAlign: 'justify', marginBottom: 20 },
  sectionCard: { borderRadius: 20, padding: 15, marginBottom: 15, elevation: 2 },
  sectionTitle: { fontFamily: 'Roboto-Bold', fontSize: 18, marginBottom: 10 },
});