import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  Modal,
  Linking
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import supabase from '../lib/supabase';
import { verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoimg = require("@/assets/images/logologin.png");
const eyeIcon = require("@/assets/images/eye.png");

const auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- FORGOT PASSWORD STATE ---
  const [modalVisible, setModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const router = useRouter();

  // 1. Load Saved Credentials on Mount
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('remember_email');
        const savedPassword = await AsyncStorage.getItem('remember_password');

        if (savedEmail && savedPassword) {
          setEmailAddress(savedEmail);
          setPassword(savedPassword);
          setSelected(true);
        }
      } catch (error) {
        console.log('Error loading credentials:', error);
      }
    };
    loadCredentials();
  }, []);

  // --- DEEP LINKING LISTENER ---
  useEffect(() => {
    const handleDeepLink = (event) => {
      let data = event.url;
      console.log("Deep link received:", data); // DEBUG LOG
      if (data && data.includes('reset-password')) {
        // Parse tokens from URL (hash or query)
        let params = {};
        const parsePart = (part) => {
          const [key, value] = part.split('=');
          if (key && value) params[key] = value;
        };

        if (data.includes('#')) {
          data.split('#')[1].split('&').forEach(parsePart);
        }
        if (data.includes('?')) {
          data.split('?')[1].split('#')[0].split('&').forEach(parsePart);
        }

        console.log("Parsed params:", params); // DEBUG LOG

        // Navigate with tokens
        router.replace({
          pathname: '/reset-password',
          params: {
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          }
        });
      }
    };

    // Warm Start: App is in background
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Cold Start: App is closed
    Linking.getInitialURL().then((url) => {
      if (url && url.includes('reset-password')) {
        // Parse tokens from URL (hash or query)
        let params = {};
        const parsePart = (part) => {
          const [key, value] = part.split('=');
          if (key && value) params[key] = value;
        };

        if (url.includes('#')) {
          url.split('#')[1].split('&').forEach(parsePart);
        }
        if (url.includes('?')) {
          url.split('?')[1].split('#')[0].split('&').forEach(parsePart);
        }

        console.log("Cold start URL:", url); // DEBUG LOG
        console.log("Cold start params:", params); // DEBUG LOG

        router.replace({
          pathname: '/reset-password',
          params: {
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          }
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // 2. HELPER: Centralized Navigation Logic
  const checkUserAndNavigate = async (userId) => {
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from('service_user')
        .select('user_type, userstatus_id, suspension_reason')
        .eq('user_id', userId)
        .single();

      if (profileError) throw profileError;

      if (userProfile?.userstatus_id === 4) {
        const reason = userProfile.suspension_reason || "Violation of policies";
        const message = `Your account is currently suspended for 1 day.\n\nReason: ${reason}`;
        Alert.alert("Access Denied", message);
        await supabase.auth.signOut();
        return;
      }

      if (userProfile?.user_type === 'admin') {
        router.replace('/(admin)/home');
      } else if (userProfile?.user_type === 'courier') {
        router.replace('/(courier)/home');
      } else {
        router.replace('/(customer)/home');
      }
    } catch (error) {
      console.log("Navigation Error:", error.message);
      Alert.alert("Error", "Could not fetch user profile.");
    }
  };

  // --- MANUAL LOGIN LOGIC ---
  async function signlogauth() {
    setLoading(true);
    try {
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
        if (isSelected) {
          await AsyncStorage.setItem('remember_email', email);
          await AsyncStorage.setItem('remember_password', password);
        } else {
          await AsyncStorage.removeItem('remember_email');
          await AsyncStorage.removeItem('remember_password');
        }
        await checkUserAndNavigate(data.user.id);
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.error(error);
    } finally {
      if (!loading) setLoading(false);
    }
  }

  // --- FORGOT PASSWORD LOGIC ---
  async function handlePasswordReset() {
    if (!forgotEmail) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    setResetLoading(true);
    try {
      // NOTE: Ensure 'pickarry' scheme matches your app.json
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: 'pickarry://reset-password'
      });

      if (error) throw error;

      Alert.alert(
        "Check your email",
        "If an account exists for " + forgotEmail + ", you will receive a password reset link.",
        [{ text: "OK", onPress: () => setModalVisible(false) }]
      );
      setForgotEmail('');

    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <Text style={styles.modalSubtitle}>Enter your email to receive a reset link.</Text>
            <View style={styles.inputcontainer}>
              <TextInput
                style={styles.textinput}
                placeholder='Enter Your Email Address'
                placeholderTextColor='#7398A9'
                onChangeText={setForgotEmail}
                value={forgotEmail}
                autoCapitalize='none'
                keyboardType="email-address"
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)} disabled={resetLoading}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.submitButton]} onPress={handlePasswordReset} disabled={resetLoading}>
                {resetLoading ? <ActivityIndicator color="white" size="small" /> : <Text style={styles.submitButtonText}>Send Link</Text>}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.allcontainer}>
        <View><Image source={logoimg} style={styles.TopImage} /></View>
        <View style={styles.form}>
          <View style={styles.authbarcontainer}>
            <View style={styles.logincontainer}><Pressable style={styles.authbutton}><Text style={styles.authtext}>Log In</Text></Pressable></View>
            <View style={styles.logincontainer}><Pressable style={styles.authbutton} onPress={() => router.push('/authsign')}><Text style={styles.authtext1}>Sign Up</Text></Pressable></View>
          </View>
          <View style={styles.separator} />
          <View style={styles.maininputcontainer}>
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Email</Text>
              <TextInput style={styles.textinput} placeholder='Enter Your Email Address' placeholderTextColor='#7398A9' onChangeText={(text) => setEmailAddress(text)} value={email} autoCapitalize='none' keyboardType="email-address" />
            </View>
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput style={styles.passwordInput} placeholder='Enter Your Password' placeholderTextColor='#7398A9' onChangeText={(text) => setPassword(text)} value={password} autoCapitalize='none' secureTextEntry={!isPasswordVisible} />
                <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
                  <Image source={eyeIcon} style={[styles.eyeIcon, { tintColor: isPasswordVisible ? '#0AB3FF' : '#7398A9' }]} />
                </Pressable>
              </View>
            </View>
            <View style={styles.remembercontainer}>
              <View style={styles.recover}>
                <CheckBox checked={isSelected} onPress={() => setSelected(!isSelected)} checkedColor='#0AB3FF' uncheckedColor='#aaa' containerStyle={{ padding: 0, margin: 0, marginRight: 5 }} />
                <Text style={{ color: '#FFFFFF', marginLeft: 0 }}>Remember Me</Text>
              </View>
              <View style={styles.recover}>
                <Text style={{ color: '#0AB3FF', textDecorationLine: 'underline' }} onPress={() => setModalVisible(true)}>Forgot Password?</Text>
              </View>
            </View>
            <Pressable style={styles.mainbutton} onPress={() => signlogauth()} disabled={loading}>
              {loading ? <ActivityIndicator color="black" /> : <Text style={styles.maintextbutton}>Log In</Text>}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default auth;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141519' },
  TopImage: { alignSelf: 'center', top: hp('17.3%'), width: wp('80%'), height: hp('14.54%'), resizeMode: 'contain', flexDirection: 'row' },
  separator: { height: 1, backgroundColor: '#363D47', alignSelf: 'center', width: '90%', marginTop: 13, marginBottom: 20 },
  allcontainer: { flex: 1, rowGap: 20 },
  form: { marginTop: verticalScale(80.91) },
  authbarcontainer: { justifyContent: "center", flexDirection: 'row', alignItems: 'center', gap: 90, marginTop: verticalScale(36.82) },
  authtext: { fontFamily: 'Roboto-Bold', fontSize: 20, lineHeight: 23, color: '#0AB3FF' },
  authtext1: { fontFamily: 'Roboto-Bold', fontSize: 20, lineHeight: 23, color: '#ffffff' },
  title: { justifyContent: 'flex-start', fontFamily: 'Roboto-Bold', color: '#FFFFFF', fontSize: 15, lineHeight: 18, letterSpacing: 0.12, marginBottom: 11 },
  authbutton: { width: '100%' },
  maininputcontainer: { justifyContent: "center", alignItems: 'center', marginTop: verticalScale(8), rowGap: 10 },
  inputcontainer: { flexDirection: 'column', width: '90%', maxWidth: 1024, padding: 10, marginHorizontal: 'auto' },
  textinput: { height: 50, fontFamily: 'Roboto-Light', color: '#7398A9', fontSize: 16, borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, backgroundColor: 'transparent' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', height: 50, borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, backgroundColor: 'transparent' },
  passwordInput: { flex: 1, fontFamily: 'Roboto-Light', color: '#7398A9', fontSize: 16, height: '100%' },
  eyeIconContainer: { padding: 5 },
  eyeIcon: { width: 24, height: 24, resizeMode: 'contain' },
  remembercontainer: { flexDirection: 'row', justifyContent: 'space-between', width: '89%', alignSelf: 'center', marginTop: verticalScale(8) },
  recover: { flexDirection: 'row', alignItems: 'center' },
  mainbutton: { flexDirection: 'column', width: '84%', maxWidth: 1024, padding: 10, marginHorizontal: 'auto', backgroundColor: '#3BF579', borderRadius: 10, justifyContent: "center", alignItems: 'center', marginTop: verticalScale(15) },
  maintextbutton: { fontSize: 18, color: 'black', fontFamily: 'Roboto-Bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#1f2937', borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#363D47', elevation: 5 },
  modalTitle: { fontFamily: 'Roboto-Bold', fontSize: 20, color: '#FFFFFF', marginBottom: 10 },
  modalSubtitle: { fontFamily: 'Roboto-Light', fontSize: 14, color: '#d1d5db', textAlign: 'center', marginBottom: 20 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20, gap: 10 },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  cancelButton: { backgroundColor: '#374151' },
  submitButton: { backgroundColor: '#0AB3FF' },
  cancelButtonText: { color: '#FFFFFF', fontFamily: 'Roboto-Bold' },
  submitButtonText: { color: '#FFFFFF', fontFamily: 'Roboto-Bold' },
});