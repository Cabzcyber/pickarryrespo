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

const auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelected] = useState(false);
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

        // 2. Check the 'service_user' table for the user's role or type
        // We select the 'user_type' column. Ensure this column exists in your DB.
        const { data: userProfile, error: profileError } = await supabase
          .from('service_user')
          .select('user_type') 
          .eq('user_id', userId)
          .single();

        if (profileError) {
          console.log("Error fetching user profile:", profileError.message);
          // Fallback: If we can't verify role, default to customer or show error
          router.replace('/(customer)/home'); 
          return;
        }

        // 3. ROUTING LOGIC based on User Type
        // Change 'admin' to whatever string you stored in your database for admins
        if (userProfile?.user_type === 'admin') {
          console.log("Admin Logged In");
          router.replace('/(admin)/home');
        } else {
          console.log("Customer/Courier Logged In");
          router.replace('/(customer)/home');
        }
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.error(error);
    } finally {
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
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.textinput}
                placeholder='Enter Your Password'
                placeholderTextColor='#7398A9'
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize='none'
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={styles.remembercontainer}>
            <View style={styles.recover}>
              <CheckBox
                checked={isSelected}
                onPress={() => setSelected(!isSelected)}
                checkedColor='#1976d2'
                uncheckedColor='#aaa'
                containerStyle={{ padding: 0, margin: 0, marginRight: 5 }}
              />
              <Text style={{ color: '#FFFFFF', marginLeft: 0 }}>Remember Me</Text>
            </View>
            <View style={styles.recover}>
              <Text
                style={{ color: '#1976d2', textDecorationLine: 'underline' }}
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
    alignSelf: 'center',
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
    PointerEvents: 'auto',
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
    PointerEvents: 'auto',
    marginTop: verticalScale(-60),
    rowGap: 10,
  },
  inputcontainer: {
    flexDirection: 'column',
    width: '90%',
    height: '28%',
    maxWidth: 1024,
    padding: 10,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  textinput: {
    flex: 1,
    fontFamily: 'Roboto-Light',
    color: '#7398A9',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.12,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
  },
  remembercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
    alignSelf: 'center',
    marginTop: verticalScale(-60),
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
    pointerEvents: 'auto',
    backgroundColor: '#3BF579',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  maintextbutton: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  }
});