import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, Menu } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
export default function Profile() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");

 const report = require("@/assets/images/report.png");
const{id} = useLocalSearchParams();
 const [visibleMenuId, setVisibleMenuId] = useState(null);
     const openMenu = (id) => {
       setVisibleMenuId(prev => prev === id ? null : id);
     };
     const closeMenu = () => setVisibleMenuId(null);
     const handleSuspend = (id) => {
       console.log('Suspend couriesr:', id);
       setModalVisible(true);
       closeMenu();
     };

      const [modalVisible, setModalVisible] = useState(false);


         const [open, setOpen] = useState(false);
              const [value, setValue] = useState(null);
              const [items, setItems] = useState([
                {label: 'Fraudulent Activity', value: '1'},
                {label: 'Customer Complaints', value: '2'},
                {label: 'Violation of Policies', value: '3'},
                {label: 'Unprofessional Behavior', value: '4'},
                {label: 'Fake/Invalid Documents', value: '5'},
                {label: 'Unprofessional Behavior', value: '6'},
                {label: 'Repeated Late Deliveries', value: '7'},
                 {label: 'Tampering with Orders', value: '8'},
              ]);
      
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Profile: ${id}`,
        }}
      />
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(admin)/menu')}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
      
        <Text style={styles.title}>Complaint</Text>
        <View style={styles.placeholder}/>
      </View>
      <View style={styles.separator} />
          <ScrollView style={styles.mainContent}>
              <View style={styles.notifcontainer}>
                <View style={styles.notifheader}>
                  <Image source={report} style={styles.notificon}/>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.notifheaderText}>Kent Dominic ➔ James Juntilla</Text>
                  </View>
                  <Menu
                  visible={visibleMenuId === id}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      iconColor="#0AB3FF"
                      size={20}
                      style={{marginTop: 1}}
                      onPress={() => openMenu(id)}
                    />
                  }>
                  <Menu.Item onPress={() => handleSuspend(id)} title="Suspend" />
                </Menu>
                </View>
                <View style={styles.notifdescription}>
                  <Text style={styles.notifdescriptiontext}>
                   Report ➔ Courier
                  </Text>
                </View>
                 <View style={styles.notifdescription}>
                  <Text style={styles.notifdescriptiontext}>
                   Time Reported: 12:00 PM 
                  </Text>
                </View>
                <View style={styles.notifdescription}>
                  <Text style={styles.notifdescriptiontext}>
                   Driver got lost / could not find my exact address 
                  </Text>
                </View>
              </View>
              <View style={styles.notifcontainer}>
                <View style={styles.notifheader}>
                  <Image source={report} style={styles.notificon}/>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.notifheaderText}>James Juntilla ➔ Kent Dominic</Text>
                  </View>
                  <Menu
                  visible={visibleMenuId === id}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      iconColor="#0AB3FF"
                      size={20}
                      style={{marginTop: 1}}
                      onPress={() => openMenu(id)}
                    />
                  }>
                  <Menu.Item onPress={() => handleSuspend(id)} title="Suspend" />
                </Menu>
                </View>
                <View style={styles.notifdescription}>
                  <Text style={styles.notifdescriptiontext}>
                   Report ➔ Customer
                  </Text>
                </View>
                 <View style={styles.notifdescription}>
                  <Text style={styles.notifdescriptiontext}>
                   Time Reported: 1:00 PM 
                  </Text>
                </View>
                <View style={styles.notifdescription}>
                  <Text style={styles.notifdescriptiontext}>
                  Violation of Customer Policies
                  </Text>
                </View>
              </View>
      
              
            </ScrollView>

                                           <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                                  <View style={styles.modalView1}>
                                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                                      <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                                        <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                                      </Pressable>
                                      <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', alignItems: 'center', }}>Are you sure you want to suspend this User? The user will not be able to log in or use the services until reactivated.</Text>
                                    </View>
                                    <View style={{ marginBottom: 1 }}>
                                               <View style={styles.filterbtn1}>
                                              <DropDownPicker
                                                open={open}
                                                value={value}
                                                items={items}
                                                setOpen={setOpen}
                                                setValue={setValue}
                                                setItems={setItems}
                                               
                                                placeholder="Select Reason of Suspension"
                                               
                                                style={styles.dropdown1}
                                                textStyle={styles.dropdownText1}
                                                placeholderStyle={styles.placeholderText1}
                                                dropDownContainerStyle={styles.dropdownContainer1}
                                                selectedItemContainerStyle={styles.selectedItemContainer1}
                                                selectedItemLabelStyle={styles.selectedItemLabel1}
                                              />
                                            </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', gap: 40 ,marginTop: -140}}>
                                        <Pressable
                                      style={{ alignSelf: 'center', borderColor: '#ffffff', borderWidth: 1,borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
                                      onPress={() => setModalVisible(false)}
                                    >
                                      <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                      style={{ alignSelf: 'center', backgroundColor: '#FF4E4E', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
                                      onPress={() => setModalVisible(false)}
                                    >
                                      <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Suspend</Text>
                                    </Pressable>
                                    </View>
                                    
                                  </View>
                                </View>
                  </Modal>
              
    </View>
    </>
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
  notifcontainer: {
    backgroundColor: '#1f2937',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  notifheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -5,
  },
  notificon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
  },
  notifheaderText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  notifdescription: {
    paddingLeft: 44,
  },
  notifdescriptiontext: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 20,
    textAlign: 'justify',
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
   modalView1: {
    margin: 20,
    width: '95%',
    height: '40%',
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 35,
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
  filterbtn1:{
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropdown1: {
    backgroundColor: '#22262F',
    borderColor: '#22262F',
    borderWidth: 0,
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownText1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  placeholderText1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  dropdownContainer1: {
    backgroundColor: '#22262F',
    borderColor: '#22262F',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  selectedItemContainer1: {
    backgroundColor: '#4B5563',
  },
  selectedItemLabel1: {
    color: '#0AB3FF',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
});
