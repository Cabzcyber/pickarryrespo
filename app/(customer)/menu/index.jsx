import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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

  const [isCourier, setIsCourier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    fullName: 'Loading...',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Get the current logged-in user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 2. Parallel Fetch: Get Profile AND Check Courier Status
          const [profileResult, courierResult] = await Promise.all([
             supabase
              .from('service_user')
              .select('full_name, phone_number')
              .eq('user_id', user.id)
              .single(),

             supabase
              .from('courier')
              .select('user_id')
              .eq('user_id', user.id)
              .maybeSingle() // Use maybeSingle to avoid errors if not found
          ]);

          // Handle Profile Data
          if (profileResult.data) {
             setProfile({
               fullName: profileResult.data.full_name || 'No Name',
               phoneNumber: profileResult.data.phone_number ? String(profileResult.data.phone_number) : ''
             });
          }

          // Handle Courier Status
          if (courierResult.data) {
            setIsCourier(true); // Is a registered courier
          } else {
            setIsCourier(false); // Not a courier
          }
        } else {
          setIsCourier(false);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error.message);
        setIsCourier(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSwitchToCourier = () => {
    if (isCourier === true) {
      // User is already registered, go to courier home
      router.push('/(courier)/home');
    } else if (isCourier === false) {
      // User is not registered, go to courier registration
      router.push('/(courier)/registration/courierauthsign');
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
            disabled={isCourier === null}
          >
            <Image source={switchcour} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Switch To Courier</Text>
            {isCourier === null && <ActivityIndicator size="small" color="#ffffff" style={{marginLeft: 10}} />}
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