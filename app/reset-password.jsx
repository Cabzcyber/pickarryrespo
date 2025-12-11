import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../lib/supabase';

const logoimg = require("@/assets/images/logologin.png");
const eyeIcon = require("@/assets/images/eye.png");

export default function ResetPassword() {
  const router = useRouter();
  const { access_token, refresh_token } = useLocalSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Set session on mount if tokens are present
  useEffect(() => {
    console.log("ResetPassword mounted. Params:", { access_token, refresh_token }); // DEBUG LOG
    if (access_token && refresh_token) {
      supabase.auth.setSession({
        access_token,
        refresh_token,
      }).then(({ data, error }) => {
        if (error) console.error("Error setting session:", error);
        else console.log("Session set successfully:", data);
      }).catch(error => {
        console.error("Error setting session catch:", error);
        Alert.alert("Session Error", "Could not restore session from link.");
      });
    } else {
      console.log("No tokens found in params");
    }
  }, [access_token, refresh_token]);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      // The user is already "logged in" via the Deep Link token.
      // We just need to update the password for the active session.
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      Alert.alert(
        "Success",
        "Your password has been updated successfully!",
        [
          {
            text: "Login Now",
            onPress: () => {
              // Redirects to your login page inside the auth folder
              router.replace('/authlog');
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert("Update Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.allcontainer}>
        <View>
          <Image source={logoimg} style={styles.TopImage} />
        </View>

        <View style={styles.form}>
          <Text style={styles.headerTitle}>New Password</Text>
          <Text style={styles.subHeader}>Please enter your new password below.</Text>

          <View style={styles.maininputcontainer}>

            {/* New Password Input */}
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>New Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder='Enter New Password'
                  placeholderTextColor='#7398A9'
                  onChangeText={setPassword}
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

            {/* Confirm Password Input */}
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder='Confirm New Password'
                  placeholderTextColor='#7398A9'
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  autoCapitalize='none'
                  secureTextEntry={!isConfirmPasswordVisible}
                />
                <Pressable onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIconContainer}>
                  <Image
                    source={eyeIcon}
                    style={[
                      styles.eyeIcon,
                      { tintColor: isConfirmPasswordVisible ? '#0AB3FF' : '#7398A9' }
                    ]}
                  />
                </Pressable>
              </View>
            </View>

            {/* Update Button */}
            <Pressable
              style={styles.mainbutton}
              onPress={handleUpdatePassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text style={styles.maintextbutton}>Update Password</Text>
              )}
            </Pressable>

          </View>
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
  TopImage: {
    alignSelf: 'center',
    top: hp('10%'),
    width: wp('60%'),
    height: hp('12%'),
    resizeMode: 'contain',
  },
  allcontainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  form: {
    marginTop: verticalScale(120),
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center'
  },
  maininputcontainer: {
    width: '100%',
    gap: 15,
  },
  inputcontainer: {
    width: '100%',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 10,
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
  mainbutton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3BF579',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
  },
  maintextbutton: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
});