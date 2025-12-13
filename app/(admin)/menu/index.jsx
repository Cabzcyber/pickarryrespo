import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Alert, ActivityIndicator, Switch } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminMenu() {
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();

  // Assets
  const setting = require("@/assets/images/setting.png");
  const notification = require("@/assets/images/notification.png");
  const calculator = require("@/assets/images/calculator.png");
  const report = require("@/assets/images/report.png");
  const general = require("@/assets/images/general.png");
  const logout = require("@/assets/images/logout.png");
  const themeIcon = require("@/assets/images/theme.png"); // Assuming you have a theme icon, or reuse setting

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
        </View>
        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        <View style={styles.settingcontent}>

          {/* Dark Mode Toggle */}
          <View style={styles.settingsubcontent}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={themeIcon} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#0AB3FF" }}
              thumbColor={theme === 'dark' ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={theme === 'dark'}
            />
          </View>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/notification')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={notification} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Notification</Text>
            </View>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/about')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={calculator} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Fare</Text>
            </View>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/profile')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={report} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Complaint</Text>
            </View>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/term')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={general} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>General Terms & Conditions</Text>
            </View>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/settings')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={setting} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Settings</Text>
            </View>
          </Pressable>

          <Pressable style={styles.settingsubcontent} onPress={handleLogout}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={logout} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Log Out</Text>
            </View>
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
    justifyContent: 'space-between', // Changed to space-between for toggle
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