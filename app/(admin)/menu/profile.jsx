import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
      
        <Text style={styles.title}>Profile</Text>
        <View style={styles.placeholder}/>
      </View>
      <View style={styles.separator} />
      
      <View style={styles.mainContent}>
        <View style={styles.settingcontent}>
          <View style={styles.settingsubcontent}>
            <Image source={person} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Full Name</Text>
              <Text style={styles.settingsubinnertext}>Dominic Gayramara</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={email} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Email</Text>
              <Text style={styles.settingsubinnertext}>Not Provided</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={contact} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Phone Number</Text>
              <Text style={styles.settingsubinnertext}>+6312345678910</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={birth} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Date of Birth</Text>
              <Text style={styles.settingsubinnertext}>Not Provided</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={gender} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Gender</Text>
              <Text style={styles.settingsubinnertext}>Male</Text>
            </View>
          </View>
          
          <View style={styles.settingsubcontent}>
            <Image source={home} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Address</Text>
              <Text style={styles.settingsubinnertext}>Aplaya Zone 1-A</Text>
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
});
