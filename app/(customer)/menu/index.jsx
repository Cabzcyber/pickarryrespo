import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
export default function CustomerMenu() {
  const router = useRouter();
  const edit = require("@/assets/images/edit.png");
const setting = require("@/assets/images/setting.png");
const notification = require("@/assets/images/notification.png");
const switchcour = require("@/assets/images/switchcour.png");
const about = require("@/assets/images/about.png");
const share = require("@/assets/images/share.png");
const logout = require("@/assets/images/logout.png");


const [isCourier, setIsCourier] = useState(null);

// This useEffect runs when the component loads to check the user's status
  useEffect(() => {
    const checkCourierStatus = async () => {
      try {
        // 1. Get the current logged-in user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 2. Check your 'couriers' table to see if a record exists for this user.
          // *** Please adjust 'couriers' and 'user_id' to match your database schema. ***
          const { data, error } = await supabase
            .from('courier') // Your table for registered couriers
            .select('user_id') // We just need to know if a record exists
            .eq('user_id', user.id) // Match against the logged-in user's ID
            .single(); // Fetch a single record

          if (error && error.code !== 'PGRST116') {
             // PGRST116 means "No rows found", which is not an error for .single()
             // Throw other errors
             throw error;
          }

          if (data) {
            // Record found - this user IS a registered courier
            setIsCourier(true);
          } else {
            // No record found - this user is NOT a registered courier
            setIsCourier(false);
          }
        } else {
          // No user is logged in, treat as not a courier
          setIsCourier(false);
        }
      } catch (error) {
        // Handle cases where no row is found
        if (error.code === 'PGRST116') {
            setIsCourier(false); // No record found, not a courier
        } else {
            console.error("Error checking courier status:", error.message);
            setIsCourier(false); // On any other error, assume not a courier
        }
      }
    };

    checkCourierStatus();
  }, []); // The empty array [] means this runs once on component mount

  // This function now holds the logic you requested
  const handleSwitchToCourier = () => {
    if (isCourier === true) {
      // User is already registered, go to courier home
      console.log('User is a courier, pushing to home.');
      router.push('/(courier)/home');
    } else if (isCourier === false) {
      // User is not registered, go to courier registration
      console.log('User is not a courier, pushing to registration.');
      router.push('/(courier)/registration/courierauthsign');
    }
    // if isCourier is null, the button is disabled, so no action is taken
  };

  // Added a function for logging out
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error logging out:', error.message);
    }
    router.replace('/authlog'); // Use replace to prevent going back
  };





  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.maintext}>
            <Text style={styles.subtext}>Gayramara, Dominic</Text>
            <Text style={styles.subtext1}>+6312345678910</Text>
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

          {/* This is the button with the new logic. */}
                    <Pressable
                      style={styles.settingsubcontent}
                      onPress={handleSwitchToCourier}
                      disabled={isCourier === null} // Disable button while checking
                    >
                      <Image source={switchcour} style={styles.ordericon}/>
                      <Text style={styles.settingsubtext}>Switch To Courier</Text>
                      {/* Show a loading spinner while checking status */}
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
          
          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/authlog')}>
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
    fontFamily: 'Roboto Flex',
    fontSize: 20,
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
