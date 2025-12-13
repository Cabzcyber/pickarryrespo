import { useRouter } from 'expo-router';
// --- CHANGED: Removed 'Image' as it's no longer used for buttons ---
import { Pressable, ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator, TextInput } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Image } from 'react-native'; // --- Re-added Image for the logo ---
import { useTheme } from '../../../context/ThemeContext';

export default function term() {
  const router = useRouter();
  const { colors } = useTheme();

  // --- ASSETS (REDUCED) ---
  const backimg = require("@/assets/images/back.png");
  const aboutlogo = require("@/assets/images/aboutlogo.png");
  // --- REMOVED: editIcon, saveIcon, cancelIcon ---

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
    'fare-policies': ''
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

  // --- SAVE ---
  const handleSave = async () => {
    // --- NEW: Check if we have the user ID ---
    if (!currentUserId) {
      Alert.alert("Error", "User ID not found. Cannot save.");
      return;
    }

    setIsLoading(true);
    try {
      // --- CHANGED: Add the user_id to every object ---
      const updates = Object.keys(contentMap).map(slug => ({
        slug: slug,
        content: contentMap[slug],
        user_id: currentUserId // <-- ADDED THIS LINE
      }));

      const { error } = await supabase
        .from('overview')
        .upsert(updates, { onConflict: 'slug' });

      if (error) throw error;

      setOriginalContentMap(contentMap);
      Alert.alert('Success', 'Content updated!');
      setIsEditing(false);
    } catch (error) {
      console.error("Save Error:", error.message);
      Alert.alert('Error', 'Could not save content.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- CANCEL (Unchanged) ---
  const handleCancel = () => {
    setContentMap(originalContentMap);
    setIsEditing(false);
  };

  // --- INPUT CHANGE (Unchanged) ---
  const handleInputChange = (slug, value) => {
    setContentMap(prevMap => ({
      ...prevMap,
      [slug]: value
    }));
  };

  // --- LOADING (Unchanged) ---
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  // --- RENDER (JSX) ---
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(admin)/menu')}>
          {/* Back icon is still an image */}
          <Image source={backimg} style={styles.backicon} />
        </Pressable>
        <Text style={styles.title}>About</Text>

        {/* --- CHANGED: Header buttons are now text --- */}
        <View style={styles.headerButtons}>
          {isEditing ? (
            <>
              {/* SAVE BUTTON */}
              <Pressable onPress={handleSave} style={styles.iconButton}>
                <Text style={styles.headerButtonText}>Save</Text>
              </Pressable>
              {/* CANCEL BUTTON */}
              <Pressable onPress={handleCancel} style={styles.iconButton}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </Pressable>
            </>
          ) : (
            <>
              {/* EDIT BUTTON */}
              <Pressable onPress={() => setIsEditing(true)} style={styles.iconButton}>
                <Text style={styles.headerButtonText}>Edit</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo is still an image */}
        <View style={styles.logoContainer}>
          <Image source={aboutlogo} style={styles.aboutlogo} />
        </View>

        {/* --- Section 1: about --- */}
        {isEditing ? (
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            value={contentMap['about']}
            onChangeText={(text) => handleInputChange('about', text)}
            placeholder="Enter about"
            placeholderTextColor={colors.subText}
            multiline
          />
        ) : (
          <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['about']}</Text>
        )}

        {/* --- Section 2: terms --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>General Terms & Conditions</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              value={contentMap['terms']}
              onChangeText={(text) => handleInputChange('terms', text)}
              placeholder="Enter general terms"
              placeholderTextColor={colors.subText}
              multiline
            />
          ) : (
            <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['terms']}</Text>
          )}
        </View>

        {/* --- Section 3: contact --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              value={contentMap['contact']}
              onChangeText={(text) => handleInputChange('contact', text)}
              placeholder="Enter Contact"
              placeholderTextColor={colors.subText}
              multiline
            />
          ) : (
            <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['contact']}</Text>
          )}
        </View>

        {/* --- Section 4: terms and policies --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Terms of Use</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              value={contentMap['terms-and-policies']}
              onChangeText={(text) => handleInputChange('terms-and-policies', text)}
              placeholder="Enter Terms of Use"
              placeholderTextColor={colors.subText}
              multiline
            />
          ) : (
            <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['terms-and-policies']}</Text>
          )}
        </View>

        {/* --- Section 5: customer policies --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Customer Policies</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              value={contentMap['customer-policies']}
              onChangeText={(text) => handleInputChange('customer-policies', text)}
              placeholder="Enter Customer Policies"
              placeholderTextColor={colors.subText}
              multiline
            />
          ) : (
            <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['customer-policies']}</Text>
          )}
        </View>

        {/* --- Section 6: courier policies --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Courier Policies</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              value={contentMap['courier-policies']}
              onChangeText={(text) => handleInputChange('courier-policies', text)}
              placeholder="Enter Courier Policies"
              placeholderTextColor={colors.subText}
              multiline
            />
          ) : (
            <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['courier-policies']}</Text>
          )}
        </View>

        {/* --- Section 7: fare policies --- */}
        <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Fare Policies</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              value={contentMap['fare-policies']}
              onChangeText={(text) => handleInputChange('fare-policies', text)}
              placeholder="Enter Fare Policies"
              placeholderTextColor={colors.subText}
              multiline
            />
          ) : (
            <Text style={[styles.descriptionText, { color: colors.subText }]}>{contentMap['fare-policies']}</Text>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(31),
    gap: 10, // Reduced gap slightly
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
    flex: 1,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15, // Space between save and cancel
  },
  iconButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  // --- NEW: Style for the header buttons ---
  headerButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#0AB3FF', // Use your app's theme color
  },
  editicon: { // This style is no longer used for buttons but kept for backicon
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
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
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 20,
    minHeight: 50,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
  }
});