import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { IconButton, Menu } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';
import ImageViewing from 'react-native-image-viewing'; // New Import
import supabase from '../../../lib/supabase';

const Userprofile = () => {

    const backimg = require("@/assets/images/back.png");
    const geopick = require("@/assets/images/geopick.png")
    const license = require("@/assets/images/license.png")
    const vehicle = require("@/assets/images/vehicle.png")
    const platenum = require("@/assets/images/platenum.png")
    const theme = require("@/assets/images/theme.png")
    const feature = require("@/assets/images/feature.png")

    const [modalVisible, setModalVisible] = useState(false);
    // removed modalVisible1
    const [viewerVisible, setViewerVisible] = useState(false); // State for Image Viewer
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const { id, from } = useLocalSearchParams();
    const router = useRouter();

    // --- FETCH VIA RPC ---
    useEffect(() => {
      const fetchUserProfile = async () => {
        if (!id) return;

        try {
          setLoading(true);
          // Call the new SQL function
          const { data, error } = await supabase
            .rpc('get_profile_details', { target_id: id })
            .maybeSingle();

          if (error) {
            console.error('Error fetching profile:', error.message);
          } else {
            setUserData(data);
          }
        } catch (e) {
          console.log("System Error:", e);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }, [id]);

    // Construct images array based on fetched data
    const licenseImages = [
      userData?.license_front ? { uri: userData.license_front } : null,
      userData?.license_back ? { uri: userData.license_back } : null, // Assuming license_back exists in data
    ].filter(Boolean);

    const openLicenseViewer = () => {
      if (licenseImages.length > 0) {
        setViewerVisible(true);
      } else {
        Alert.alert("No License", "No license images found for this profile.");
      }
    };

    const handleBack = () => {
      setModalVisible(false);
      setViewerVisible(false);

      if (from === 'courier'){
        router.replace('/(admin)/courier');
      } else{
        router.replace('/(admin)/customer');
      }
    };

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

    const [visibleMenuId, setVisibleMenuId] = useState(null);
    const openMenu = (id) => setVisibleMenuId(prev => prev === id ? null : id);
    const closeMenu = () => setVisibleMenuId(null);

    const handleSuspend = (id) => {
      setModalVisible(true);
      closeMenu();
    };

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent:'center', alignItems:'center'}]}>
        <ActivityIndicator size="large" color="#0AB3FF" />
      </View>
    );
  }

  // Check if the fetched user is a courier based on the RPC flag
  const isCourier = userData?.is_courier;

  return (
  <>
      <Stack.Screen
        options={{
          headerTitle: `Profile: ${userData?.full_name || 'Loading...'}`,
          headerShown: false
        }}
      />
   <View style={styles.container}>
         <View style={styles.header}>
           <Pressable onPress={handleBack}>
             <Image source={backimg} style={styles.backicon}/>
           </Pressable>

           <Text style={styles.title}>Profile</Text>
           <View style={styles.placeholder}/>
         </View>
         <View style={styles.separator} />

         <View style={styles.mainContent}>

           <View style={styles.mainprofilecontainer}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={styles.columnprofile}>
                    <Text style={{fontFamily:'Roboto-Bold', fontSize:18, color:'#ffffff'}}>
                      {userData?.full_name || 'Unknown Name'}
                    </Text>
                    <Text style={{fontFamily:'Roboto-Regular', fontSize:13, color:'#ffffff'}}>
                      {isCourier ? 'Registered Courier' : 'Customer'}
                    </Text>
              </View>

              <View style={styles.rowprofile}>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 3 }}>
                    <Text style={{fontFamily:'Roboto-Regular', fontSize:15, color:'#ffffff'}}>
                      {userData?.status_name || 'Pending'}
                    </Text>
                    <Menu
                      visible={visibleMenuId === id}
                      onDismiss={closeMenu}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          iconColor="#0AB3FF"
                          size={20}
                          style={{marginTop: -5}}
                          onPress={() => openMenu(id)}
                        />
                      }>
                      <Menu.Item onPress={() => handleSuspend(id)} title="Suspend" />
                    </Menu>
                </View>
              </View>
            </View>

          </View>

          <View style={styles.infoprofilecontainer}>
            <View style={styles.sublocationcontainer}>
              <Image source={vehicle} style={styles.geopickicon}/>
              <Text style={styles.sublocationtext}>{userData?.phone_number || 'No Phone'}</Text>
            </View>
            <View style={styles.separator1} />

            <View style={styles.sublocationcontainer}>
              <Image source={vehicle} style={styles.geopickicon}/>
              <Text style={styles.sublocationtext}>{userData?.email_address || 'No Email'} </Text>
            </View>
            <View style={styles.separator1} />

            <View style={styles.sublocationcontainer}>
              <Image source={geopick} style={styles.geopickicon}/>
              <Text style={styles.sublocationtext}>{userData?.address || 'No Address Provided'}</Text>
            </View>
            <View style={styles.separator1} />
          </View>

          {/* CONDITIONAL RENDERING: Based on boolean from SQL */}
          {isCourier ? (
            <>
              <View style={styles.licenseprofilecontainer}>
                <View style={styles.sublocationcontainer}>
                  <Image source={license} style={styles.licenseicon}/>
                  {/* Updated to use Image Viewer Logic */}
                  <Pressable onPress={openLicenseViewer}>
                      <Text style={styles.sublocationtext1}>View Driver License </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.vehicleprofilecontainer}>
                <View style={{flexDirection:'column',}}>
                  <View style={styles.sublocationcontainer}>
                      <Image source={vehicle} style={styles.geopickicon}/>
                      <Text style={styles.sublocationtext}>
                        {userData?.vehicle_type_name || 'Unknown Type'} (ID: {userData?.vehicle_id})
                      </Text>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.sublocationcontainer}>
                      <Image source={vehicle} style={styles.geopickicon}/>
                      <Text style={styles.sublocationtext}>{userData?.vehicle_brand || 'N/A'}</Text>
                  </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.sublocationcontainer}>
                    <Image source={theme} style={styles.geopickicon}/>
                    <Text style={styles.sublocationtext}>{userData?.vehicle_color || 'N/A'}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.sublocationcontainer}>
                    <Image source={platenum} style={styles.geopickicon}/>
                    <Text style={styles.sublocationtext}>{userData?.plate_number || 'N/A'}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.sublocationcontainer2}>
                    <Image source={feature} style={styles.geopickicon}/>
                    <Text style={styles.sublocationtext2} >
                      {userData?.otherdetails_vehicle || 'No additional details.'}
                    </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={[styles.licenseprofilecontainer, { marginTop: 20 }]}>
                <Text style={{color: 'white', textAlign: 'center'}}>User is not registered as a Courier.</Text>
            </View>
          )}

          </View>

          {/* Suspend Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView1}>
                  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                      <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                    </Pressable>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', alignItems: 'center', }}>Are you sure you want to suspend this account? The user will not be able to log in or use the services until reactivated.</Text>
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

          {/* Image Viewer Component */}
          <ImageViewing
            images={licenseImages}
            imageIndex={0}
            visible={viewerVisible}
            onRequestClose={() => setViewerVisible(false)}
          />

        </View>
    </>
  )
};

