import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator, Alert, Switch } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

export default function CourierMenu() {
  const router = useRouter();
  const { colors, toggleTheme, isDarkMode } = useTheme();

  // Assets
  const edit = require("@/assets/images/edit.png");
  const setting = require("@/assets/images/setting.png");
  const notification = require("@/assets/images/notification.png");
  const switchcour = require("@/assets/images/switchcour.png");
  const about = require("@/assets/images/about.png");
  const share = require("@/assets/images/share.png");
  const logout = require("@/assets/images/logout.png");
  const themeIcon = require("@/assets/images/theme.png");

  // State
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    fullName: 'Loading...',
    phoneNumber: ''
  });

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from('service_user')
            .select('full_name, phone_number')
            .eq('user_id', user.id)
            .single();

          if (error) throw error;

          if (data) {
            setProfile({
              fullName: data.full_name || 'No Name',
              phoneNumber: data.phone_number ? String(data.phone_number) : ''
            });
          }
        }
      } catch (error) {
        console.log('Error fetching profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- IMPROVED LOGOUT FUNCTION ---
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
          style: "destructive", // Shows red on iOS
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) throw error;

              // Redirect to your auth/login page
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.maintext}>
            {loading ? (
              <ActivityIndicator size="small" color="#0AB3FF" style={{ alignSelf: 'flex-start' }} />
            ) : (
              <>
                {/* Profile Name and Phone Number - Fixed Blue Color */}
                <Text style={styles.subtext}>{profile.fullName}</Text>
                <Text style={styles.subtext1}>{profile.phoneNumber}</Text>
              </>
            )}
          </View>
          <Pressable onPress={() => router.push('/(courier)/menu/courierprofile')}>
            <Image source={edit} style={[styles.editicon, { tintColor: '#0AB3FF' }]} />
          </Pressable>
        </View>
        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        <View style={styles.settingcontent}>

          {/* Dark Mode Toggle */}
          <View style={styles.settingsubcontent}>
            <Image source={themeIcon} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <Text style={[styles.settingsubtext, { color: colors.text, flex: 1 }]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#0AB3FF' }}
              thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(courier)/menu/couriersettings')}>
            <Image source={setting} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Settings</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(courier)/menu/couriernotification')}>
            <Image source={notification} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Notification</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.replace('/(customer)/home')}>
            <Image source={switchcour} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Switch To Customer</Text>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(courier)/menu/courierabout')}>
            <Image source={about} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>About</Text>
          </Pressable>

          <View style={styles.settingsubcontent}>
            <Image source={share} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <Text style={[styles.settingsubtext, { color: colors.text }]}>Check Our Pickarry Website</Text>
          </View>

          <Pressable style={styles.settingsubcontent} onPress={handleLogout}>
            <Image source={logout} style={[styles.ordericon, { tintColor: '#FF4444' }]} />
            <Text style={[styles.settingsubtext, { color: '#FF4444' }]}>Log Out</Text>
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
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0AB3FF', // Fixed Blue Color
    marginBottom: 5,
  },
  subtext1: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#0AB3FF', // Fixed Blue Color
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
  },
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
});