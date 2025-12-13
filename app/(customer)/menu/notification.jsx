import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase'; // Verify your path to supabase
import { useTheme } from '../../../context/ThemeContext';

export default function Notification() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  // Assets
  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const reportIcon = require("@/assets/images/report.png"); // Use report icon if available, or fallback

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --- FETCH NOTIFICATIONS ---
  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('users_reporting')
        .select(`
          userreporting_id,
          report_date,

          reported:service_user!fk_reported ( full_name ),
          reason:report_set!fk_reportset ( report_type ),
          status:report_status!fk_reportstatus ( status_name )
        `)
        .eq('reporter_id', user.id) // Only fetch reports created BY this user
        .order('report_date', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);

    } catch (err) {
      console.error("Error fetching notifications:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch on mount and focus
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  // Helper for Date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString([], {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // Helper for Status Color
  const getStatusColor = (statusName) => {
    const status = statusName?.toLowerCase() || '';
    if (status === 'resolved') return '#2ECC71'; // Green
    if (status === 'dismissed') return '#95A5A6'; // Grey
    if (status === 'pending review') return '#F1C40F'; // Yellow/Orange
    return colors.tint; // Default Blue
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(customer)/menu')}>
          <Image source={backimg} style={[styles.backicon, { tintColor: isDarkMode ? undefined : colors.text }]} />
        </Pressable>
        <Text style={[styles.title, { color: colors.tint }]}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      <ScrollView
        style={styles.mainContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.tint} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.tint} style={{ marginTop: 50 }} />
        ) : notifications.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.subText }]}>You have no notifications.</Text>
        ) : (
          notifications.map((item) => (
            <View key={item.userreporting_id} style={[styles.notifcontainer, { backgroundColor: colors.card, borderLeftColor: colors.tint }]}>
              <View style={styles.notifheader}>
                <Image source={reportIcon} style={styles.notificon} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.notifheaderText, { color: colors.text }]}>
                    Report Update: {item.reason?.report_type || "Issue"}
                  </Text>
                  <Text style={[styles.subHeaderText, { color: colors.subText }]}>
                    Against: {item.reported?.full_name || "Courier"}
                  </Text>
                </View>
              </View>

              <View style={styles.notifdescription}>
                <Text style={[styles.notifdescriptiontext, { color: colors.subText }]}>
                  Status: <Text style={{ color: getStatusColor(item.status?.status_name), fontWeight: 'bold' }}>
                    {item.status?.status_name || "Pending"}
                  </Text>
                </Text>
                <Text style={[styles.dateText, { color: colors.subText }]}>
                  {formatDate(item.report_date)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  backicon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 1,
    marginTop: 10
  },
  placeholder: {
    width: 35,
  },
  mainContent: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16
  },
  notifcontainer: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2
  },
  notifheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
    tintColor: '#FF4E4E' // Making the report icon red to signify importance
  },
  notifheaderText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  subHeaderText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  notifdescription: {
    paddingLeft: 44,
  },
  notifdescriptiontext: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    marginBottom: 4
  },
  dateText: {
    fontFamily: 'Roboto-Light',
    fontSize: 11,
  }
});