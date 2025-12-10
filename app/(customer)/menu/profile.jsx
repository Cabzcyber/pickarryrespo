import { useRouter, } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../../../lib/supabase';
export default function Profile() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const person = require("@/assets/images/person.png");
  const email = require("@/assets/images/email.png");
  const contact = require("@/assets/images/contact.png");
  const birth = require("@/assets/images/birth.png");
  const gender = require("@/assets/images/gender.png");
  const home = require("@/assets/images/home.png");

// --- State ---
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    address: '',
    user_type: '',       // <-- Added this
    userstatus_id: null  // <-- Added this
  });

  // --> 1. Fetch data (This remains unchanged)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          Alert.alert("Error", "No user session found.");
          router.replace('/(auth)/login'); 
          return;
        }

        const user = session.user;

        const { data, error, status } = await supabase
          .from('service_user')
          .select(`full_name, phone_number,birth_date, gender, address`)
          .eq('user_id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile({
            full_name: data.full_name || 'Not Provided',
            email: user.email || 'Not Provided', 
            phone_number: data.phone_number || 'Not Provided',
            date_of_birth: data.birth_date || 'Not Provided',
            gender: data.gender || 'Not Provided',
            address: data.address || 'Not Provided',
            user_type: data.user_type,       // <-- Added this
            userstatus_id: data.userstatus_id   // <-- Added this
          });
        }
      } catch (error) {
        console.error("Fetch Profile Error:", error.message);
        Alert.alert('Error', 'Could not load profile.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --> 2. Handle saving ONLY the 3 allowed fields
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // **MODIFIED:** Only include the 3 editable fields in the updates
      const updates = {
        user_id: user.id, // Target the correct row
        full_name: profile.full_name,
        gender: profile.gender,
        address: profile.address,
        birth_date: profile.date_of_birth,
        email_address: user.email,// Get email from the auth user
        phone_number: profile.phone_number,
        user_type: profile.user_type || 'customer',
        userstatus_id: profile.userstatus_id || 1
      };

      const { error } = await supabase.from('service_user').upsert(updates);

      if (error) {
        throw error;
      }
      
      Alert.alert('Success', 'Profile updated!');
      setIsEditing(false); // Switch back to view mode
      
    } catch (error) {
      console.error("Save Error:", error.message);
      Alert.alert('Error', 'Could not save profile.');
    } finally {
      setIsLoading(false);
    }
  };

  // --> Helper function to update state (unchanged, still needed)
  const handleInputChange = (field, value) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }));
  };
  
  // --- Loading Spinner ---
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(customer)/menu')}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
      
        <Text style={styles.title}>Profile</Text>
        <View style={styles.placeholder}/>
            <Pressable onPress={isEditing ? handleSave : () => setIsEditing(true)}>
                      <Text style={styles.editSaveButton}>{isEditing ? 'Save' : 'Edit'}</Text>
                    </Pressable>
        
      </View>
      <View style={styles.separator} />
      
      <View style={styles.mainContent}>
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

                ):(
                  <Text style={styles.settingsubinnertext}>{profile.full_name}</Text>
                )}
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={email} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Email</Text>
              <Text style={styles.settingsubinnertext}>{profile.email}</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={contact} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Phone Number</Text>
              <Text style={styles.settingsubinnertext}>{profile.phone_number}</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={birth} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Date of Birth</Text>
              <Text style={styles.settingsubinnertext}>{profile.date_of_birth}</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={gender} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Gender</Text>
               {isEditing ? (
                  <TextInput
                  style={styles.input}
                  value={profile.gender}
                  onChangeText={(text)=>handleInputChange('gender', text)}
                  placeholder="Enter Gender"
                  placeholderTextColor="#9ca3af"
                  />

                ):(
                  <Text style={styles.settingsubinnertext}>{profile.gender}</Text>
                )}
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={home} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Address</Text>
               {isEditing ? (
                  <TextInput
                  style={styles.input}
                  value={profile.address}
                  onChangeText={(text)=>handleInputChange('address', text)}
                  placeholder="Enter Gender"
                  />

                ):(
                 <Text style={styles.settingsubinnertext}>{profile.address}</Text>
                )}
             
            </View>
          </View>
          
        
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141519',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
   gap:20,
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
  logo: {
    width: 120,
    height: 28,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 24,
  },
  mainContent: {
    flex: 1,
    padding: 15,
    marginTop: verticalScale(1),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
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
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
  editSaveButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#0AB3FF',
    marginLeft: 150,
  },
  input: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: '#FFFFFF', // Make text white so it's visible
    borderBottomWidth: 1,
    borderBottomColor: '#363D47',
    paddingVertical: 4,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
