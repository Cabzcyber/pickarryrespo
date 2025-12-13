import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View, Switch } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

export default function CustomerMenu() {
  const router = useRouter();
  const { colors, isDarkMode, toggleTheme } = useTheme();

  // Assets
  const edit = require("@/assets/images/edit.png");
  const setting = require("@/assets/images/setting.png");
  const notification = require("@/assets/images/notification.png");
  const switchcour = require("@/assets/images/switchcour.png");
  const about = require("@/assets/images/about.png");
  const share = require("@/assets/images/share.png");
  const logout = require("@/assets/images/logout.png");

  // State
  const [courierStatus, setCourierStatus] = useState('loading');
  const [rejectionReason, setRejectionReason] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    fullName: 'Loading...',
    phoneNumber: ''
  });

  useEffect(() => {
    let subscription;

    const fetchDataAndSubscribe = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          // 1. Initial Fetch
          // FIXED: Removed 'updated_at' to prevent crashing if the column doesn't exist.
          const [profileResult, courierResult] = await Promise.all([
            supabase.from('service_user').select('full_name, phone_number').eq('user_id', user.id).single(),
            supabase.from('courier')
              .select('user_id, user_status, rejection_reason, suspension_reason')
              .eq('user_id', user.id)
              .maybeSingle()
          ]);

          if (profileResult.data) {
            setProfile({
              fullName: profileResult.data.full_name || 'No Name',
              phoneNumber: profileResult.data.phone_number ? String(profileResult.data.phone_number) : ''
            });
          }

          if (courierResult.data) {
            setCourierStatus(courierResult.data.user_status);
            setRejectionReason(courierResult.data.rejection_reason);
            setSuspensionReason(courierResult.data.suspension_reason);
          } else {
            // Only set to not_registered if we are sure there is no data
            setCourierStatus('not_registered');
          }

          // 2. Real-Time Listener
          subscription = supabase
            .channel(`courier_status_${user.id}`)
            .on(
              'postgres_changes',
              {
                event: 'UPDATE',
                schema: 'public',
                table: 'courier',
                filter: `user_id=eq.${user.id}`
              },
              (payload) => {
                console.log("Realtime Status Update:", payload.new);
                setCourierStatus(payload.new.user_status);
                setRejectionReason(payload.new.rejection_reason);
                setSuspensionReason(payload.new.suspension_reason);

                // If status becomes Active (1), reset the approved alert flag so they see it
                if (payload.new.user_status === 1) {
                  AsyncStorage.removeItem(`hasSeenApprovedAlert_${user.id}`);
                }
              }
            )
            .subscribe();

        } else {
          setCourierStatus('not_registered');
        }
      } catch (error) {
        console.error("Error fetching menu data:", error.message);
        // Important: If query fails, don't assume 'not_registered' immediately to avoid redirect loops.
        // But for safety in UI, we might keep loading false.
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndSubscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []);

  const handleSwitchToCourier = async () => {
    // Safety check: Don't do anything if still loading
    if (loading || courierStatus === 'loading') return;

    if (courierStatus === 'not_registered') {
      router.push('/(courier)/registration/courierauthsign');

    } else if (courierStatus === 3) { // Pending
      Alert.alert(
        "Application Pending",
        "Your application is currently being reviewed by the admin. You cannot switch until it is approved."
      );

    } else if (courierStatus === 5) { // Rejected
      Alert.alert(
        "Application Rejected",
        `Your application was rejected.\n\nReason: ${rejectionReason || "No specific reason provided."}\n\nPlease contact support.`
      );

    } else if (courierStatus === 1) { // Active
      try {
        const approvedKey = `hasSeenApprovedAlert_${userId}`;
        const unsuspendedKey = `hasSeenUnsuspendedAlert_${userId}`;

        const hasSeenApproved = await AsyncStorage.getItem(approvedKey);

        // LOGIC FIX:
        // If they have NOT seen the alert yet, show it.
        // If they clear cache (npx expo start --clear), 'hasSeenApproved' becomes null.
        // We accept that it shows ONCE after a cache clear, then saves 'true' immediately.
        if (hasSeenApproved !== 'true') {
          Alert.alert(
            "Application Approved",
            "Congratulations! Your courier application has been approved. You can now access the courier dashboard.",
            [{
              text: "Go to Dashboard",
              onPress: async () => {
                // Mark as seen so it doesn't appear again in this session/install
                await AsyncStorage.setItem(approvedKey, 'true');
                // Also mark unsuspended as true to prevent double alerts
                await AsyncStorage.setItem(unsuspendedKey, 'true');
                router.push('/(courier)/home');
              }
            }]
          );
        } else {
          // Already seen, go directly
          router.push('/(courier)/home');
        }

      } catch (error) {
        console.log("Storage Error", error);
        router.push('/(courier)/home');
      }

    } else if (courierStatus === 4) { // Suspended
      // Reset alerts so they see them again if they get unsuspended later
      try {
        await AsyncStorage.removeItem(`hasSeenUnsuspendedAlert_${userId}`);
        await AsyncStorage.removeItem(`hasSeenApprovedAlert_${userId}`);
      } catch (e) { }

      const reasonText = suspensionReason ? suspensionReason : "Violation of policies.";
      Alert.alert(
        "Account Suspended",
        `Your courier account has been suspended.\n\nReason: ${reasonText}\n\nPlease contact support.`
      );

    } else {
      // Fallback for unknown status
      Alert.alert("Access Denied", `Account status: ${courierStatus}`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await supabase.auth.signOut();
              router.replace('/authlog');
            } catch (error) {
              console.error("Logout Error:", error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.maintext}>
            {loading ? (
              <ActivityIndicator size="small" color="#0AB3FF" style={{ alignSelf: 'flex-start' }} />
            ) : (
              <>
                <Text style={styles.subtext}>{profile.fullName}</Text>
                <Text style={styles.subtext1}>{profile.phoneNumber}</Text>
              </>
            )}
          </View>
          <Pressable onPress={() => router.push('/(customer)/menu/profile')}>
            <Image source={edit} style={styles.editicon} />
          </Pressable>
        </View>
        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        <View style={styles.settingcontent}>
          <View style={styles.settingsubcontent}>
            <Text style={[styles.settingsubtext, { color: colors.text, flex: 1 }]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.tint }}
              thumbColor={'#f4f3f4'}
            />
          </View>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(customer)/menu/settings')}>
            <Image source={setting} style={styles.ordericon} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Settings</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(customer)/menu/notification')}>
            <Image source={notification} style={styles.ordericon} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Notification</Text>
          </Pressable>

          <Pressable
            style={styles.settingsubcontent}
            onPress={handleSwitchToCourier}
          >
            <Image source={switchcour} style={styles.ordericon} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Switch To Courier</Text>
            {/* Show loading indicator if logic is processing */}
            {loading && <ActivityIndicator size="small" color="#ffffff" style={{ marginLeft: 10 }} />}
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(customer)/menu/about')}>
            <Image source={about} style={styles.ordericon} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>About</Text>
          </Pressable>

          <View style={styles.settingsubcontent}>
            <Image source={share} style={styles.ordericon} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Check Our Pickarry Website</Text>
          </View>

          <Pressable style={styles.settingsubcontent} onPress={handleLogout}>
            <Image source={logout} style={styles.ordericon} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 15,
    marginTop: verticalScale(30),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 20,
  },
  maintext: {
    flexDirection: 'column',
    marginTop: '5'
  },
  subtext: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0AB3FF',
    marginBottom: 5,
  },
  subtext1: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#0AB3FF',
    marginBottom: 5,
  },
  editicon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  settingcontent: {
    flexDirection: 'column',
    width: '100%',
    marginTop: verticalScale(1),
  },
  settingsubcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  settingsubtext: {
    fontFamily: 'Roboto-Light',
    fontSize: 17,
    fontWeight: '300',
    fontWeight: '300',
  },
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
});