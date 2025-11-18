import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';

const logoimg = require("@/assets/images/logologin.png");

const auth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Images State
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);

  // UI States
  const [previewImage, setPreviewImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form States
  const [color, setVehicleColor] = useState('');
  const [plate, setPlateNumber] = useState('');
  const [vehicle_brand, setVehicleBrand] = useState('');
  const [otherdetails_vehicle, setDetailsVehicle] = useState('');
  const [value, setValue] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('type_vehicle')
        .select('label:vehicle_name,value:vehicle_id');

      if (error) {
        console.log('Error Fetching Vehicles', error.message);
      } else {
        setVehicleOptions(data);
      }
    }
    fetchVehicles();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    try {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 2,
        quality: 0.7, // Keep quality slightly lower to ensure data passes smoothly
        base64: true,
        });

        if (!result.canceled) {
            setLicenseFront(null);
            setLicenseBack(null);

            if (result.assets.length > 0) setLicenseFront(result.assets[0]);
            if (result.assets.length > 1) setLicenseBack(result.assets[1]);

            if (result.assets.length === 1) {
                Alert.alert('Note', '1 Image selected. Please select both Front and Back images.');
            }
        }
    } catch (e) {
        console.log(e);
    }
  };

  // --- REFACTORED: Only validate and Pass Data ---
  const onNextPress = () => {
    setLoading(true);

    // 1. Validation
    if (!value || !color || !plate || !vehicle_brand) {
      Alert.alert('Missing Info', 'Please fill out all vehicle fields.');
      setLoading(false);
      return;
    }

    if (!licenseFront || !licenseBack) {
      Alert.alert('Missing Images', 'Please upload both Front and Back license images.');
      setLoading(false);
      return;
    }

    // 2. Prepare Data
    // We use JSON.stringify to pass the image objects safely through router params
    const formData = {
        vehicle_id: value,
        vehicle_color: color,
        plate_number: plate.trim(),
        vehicle_brand: vehicle_brand,
        otherdetails_vehicle: otherdetails_vehicle,
        licenseFront: JSON.stringify(licenseFront),
        licenseBack: JSON.stringify(licenseBack)
    };

    setLoading(false);

    // 3. Navigate to Terms Screen with Data
    router.push({
        pathname: '/(courier)/registration/terms',
        params: formData
    });
  }

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };

  const deleteImage = (imageType) => {
    if (imageType === 'front') setLicenseFront(null);
    if (imageType === 'back') setLicenseBack(null);
    setModalVisible(false);
    setPreviewImage(null);
  };

  const previewImageHandler = (item) => {
    setPreviewImage(item);
    setModalVisible(true);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={true}
      style={{ backgroundColor: '#141519' }}
    >
      <View style={styles.container}>
        <View style={styles.allcontainer}>
          <View>
            <Image source={logoimg} style={styles.TopImage} />
          </View>

          <View style={styles.form}>
            <View style={styles.authbarcontainer}>
              <View style={styles.logincontainer}>
                <Pressable style={styles.authbutton}>
                  <Text style={styles.authtext}>Sign Up</Text>
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
                  onChange={item => setValue(item.value)}
                  renderItem={renderItem}
                />
              </View>

              {/* Vehicle Color & Plate */}
              <View style={styles.rowinput}>
                <View style={styles.inputcontainerr}>
                  <Text style={styles.title}>Vehicle Color</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="Color"
                    placeholderTextColor="#7398A9"
                    onChangeText={setVehicleColor}
                    value={color}
                    autoCapitalize='none'
                  />
                </View>
                <View style={styles.inputcontainerr}>
                  <Text style={styles.title}>Plate Number</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="ABC-123"
                    placeholderTextColor="#7398A9"
                    onChangeText={setPlateNumber}
                    value={plate}
                  />
                </View>
              </View>

              {/* Images Input */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Driver License (Front & Back)</Text>
                <Pressable
                  style={[styles.textinput, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                  onPress={pickImage}
                >
                  <Text style={{ color: (licenseFront || licenseBack) ? '#FFFFFF' : '#7398A9' }}>
                    {(licenseFront || licenseBack)
                      ? `${[licenseFront, licenseBack].filter(Boolean).length} Image(s) Selected`
                      : "Tap to select both images"}
                  </Text>
                  <Text style={{ color: '#7398A9', fontSize: 18 }}>⭳</Text>
                </Pressable>

                {(licenseFront || licenseBack) && (
                  <View style={styles.previewRow}>
                    {licenseFront && (
                       <View style={styles.previewItem}>
                          <Text style={styles.previewLabel}>Front</Text>
                          <TouchableOpacity onPress={() => previewImageHandler(licenseFront)}>
                            <Image source={{ uri: licenseFront.uri }} style={styles.selectedImage} />
                          </TouchableOpacity>
                       </View>
                    )}
                    {licenseBack && (
                       <View style={styles.previewItem}>
                          <Text style={styles.previewLabel}>Back</Text>
                          <TouchableOpacity onPress={() => previewImageHandler(licenseBack)}>
                            <Image source={{ uri: licenseBack.uri }} style={styles.selectedImage} />
                          </TouchableOpacity>
                       </View>
                    )}
                  </View>
                )}
              </View>

              {/* Details */}
              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Vehicle Brand</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter Brand"
                  placeholderTextColor="#7398A9"
                  onChangeText={setVehicleBrand}
                  value={vehicle_brand}
                />
              </View>

              <View style={styles.inputcontainer}>
                <Text style={styles.title}>Other Details of Vehicle</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter Details"
                  placeholderTextColor="#7398A9"
                  onChangeText={setDetailsVehicle}
                  value={otherdetails_vehicle}
                />
              </View>

              {/* NEXT Button - Now Calls onNextPress */}
              <Pressable
                style={styles.mainbutton}
                onPress={onNextPress}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#000000" />
                ) : (
                  <Text style={styles.maintextbutton}>Next</Text>
                )}
              </Pressable>
              <View style={{height: 100}} />
            </View>
          </View>

          {/* Modal */}
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
                      const imageType = previewImage.uri === licenseFront?.uri ? 'front' : 'back';
                      deleteImage(imageType);
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
    top: hp('1.25%'),
    width: wp('64%'),
    height: hp('14.54%'),
    resizeMode: 'contain',
  },
  allcontainer: {
    flex: 1,
  },
  authbarcontainer: {
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(1),
  },
  authtext: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 20,
    color: '#ffffff',
  },
  rowinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  maininputcontainer: {
    alignItems: 'center',
    marginTop: verticalScale(-20),
    width: '100%',
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
    paddingVertical: 10,
  },
  inputcontainerr: {
    flexDirection: 'column',
    width: '48%',
  },
  title: {
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 8,
  },
  textinput: {
    height: 50,
    fontFamily: 'Roboto',
    color: '#7398A9',
    fontWeight: 'bold',
    fontSize: 15,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '100%',
  },
  mainbutton: {
    width: '84%',
    backgroundColor: '#3BF579',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
    height: 50,
  },
  maintextbutton: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  dropdown: {
    backgroundColor: '#363D47',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 5,
    color: '#7398A9',
  },
  item: {
    backgroundColor: '#363D47',
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#7398A9',
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#141519',
  },
  previewRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    gap: 15,
  },
  previewItem: {
    alignItems: 'center',
  },
  previewLabel: {
    color: '#7398A9',
    fontSize: 12,
    marginBottom: 4,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3BF579',
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
    width: '90%',
  },
  previewImage: {
    width: '100%',
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});