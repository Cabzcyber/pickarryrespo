import { decode } from 'base64-arraybuffer';
import { File } from 'expo-file-system'; // <--- UPDATED IMPORT (New API)
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

    const params = useLocalSearchParams();

    const registrationData = useMemo(() => {
      try {
        return {
          value: params?.vehicle_id || '',
          color: params?.vehicle_color || '',
          plate: params?.plate_number || '',
          vehicle_brand: params?.vehicle_brand || '',
          otherdetails_vehicle: params?.otherdetails_vehicle || '',
          // Safely parse the objects
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

      if (!registrationData.licenseFront?.uri || !registrationData.licenseBack?.uri) {
        Alert.alert('Error', 'Image data missing. Please go back and select images again.');
        return;
      }

      try {
        setLoading(true);

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error('Could not get current user.');

        const serviceid = user.id;
        const timestamp = Date.now();
        let frontImageUrl = null;
        let backImageUrl = null;

        // --- 1. UPLOAD FRONT LICENSE (NEW API) ---
        const frontFileRef = new File(registrationData.licenseFront.uri);
        const frontBase64 = await frontFileRef.base64(); // <--- New method

        const frontFileExt = registrationData.licenseFront.uri.split('.').pop();
        const frontFilePath = `${serviceid}/license_front_${timestamp}.${frontFileExt}`;

        const { data: frontData, error: frontError } = await supabase.storage
          .from('licenses')
          .upload(frontFilePath, decode(frontBase64), { contentType: `image/${frontFileExt}`, upsert: true });

        if (frontError) throw new Error('Front Image Upload Failed: ' + frontError.message);

        const { data: frontUrlData } = supabase.storage.from('licenses').getPublicUrl(frontData.path);
        frontImageUrl = frontUrlData.publicUrl;

        // --- 2. UPLOAD BACK LICENSE (NEW API) ---
        const backFileRef = new File(registrationData.licenseBack.uri);
        const backBase64 = await backFileRef.base64(); // <--- New method

        const backFileExt = registrationData.licenseBack.uri.split('.').pop();
        const backFilePath = `${serviceid}/license_back_${timestamp}.${backFileExt}`;

        const { data: backData, error: backError } = await supabase.storage
          .from('licenses')
          .upload(backFilePath, decode(backBase64), { contentType: `image/${backFileExt}`, upsert: true });

        if (backError) throw new Error('Back Image Upload Failed: ' + backError.message);

        const { data: backUrlData } = supabase.storage.from('licenses').getPublicUrl(backData.path);
        backImageUrl = backUrlData.publicUrl;

        // --- 3. INSERT DATA ---
        const { error: insertError } = await supabase.from('courier').insert({
          user_id: serviceid,
          vehicle_id: registrationData.value,
          vehicle_color: registrationData.color,
          plate_number: registrationData.plate,
          vehicle_brand: registrationData.vehicle_brand,
          otherdetails_vehicle: registrationData.otherdetails_vehicle,
          license_front: frontImageUrl,
          license_back: backImageUrl,
          user_status: 3 // <--- Ensures status is Pending (ID 3)
        });

        if (insertError) throw new Error('Database Insert Failed: ' + insertError.message);

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
            <Image source={backimg} style={styles.backIcon}/>
            </Pressable>
            <Image source={headerlogo} style={styles.logo}/>
            <Pressable style={styles.headerbutton} onPress={()=>{}}>
                <Image source={headerheart} style={styles.heartIcon}/>
            </Pressable>
        </View>

      <Text style={styles.titleText}>Terms of Service & Policy Use</Text>
      <View style={styles.separator} />

      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Section 1:</Text>
        <Text style={styles.sectionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla nunc, condimentum a libero at, convallis mollis est.
        </Text>
        <Text style={styles.sectionTitle}>Section 2:</Text>
        <Text style={styles.sectionText}>
           Morbi in arcu sodales, vehicula magna et, ullamcorper orci. In blandit purus in rutrum mattis.
        </Text>
      </ScrollView>

      <View style={styles.recover}>
          <CheckBox
            checked={isSelected}
            onPress={() => setSelected(!isSelected)}
            checkedColor='#1976d2'
            uncheckedColor='#aaa'
            containerStyle={styles.checkboxContainer}
           />
          <View style={{flex: 1}}>
            <Text style={{ color: '#FFFFFF', flexWrap: 'wrap'}}>
                I Agree to
                <Text style={styles.linkText} onPress={() => router.push('terms')}>{"  "}Terms of Service{"  "}</Text>
                {' & '}
                <Text style={styles.linkText} onPress={() => router.push('terms')}>{"  "}Privacy Policy</Text>
            </Text>
          </View>
      </View>

      <Pressable style={styles.mainbutton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="black" /> : <Text style={styles.maintextbutton}>Sign Up</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#141519' },
  mainbutton: { width:'100%', padding:15, backgroundColor:'#3BF579', borderRadius: 10, justifyContent:"center", alignItems:'center', marginTop: 20, marginBottom: 20 },
  maintextbutton: { fontSize:18, color:'black', fontFamily: 'Roboto', fontWeight: 'bold' },
  header: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop: verticalScale(20) },
  headerbutton: { width:37, height:36, borderRadius: 10, backgroundColor:'#22262F', alignItems:'center', justifyContent:'center' },
  backIcon: { width:30, height:30, resizeMode:'contain' },
  logo: { width:120, height:28, resizeMode:'contain' },
  heartIcon: { width:20, height:20, resizeMode:'contain' },
  recover: { flexDirection:'row', alignItems: 'center', marginTop: 10, width: '100%' },
  titleText: { color: '#2196F3', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, marginBottom: 10 },
  separator: { height: 2, backgroundColor: '#2196F3', width: '100%', marginBottom: 16 },
  sectionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  sectionText: { color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 },
  checkboxContainer: { padding: 0, margin: 0, marginLeft: 0, marginRight: 10, backgroundColor: 'transparent', borderWidth: 0 },
  linkText: { color: '#1976d2', textDecorationLine: 'underline' }
});