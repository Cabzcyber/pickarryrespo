import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { verticalScale } from 'react-native-size-matters';
const deliverongoing = () => {
   const router = useRouter(); 
    const backimg =require("@/assets/images/back.png")
  const headerlogo =require("@/assets/images/headerlogo.png")
  const headerheart =require("@/assets/images/heart.png")
  const geopick =require("@/assets/images/geopick.png")
  const geodrop =require("@/assets/images/geodrop.png")
  const feature =require("@/assets/images/feature.png")
  const goodimg =require("@/assets/images/goodimg.png")
  const urgent =require("@/assets/images/urgent.png")
  const [modalVisible, setModalVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
const report =require("@/assets/images/report.png")
const calculator =require("@/assets/images/calculator.png")
const call =require("@/assets/images/call.png")
  const [viewerVisible, setViewerVisible] = useState(false);
  const sampleImages = [
    { uri: Image.resolveAssetSource(require('@/assets/images/react-logo.png')).uri },
    { uri: Image.resolveAssetSource(require('@/assets/images/onfoot.png')).uri },
    { uri: Image.resolveAssetSource(require('@/assets/images/motorcycle.png')).uri },
  ];
  
  
  return (
     <>
              <Stack.Screen 
                options={{
                  title: '',
                  headerShown: false,  
                }}
              />
           <View  style={styles.container}>
            <View style={styles.header}>

                                      <Image  source={headerlogo} style={styles.logo}/>
            
                                      <Pressable style={styles.headerbutton}
                                      onPress={()=>{}}
                                      >
                                          <Image  source={headerheart} style={styles.heartIcon}/>  
                                      </Pressable>
                              </View> 


            <View style={styles.mainContent}>
               <View style={styles.orderinfo}>
                          <View style={styles.info}>
                            <Text style={styles.infotext}>
                                Order Ongoing August 20,2025 1:00 PM -5:00 pm
                            </Text> 
                            <Text style={styles.infosubtext}>
                              Pasundo
                            </Text>
                          </View>
                          <View style={styles.farecontainer}>
                            <Text style={styles.totalfare}>₱ 20.00 
                              in Cash
                               </Text>
                          </View>
                        </View>
               <View style={styles.locationcontainer1}>
                        <View style={styles.sublocationcontainer}>
                        <Image  source={geopick} style={styles.geopickicon}/>
                        <Text  style={styles.sublocationtext}>Zone 2 Upper Jasaan Misamis Oriental  </Text>
                        </View>
                        <View style={styles.sublocationcontainer}>
                        <Image  source={geodrop} style={styles.geodropicon}/>
                        <Text style={styles.sublocationtext}>Zone 2 Jampason Jasaan Misamis Oriental  </Text>
                        </View>
                        </View>
              <View style={styles.locationcontainer1}>
                        <View style={styles.sublocationcontainer}>
                        <Image  source={feature} style={styles.geopickicon}/>
                        </View>
                         <View style={styles.viewimgcontainer}>
                                    <Pressable style={styles.viewPhotos} onPress={()=> setViewerVisible(true)}>
                                      <Text style={styles.viewPhotosText}>View Goods To Deliver Photos</Text>
                                    </Pressable>
                        
                        
                                    </View>
                        </View>
              <View style={styles.locationcontainer2}>
                        <View style={styles.sublocationcontainer2}>
                        <Image  source={feature} style={styles.geopickicon}/>
                        <Text style={styles.sublocationtext2} >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in lacus quis lectus consequat dapibus ut ac nisi. Maecenas ultricies sit a

                        </Text>
                        </View>
                         <View style={styles.sublocationcontainer2}>
                        <Image  source={urgent} style={styles.geopickicon}/>
                        <Text style={styles.sublocationtext2} >
                         Ipa-Dali Deliver Bonus ₱ 20.00

                        </Text>
                        </View>
                        </View>

                  <View style={styles.optionbtn}>
                                <Pressable style={styles.optionItem} onPress={()=>router.push('/(customer)/home/ordercomplete')}>
                                  <View style={styles.optionCircle}>
                                    <Image  source={call} style={styles.cancelicon}/> 
                                  </View>
                                  <Text style={styles.optionLabel}
                                   
                                  >Call</Text>
                                </Pressable>
                              <View style={styles.optionItem}>
                                <Pressable onPress={()=>setReportVisible(true)}>
                                  <View style={styles.optionCircle}>
                                    <Image  source={report} style={styles.reporticon}/> 
                                  </View>
                                </Pressable>
                                <Pressable onPress={()=>setReportVisible(true)}>
                                  <Text style={styles.optionLabel}>Report</Text>
                                </Pressable>
                              </View>
                              <View style={styles.optionItem}>
                                <View style={styles.optionCircle}>
                                  <Pressable
                                  onPress={() => setModalVisible(true)}>
                                  <Image  source={calculator} style={styles.calculatoricon}
                                  /> 
                                  </Pressable>
                                </View>
                                <Text style={styles.optionLabel}>Delivery Fare</Text>
                              </View>
                            </View>

               


              <Pressable style={styles.mainbutton}
                          onPress={() => router.push('/(courier)/home/delivercomplete')}
                            > 
                            <Text style={styles.maintextbutton}>Arrived</Text>
                            </Pressable>  


            </View>

            
                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                          setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => setModalVisible(!modalVisible)}>
                              <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>
            
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={reportVisible}
                        onRequestClose={() => setReportVisible(false)}
                      >
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Text style={styles.textStyle}>Report an Issue</Text>
                            <Text style={[styles.textStyle, { marginTop: 8 }]}>This is a placeholder modal.</Text>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => setReportVisible(false)}
                            >
                              <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>

              <ImageViewing
            images={sampleImages}
            imageIndex={0}
            visible={viewerVisible}
            onRequestClose={() => setViewerVisible(false)}
          />
          </View>
       
         </>
  )
}