export default Userprofile

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
   separator1: {
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
      placeholder: {
    width: 24,
  },
    mainprofilecontainer:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:12,
     height:'12%',
  },
  infoprofilecontainer:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:20,
    height:'20%',
  },
   sublocationcontainer:{
    flexDirection:'row',
    alignItems:'flex-start',
    gap:10,
    marginBottom:12,
  },
   sublocationtext:{
    fontFamily:'Roboto-Regular',
    fontWeight:'regular',
    fontSize:14,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
  },

   sublocationtext1:{
    fontFamily:'Roboto-Regular',
    fontWeight:'regular',
    fontSize:17,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    marginTop:2,

  },
  sublocationcontainer2:{
    flexDirection:'row',
    alignItems:'flex-start',
    gap:10,
    marginBottom:12,

  },
   sublocationtext2:{
    fontFamily:'Roboto-Regular',
    fontWeight:'regular',
    fontSize:16,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
  },
  geopickicon:{
    width:21,
    height:21,
    resizeMode:'contain',
    marginRight:10,
  },
  licenseicon:{
    width:30,
    height:30,
    resizeMode:'contain',
    marginRight:10,
  },
    licenseprofilecontainer:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:16,
    height:'8%',

  },
   vehicleprofilecontainer:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:18,
    height:'38%',
  },
  // Removed modalView (old license modal style)
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
  columnprofile:{
    flexDirection:'column',
  },
  rowprofile:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
});