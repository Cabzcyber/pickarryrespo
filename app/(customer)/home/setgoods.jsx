import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { verticalScale } from 'react-native-size-matters';
import { useOrder } from '../../../context/OrderContext';

const backimg = require("@/assets/images/back.png");

export default function SetGoodsScreen() {
  const router = useRouter();
  const { setGoodsDetails, goodsDetails: existingDetails } = useOrder();

  // Initialize state
  const [assets, setAssets] = useState(existingDetails?.images || []);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Ensure value is a string for the Dropdown, but handle nulls
  const [value, setValue] = useState(existingDetails?.category_id ? String(existingDetails.category_id) : null);
  const [description, setDescription] = useState(existingDetails?.other_details || '');
  const [rushFee, setRushFee] = useState(existingDetails?.rush_fee ? String(existingDetails.rush_fee) : '');

  const data = [
    { label: 'Food & Beverages', value: '1' },
    { label: 'Documents & Papers', value: '2' },
    { label: 'School & Office Supplies', value: '3' },
    { label: 'Clothing & Apparel', value: '4' },
    { label: 'Electronics & Gadgets', value: '5' },
    { label: 'Household & Hardware', value: '6' },
    { label: 'Medicines & Health Products', value: '7' },
    { label: 'Others / Miscellaneous', value: '8' },
  ];

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value && (
        <AntDesign style={styles.icon} color="black" name="check" size={20} />
      )}
    </View>
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3 - assets.length,
      quality: 0.5, // Reduced quality for better performance
      base64: true, // CRITICAL: Request base64 string directly
    });

    if (!result.canceled) {
      setAssets([...assets, ...result.assets].slice(0, 3));
    }
  };

  const deleteImage = (index) => {
    Alert.alert('Delete Image', 'Are you sure?', [
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
    ]);
  };

  // --- FIXED SUBMIT HANDLER ---
  const handleSubmit = () => {
    console.log("Submit Pressed. Value:", value); // Debug 1

    // 1. Validate
    if (!value) {
        Alert.alert("Missing Info", "Please select a Goods Category.");
        return;
    }
    if (!description.trim()) {
        Alert.alert("Missing Info", "Please enter a description.");
        return;
    }

    // 2. Format Data (Force Category ID to be a valid Integer)
    const categoryIdInt = parseInt(value, 10);
    if (isNaN(categoryIdInt)) {
        Alert.alert("Error", "Invalid Category ID");
        return;
    }

    const detailsPayload = {
        category_id: categoryIdInt, // Must be integer
        other_details: description,
        rush_fee: rushFee || "0",   // Default to "0" if empty
        images: assets
    };

    // 3. Save to Context
    // Note: images now contains 'base64' property
    setGoodsDetails(detailsPayload);

    router.back();
  };

  const previewImageHandler = (item) => {
    setPreviewImage(item);
    setModalVisible(true);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Goods Service', headerShown: false }} />
      <View style={styles.container}>
        <View>
          <Pressable onPress={() => router.back()}>
            <Image source={backimg} style={styles.backimg} />
          </Pressable>
        </View>
        <View style={styles.mainContent}>

          {/* Description */}
          <View style={styles.maininputcontainer}>
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Description To Deliver</Text>
              <TextInput
                style={styles.textinput}
                placeholder='Enter The Details To Deliver'
                placeholderTextColor='#7398A9'
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Dropdown */}
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
                console.log("Dropdown Selected:", item.value);
                setValue(item.value);
              }}
              renderItem={renderItem}
            />
          </View>

          {/* Images */}
          <View style={styles.imagePickerContainer}>
            <Pressable onPress={pickImage} style={styles.imgbutton}>
              <Text style={styles.uploadButtonText}>Upload Goods Images (Max 3)</Text>
            </Pressable>

            <FlatList
              data={assets}
              keyExtractor={(item, idx) => idx.toString()}
              numColumns={3}
              contentContainerStyle={styles.imageListContainer}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => previewImageHandler(item)}>
                  <Image source={{ uri: item.uri }} style={styles.selectedImage} />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Rush Fee */}
          <View style={styles.maininputcontainer1}>
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Ipa-Dali Bonus</Text>
              <TextInput
                style={styles.textinput1}
                placeholder='Enter Minimum Amount ₱10'
                placeholderTextColor='#7398A9'
                keyboardType='numeric'
                value={rushFee}
                onChangeText={setRushFee}
              />
            </View>
          </View>

          <Pressable style={styles.mainbutton} onPress={handleSubmit}>
             <Text style={styles.maintextbutton}>Submit</Text>
          </Pressable>

        </View>
      </View>

      {/* Modal for Image Preview */}
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
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
  container:{ flex:1, backgroundColor: '#141519' },
  mainContent: { flex: 1, padding: 24 },
  backimg:{ padding:10, marginTop: verticalScale(40) },
  imgbutton:{ width:'90%', height: 50, backgroundColor:'#192028', borderRadius: 11, padding: 12, marginBottom: 10 },
  maininputcontainer:{ justifyContent:"center", alignItems:'center', marginTop: verticalScale(-30), rowGap:10, height: '28%' },
  title:{ fontFamily: 'Roboto-Bold', color: '#FFFFFF', fontSize: 18, marginBottom:11 },
  inputcontainer:{ flexDirection:'column', width:'105%', height:'80%', padding:10, marginHorizontal:'auto' },
  textinput:{ flex:1, fontFamily: 'Roboto-regular', color: '#FFFFFF', fontSize: 15, backgroundColor:'#363D47', borderRadius: 11, padding:10, borderWidth:1, borderColor: '#363D47', textAlignVertical: "top" },
  textinput1:{ flex:1, fontFamily: 'Roboto-regular', color: '#FFFFFF', fontSize: 15, backgroundColor:'#363D47', borderRadius: 11, padding:10, borderWidth:1, borderColor: '#363D47' },
  maininputcontainer1:{ justifyContent:"center", alignItems:'center', marginTop: verticalScale(1), rowGap:10, height: '18%', padding:1 },
  dropdowncontent: { width: '100%', marginBottom: 20 },
  dropdown: { backgroundColor: '#192028', borderRadius: 12, padding: 12, height: 50, color: '#FFFFFF' },
  icon: { marginRight: 5, color: '#7398A9' },
  item: { padding: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textItem: { flex: 1, fontSize: 16, color: '#7398A9' },
  placeholderStyle: { fontSize: 16, color: '#7398A9', fontFamily: 'Roboto-regular', marginLeft:5 },
  selectedTextStyle: { fontSize: 16, color: '#FFFFFF', fontFamily: 'Roboto-regular', marginLeft:5 },
  iconStyle: { width: 20, height: 20, color: '#7398A9' },
  inputSearchStyle: { height: 40, fontSize: 16, color: '#7398A9', marginLeft:5 },
  imagePickerContainer: { justifyContent: "center", alignItems: 'center', marginTop: verticalScale(20), marginBottom: verticalScale(20), width: '100%', height: verticalScale(150), backgroundColor: '#363D47', borderRadius: 11, padding: 10 },
  imageListContainer: { marginTop: 20 },
  selectedImage: { width: 100, height: 100, margin: 5, borderRadius: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#363D47', borderRadius: 12, padding: 20, alignItems: 'center', maxWidth: '90%', maxHeight: '80%' },
  previewImage: { width: 300, height: 300, borderRadius: 8 },
  modalButtons: { flexDirection: 'row', marginTop: 20, gap: 15 },
  closeButton: { backgroundColor: '#7398A9', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  deleteButton: { backgroundColor: '#FF4444', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: '#FFFFFF', fontFamily: 'Roboto-Bold', fontSize: 16 },
  uploadButtonText: { color: '#7398A9', fontFamily: 'Roboto-Bold', fontSize: 16 },
  mainbutton:{ flexDirection:'column', width:'98%', padding:10, justifyContent:"center", alignItems:'center', backgroundColor:'#3BF579', borderRadius: 10, marginTop: verticalScale(45), marginBottom: verticalScale(10) },
  maintextbutton:{ fontSize:18, color:'black', fontFamily: 'Roboto-Bold' },
});