export default deliverongoing


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#141519',
  },
  mainContent: {
    flex: 1,
    padding: 24,
    
  },
  header:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal: 12,
      paddingTop: 12,
      marginTop: verticalScale(30),
    },
    header1:{
    },
    headerbutton:{
      width:37,
      height:36,
      borderRadius: 10,
      backgroundColor:'#22262F',
      alignItems:'center',
      justifyContent:'center',
    },
    backIcon:{
      width:30,
      height:30,
      resizeMode:'contain',
    },
    logo:{
      width:120,
      height:28,
      resizeMode:'contain',
    },
    heartIcon:{
      width:20,
      height:20,
      resizeMode:'contain',
    },
    orderinfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  info:{
    width:'60%'

  },
  infotext:{
    fontFamily:'roboto',
    fontWeight:'bold',
    fontSize:21,
    color:'#ffffff',
    overflow:'hidden'
  },
  infosubtext:{
    fontFamily:'roboto',
    fontWeight:'regular',
    fontSize:16,
    color:'#8796AA',
    overflow:'hidden'

  },
  farecontainer:{
    flexDirection:'row',
    backgroundColor:'#192028',
    width:'40%',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:12,
    paddingHorizontal:12,
    paddingVertical:10,
  },
  totalfare:{
    fontFamily:'roboto',
    fontWeight:'regular',
    fontSize:20,
    color:'#87AFB9',
    overflow:'hidden',
    marginRight:8,

  },
  locationcontainer1:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:12,
  },
  sublocationcontainer1:{
    flexDirection:'row',
    alignItems:'flex-start',
    gap:10,
    marginBottom:12,
    
  },
  locationcontainer2:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:12,
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
    fontSize:17,
    color:'#ffffff',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
  },
  locationcontainer:{
    flexDirection:'column',
    marginTop:16,
    backgroundColor:'#363D47',
    borderRadius:14,
    padding:12,
  },
  sublocationcontainer:{
    flexDirection:'row',
    alignItems:'flex-start',
    gap:10,
    marginBottom:12,
    
  },
  sublocationtext:{
    fontFamily:'roboto',
    fontWeight:'regular',
    fontSize:17,
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
  geodropicon:{
    width:22,
    height:22,
    resizeMode:'contain',
    marginRight:10,
  },
  goodsicon:{
    width:22,
    height:22,
    resizeMode:'contain',
    marginRight:10,
  },
   viewPhotos:{
    marginTop:16,
    paddingVertical:10,
    paddingHorizontal:14,
    backgroundColor:'#22262F',
    borderRadius:10,
  },
  viewPhotosText:{
    color:'#87AFB9',
    fontSize:14,
    textAlign:'center',
  },
mainbutton:{
    flexDirection:'column',
    width:'100%',
    maxWidth:1024,
    padding:10,
    justifyContent:"center",
    alignItems:'center',
    marginHorizontal:'auto',
    pointerEvents:'auto',
    backgroundColor:'#3BF579',
    borderRadius: 10,
     marginTop: verticalScale(40),
    },
    maintextbutton:{
    fontSize:18,
    color:'black',
    fontFamily: 'Roboto-Bold', 
    },
optionbtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:48,
    marginTop:16,
  },
  optionItem:{
    alignItems:'center',
    justifyContent:'center',
  },
  optionCircle:{
    width:72,
    height:72,
    borderRadius:36,
    backgroundColor:'#22262F',
    alignItems:'center',
    justifyContent:'center',
  },
  cancelicon:{
    width:34,
    height:34,
    resizeMode:'contain',
  },
  reporticon:{
    width:30,
    height:30,
    resizeMode:'contain',
  },
  calculatoricon:{
    width:30,
    height:30,
    resizeMode:'contain',
  },
  optionLabel:{
    marginTop:6,
    color:'#8796AA',
    textAlign:'center',
    fontSize:12,
  },
  
   modalView: {
    margin: 20,
    width: '80%',
    height: '25%',
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
  button: {
  
  },
  buttonOpen: {
    
 
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#7398A9',
    fontFamily: 'Roboto-regular',

    textAlign: 'center',
    fontSize: 15,
    flex: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto-regular',
  },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto-regular',
  },
  
})