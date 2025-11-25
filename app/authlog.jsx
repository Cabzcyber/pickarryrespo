import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Make sure this path is correct
import supabase from '../lib/supabase';
import { verticalScale } from 'react-native-size-matters';

const logoimg = require("@/assets/images/logologin.png");
const eyeIcon = require("@/assets/images/eye.png");

const auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  async function signlogauth() {
    setLoading(true);
    try {
      // 1. Authenticate with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const userId = data.user.id;

        // 2. Fetch User Profile AND Status
        // Added: userstatus_id and suspension_reason to the select query
        const { data: userProfile, error: profileError } = await supabase
          .from('service_user')
          .select('user_type, userstatus_id, suspension_reason')
          .eq('user_id', userId)
          .single();

        if (profileError) {
          console.log("Error fetching user profile:", profileError.message);
          setLoading(false);
          return;
        }

        // --- SECURITY CHECK: SUSPENSION CONDITION ---
        // Based on your Admin Table: 4 = Suspended
        if (userProfile?.userstatus_id === 4) {

           // A. Construct the Rejection Message
           const reason = userProfile.suspension_reason || "Violation of policies";
           const message = `Your account is currently suspended for 1 day.\n\nReason: ${reason}`;

           // B. Alert the User
           Alert.alert("Access Denied", message);

           // C. Force Sign Out (Crucial Security Step)
           // This ensures the session is killed and they cannot bypass this screen
           await supabase.auth.signOut();

           setLoading(false);
           return; // STOP execution here
        }

        // 3. ROUTING LOGIC based on User Type (Only runs if NOT suspended)
        if (userProfile?.user_type === 'admin') {
          router.replace('/(admin)/home');
        } else if (userProfile?.user_type === 'courier') {
          router.replace('/(courier)/home');
        } else {
          router.replace('/(customer)/home');
        }
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.error(error);
    } finally {
      // Only stop loading if we haven't redirected yet
      // (though usually router.replace unmounts this component)
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.allcontainer}>
        <View>
          <Image source={logoimg} style={styles.TopImage} />
        </View>

        <View style={styles.form}>
          {/* Navigation Bar */}
          <View style={styles.authbarcontainer}>
            <View style={styles.logincontainer}>
              <Pressable style={styles.authbutton}>
                <Text style={styles.authtext}>Log In</Text>
              </Pressable>
            </View>
            <View style={styles.logincontainer}>
              <Pressable
                style={styles.authbutton}
                onPress={() => router.push('/authsign')}
              >
                <Text style={styles.authtext1}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.maininputcontainer}>

            {/* Email Input */}
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.textinput}
                placeholder='Enter Your Email Address'
                placeholderTextColor='#7398A9'
                onChangeText={(text) => setEmailAddress(text)}
                value={email}
                autoCapitalize='none'
                keyboardType="email-address"
              />
            </View>

            {/* Password Input with Hide/Show Toggle */}
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Password</Text>
              <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder='Enter Your Password'
                    placeholderTextColor='#7398A9'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize='none'
                    secureTextEntry={!isPasswordVisible}
                  />
                  <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
                      <Image
                          source={eyeIcon}
                          style={[
                              styles.eyeIcon,
                              { tintColor: isPasswordVisible ? '#0AB3FF' : '#7398A9' }
                          ]}
                      />
                  </Pressable>
              </View>
            </View>

            <View style={styles.remembercontainer}>
              <View style={styles.recover}>
                <CheckBox
                  checked={isSelected}
                  onPress={() => setSelected(!isSelected)}
                  checkedColor='#0AB3FF'
                  uncheckedColor='#aaa'
                  containerStyle={{ padding: 0, margin: 0, marginRight: 5 }}
                />
                <Text style={{ color: '#FFFFFF', marginLeft: 0 }}>Remember Me</Text>
              </View>
              <View style={styles.recover}>
                <Text
                  style={{ color: '#0AB3FF', textDecorationLine: 'underline' }}
                  onPress={() => router.push('terms')}
                >
                  Forgot Password?
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.mainbutton}
              onPress={() => signlogauth()}
              disabled={loading}
            >
              {loading ? (
                 <ActivityIndicator color="black" />
              ) : (
                 <Text style={styles.maintextbutton}>Log In</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
  },
  TopImage: {
    alignSelf: 'center',
    top: hp('17.3%'),
    width: wp('80%'),
    height: hp('14.54%'),
    resizeMode: 'contain',
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    alignSelf: 'center',
    width: '90%',
    marginTop: 13,
    marginBottom: 20,
  },
  allcontainer: {
    flex: 1,
    rowGap: 20,
  },
  form: {
    marginTop: verticalScale(80.91),
  },
  authbarcontainer: {
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 90,
    marginTop: verticalScale(36.82),
  },
  authtext: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 23,
    color: '#0AB3FF',
  },
  authtext1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 23,
    color: '#ffffff',
  },
  title: {
    justifyContent: 'flex-start',
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.12,
    marginBottom: 11,
  },
  authbutton: {
    width: '100%'
  },
  maininputcontainer: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: verticalScale(8),
    rowGap: 10,
  },
  inputcontainer: {
    flexDirection: 'column',
    width: '90%',
    maxWidth: 1024,
    padding: 10,
    marginHorizontal: 'auto',
  },
  textinput: {
    height: 50,
    fontFamily: 'Roboto-Light',
    color: '#7398A9',
    fontSize: 16,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Roboto-Light',
    color: '#7398A9',
    fontSize: 16,
    height: '100%',
  },
  eyeIconContainer: {
    padding: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  remembercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
    alignSelf: 'center',
    marginTop: verticalScale(8),
  },
  recover: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainbutton: {
    flexDirection: 'column',
    width: '84%',
    maxWidth: 1024,
    padding: 10,
    marginHorizontal: 'auto',
    backgroundColor: '#3BF579',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  maintextbutton: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
});