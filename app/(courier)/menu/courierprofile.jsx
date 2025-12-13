import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
import ImageViewing from 'react-native-image-viewing';
import { useTheme } from '../../../context/ThemeContext';

export default function Profile() {
  const router = useRouter();
  const { colors } = useTheme();

  const backimg = require("@/assets/images/back.png");
  const person = require("@/assets/images/person.png");
  const contact = require("@/assets/images/contact.png");
  const theme = require("@/assets/images/theme.png");
  const vehicle = require("@/assets/images/vehicle.png");
  const platenum = require("@/assets/images/platenum.png");
  const license = require("@/assets/images/license.png");

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewerVisible, setViewerVisible] = useState(false);

  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    vehicle_id: null,
    vehicle_name: '',
    vehicle_color: '',
    plate_number: '',
    vehicle_brand: '',
    otherdetails_vehicle: '',
    licenseFront: null,
    licenseBack: null,
  });

  const [originalProfile, setOriginalProfile] = useState(null);
  const [allVehicles, setAllVehicles] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          Alert.alert("Error", "No user session found.");
          router.replace('/auth/login');
          return;
        }
        const user = session.user;

        // Fetch Vehicles
        const { data: vehiclesData, error: vehiclesError } = await supabase
          .from('type_vehicle')
          .select('vehicle_id, vehicle_name');

        if (vehiclesError) throw vehiclesError;

        if (vehiclesData) {
          const formattedVehicles = vehiclesData.map(v => ({
            label: v.vehicle_name,
            value: v.vehicle_id
          }));
          setAllVehicles(formattedVehicles);
        }

        // Fetch Courier Profile
        const { data, error, status } = await supabase
          .from('courier')
          .select(`
            *,
            service_user ( full_name, phone_number ),
            type_vehicle ( vehicle_name )
          `)
          .eq('user_id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          const profileData = {
            full_name: data.service_user?.full_name || '',
            phone_number: data.service_user?.phone_number || '',
            plate_number: data.plate_number || '',
            vehicle_brand: data.vehicle_brand || '',
            otherdetails_vehicle: data.otherdetails_vehicle || '',
            vehicle_id: data.vehicle_id,
            vehicle_color: data.vehicle_color || '',
            vehicle_name: data.type_vehicle?.vehicle_name || 'Not Selected',
            licenseFront: data.license_front || null,
            licenseBack: data.license_back || null,
          };
          setProfile(profileData);
          setOriginalProfile(profileData);
        }
      } catch (error) {
        console.error("Fetch Profile Error:", error.message);
        Alert.alert('Error', 'Could not load profile.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const serviceUserUpdates = {
        full_name: profile.full_name,
        phone_number: profile.phone_number,
      };

      const courierUpdates = {
        plate_number: profile.plate_number,
        vehicle_brand: profile.vehicle_brand,
        otherdetails_vehicle: profile.otherdetails_vehicle,
        vehicle_id: profile.vehicle_id,
        vehicle_color: profile.vehicle_color,
      };

      const [serviceUserResult, courierResult] = await Promise.all([
        supabase.from('service_user').update(serviceUserUpdates).eq('user_id', user.id),
        supabase.from('courier').update(courierUpdates).eq('user_id', user.id)
      ]);

      if (serviceUserResult.error) throw serviceUserResult.error;
      if (courierResult.error) throw courierResult.error;

      Alert.alert('Success', 'Profile updated!');

      const newVehicleName = allVehicles.find(v => v.value === profile.vehicle_id)?.label || 'Not Selected';
      const updatedProfile = { ...profile, vehicle_name: newVehicleName };

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);

      setIsEditing(false);

    } catch (error) {
      console.error("Save Error:", error.message);
      Alert.alert('Error', 'Could not save profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }));
  };

  const licenseImages = [
    profile.licenseFront ? { uri: profile.licenseFront } : null,
    profile.licenseBack ? { uri: profile.licenseBack } : null,
  ].filter(Boolean);

  const openLicenseViewer = () => {
    if (licenseImages.length > 0) {
      setViewerVisible(true);
    } else {
      Alert.alert("No License", "No license images found for this profile.");
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() =>router.replace('/(courier)/menu')} disabled={isEditing}>
          <Image source={backimg} style={[styles.backicon, isEditing && styles.disabledButton, { tintColor: '#0AB3FF' }]} />
        </Pressable>

        <Text style={styles.title}>Profile</Text>

        {isEditing ? (
          <View style={styles.editButtonsContainer}>
            <Pressable onPress={handleCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave}>
              <Text style={styles.editSaveButton}>Save</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setIsEditing(true)}>
            <Text style={styles.editSaveButton}>Edit</Text>
          </Pressable>
        )}
      </View>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      <ScrollView style={styles.mainContent}>
        <View style={styles.settingcontent}>

          {/* Full Name */}
          <View style={styles.settingsubcontent}>
            <Image source={person} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Full Name</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
                  value={profile.full_name}
                  onChangeText={(text) => handleInputChange('full_name', text)}
                  placeholder="Enter full name"
                  placeholderTextColor={colors.subText}
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.full_name || 'Not Provided'}</Text>
              )}
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.settingsubcontent}>
            <Image source={contact} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Phone Number</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
                  value={profile.phone_number}
                  onChangeText={(text) => handleInputChange('phone_number', text)}
                  placeholder="Enter phone number"
                  placeholderTextColor={colors.subText}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.phone_number || 'Not Provided'}</Text>
              )}
            </View>
          </View>

          {/* Type of Vehicle */}
          <View style={styles.settingsubcontent}>
            <Image source={vehicle} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Type of Vehicle </Text>
              {isEditing ? (
                <Dropdown
                  style={[styles.dropdown, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
                  placeholderStyle={[styles.dropdownPlaceholder, { color: colors.subText }]}
                  selectedTextStyle={[styles.dropdownSelectedText, { color: colors.text }]}
                  data={allVehicles}
                  labelField="label"
                  valueField="value"
                  placeholder="Select vehicle type"
                  value={profile.vehicle_id}
                  onChange={item => {
                    handleInputChange('vehicle_id', item.value);
                  }}
                  itemTextStyle={{ color: colors.text }}
                  containerStyle={{ backgroundColor: colors.card, borderColor: colors.border }}
                  activeColor={colors.inputBackground}
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.vehicle_name}</Text>
              )}
            </View>
          </View>

          {/* Vehicle Color */}
          <View style={styles.settingsubcontent}>
            <Image source={theme} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Vehicle Color</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
                  value={profile.vehicle_color}
                  onChangeText={(text) => handleInputChange('vehicle_color', text)}
                  placeholder="Enter Vehicle Color"
                  placeholderTextColor={colors.subText}
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.vehicle_color || 'Not Provided'}</Text>
              )}
            </View>
          </View>

          {/* Plate Number */}
          <View style={styles.settingsubcontent}>
            <Image source={platenum} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Plate Number</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
                  value={profile.plate_number}
                  onChangeText={(text) => handleInputChange('plate_number', text)}
                  placeholder="Enter Plate Number"
                  placeholderTextColor={colors.subText}
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.plate_number || 'Not Provided'}</Text>
              )}
            </View>
          </View>

          {/* Other Details */}
          <View style={styles.settingsubcontent}>
            <Image source={platenum} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}> Other Details of Vehicle</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
                  value={profile.otherdetails_vehicle}
                  onChangeText={(text) => handleInputChange('otherdetails_vehicle', text)}
                  placeholder="Enter Other Details of Vehicle"
                  placeholderTextColor={colors.subText}
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.otherdetails_vehicle || 'Not Provided'}</Text>
              )}
            </View>
          </View>

          {/* Vehicle Brand */}
          <View style={styles.settingsubcontent}>
            <Image source={vehicle} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Text style={[styles.settingsubtext, { color: colors.text }]}>Vehicle Brand</Text>
              {isEditing ? (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
                  value={profile.vehicle_brand}
                  onChangeText={(text) => handleInputChange('vehicle_brand', text)}
                  placeholder="Enter Vehicle Brand"
                  placeholderTextColor={colors.subText}
                />
              ) : (
                <Text style={[styles.settingsubinnertext, { color: colors.subText }]}>{profile.vehicle_brand || 'Not Provided'}</Text>
              )}
            </View>
          </View>

          {/* License Viewer Trigger */}
          <View style={styles.settingsubcontent}>
            <Image source={license} style={[styles.ordericon, { tintColor: '#0AB3FF' }]} />
            <View style={styles.textContainer}>
              <Pressable
                onPress={openLicenseViewer}
                disabled={isEditing}
              >
                <Text style={[styles.settingsubtext, isEditing && styles.disabledButton, { color: colors.text }]}>Driver License</Text>
                <Text style={[styles.settingsubinnertext, isEditing && styles.disabledButton, { color: colors.subText }]}>
                  {licenseImages.length > 0 ? "Tap to View Licenses" : "No Images Available"}
                </Text>
              </Pressable>
            </View>
          </View>
          <Text>{'\n\n\n\n'}</Text>

        </View>
      </ScrollView>

      {/* --- FIX: VISIBLE CLOSE BUTTON --- */}
      <ImageViewing
        images={licenseImages}
        imageIndex={0}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
        // Add HeaderComponent for the visual "X" button
        HeaderComponent={() => (
          <SafeAreaView style={styles.viewerHeader}>
            <Pressable
              onPress={() => setViewerVisible(false)}
              style={styles.closeButton}
              hitSlop={20} // Increase touch area
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </SafeAreaView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#141519', // Handled dynamically
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  separator: {
    height: 1,
    // backgroundColor: '#363D47', // Handled dynamically
    width: '100%',
    marginBottom: 10,
  },
  backicon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
    marginLeft: 20,
  },
  editSaveButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#3BF579',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#FF4444',
    marginRight: 15,
  },
  disabledButton: {
    opacity: 0.5,
  },
  mainContent: {
    flex: 1,
    padding: 15,
    marginTop: verticalScale(1),
  },
  settingcontent: {
    flexDirection: 'column',
    width: '100%',
    marginTop: verticalScale(1),
  },
  settingsubcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  settingsubtext: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    // color: '#ffffff', // Handled dynamically
    marginBottom: 4,
  },
  settingsubinnertext: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    fontWeight: '300',
    // color: '#9ca3af', // Handled dynamically
  },
  input: {
    fontFamily: 'Roboto-regular',
    fontSize: 14,
    // color: '#FFFFFF', // Handled dynamically
    // backgroundColor: '#363D47', // Handled dynamically
    borderRadius: 5,
    padding: 10,
    height: 44,
    borderWidth: 1, // Added border for better visibility in light mode
    // borderColor: '#363D47', // Handled dynamically
  },
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
  dropdown: {
    height: 44,
    // backgroundColor: '#363D47', // Handled dynamically
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    // borderColor: '#363D47', // Handled dynamically
  },
  dropdownPlaceholder: {
    fontSize: 14,
    // color: '#9ca3af', // Handled dynamically
    fontFamily: 'Roboto-regular',
    marginLeft: 4,
  },
  dropdownSelectedText: {
    fontSize: 14,
    // color: '#FFFFFF', // Handled dynamically
    fontFamily: 'Roboto-regular',
    marginLeft: 4,
  },
  // --- NEW VIEWER HEADER STYLES ---
  viewerHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 40, // Space for status bar
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28, // Adjust to center X vertically
  }
});