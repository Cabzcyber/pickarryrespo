import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

export default function CourierMenu() {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
           <Pressable onPress={() => router.push('/(courier)/menu/courierprofile')}>
             <Image source={edit} style={styles.editicon}/>
           </Pressable>
         </View>
         <View style={styles.separator} />

         <View style={styles.settingcontent}>
           <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(courier)/menu/couriersettings')}>
             <Image source={setting} style={styles.ordericon}/>
             <Text style={styles.settingsubtext}>Settings</Text>
           </Pressable>

           <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(courier)/menu/couriernotification')}>
             <Image source={notification} style={styles.ordericon}/>
             <Text style={styles.settingsubtext}>Notification</Text>
           </Pressable>

           <Pressable  style={styles.settingsubcontent} onPress={() => router.replace('/(customer)/home')}>
             <Image source={switchcour} style={styles.ordericon}/>
             <Text style={styles.settingsubtext}>Switch To Customer</Text>
           </Pressable>

           <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(courier)/menu/courierabout')}>
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
    fontFamily: 'Roboto-Bold', // Adjusted font family if Roboto Flex isn't loaded
    fontWeight: 'bold',
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