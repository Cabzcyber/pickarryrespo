import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';

const deliveryprofile = () => {
  
      const backimg = require("@/assets/images/back.png");
      const goodimg =require("@/assets/images/goodimg.png")
      const vehicle =require("@/assets/images/vehicle.png")
        const platenum =require("@/assets/images/platenum.png")
        const theme =require("@/assets/images/theme.png")
        const feature =require("@/assets/images/feature.png")
        const geopick =require("@/assets/images/geopick.png")
        const geodrop =require("@/assets/images/geodrop.png")
        const person =require("@/assets/images/person.png")
        const money =require("@/assets/images/money.png")
        const category =require("@/assets/images/category.png")
         const goods =require("@/assets/images/goods.png")
         const urgent =require("@/assets/images/urgent.png")

          
      const [modalVisible, setModalVisible] = useState(false);
       const [modalVisible1, setModalVisible1] = useState(false);
  
      const{id,from} = useLocalSearchParams();
      const router = useRouter();
  
      const handleBack=()=>{
        if (from === 'order'){
          router.replace('/(admin)/order');
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
      const openMenu = (id) => {
        setVisibleMenuId(prev => prev === id ? null : id);
      };
      const closeMenu = () => setVisibleMenuId(null);
    
      
    
      const handleFare = (id) => {
        console.log('Suspend couriesr:', id);
        setModalVisible(true);
        closeMenu();
      };
  return (
     <>
      <Stack.Screen
        options={{
          headerTitle: `Profile: ${id}`,
        }}
      />
   <View style={styles.container}>
         <View style={styles.header}>
           <Pressable onPress={handleBack}>
             <Image source={backimg} style={styles.backicon}/>
           </Pressable>
         
           <Text style={styles.title}>Delivery Detail</Text>
           <View style={styles.placeholder}/>
         </View>
         <View style={styles.separator} />
         <View style={styles.mainContent}>

           <View style={styles.mainprofilecontainer}>
            <View   style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.columnprofile}>
                                    
                                          <Text  style={{fontFamily:'Roboto-Bold', fontSize:20, color:'#ffffff',marginBottom:'3'}}>
                                        Order Delivery
                                      </Text>
                                      <Text style={{fontFamily:'Roboto-Regular', fontSize:13, color:'#ffffff',marginBottom:'9'}}>
                                         Pasundo
                                        </Text>
                                         <Text style={{fontFamily:'Roboto-Regular', fontSize:13, color:'#ffffff'}}>
                                         Total: ₱20.00
                                        </Text>
                                  </View>
                                     <View style={styles.rowprofile}>
                                      <View style={{ flexDirection: 'row', gap: 8,marginTop: 3 }}>
                                     
                                          <Text style={{fontFamily:'Roboto-Regular', fontSize:15, color:'#ffffff'}}>
                                        Active
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
                  
                  <Menu.Item onPress={() => handleFare(id)} title="Fare Detail" />
                </Menu>
       
                                      </View>
   
                                      </View> 
            </View>
                         
                                  </View>
                        <View style={styles.infoprofilecontainer}>
                                                          <View style={styles.sublocationcontainer}>
                                                          <Image  source={geopick} style={styles.geopickicon}/>
                                                          <Text  style={styles.sublocationtext}>Bobuntogan Zone 4 Misamis Oriental</Text>
                                                          </View>
                                                            
                                                          <View style={styles.sublocationcontainer}>
                                                          <Image  source={geodrop} style={styles.geopickicon}/>
                                                          <Text style={styles.sublocationtext}>Jampason Jasaan Zone 2</Text>
                                                          </View>
                                                           
                                                          </View>

                           <View style={styles.infoprofilecontainer}>
                                                          <View style={styles.sublocationcontainer}>
                                                          <Image  source={person} style={styles.geopickicon}/>
                                                          <Text  style={styles.sublocationtext}>Kent Dominic</Text>
                                                          </View>
                                                           
                                                          <View style={styles.sublocationcontainer}>
                                                          <Image  source={vehicle} style={styles.geopickicon}/>
                                                          <Text style={styles.sublocationtext}>James Juntilla</Text>
                                                          </View>
                                                               
                                                          </View>
                                  
                                   <View style={styles.licenseprofilecontainer}>
                                    <View style={styles.sublocationcontainer}>
                                                          <Image  source={goodimg} style={styles.licenseicon}/>
                                                          <Pressable
                                                           onPress={() => setModalVisible1(true)}>
                                                             <Text  style={styles.sublocationtext1}>View Delivered Items </Text>
                                                          </Pressable>
                                                          
                                                          </View>
                                  </View>
                        <View style={styles.vehicleprofilecontainer}>                   
                              <View style={{flexDirection:'column',}}>
                                      <View style={styles.sublocationcontainer}>
                                                          <Image  source={category} style={styles.geopickicon}/>
                                                          <Text  style={styles.sublocationtext}>School & Office Supplies</Text>
                                                          </View>
                                                          
                                                          <View style={styles.sublocationcontainer}>
                                                          <Image  source={money} style={styles.geopickicon}/>
                                                          <Text style={styles.sublocationtext}>Cash On Delivery </Text>
                                                          </View>
                              </View> 
                              
                          <View style={styles.sublocationcontainer}>
                                                          <Image  source={vehicle} style={styles.geopickicon}/>
                                                          <Text  style={styles.sublocationtext}>Motorcycle</Text>
                                                          </View>
                                                         
                              <View style={styles.sublocationcontainer2}>
                                                      <Image  source={feature} style={styles.geopickicon}/>
                                                      <Text style={styles.sublocationtext2} >
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in lacus quis lectus 
                                                        consequat dapibus ut ac nisi. Maecenas ultricies sit a
                                                      </Text>
                                                      </View>
                                  <View style={styles.sublocationcontainer2}>
                                                      <Image  source={urgent} style={styles.geopickicon}/>
                                                      <Text style={styles.sublocationtext2} >
                                                       Ipa-Dali Deliver Bonus ₱20.00
                                                      </Text>
                                                      </View>
                         
                            </View>                              


                                                            









                                  
                                  
          
            </View>  
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
                                       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                                                               <Pressable onPress={() => setModalVisible(false)} style={{ marginRight: 12 }}>
                                                                                 <Text style={{ fontSize: 22, color: '#0AB3FF' }}>{'\u25C0'}</Text>
                                                                               </Pressable>
                                                                               <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Fare Breakdown</Text>
                                                                             </View>
                                                                             <View style={{ marginBottom: 18 }}>
                                                                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                                                                 <Text style={{ color: '#b0c4d4' }}>Base Fare</Text>
                                                                                 <Text style={{ color: '#fff' }}>₱20.00</Text>
                                                                               </View>
                                                                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                                                                 <Text style={{ color: '#b0c4d4' }}>Distance (1.8 km)</Text>
                                                                                 <Text style={{ color: '#fff' }}>₱8.00</Text>
                                                                               </View>
                                                                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                                                                 <Text style={{ color: '#b0c4d4' }}>Time Cost</Text>
                                                                                 <Text style={{ color: '#fff' }}>₱5.00</Text>
                                                                               </View>
                                                                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                                                                 <Text style={{ color: '#b0c4d4' }}>Goods Cost:</Text>
                                                                                 <Text style={{ color: '#fff' }}>₱00.0</Text>
                                                                               </View>
                                                                               <View style={{ borderTopWidth: 1, borderTopColor: '#2a3a4d', marginVertical: 8 }} />
                                                                               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                                 <Text style={{ color: '#b0c4d4', fontWeight: 'bold' }}>Total Payment</Text>
                                                                                 <Text style={{ color: '#0AB3FF', fontWeight: 'bold' }}>₱20.00</Text>
                                                                               </View>
                                                                             </View>
                                                                             <Pressable
                                                                               style={{ alignSelf: 'center', backgroundColor: '#22262F', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 8 }}
                                                                               onPress={() => setModalVisible(false)}
                                                                             >
                                                                               <Text style={{ color: '#0AB3FF', fontWeight: 'bold', fontSize: 16 }}>Minimize</Text>
                                                                             </Pressable>
                                                                           
                                      
                                      
                                    
                                  </View>
                                </View>
                  </Modal>
              
           </View>
          
             
    </>
  )
};

export default deliveryprofile;


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
    marginBottom: 1,
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
        marginBottom:9
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
    height:'13%',
  },
   sublocationcontainer:{
    flexDirection:'row',
    alignItems:'flex-start',
    gap:10,
    marginBottom:15,
  },
   sublocationtext:{
    fontFamily:'roboto',
    fontWeight:'regular',
    fontSize:15,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
  }, 
  
   sublocationtext1:{
    fontFamily:'roboto',
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
    fontFamily:'roboto',
    fontWeight:'regular',
    fontSize:16,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
  },
  geopickicon:{
    width:22,
    height:22,
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
    height:'35%',
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
  columnprofile:{
    flexDirection:'column',
   
    
  },
  rowprofile:{
    flexDirection:'row',
    justifyContent:'space-between',
    
  },

});

