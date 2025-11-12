import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
const backimg =require("@/assets/images/back.png")
const headerlogo =require("@/assets/images/headerlogo.png")
const headerheart =require("@/assets/images/heart.png")
export default function Terms() {
    const router = useRouter(); 
    const [isSelected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    // Receive params from previous screen
    const params = useLocalSearchParams();

    const registrationData = useMemo(() => {
      try {
        return {
          value: params?.value || '',
          color: params?.color || '',
          plate: params?.plate || '',
          vehicle_brand: params?.vehicle_brand || '',
          otherdetails_vehicle: params?.otherdetails_vehicle || '',
          assets: params?.assets ? JSON.parse(String(params.assets)) : [],
        };
      } catch {
        return {
          value: '',
          color: '',
          plate: '',
          vehicle_brand: '',
          otherdetails_vehicle: '',
          assets: [],
        };
      }
    }, [params]);

    const handleSubmit = async () => {
      if (!isSelected) {
        Alert.alert('Agreement Required', 'You must agree to the terms and conditions.');
        return;
      }

      try {
        setLoading(true);

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          Alert.alert('Error', authError?.message || 'Could not get current user.');
          return;
        }

        const serviceid = user.id;

        // Upload first license image (required as per previous screen logic)
        if (!registrationData.assets || registrationData.assets.length === 0) {
          Alert.alert('Missing Info', 'Please upload your driver license image.');
          return;
        }

        const firstAsset = registrationData.assets[0];
        const file = firstAsset.base64;
        const fileExt = firstAsset.uri.split('.').pop();
        const filePath = `${serviceid}/license_front.${fileExt}`;
        const contentType = `image/${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('licenses')
          .upload(filePath, decode(file), { contentType, upsert: true });

        if (uploadError) {
          Alert.alert('Error', 'Failed to upload license image.');
          return;
        }

        const { data: urlData } = supabase.storage
          .from('licenses')
          .getPublicUrl(uploadData.path);

        const imageUrl = urlData.publicUrl;

        const { error: insertError } = await supabase.from('courier').insert({
          user_id: serviceid,
          vehicle_id: registrationData.value,
          vehicle_color: registrationData.color,
          plate_number: (typeof registrationData.plate === 'string' ? registrationData.plate.trim() : String(registrationData.plate)),
          vehicle_brand: registrationData.vehicle_brand,
          otherdetails_vehicle: registrationData.otherdetails_vehicle,
          license_image: imageUrl,
        });

        if (insertError) {
          Alert.alert('Error', 'Failed to create courier profile: ' + insertError.message);
          return;
        }

        // Success → proceed to OTP
        router.replace('/(courier)/registration/otp');
      } catch (e) {
        Alert.alert('Error', 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
                                <Pressable style={styles.headerbutton}
                                onPress={()=>router.replace('/(courier)/registration/courierauthsign')}
                                >
                                <Image  source={backimg} style={styles.backIcon}/>
                                </Pressable>
      
                                <Image  source={headerlogo} style={styles.logo}/>
      
                                <Pressable style={styles.headerbutton}
                                onPress={()=>{}}
                                >
                                    <Image  source={headerheart} style={styles.heartIcon}/>  
                                </Pressable>
                        </View> 
      <Text style={{ color: '#2196F3', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
        Terms of Service & Policy Use
      </Text>
      <View style={{ height: 2, backgroundColor: '#2196F3', width: '100%', marginBottom: 16 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Section 1:</Text>
        <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla nunc, condimentum a libero at, convallis mollis est. Morbi in arcu sodales, vehicula magna et, ullamcorper orci. In blandit purus in rutrum mattis. Proin nec auctor magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet felis non elit cursus convallis eu quis augue. Donec non magna ut nisl dignissim rutrum vitae in leo.
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Section 2:</Text>
        <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla nunc, condimentum a libero at, convallis mollis est. Morbi in arcu sodales, vehicula magna et, ullamcorper orci. In blandit purus in rutrum mattis. Proin nec auctor magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet felis non elit cursus convallis eu quis augue. Donec non magna ut nisl dignissim rutrum vitae in leo.
        </Text>
        
      </View>
       {/* onPress={()=>signupauthcour()}
                                        disabled={loading}*/}
                                          {/* When Next BUTTON IS transfer to another page the insert function on
                                           hold here when go to terms page the insert function will be executed it will be executed if the radio button is
                                            checked then click submit then it executes if the radiobutton is not check and click the sumbmit will not execute */}
      <View style={styles.recover}>
        {/* Double check the Checkbox function if cliked the check appear */}
                                          <CheckBox
                                            checked={isSelected}
                                            onPress={() => setSelected(!isSelected)}
                                            checkedColor='#1976d2'
                                            uncheckedColor='#aaa'
                                            style={{marginRight:0}} />
                                          <Text style={{ color: '#FFFFFF',}}>
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





      <Pressable style={styles.mainbutton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.maintextbutton}>{loading ? 'Submitting...' : 'Sign Up'}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  mainbutton:{
  flexDirection:'column',
  width:'84%',
  maxWidth:1024,
  padding:10,
  marginHorizontal:'auto',
  pointerEvents:'auto',
  backgroundColor:'#3BF579',
  borderRadius: 10,
  justifyContent:"center",
  alignItems:'center',
   marginTop: verticalScale(100),
  },
  maintextbutton:{
  fontSize:18,
  color:'black',
  fontFamily: 'Roboto-Bold', 
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  header1:{
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
  remembercontainer:{
    flexDirection: 'row',
      width: '100%',               
      marginTop: verticalScale(1),
      
    },
    recover:{
    flexDirection:'row',
    alignItems: 'center',
    marginHorizontal:'auto',
    },
});
