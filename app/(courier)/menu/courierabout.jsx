import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default function About() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const aboutlogo = require("@/assets/images/aboutlogo.png");
  const edit = require("@/assets/images/edit.png");
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
        
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Nam sagittis sed elit sed ultrices. Proin sed eleifend nisl. 
          Phasellus eu laoreet nulla, quis volutpat lorem. Maecenas dui mi, 
          faucibus vel sollicitudin ut, malesuada et justo. Morbi et ligula eu 
          felis blandit pellentesque nec sit amet ligula. Aenean justo arcu, 
          euismod vitae libero in, luctus tincidunt massa. Nunc odio dolor, 
          varius egestas velit non, scelerisque porttitor dui. Quisque molestie 
          in nisi a accumsan.
        </Text>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nam sagittis sed elit sed ultrices. Proin sed eleifend nisl. 
            Phasellus eu laoreet nulla, quis volutpat lorem. Maecenas dui mi, 
            faucibus vel sollicitudin ut, malesuada et justo. Morbi et ligula eu 
            felis blandit pellentesque nec sit amet ligula. Aenean justo arcu, 
            euismod vitae libero in, luctus tincidunt massa. Nunc odio dolor, 
            varius egestas velit non, scelerisque porttitor dui. Quisque molestie 
            in nisi a accumsan.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Terms of Use</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nam sagittis sed elit sed ultrices. Proin sed eleifend nisl. 
            Phasellus eu laoreet nulla, quis volutpat lorem. Maecenas dui mi, 
            faucibus vel sollicitudin ut, malesuada et justo. Morbi et ligula eu 
            felis blandit pellentesque nec sit amet ligula. Aenean justo arcu, 
            euismod vitae libero in, luctus tincidunt massa. Nunc odio dolor, 
            varius egestas velit non, scelerisque porttitor dui. Quisque molestie 
            in nisi a accumsan.
          </Text>
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
