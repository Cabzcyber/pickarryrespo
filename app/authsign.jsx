import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { DatePickerInput } from 'react-native-paper-dates';
import PhoneInput from "react-native-phone-number-input";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RadioForm from "react-native-simple-radio-button";
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../lib/supabase';
import { AntDesign } from '@expo/vector-icons';

const logoimg = require("@/assets/images/logologin.png");
const eyeIcon = require("@/assets/images/eye.png");

const radio_props = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" }
];

const auth = () => {
  const [isSelected, setSelected] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fullname, setFullName] = useState('');
  const [gender, setgender] = useState(null);
  const [email, setEmailAddress] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [address, setaddress] = useState('');
  const [password, setpassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputDate, setInputDate] = useState(undefined);

  const today = new Date();

  async function signupauth() {
    if (!isSelected) {
      Alert.alert("Terms Required", "You must agree to the Terms of Service and Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    try {
      if (!fullname) {
        Alert.alert('Missing Information', 'Please enter your full name.');
        setLoading(false);
        return;
      }
      if (!inputDate) {
        Alert.alert('Missing Birthdate', 'Please select your birthdate.');
        setLoading(false);
        return;
      }
      if (!gender) {
        Alert.alert('Missing Gender', 'Please select your gender.');
        setLoading(false);
        return;
      }
      if (!email || !password) {
        Alert.alert('Missing Credentials', 'Please enter email and password.');
        setLoading(false);
        return;
      }

      const normalizedPhone = formattedPhone ? formattedPhone.replace('+', '') : phonenumber;
      const birthDateString = new Date(inputDate).toISOString();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        Alert.alert('Sign-up Error', authError.message);
        setLoading(false);
        return;
      }

      router.push({
        pathname: '/otp',
        params: {
          email: email.trim(),
          password: password,
          phone: normalizedPhone,
          fullname: fullname.trim(),
          birthDateString: birthDateString,
          gender: gender,
          address: address.trim(),
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        <View style={styles.allcontainer}>
          <View>
            <Image source={logoimg} style={styles.TopImage} />
          </View>
          <View style={styles.form}>
            <View style={styles.authbarcontainer}>
              <View style={styles.logincontainer}>
                <Pressable style={styles.authbutton} onPress={() => router.push('authlog')}>
                  <Text style={styles.authtext}>Log In</Text>
                </Pressable>
              </View>
              <View style={styles.logincontainer}>
                <Pressable style={styles.authbutton}>
                  <Text style={styles.authtext1}>Sign Up</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.separator} />

            <View style={styles.maininputcontainer}>

              {/* Full Name */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Full Name</Text>
                <TextInput
                  style={styles.commonInput}
                  placeholder='Enter Your Full Name'
                  placeholderTextColor='#7398A9'
                  onChangeText={(text) => setFullName(text)}
                  value={fullname}
                  autoCapitalize='words'
                />
              </View>

              {/* Birthdate & Gender Row */}
              <View style={styles.rowinput}>
                <View style={styles.inputcontainerr}>
                  <Text style={styles.title}>Date of Birth</Text>
                  <View style={styles.datePickerContainer}>
                    <DatePickerInput
                      locale="en"
                      label=""
                      value={inputDate}
                      onChange={(date) => setInputDate(date)}
                      endDate={today}
                      inputMode="start"
                      mode="flat"
                      style={styles.datePickerInput}
                      placeholderTextColor="#7398A9"
                      textColor="#7398A9"
                      theme={{
                        colors: {
                          onSurface: '#FFFFFF',
                          onSurfaceVariant: '#7398A9',
                          placeholder: '#7398A9',
                          background: 'transparent',
                        },
                        // CHANGED: Force Regular font for Date Picker text
                        fonts: {
                          bodyLarge: { fontFamily: 'Roboto-Regular' }
                        }
                      }}
                    />
                  </View>
                </View>

                <View style={styles.inputcontainerr}>
                  <Text style={styles.title}>Gender</Text>
                  <RadioForm
                    radio_props={radio_props}
                    initial={-1}
                    onPress={(value) => setgender(String(value))}
                    buttonSize={10}
                    buttonOuterSize={20}
                    selectedButtonColor="#2196F3"
                    buttonColor='#7398A9'
                    labelStyle={{ color: '#FFFFFF', fontSize: 14, marginRight: 10, fontFamily: 'Roboto-Regular' }} // CHANGED
                    formHorizontal={false}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Email Address</Text>
                <TextInput
                  style={styles.commonInput}
                  placeholder='Enter Your Email Address'
                  placeholderTextColor='#7398A9'
                  onChangeText={(text) => setEmailAddress(text)}
                  value={email}
                  autoCapitalize='none'
                  keyboardType='email-address'
                />
              </View>

              {/* Phone Number */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Phone Number</Text>
                <PhoneInput
                  defaultValue={phonenumber}
                  defaultCode="PH"
                  layout="first"
                  onChangeText={(text) => setphonenumber(text)}
                  onChangeFormattedText={(text) => setFormattedPhone(text)}
                  containerStyle={styles.phoneInputContainer}
                  textContainerStyle={styles.phoneTextContainer}
                  textInputStyle={styles.phoneTextInput}
                  codeTextStyle={styles.phoneCodeText}
                  flagButtonStyle={styles.phoneFlagButton}
                  placeholder="912 345 6789"
                  textInputProps={{ placeholderTextColor: '#7398A9' }}
                  renderDropdownImage={<AntDesign name="down" size={16} color="#7398A9" />}
                />
              </View>

              {/* Address */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Address</Text>
                <TextInput
                  style={styles.commonInput}
                  placeholder='Enter Your Address'
                  placeholderTextColor='#7398A9'
                  onChangeText={(text) => setaddress(text)}
                  value={address}
                  autoCapitalize='words'
                />
              </View>

              {/* Password */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder='Enter Your Password'
                    placeholderTextColor='#7398A9'
                    onChangeText={(text) => setpassword(text)}
                    value={password}
                    autoCapitalize='none'
                    secureTextEntry={!isPasswordVisible}
                  />
                  <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
                    <Image
                      source={eyeIcon}
                      style={[
                        styles.eyeIcon,
                        { tintColor: isPasswordVisible ? '#2196F3' : '#7398A9' }
                      ]}
                    />
                  </Pressable>
                </View>
              </View>

              {/* Terms */}
              <View style={styles.remembercontainer}>
                <View style={styles.recover}>
                  <CheckBox
                    checked={isSelected}
                    onPress={() => setSelected(!isSelected)}
                    checkedColor='#1976d2'
                    uncheckedColor='#aaa'
                    containerStyle={{ padding: 0, margin: 0, marginRight: 5 }}
                  />
                  <Text style={{ color: '#FFFFFF', flexShrink: 1, fontFamily: 'Roboto-Regular' }}> {/* CHANGED */}
                    I Agree to
                    <Text
                      style={{ color: '#1976d2', textDecorationLine: 'underline', fontFamily: 'Roboto-Regular' }}
                      onPress={() => router.push('terms')}
                    >
                      {"  "}Terms of Service{"  "}
                    </Text>&
                    <Text
                      style={{ color: '#1976d2', textDecorationLine: 'underline', fontFamily: 'Roboto-Regular' }}
                      onPress={() => router.push('terms')}
                    >
                      {"  "}Privacy Policy
                    </Text>
                  </Text>
                </View>
              </View>

              {/* Continue Button */}
              <Pressable
                style={[styles.mainbutton, { opacity: isSelected ? 1 : 0.6 }]}
                onPress={signupauth}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text style={styles.maintextbutton}>Continue</Text>
                )}
              </Pressable>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default auth

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: '#141519',
  },
  TopImage: {
    alignSelf: 'center',
    top: hp('1.25%'),
    width: wp('64%'),
    height: hp('14.54%'),
    resizeMode: 'contain',
  },
  allcontainer: {
    flex: 1,
    rowGap: 20,
  },
  authbarcontainer: {
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 80,
    marginTop: verticalScale(1),
  },
  authtext: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#ffffff',
  },
  authtext1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#0AB3FF',
  },
  rowinput: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 'auto',
    width: '90%',
    justifyContent: 'space-between'
  },
  maininputcontainer: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: verticalScale(-10),
    rowGap: 10,
    paddingBottom: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    alignSelf: 'center',
    width: '90%',
    marginTop: 15,
    marginBottom: 20,
  },
  inputcontainer: {
    flexDirection: 'column',
    width: '90%',
    paddingVertical: 5,
    marginHorizontal: 'auto',
  },
  inputcontainerr: {
    flexDirection: 'column',
    width: '48%',
  },
  title: {
    fontFamily: 'Roboto-Bold', // Title stays Bold
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 8,
  },
  commonInput: {
    height: 50,
    fontFamily: 'Roboto-Regular', // CHANGED FROM BOLD
    color: '#7398A9',
    fontSize: 15,
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
    fontFamily: 'Roboto-Regular', // CHANGED FROM BOLD
    color: '#7398A9',
    fontSize: 15,
    height: '100%',
  },
  eyeIconContainer: {
    padding: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  datePickerContainer: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  datePickerInput: {
    backgroundColor: 'transparent',
    fontSize: 14,
    height: 50,
    fontFamily: 'Roboto-Regular', // CHANGED FROM BOLD
  },
  phoneInputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 0,
    overflow: 'hidden',
  },
  phoneTextContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    height: '100%',
  },
  phoneTextInput: {
    color: '#7398A9',
    fontSize: 15,
    fontFamily: 'Roboto-Regular', // CHANGED FROM BOLD
    height: '100%',
    paddingVertical: 0,
  },
  phoneCodeText: {
    color: '#7398A9',
    fontSize: 15,
    fontFamily: 'Roboto-Regular', // CHANGED FROM BOLD
  },
  phoneFlagButton: {
    width: 50,
  },
  remembercontainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 15,
  },
  recover: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainbutton: {
    width: '84%',
    backgroundColor: '#3BF579',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    height: 50,
    marginTop: 20,
  },
  maintextbutton: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
  },
});