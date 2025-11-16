import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function About() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const aboutlogo = require("@/assets/images/aboutlogo.png");
  const edit = require("@/assets/images/edit.png");


  // --- STATE ---
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

 // --- AFTER (Safer) ---
 const [contentMap, setContentMap] = useState({
   'about': '',
   'terms': '',
   'contact': '',
   'terms-and-policies': '',
   'courier-policies': '',
   'customer-policies': '',
   'fare-policies': ''
 });
 const [originalContentMap, setOriginalContentMap] = useState({
   'about': '',
   'terms': '',
   'contact': '',
   'terms-and-policies': '',
   'customer-policies': '',
   'customer-policies': '',
   'fare-policies':''
});


 // --- FETCH ---
   useEffect(() => {
     const fetchOverviewContent = async () => {
       try {
         setIsLoading(true);

         // --- NEW: Get the current user's ID ---
         const { data: { user } } = await supabase.auth.getUser();
         if (!user) {
           throw new Error("User not authenticated.");
         }
         setCurrentUserId(user.id);
         // --- End of new code ---

         const { data, error } = await supabase
           .from('overview')
           .select('slug, content');

         if (error) throw error;

         if (data) {
           const map = data.reduce((acc, row) => {
             acc[row.slug] = row.content || '';
             return acc;
           }, {});
           setContentMap(map);
           setOriginalContentMap(map);
         }
       } catch (error) {
         console.error("Fetch Overview Error:", error.message);
         Alert.alert('Error', 'Could not load page content.');
       } finally {
         setIsLoading(false);
       }
     };

     fetchOverviewContent();
   }, []);





  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back('/(courier)/menu/index')}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
        <Text style={styles.title}>About</Text>
        
      </View>
      <View style={styles.separator} />
      
      <ScrollView 
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoContainer}>
          <Image source={aboutlogo} style={styles.aboutlogo}/>
        </View>
        
        {/* --- Section 1: about --- */}
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={contentMap['about']}
            onChangeText={(text) => handleInputChange('about', text)}
            placeholder="Enter about"
            placeholderTextColor="#9ca3af"
            multiline
          />
        ) : (
          <Text style={styles.descriptionText}>{contentMap['about']}</Text>
        )}

        {/* --- Section 2: terms --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>General Terms & Conditions</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={contentMap['terms']}
              onChangeText={(text) => handleInputChange('terms', text)}
              placeholder="Enter general terms"
              placeholderTextColor="#9ca3af"
              multiline
            />
          ) : (
            <Text style={styles.descriptionText}>{contentMap['terms']}</Text>
          )}
        </View>

        {/* --- Section 3: contact --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={contentMap['contact']}
              onChangeText={(text) => handleInputChange('contact', text)}
              placeholder="Enter Contact"
              placeholderTextColor="#9ca3af"
              multiline
            />
          ) : (
            <Text style={styles.descriptionText}>{contentMap['contact']}</Text>
          )}
        </View>

        {/* --- Section 4: terms and policies --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Terms of Use</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={contentMap['terms-and-policies']}
              onChangeText={(text) => handleInputChange('terms-and-policies', text)}
              placeholder="Enter Terms of Use"
              placeholderTextColor="#9ca3af"
              multiline
            />
          ) : (
            <Text style={styles.descriptionText}>{contentMap['terms-and-policies']}</Text>
          )}
        </View>

        {/* --- Section 5: customer policies --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer Policies</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={contentMap['customer-policies']}
              onChangeText={(text) => handleInputChange('customer-policies', text)}
              placeholder="Enter Customer Policies"
              placeholderTextColor="#9ca3af"
              multiline
            />
          ) : (
            <Text style={styles.descriptionText}>{contentMap['customer-policies']}</Text>
          )}
        </View>

        {/* --- Section 6: courier policies --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Courier Policies</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={contentMap['courier-policies']}
              onChangeText={(text) => handleInputChange('courier-policies', text)}
              placeholder="Enter Courier Policies"
              placeholderTextColor="#9ca3af"
              multiline
            />
          ) : (
            <Text style={styles.descriptionText}>{contentMap['courier-policies']}</Text>
          )}
        </View>

        {/* --- Section 7: fare policies --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Fare Policies</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={contentMap['fare-policies']}
              onChangeText={(text) => handleInputChange('fare-policies', text)}
              placeholder="Enter Fare Policies"
              placeholderTextColor="#9ca3af"
              multiline
            />
          ) : (
            <Text style={styles.descriptionText}>{contentMap['fare-policies']}</Text>
          )}
        </View>
      </ScrollView>
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
    marginTop: verticalScale(31),
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
  editicon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft:''
    
  },
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    width: '100%',
    marginBottom: 1,
    marginTop: verticalScale(6),
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: verticalScale(8),
  },
  scrollContent: {
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  aboutlogo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  descriptionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: '#1f2937',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 20,
    textAlign: 'justify',
  },
});
