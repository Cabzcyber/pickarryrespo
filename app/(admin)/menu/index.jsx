import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

export default function AdminMenu() {
  const router = useRouter();

  // Assets
  const setting = require("@/assets/images/setting.png");
  const notification = require("@/assets/images/notification.png");
  const calculator = require("@/assets/images/calculator.png");
  const report = require("@/assets/images/report.png");
  const general = require("@/assets/images/general.png");
  const logout = require("@/assets/images/logout.png");

  // State
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    fullName: 'Administrator', // Default fallback
    phoneNumber: ''
  });

  // --- FETCH PROFILE DATA ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Attempt to fetch profile details if they exist in service_user
          const { data, error } = await supabase
            .from('service_user')
            .select('full_name, phone_number')
            .eq('user_id', user.id)
            .single();

          if (!error && data) {
            setProfile({
              fullName: data.full_name || 'Administrator',
              phoneNumber: data.phone_number ? String(data.phone_number) : ''
            });
          }
        }
      } catch (error) {
        console.log('Error fetching admin profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- SECURE LOGOUT FUNCTION ---
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) throw error;

              router.replace('/authlog');
            } catch (error) {
              Alert.alert("Error", "Failed to log out. Please try again.");
              console.error("Logout Error:", error.message);
            }
          }
        }
      ]
    );
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
        </View>
        <View style={styles.separator} />

        <View style={styles.settingcontent}>
          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/notification')}>
            <Image source={notification} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Notification</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/about')}>
            <Image source={calculator} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Fare</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent}  onPress={() => router.push('/(admin)/menu/profile')}>
            <Image source={report} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Complaint</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/term')}>
            <Image source={general} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>General Terms & Conditions</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/settings')}>
            <Image source={setting} style={styles.ordericon}/>
            <Text style={styles.settingsubtext}>Settings</Text>
          </Pressable>

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
    fontFamily: 'Roboto-Bold', // Ensure this font is loaded, changed from 'Roboto Flex' for consistency
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