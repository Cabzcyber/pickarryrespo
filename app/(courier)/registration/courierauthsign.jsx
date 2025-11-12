import AntDesign from '@expo/vector-icons/AntDesign';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
const logoimg =require("@/assets/images/logologin.png")

const auth = () => {
  const [loading, setLoading] = useState(false);
    const router = useRouter(); 
    const [assets, setAssets] = useState([]);
      const [previewImage, setPreviewImage] = useState(null);
      const [modalVisible, setModalVisible] = useState(false); 
       const [color,setVehicleColor]= useState('')
      const [plate,setPlateNumber]= useState('')
        const [vehicle_brand,setVehicleBrand]= useState('')
         const [otherdetails_vehicle,setDetailsVehicle]= useState('')
             const [value, setValue] = useState(null);
          const [vehicleOptions,setVehicleOptions]= useState([]);
          
          useEffect (()=>{
          const fetchVehicles= async()=>{
          const {data,error}=await supabase
          .from('type_vehicle')
          .select('label:vehicle_name,value:vehicle_id');
               
          if (error){
          console.log('Error Fetching Vehicles',error.message);
            
          }else{
            setVehicleOptions(data);
          } 
        }
          fetchVehicles();
          
          },[]);

            async function signupauthcour(){
              try{
                setLoading(true);
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                      
                      if (authError || !user) {
                        console.log('Error Getting User', authError?.message);
                        setLoading(false);
                        return;
                      }

                      // This is the ONLY ID you need for 'service_user' and 'courier'
                      const serviceid = user.id; 
                      let imageUrl = null;

                  if (assets.length > 0) {
                  const firstAsset = assets[0];
                  const file = firstAsset.base64; // Get the base64 data
                  const fileExt = firstAsset.uri.split('.').pop(); // Get file extension (e.g., 'jpg')
                  const filePath = `${serviceid}/license_front.${fileExt}`; // Create a unique path
                  const contentType = `image/${fileExt}`;

                  // Upload the image
                  const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('licenses') // The bucket you created
                    .upload(filePath, decode(file), { contentType, upsert: true });

                  if (uploadError) {
                    console.log('Error uploading image:', uploadError.message);
                    Alert.alert('Error', 'Failed to upload license image.');
                    return;
                  }

                  // --- Step 3: Get the Public URL for the image ---
                  const { data: urlData } = supabase.storage
                    .from('licenses')
                    .getPublicUrl(uploadData.path);
                  
                  imageUrl = urlData.publicUrl;
                } else {
                  Alert.alert('Missing Info', 'Please upload your driver license image.');
                  return; // Stop if no image is selected
                }

                  const {error:insertError}=await supabase.from('courier')
                  .insert({
                    user_id:serviceid,
                    vehicle_id:value,
                    vehicle_color:color,
                    plate_number:plate.trim(),
                    vehicle_brand:vehicle_brand,
                    otherdetails_vehicle:otherdetails_vehicle,
                    license_image: imageUrl,
                  })
                      if (insertError) {
                          console.log('Error inserting courier info:', insertError.message);
                          Alert.alert('Error', 'Failed to create courier profile: ' + insertError.message);
                        } else {
                          console.log('Success! Courier profile created.');
                          Alert.alert('Success!', 'Your courier profile has been created.');
                          router.push('/(courier)/registration/terms')
                        }

                      } catch (e) {
                        console.log('A critical error occurred:', e.message);
                        Alert.alert('Error', 'An unexpected error occurred.');
                      }
                      setLoading(false);
                  }

    const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
     const pickImage = async () => {
         // Request permission
         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
         
         if (status !== 'granted') {
           Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
           return;
         }
     
         // Launch image picker
         const result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: 'Images',
           allowsMultipleSelection: true,
           selectionLimit: 3,
           quality: 1,
           base64: true,
         });
     
         if (!result.canceled) {
           setAssets(result.assets);
         }
       };
     
       const deleteImage = (index) => {
         Alert.alert(
           'Delete Image',
           'Are you sure you want to delete this image?',
           [
             { text: 'Cancel', style: 'cancel' },
             { 
               text: 'Delete', 
               style: 'destructive',
               onPress: () => {
                 const newAssets = assets.filter((_, i) => i !== index);
                 setAssets(newAssets);
                 setModalVisible(false);
                 setPreviewImage(null);
               }
             }
           ]
         );
       };
     
       const previewImageHandler = (item) => {
         setPreviewImage(item);
         setModalVisible(true);
       };
     
  return (
            <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={true}
            >
           <View style={styles.container}>
             <View style={styles.allcontainer}>
             <View>
                  <Image  source={logoimg} style={styles.TopImage}/>
             </View>
               <View style={styles.form} > 
                               <View style={styles.authbarcontainer}>
                                    
                                     <View style={styles.logincontainer}>
                                       <Pressable style={styles.authbutton}
                                       >
                                         <Text style={styles.authtext}>
                                           Sign Up
                                         </Text>
                                       </Pressable>
                                     </View>
                              </View>
                               <View style={styles.separator} />
                         <View style={styles.maininputcontainer}>
                           {/* Type Of Vehicle Use */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Type Of Vehicle Use</Text>
                             <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                 data={vehicleOptions}
                
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Choose Vehicle Use"
                  
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }}
                  renderItem={renderItem}
                />
                           </View>

                           {/* Vehicle Color & Plate Number */}
                           <View style={styles.rowinput}>
                             <View style={styles.inputcontainerr}>
                               <Text style={styles.title}>Vehicle Color</Text>
                               <TextInput style={styles.textinput} placeholder="Vehicle Color" placeholderTextColor="#7398A9"
                               
                                onChangeText={(text)=>setVehicleColor(text)}
                            value={color}
                             autoCapitalize='none' 
                               />
                             </View>
                             <View style={styles.inputcontainerr}>
                               <Text style={styles.title}>Plate Number</Text>
                               <TextInput style={styles.textinput} placeholder="0-0-0-0-0-0-0" placeholderTextColor="#7398A9"
                               onChangeText={(text)=>setPlateNumber(text)}
                               value={plate}
                               />
                             </View>
                           </View>

                           {/* Driver License Upload */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Driver License <Text style={{ color: 'red', fontSize: 12 }}>Upload Front & Back Image</Text></Text>
                             <Pressable style={[styles.textinput, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                               onPress={pickImage}              
                               >
                               <Text style={{ color: '#7398A9' }}>Upload Driver License</Text>
                               <Text style={{ color: '#7398A9', fontSize: 18 }}>⭳</Text>
                             </Pressable>
                             <View style={[styles.imageListContainer, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                               {assets.map((item, index) => (
                                 <TouchableOpacity key={index} onPress={() => previewImageHandler(item)}>
                                   <Image source={{ uri: item.uri }} style={styles.selectedImage} />
                                 </TouchableOpacity>
                               ))}
                             </View>
                           </View>

                           {/* Vehicle Brand */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Vehicle Brand</Text>
                             <TextInput style={styles.textinput} placeholder="Enter Brand Vehicle" placeholderTextColor="#7398A9"
                              onChangeText={(text)=>setVehicleBrand(text)} />
                           </View>

                           {/* Other Details of Vehicle */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Other Details of Vehicle</Text>
                             <TextInput style={styles.textinput} placeholder="Enter Vehicle Details" placeholderTextColor="#7398A9" 
                              onChangeText={(text)=>setDetailsVehicle(text)} />
                           </View>

                           {/* Next Button */}
                           {/* onPress={()=>signupauthcour()}
                                        disabled={loading}*/}
                                          {/* When Next BUTTON IS transfer to another page the insert function on
                                           hold here when go to terms page the insert function will be executed it will be executed if the radio button is
                                            checked then click submit then it executes if the radiobutton is not check and click the sumbmit will not execute */}
                          <Pressable style={styles.mainbutton} 
                                                    onPress={()=>{
                                                      // Navigate to Terms screen with the collected data as params
                                                      // Note: serialize non-primitive data like assets
                                                      router.push({
                                                        pathname: '/(courier)/registration/terms',
                                                        params: {
                                                          value: value ?? '',
                                                          color: color ?? '',
                                                          plate: plate ?? '',
                                                          vehicle_brand: vehicle_brand ?? '',
                                                          otherdetails_vehicle: otherdetails_vehicle ?? '',
                                                          assets: JSON.stringify(assets ?? []),
                                                        }
                                                      });
                                                    }}
                          >
                            

                             <Text style={styles.maintextbutton}>Next</Text>
                           </Pressable>
                         </View>
                                <Text>
                                  {'\n'}
                                      {'\n'}
                                        {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            
                                            
                                    </Text>


            </View>
             {/* Image Preview Modal */}
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                      >
                        <View style={styles.modalOverlay}>
                          <View style={styles.modalContent}>
                            <Image
                              source={{ uri: previewImage?.uri }}
                              style={styles.previewImage}
                              resizeMode="contain"
                            />
                            <View style={styles.modalButtons}>
                              <Pressable
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                              >
                                <Text style={styles.buttonText}>Close</Text>
                              </Pressable>
                              <Pressable
                                style={styles.deleteButton}
                                onPress={() => {
                                  const index = assets.findIndex(asset => asset.uri === previewImage.uri);
                                  deleteImage(index);
                                }}
                              >
                                <Text style={styles.buttonText}>Delete</Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </Modal>
              </View>
             
               </View>
               
</ScrollView>
  )
}

export default auth

const styles = StyleSheet.create({
container:{
paddingBottom: 30, 
backgroundColor: '#141519',
},
TopImage:{
alignSelf:'center',
    top: hp('1.25%'),   // 40 px ➜ ~4.5 % of screen height
    alignSelf: 'center',
    width: wp('64%'),  // 200 px ➜ ~48 % of screen width
    height: hp('14.54%'),  // 80 px  ➜ ~9 % of screen height
    resizeMode: 'contain',
    flexDirection:'row',
},
allcontainer:{
flex:1,
rowGap:20,
},
authbarcontainer:{
justifyContent:"center",
flexDirection:'row',
alignItems:'center',
PointerEvents:'auto',
gap:80,
marginTop: verticalScale(1),
},
authtext:{
fontFamily: 'Roboto',      // or 'Roboto-Bold' if you loaded the TTF
    fontStyle: 'normal',
    fontWeight: '700',         // 700 → 'bold'
    fontSize: 20,
    lineHeight: 23,
    color: '#ffffff',
},
rowinput:{
flexDirection:'row',
gap:10,
marginHorizontal:'auto',
marginLeft:16
},
maininputcontainer:{
justifyContent:"center",
alignItems:'center',
PointerEvents:'auto',
 marginTop: verticalScale(-75),
rowGap:10,

},
 separator: {
    height: 1,
    backgroundColor: '#363D47',
    alignSelf:'center',
    width: '90%',
    marginTop: 15,
    marginBottom: 20,
  },
inputcontainer:{
flexDirection:'column',
width:'90%',

maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
inputcontainerr:{
flexDirection:'column',
width:'46%',

maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
title:{
  flexDirection:'column',
justifyContent:'flex-start',
fontfamily: 'Roboto Flex',
color: '#FFFFFF',
fontWeight: 700,
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
marginBottom:11,
},
textinput:{
height:50,
fontFamily: 'Roboto Flex',
color: '#7398A9',
fontWeight: 'bold',
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
borderColor:'#FFFFFF',
borderRadius: 10,
padding:10,
marginRight:10,
borderWidth:1,
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
 marginTop: verticalScale(15),
},
maintextbutton:{
fontSize:18,
color:'black',
fontFamily: 'Roboto', 
fontWeight: '700',
},
dropdown: {
            backgroundColor: '#192028',
            borderColor:'#192028',
            color: '#7398A9',
            height: 50,
            borderRadius: 12,
            padding: 12,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0.1,
          },
          icon: {
            marginRight: 5,
            color: '#7398A9',
          },
          item: {
            color: '#7398A9',
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        
          },
          textItem: {
            flex: 1,
            fontSize: 16,
          },
          placeholderStyle: {
            fontSize: 16,
            color: '#7398A9',
            fontFamily: 'Roboto-regular',
            marginLeft:5, marginLeft:5,
          },
          selectedTextStyle: {
            fontSize: 16,
            color: '#7398A9',
            fontFamily: 'Roboto-regular',
             marginLeft:5,
          },
          iconStyle: {
            width: 20,
            height: 20,
            color: '#7398A9',
          },
          inputSearchStyle: {
            height: 40,
            fontSize: 16,
            color: '#7398A9',
             marginLeft:5,
          },
          imagePickerContainer: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    width: '100%',
    height: verticalScale(150),
    backgroundColor: '#363D47',
    borderRadius: 11,
    padding: 10,
  },
  imageListContainer: {
    marginTop: 20,
  
  },
  selectedImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#363D47',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    maxWidth: '90%',
    maxHeight: '80%',
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  closeButton: {
    backgroundColor: '#7398A9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  uploadButtonText: {
    color: '#7398A9',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  maininputcontainer:{
    flex:1
  }
})