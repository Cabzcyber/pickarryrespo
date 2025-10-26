import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';



export default function AdminMenu() {
 const router = useRouter();
const setting = require("@/assets/images/setting.png");
const notification = require("@/assets/images/notification.png");
const calculator = require("@/assets/images/calculator.png");
const report = require("@/assets/images/report.png");
const general = require("@/assets/images/general.png");
const logout = require("@/assets/images/logout.png");




  return (
     <View style={styles.container}>
          <View style={styles.mainContent}>
            <View style={styles.header}>
              <View style={styles.maintext}>
                <Text style={styles.subtext}>Administrator</Text>
                <Text style={styles.subtext1}>+6312345678910</Text>
              </View>
            </View>
            <View style={styles.separator} />
    
            <View style={styles.settingcontent}>  
              <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/notification')}>
                <Image source={notification} style={styles.ordericon}/>
                <Text style={styles.settingsubtext}>Notification</Text>
              </Pressable>
             
              
              <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/about')}>
                <Image source={calculator} style={styles.ordericon}/>
                <Text style={styles.settingsubtext}>Fare</Text>
              </Pressable>

                 <Pressable style={styles.settingsubcontent}  onPress={() => router.push('/(admin)/menu/profile')}>
                <Image source={report} style={styles.ordericon}/>
                <Text style={styles.settingsubtext}>Complaint</Text>
              </Pressable>
              
                 <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/term')}>
                            <Image source={general} style={styles.ordericon}/>
                            <Text style={styles.settingsubtext}>General Terms & Conditions</Text>
                          </Pressable>


               <Pressable style={styles.settingsubcontent} onPress={() => router.push('/(admin)/menu/settings')}>
                <Image source={setting} style={styles.ordericon}/>
                <Text style={styles.settingsubtext}>Settings</Text>
              </Pressable>
              
              <Pressable style={styles.settingsubcontent} onPress={() => router.push('/authlog')}>
                <Image source={logout} style={styles.ordericon}/>
                <Text style={styles.settingsubtext}>Log Out</Text>
              </Pressable>
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
  mainContent: {
    flex: 1,
    padding: 15,
    marginTop: verticalScale(30),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    width: '100%',
    marginBottom: 20,
  },
  maintext: {
    flexDirection: 'column',
    marginTop:'5'
  },
  subtext: {
    fontFamily: 'Roboto Flex',
    fontSize: 20,
    color: '#0AB3FF',
    marginBottom: 5,
  },
  subtext1: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#0AB3FF',
    marginBottom: 5,
  },
  editicon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
  settingsubtext: {
    fontFamily: 'Roboto-Light',
    fontSize: 17,
    fontWeight: '300',
    color: '#ffffff',
  },
  ordericon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
});
