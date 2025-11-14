import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Import dropdown
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase'; // [cite: cabzcyber/pickarryrespo/Cabzcyber-pickarryrespo-25da884b095159f4a0ac245cb7aebbd30bc9a947/lib/supabase.js]
import ImageViewing from 'react-native-image-viewing'; // **NEW: Import ImageViewing**

export default function Profile() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");
  const person = require("@/assets/images/person.png");
  const contact = require("@/assets/images/contact.png");
  const theme = require("@/assets/images/theme.png");
  const vehicle = require("@/assets/images/vehicle.png");
  const platenum = require("@/assets/images/platenum.png");
  const license = require("@/assets/images/license.png");

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // **NEW: State for the image viewer**
  const [viewerVisible, setViewerVisible] = useState(false);

  // --- State for all profile data ---
  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    vehicle_id: null,
    vehicle_name: '',
    vehicle_color: '',
    plate_number: '',
    vehicle_brand: '',
    otherdetails_vehicle: '',
    license_image_url: null,
  });

  // **NEW: State to hold original data for "Cancel" button**
  const [originalProfile, setOriginalProfile] = useState(null);

  // --- State for the vehicle dropdown options ---
  const [allVehicles, setAllVehicles] = useState([]);

  // --> 1. Fetch data with a JOIN
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          Alert.alert("Error", "No user session found.");
          router.replace('/auth/login'); // [cite: cabzcyber/pickarryrespo/Cabzcyber-pickarryrespo-25da884b095159f4a0ac245cb7aebbd30bc9a947/app/auth/login.jsx]
          return;
        }
        const user = session.user;

        // --- Fetch 1: Get all vehicle types for the dropdown ---
        // **ASSUMPTION: Your table is 'type_vehicle' with columns 'vehicle_id', 'vehicle_name'**
        const { data: vehiclesData, error: vehiclesError } = await supabase
          .from('type_vehicle')
          .select('vehicle_id, vehicle_name');

        if (vehiclesError) throw vehiclesError;

        if (vehiclesData) {
          // **FIX 1: Map 'vehicle_id' (from your table) to 'value'**
          const formattedVehicles = vehiclesData.map(v => ({
            label: v.vehicle_name, // e.g., "Motorcycle"
            value: v.vehicle_id    // e.g., 1 (was v.id, which was wrong)
          }));
          setAllVehicles(formattedVehicles);
        }

        // --- Fetch 2: Get the courier's profile with JOINs ---
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
            vehicle_color: data.vehicle_color  || '',
            license_image_url: data.license_image || null, // Fetch the license image URL
            // **FIX 2: Join from 'type_vehicle', not 'vehicle_types'**
            vehicle_name: data.type_vehicle?.vehicle_name || 'Not Selected',
          };
          setProfile(profileData);
          setOriginalProfile(profileData); // **NEW: Save a backup for "Cancel"**
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

  // --> 2. Handle saving data to BOTH tables
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

      // Refresh vehicle name after saving
      const newVehicleName = allVehicles.find(v => v.value === profile.vehicle_id)?.label || 'Not Selected';
      const updatedProfile = { ...profile, vehicle_name: newVehicleName };

      setProfile(updatedProfile); // Refresh profile state
      setOriginalProfile(updatedProfile); // Set new "original" state to the saved data

      setIsEditing(false); // Switch back to view mode

    } catch (error) {
      console.error("Save Error:", error.message);
      Alert.alert('Error', 'Could not save profile.');
    } finally {
      setIsLoading(false);
    }
  };

  // **NEW: Handle canceling an edit**
  const handleCancel = () => {
    setProfile(originalProfile); // Revert all changes
    setIsEditing(false); // Exit edit mode
  };

  // Helper function to update state
  const handleInputChange = (field, value) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }));
  };

  // **NEW: Handle opening the image viewer**
  const openLicenseViewer = () => {
    if (profile.license_image_url) {
      setViewerVisible(true);
    } else {
      Alert.alert("No License", "No license image has been uploaded for this profile.");
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* --- MODIFIED: Header now shows Cancel/Save or just Edit --- */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} disabled={isEditing}>
          <Image source={backimg} style={[styles.backicon, isEditing && styles.disabledButton]}/>
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
      <View style={styles.separator} />

      <ScrollView style={styles.mainContent}>
        <View style={styles.settingcontent}>
          <View style={styles.settingsubcontent}>
            <Image source={person} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Full Name</Text>
               {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.full_name}
                    onChangeText={(text)=>handleInputChange('full_name', text)}
                    placeholder="Enter full name"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                  <Text style={styles.settingsubinnertext}>{profile.full_name || 'Not Provided'}</Text>
                )}
            </View>
          </View>

          <View style={styles.settingsubcontent}>
            <Image source={contact} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Phone Number</Text>
              {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.phone_number}
                    onChangeText={(text)=>handleInputChange('phone_number', text)}
                    placeholder="Enter phone number"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text style={styles.settingsubinnertext}>{profile.phone_number || 'Not Provided'}</Text>
                )}
            </View>
          </View>

          {/* --- MODIFIED: "Type of Vehicle" now uses a Dropdown --- */}
          <View style={styles.settingsubcontent}>
            <Image source={vehicle} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Type of Vehicle </Text>
               {isEditing ? (
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                    data={allVehicles}
                    labelField="label" // Matches 'formattedVehicles'
                    valueField="value" // Matches 'formattedVehicles'
                    placeholder="Select vehicle type"
                    value={profile.vehicle_id} // The ID (e.g., 1)
                    onChange={item => {
                      handleInputChange('vehicle_id', item.value);
                    }}
                  />
                ) : (
                  // **FIX: This now shows the correct vehicle name**
                  <Text style={styles.settingsubinnertext}>{profile.vehicle_name}</Text>
                )}
            </View>
          </View>

          <View style={styles.settingsubcontent}>
            <Image source={theme} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Vehicle Color</Text>
               {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.vehicle_color}
                    onChangeText={(text)=>handleInputChange('vehicle_color', text)}
                    placeholder="Enter Vehicle Color"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                 <Text style={styles.settingsubinnertext}>{profile.vehicle_color || 'Not Provided'}</Text>
                )}
            </View>
          </View>

          <View style={styles.settingsubcontent}>
            <Image source={platenum} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Plate Number</Text>
               {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.plate_number}
                    onChangeText={(text)=>handleInputChange('plate_number', text)}
                    placeholder="Enter Plate Number"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                 <Text style={styles.settingsubinnertext}>{profile.plate_number || 'Not Provided'}</Text>
                )}
            </View>
          </View>

          <View style={styles.settingsubcontent}>
            <Image source={platenum} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}> Other Details of Vehicle</Text>
               {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.otherdetails_vehicle}
                    onChangeText={(text)=>handleInputChange('otherdetails_vehicle', text)}
                    placeholder="Enter Other Details of Vehicle"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                 <Text style={styles.settingsubinnertext}>{profile.otherdetails_vehicle || 'Not Provided'}</Text>
                )}
            </View>
          </View>

          <View style={styles.settingsubcontent}>
            <Image source={vehicle} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Vehicle Brand</Text>
               {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.vehicle_brand}
                    onChangeText={(text)=>handleInputChange('vehicle_brand', text)}
                    placeholder="Enter Vehicle Brand"
                    placeholderTextColor="#9ca3af"
                  />
                ) : (
                  <Text style={styles.settingsubinnertext}>{profile.vehicle_brand || 'Not Provided'}</Text>
                )}
            </View>
          </View>

          <View style={styles.settingsubcontent}>
            <Image source={license} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Pressable
                onPress={openLicenseViewer} // **MODIFIED: Use new handler**
                disabled={isEditing} // **NEW: Disable button while editing**
              >
                <Text style={[styles.settingsubtext, isEditing && styles.disabledButton]}>Driver License</Text>
                <Text style={[styles.settingsubinnertext, isEditing && styles.disabledButton]}>View License</Text>
              </Pressable>
            </View>
          </View>
          <Text>{'\n\n\n\n'}</Text>

        </View>
      </ScrollView>

      {/* --- NEW: Replaced Modal with ImageViewing --- */}
      {/* This component displays the fetched image from your Supabase bucket */}
      <ImageViewing
        images={profile.license_image_url ? [{ uri: profile.license_image_url }] : []}
        imageIndex={0}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
      />
    </View>
  );
}

// **NOTE: These styles are updated to include your fixes**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Make sure loading takes full screen
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
    backgroundColor: '#363D47',
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
    // **NEW: Added margin to help center title when buttons appear**
    marginLeft: 20,
  },
  editSaveButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#3BF579', // Green
  },
  // **NEW: Styles for Cancel button and edit container**
  editButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take up remaining space
    justifyContent: 'flex-end', // Push buttons to the right
  },
  cancelButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#FF4444', // Red
    marginRight: 15,
  },
  disabledButton: {
    opacity: 0.5,
  },
  placeholder: {
    width: 35,
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
    color: '#ffffff',
    marginBottom: 4,
  },
  settingsubinnertext: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    fontWeight: '300',
    color: '#9ca3af',
  },
  input: {
    fontFamily: 'Roboto-regular',
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#363D47',
    borderRadius: 5,
    padding: 10,
    height: 44, // Consistent height
  },
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
  // --- New Dropdown Styles ---
  dropdown: {
    height: 44,
    backgroundColor: '#363D47',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#363D47',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#9ca3af',
    fontFamily: 'Roboto-regular',
    marginLeft: 4,
  },
  dropdownSelectedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Roboto-regular',
    marginLeft: 4,
  },
});