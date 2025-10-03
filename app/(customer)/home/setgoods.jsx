import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { verticalScale } from 'react-native-size-matters';
const backimg =require("@/assets/images/back.png")
export default function setgoods() {
  const router = useRouter();
  const [assets, setAssets] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 
  const [value, setValue] = useState(null);

  const data = [
    { label: 'Food & Beverages', value: '1' },
    { label: 'Documents & Papers', value: '2' },
    { label: 'School & Office Supplies', value: '3' },
    { label: 'Clothing & Apparel', value: '4' },
    { label: 'Electronics & Gadgets', value: '5' },
    { label: 'Household & Hardware', value: '6' },
    { label: 'PMedicines & Health Productsundo', value: '7' },
    { label: 'Others / Miscellaneous', value: '8' },

  ];

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      quality: 1,
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
    <>
      <Stack.Screen 
        options={{
          title: 'Goods Service',
          headerShown: false, 
        }}
      />
         <View style={styles.container}>
      <View >
        <Pressable
        onPress={()=>router.back('index')}
        >
        <Image  source={backimg} style={styles.backimg}/>
        </Pressable>
              </View>  
          <View style={styles.mainContent}>
          <View style={styles.maininputcontainer}>
                  <View style={styles.inputcontainer}>
                  <Text style={styles.title}>Description To Deliver</Text>
                  <TextInput style={styles.textinput}
                  placeholder='Enter The Details To Deliver'
                  placeholderTextColor='#7398A9'

                  multiline={true}
                  numberOfLines={5}
                     />
                </View> 
               </View>    

               <View style={styles.dropdowncontent}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Goods Category Belong"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }}
                  renderItem={renderItem}
                />
              </View>

               {/* Image Picker Section */}
               <View style={styles.imagePickerContainer}>
                 <Pressable 
                   onPress={pickImage}
                   style={styles.imgbutton}
                 >
                   <Text style={styles.uploadButtonText}>Upload Goods Images (Max 3)</Text>
                 </Pressable>
                 
                 <FlatList
                   data={assets}
                   keyExtractor={(item, idx) => idx.toString()}
                   numColumns={3}
                   contentContainerStyle={styles.imageListContainer}
                   renderItem={({ item, index }) => {
                     return (
                       <TouchableOpacity
                         onPress={() => previewImageHandler(item)}
                       >
                         <Image
                           source={{ uri: item.uri }}
                           style={styles.selectedImage}
                         />
                       </TouchableOpacity>
                     );
                   }}
                 />
               </View>

                  <View style={styles.maininputcontainer1}>
                  <View style={styles.inputcontainer}>
                  <Text style={styles.title}>Ipa-Dali Bonus</Text>
                  <TextInput style={styles.textinput1}
                  placeholder='Enter Minimum Amount ₱10'
                  placeholderTextColor='#7398A9'
                  multiline={true}
                  numberOfLines={5}
                     />
                </View> 
               </View>  
               <Pressable style={styles.mainbutton}
                                                  onPress={()=>router.back('index')}
                                                  > 
                                                     <Text style={styles.maintextbutton}>Submit</Text>
                                                        </Pressable>   



                </View>

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

    </>
  );
}
const styles = StyleSheet.create({
  container:{
  flex:1,
  backgroundColor: '#141519',
  },
  mainContent: {
      flex: 1,
      padding: 24,
     
    },
    image:{
      width:200,
      height:200,
      marginTop: 12,
    },
    backimg:{
      padding:10,
      marginTop: verticalScale(40),
  
    },
    imgbutton:{
      width:'90%',
      height: 50,
      backgroundColor:'#192028',
      borderColor:'#192028',
      borderRadius: 11,
      padding: 12,
      marginBottom: 10,
    },
  maininputcontainer:{
  justifyContent:"center",
  alignItems:'center',
  PointerEvents:'auto',
   marginTop: verticalScale(-30),
  rowGap:10,
  height: '28%',
  },
  title:{
    flexDirection:'column',
  justifyContent:'flex-start',
  fontFamily: 'Roboto-Bold',
  color: '#FFFFFF',
  fontSize: 18,
  lineHeight: 18,
  letterSpacing: 0.12,
  marginBottom:11,
  },
  inputcontainer:{
  flexDirection:'column',
  width:'105%',
  height:'80%',
  maxWidth:1024,
  padding:10,
  marginHorizontal:'auto',
  pointerEvents:'auto',
  },
  textinput:{
    flex:1,
  fontFamily: 'Roboto-regular',
  color: '#7398A9',
  fontWeight: 'medium',
  fontSize: 15,
  lineHeight: 18,
  letterSpacing: 0.12,
  backgroundColor:'#363D47',
  borderColor:'#363D47',
  borderRadius: 11,
  padding:10,
  marginRight:10,
  borderWidth:1,
  textAlignVertical: "top",
  },
  textinput1:{
    flex:1,
  fontFamily: 'Roboto-regular',
  color: '#7398A9',
  fontWeight: 'medium',
  fontSize: 15,
  lineHeight: 18,
  letterSpacing: 0.12,
  backgroundColor:'#363D47',
  borderColor:'#363D47',
  borderRadius: 11,
  padding:10,
  marginRight:10,
  borderWidth:1,
 
  },
  maininputcontainer1:{
    justifyContent:"center",
    alignItems:'center',
    PointerEvents:'auto',
     marginTop: verticalScale(1),
    rowGap:10,
    height: '18%',
    padding:1,
  },
  imgcontainer:{
    flex:1,
    resizeMode:'contain',
  },
  dropdowncontent:{
      
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
  mainbutton:{
    flexDirection:'column',
    width:'98%',
    maxWidth:1024,
    padding:10,
    justifyContent:"center",
    alignItems:'center',
    marginHorizontal:'auto',
    pointerEvents:'auto',
    backgroundColor:'#3BF579',
    borderRadius: 10,
     marginTop: verticalScale(45),
      marginBottom: verticalScale(10),
    },
    maintextbutton:{
    fontSize:18,
    color:'black',
    fontFamily: 'Roboto-Bold', 
    },
})