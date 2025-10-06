import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default function Settings() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const region = require("@/assets/images/region.png");
  const theme = require("@/assets/images/theme.png");
  const language = require("@/assets/images/language.png");
  return (
    <View style={styles.container}>
       <View style={styles.header}>
              <Pressable onPress={() => router.back('/(customer)/menu/index')}>
                <Image source={backimg} style={styles.backicon}/>
              </Pressable>
            
              <Text style={styles.title}>Settings</Text>
              <View style={styles.placeholder}/>
            </View>
          <View style={styles.separator} />
      <View style={styles.mainContent}>
        <View style={styles.contentArea}>
         <View style={styles.settingcontent}>
                   <View style={styles.settingsubcontent}>
                     <Image source={region} style={styles.ordericon}/>
                     <View style={styles.textContainer}>
                       <Text style={styles.settingsubtext}>Region</Text>
                       <Text style={styles.settingsubinnertext}>Region X</Text>
                     </View>
                   </View>
                   
                   <View style={styles.settingsubcontent}>
                     <Image source={theme} style={styles.ordericon}/>
                     <View style={styles.textContainer}>
                       <Text style={styles.settingsubtext}>Theme</Text>
                       <Text style={styles.settingsubinnertext}>Dark</Text>
                     </View>
                   </View>
                   
                   <View style={styles.settingsubcontent}>
                     <Image source={language} style={styles.ordericon}/>
                     <View style={styles.textContainer}>
                       <Text style={styles.settingsubtext}>Language</Text>
                       <Text style={styles.settingsubinnertext}>English</Text>
                     </View>
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
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    width: '100%',
    marginBottom: 1,
  },
  placeholder: {
    width: 24,
  },
  mainContent: {
    flex: 1,
    padding: 15,
    marginTop: verticalScale(-400),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#87AFB9',
    marginBottom: 20,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#87AFB9',
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
