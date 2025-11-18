import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

const backimg = require("@/assets/images/back.png");
const headerlogo = require("@/assets/images/headerlogo.png");
const headerheart = require("@/assets/images/heart.png");

export default function Terms() {
    const router = useRouter();
    const [isSelected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    // Receive params from previous screen
    const params = useLocalSearchParams();

    // Parse the incoming data
    const registrationData = useMemo(() => {
      try {
        return {
          value: params?.vehicle_id || '',
          color: params?.vehicle_color || '',
          plate: params?.plate_number || '',
          vehicle_brand: params?.vehicle_brand || '',
          otherdetails_vehicle: params?.otherdetails_vehicle || '',
          // Parse the JSON strings back into objects
          licenseFront: params?.licenseFront ? JSON.parse(String(params.licenseFront)) : null,
          licenseBack: params?.licenseBack ? JSON.parse(String(params.licenseBack)) : null,
        };
      } catch (e) {
        console.log("Error parsing params", e);
        return {
          value: '', color: '', plate: '', vehicle_brand: '', otherdetails_vehicle: '',
          licenseFront: null, licenseBack: null
        };
      }
    }, [params]);

    const handleSubmit = async () => {
      if (!isSelected) {
        Alert.alert('Agreement Required', 'You must agree to the terms and conditions.');
        return;
      }

      // Double check we have images
      if (!registrationData.licenseFront || !registrationData.licenseBack) {
        Alert.alert('Error', 'Image data missing. Please go back and select images again.');
        return;
      }

      try {
        setLoading(true);

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error(authError?.message || 'Could not get current user.');
        }

        const serviceid = user.id;
        let frontImageUrl = null;
        let backImageUrl = null;

        // --- 1. Upload Front Image ---
        const frontFile = registrationData.licenseFront.base64;
        const frontFileExt = registrationData.licenseFront.uri.split('.').pop();
        const frontFilePath = `${serviceid}/license_front_${Date.now()}.${frontFileExt}`;

        const { data: frontData, error: frontError } = await supabase.storage
          .from('licenses')
          .upload(frontFilePath, decode(frontFile), { contentType: `image/${frontFileExt}`, upsert: true });

        if (frontError) throw new Error('Front Image Upload Failed: ' + frontError.message);

        const { data: frontUrlData } = supabase.storage.from('licenses').getPublicUrl(frontData.path);
        frontImageUrl = frontUrlData.publicUrl;

        // --- 2. Upload Back Image ---
        const backFile = registrationData.licenseBack.base64;
        const backFileExt = registrationData.licenseBack.uri.split('.').pop();
        const backFilePath = `${serviceid}/license_back_${Date.now()}.${backFileExt}`;

        const { data: backData, error: backError } = await supabase.storage
          .from('licenses')
          .upload(backFilePath, decode(backFile), { contentType: `image/${backFileExt}`, upsert: true });

        if (backError) throw new Error('Back Image Upload Failed: ' + backError.message);

        const { data: backUrlData } = supabase.storage.from('licenses').getPublicUrl(backData.path);
        backImageUrl = backUrlData.publicUrl;

        // --- 3. Insert Database Record ---
        const { error: insertError } = await supabase.from('courier').insert({
          user_id: serviceid,
          vehicle_id: registrationData.value,
          vehicle_color: registrationData.color,
          plate_number: registrationData.plate,
          vehicle_brand: registrationData.vehicle_brand,
          otherdetails_vehicle: registrationData.otherdetails_vehicle,
          license_front: frontImageUrl, // Column Name: license_front
          license_back: backImageUrl,   // Column Name: license_back
        });

        if (insertError) {
          throw new Error('Database Insert Failed: ' + insertError.message);
        }

        // Success
        router.replace('/(courier)/registration/otp');

      } catch (e) {
        console.log(e);
        Alert.alert('Error', e.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable style={styles.headerbutton} onPress={()=>router.back()}>
            <Image  source={backimg} style={styles.backIcon}/>
            </Pressable>
            <Image  source={headerlogo} style={styles.logo}/>
            <Pressable style={styles.headerbutton} onPress={()=>{}}>
                <Image  source={headerheart} style={styles.heartIcon}/>
            </Pressable>
        </View>

      <Text style={{ color: '#2196F3', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
        Terms of Service & Policy Use
      </Text>

      <View style={{ height: 2, backgroundColor: '#2196F3', width: '100%', marginBottom: 16 }} />

      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Section 1:</Text>
        <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla nunc, condimentum a libero at, convallis mollis est.
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Section 2:</Text>
        <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 }}>
           Morbi in arcu sodales, vehicula magna et, ullamcorper orci. In blandit purus in rutrum mattis.
        </Text>
      </ScrollView>

      <View style={styles.recover}>
          <CheckBox
            checked={isSelected}
            onPress={() => setSelected(!isSelected)}
            checkedColor='#1976d2'
            uncheckedColor='#aaa'
            containerStyle={{padding: 0, margin: 0, marginLeft: 0, marginRight: 10, backgroundColor: 'transparent', borderWidth: 0}}
           />
          <View style={{flex: 1}}>
            <Text style={{ color: '#FFFFFF', flexWrap: 'wrap'}}>
                I Agree to
                <Text
                    style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                    onPress={() => router.push('terms')}
                >
                    {"  "}Terms of Service{"  "}
                </Text>&
                <Text
                    style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                    onPress={() => router.push('terms')}
                >
                    {"  "}
                    Privacy Policy
                </Text>
            </Text>
          </View>
      </View>

      <Pressable style={styles.mainbutton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
            <ActivityIndicator color="black" />
        ) : (
            <Text style={styles.maintextbutton}>Sign Up</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#141519',
  },
  mainbutton:{
    width:'100%',
    padding:15,
    backgroundColor:'#3BF579',
    borderRadius: 10,
    justifyContent:"center",
    alignItems:'center',
    marginTop: 20,
    marginBottom: 20
  },
  maintextbutton:{
    fontSize:18,
    color:'black',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop: verticalScale(20),
  },
  headerbutton:{
    width:37,
    height:36,
    borderRadius: 10,
    backgroundColor:'#22262F',
    alignItems:'center',
    justifyContent:'center',
  },
  backIcon:{
    width:30,
    height:30,
    resizeMode:'contain',
  },
  logo:{
    width:120,
    height:28,
    resizeMode:'contain',
  },
  heartIcon:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  recover:{
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
});