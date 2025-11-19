import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

export default function CustomerMenu() {
  const router = useRouter();

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
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          const [profileResult, courierResult] = await Promise.all([
             supabase
              .from('service_user')
              .select('full_name, phone_number')
              .eq('user_id', user.id)
              .single(),

             supabase
              .from('courier')
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
            setCourierStatus('not_registered');
          }
        } else {
          setCourierStatus('not_registered');
        }
      } catch (error) {
        console.error("Error fetching menu data:", error.message);
        setCourierStatus('not_registered');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSwitchToCourier = async () => {
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
        const unsuspendedKey = `hasSeenUnsuspendedAlert_${userId}`; // New Key

        const hasSeenApproved = await AsyncStorage.getItem(approvedKey);
        const hasSeenUnsuspended = await AsyncStorage.getItem(unsuspendedKey);

        // Scenario 1: User was just Approved (First time)
        if (hasSeenApproved !== 'true') {
            Alert.alert(
                "Application Approved",
                "Congratulations! Your courier application has been approved. You can now access the courier dashboard.",
                [{
                    text: "Go to Dashboard",
                    onPress: async () => {
                        await AsyncStorage.setItem(approvedKey, 'true');
                        // Also mark unsuspend as seen to prevent double alerts if they were never suspended
                        await AsyncStorage.setItem(unsuspendedKey, 'true');
                        router.push('/(courier)/home');
                    }
                }]
            );
            return;
        }

        // Scenario 2: User was Suspended and is now Active (Unsuspended)
        // We detect this because hasSeenUnsuspended will be null/false (we clear it on suspension)
        if (hasSeenUnsuspended !== 'true' && hasSeenApproved === 'true') {
             Alert.alert(
                "Account Reactivated",
                "Your account has been unsuspended and is now Active. You may proceed to the dashboard.",
                [{
                    text: "Go to Dashboard",
                    onPress: async () => {
                        await AsyncStorage.setItem(unsuspendedKey, 'true');
                        router.push('/(courier)/home');
                    }
                }]
            );
            return;
        }

        // Scenario 3: Normal Active User
        router.push('/(courier)/home');

      } catch (error) {
        console.log("Storage Error", error);
        router.push('/(courier)/home');
      }

    } else if (courierStatus === 4) { // Suspended
       // IMPORTANT: Reset the 'Unsuspended' flag so they see the alert when they get active again
       try {
           await AsyncStorage.removeItem(`hasSeenUnsuspendedAlert_${userId}`);
       } catch(e) {}

       // Display Suspension Reason
       const reasonText = suspensionReason ? suspensionReason : "Violation of policies.";
       Alert.alert(
         "Account Suspended",
         `Your courier account has been suspended.\n\nReason: ${reasonText}\n\nPlease contact support.`
       );

    } else {
      Alert.alert("Access Denied", `Your account status code is: ${courierStatus}`);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    router.replace('/authlog');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.maintext}>
             {loading ? (
                <ActivityIndicator size="small" color="#0AB3FF" style={{alignSelf:'flex-start'}} />
             ) : (
                <>
                  <Text style={styles.subtext}>{profile.fullName}</Text>
                  <Text style={styles.subtext1}>{profile.phoneNumber}</Text>
                </>
             )}
          </View>
          <Pressable onPress={() => router.push('/(customer)/menu/profile')}>
            <Image source={edit} style={styles.editicon}/>
          </Pressable>
        </View>
        <View style={styles.separator} />

        <View style={styles.settingcontent}>
          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(customer)/menu/settings')}>
            <Image source={setting} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Settings</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(customer)/menu/notification')}>
            <Image source={notification} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Notification</Text>
          </Pressable>

           <Pressable
            style={styles.settingsubcontent}
            onPress={handleSwitchToCourier}
          >
            <Image source={switchcour} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Switch To Courier</Text>
            {loading && <ActivityIndicator size="small" color="#ffffff" style={{marginLeft: 10}} />}
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(customer)/menu/about')}>
            <Image source={about} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>About</Text>
          </Pressable>

          <View style={styles.settingsubcontent}>
            <Image source={share} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Check Our Pickarry Website</Text>
          </View>

          <Pressable style={styles.settingsubcontent} onPress={handleLogout}>
            <Image source={logout} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
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
    backgroundColor: '#363D47',
    width: '100%',
    marginBottom: 20,
  },
  maintext: {
    flexDirection: 'column',
    marginTop:'5'
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
    color: '#ffffff',
  },
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
});