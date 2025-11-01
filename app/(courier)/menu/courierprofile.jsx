import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
    const theme = require("@/assets/images/theme.png");
    const vehicle = require("@/assets/images/vehicle.png");
    const platenum = require("@/assets/images/platenum.png");
     const license = require("@/assets/images/license.png");

  const [modalVisible1, setModalVisible1] = useState(false);










  return (


    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back('/(courier)/menu/index')}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
      
        <Text style={styles.title}>Profile</Text>
        <View style={styles.placeholder}/>
      </View>
      <View style={styles.separator} />
      
      <ScrollView style={styles.mainContent}>
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

           <View style={styles.settingsubcontent}>
            <Image source={vehicle} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Type of Vehicle </Text>
              <Text style={styles.settingsubinnertext}>Motorcycle</Text>
            </View>
          </View>

           <View style={styles.settingsubcontent}>
            <Image source={theme} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Vehicle Color</Text>
              <Text style={styles.settingsubinnertext}>Blue</Text>
            </View>
          </View>

           <View style={styles.settingsubcontent}>
            <Image source={platenum} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Plate Number</Text>
              <Text style={styles.settingsubinnertext}>AFD-2645</Text>
            </View>
          </View>

           <View style={styles.settingsubcontent}>
            <Image source={vehicle} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Text style={styles.settingsubtext}>Vehicle Brand</Text>
              <Text style={styles.settingsubinnertext}>Honda</Text>
            </View>
          </View>

           <View style={styles.settingsubcontent}>
            <Image source={license} style={styles.ordericon}/>
            <View style={styles.textContainer}>
              <Pressable
              onPress={() => setModalVisible1(true)}>
              
                    <Text style={styles.settingsubtext}>Driver License</Text>
              <Text style={styles.settingsubinnertext}>View License</Text>
              </Pressable>
        
            </View>
          </View>
        <Text>{'\n'}
{'\n'}
{'\n'}

{'\n'}</Text>

        </View>
      </ScrollView>
      <Modal
                                      animationType="slide"
                                      transparent={true}
                                      visible={modalVisible1}
                                      onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                        setModalVisible1(!modalVisible1);
                                      }}>
                                        
                                      <View style={styles.centeredView}>
                                     
                                     
                                          <View style={styles.modalView}>
                                            <Pressable
                                              style={{ alignSelf: 'flex-start', marginBottom: 8 }}
                                              onPress={() => setModalVisible1(false)}
                                            >
                                               <Image  source={backimg} style={{ width:40, height:40, resizeMode:'contain'}}/>
                                              
                                            </Pressable>
                                          </View>
                                          
                                      </View>
                                      
                                      
                                      
                                      
                                    </Modal> 
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
   modalView: {
    margin: 20,
    width: '95%',
    height: '40%',
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto-regular',
  },
});
