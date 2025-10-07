import AntDesign from '@expo/vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from 'react-native-elements';
import { verticalScale } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';


const onfoot = require("@/assets/images/onfoot.png");
const dulog = require("@/assets/images/dulog.png");
const motorcycle = require("@/assets/images/motorcycle.png");
const rela = require("@/assets/images/rela.png");
const bike = require("@/assets/images/bike.png");
const passengercar = require("@/assets/images/passengercar.png");
const truck = require("@/assets/images/truck.png");
const next = require("@/assets/images/next.png");
const money = require("@/assets/images/money.png");
const time = require("@/assets/images/time.png");

export default function index() {
  const snapPoints = useMemo(() => ['10%', '25%', '50%', '70%'], []);
  const bottomSheetRef = useRef(null);
  const router = useRouter(); 
  const [value, setValue] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const data = [
    { label: 'Pasundo', value: '1' },
    { label: 'Pasugo', value: '2' },
  ];
  const data1 = [
    { label: 'Cash On Delivery', value: '3' },
    { label: 'G-Cash', value: '4' },
  ];

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const handleSheetChanges = (index) => {
    console.log('Bottom sheet index changed to:', index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Map Area</Text>
        <Text style={styles.subtitle}>Soon To Be kuan</Text>
      </View>
      
      <View style={styles.inputlocationcontainer}>
                             <View style={styles.inputcontainer}>
                             <Pressable style={styles.textinputloc} >
           <Text style={styles.textloc}
           onPress={() => router.push('/(customer)/home/pickup')}>
                       Where To Pickup?

                    </Text>
              <Image  source={next} style={styles.nexticon}/>
             </Pressable>
             
                           </View>  
             <View style={styles.inputcontainer}>
           <Pressable style={styles.textinputloc} >
           <Text style={styles.textloc}
           onPress={() => router.push('/(customer)/home/dropoff')}>
                       Where To Drop-off?
                    </Text>
           <Image  source={next} style={styles.nexticon}/>
             </Pressable>
             </View> 

                <View style={styles.inputcontainer}>
                  <Pressable style={styles.textinputloc} >
                    <Text style={styles.textloc}
                     onPress={() => router.push('/(customer)/home/setgoods')}
                    >What To Deliver?
                           </Text>
                            <Image  source={next} style={styles.nexticon}/>
             </Pressable>
                  </View> 
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={1} 
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}

      >
        <BottomSheetView style={styles.contentContainer}
        pointerEvents="box-none">


          <View style={styles.bottomsheetcontainer}>
            {/* Top Row */}
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Delivery Type"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }}
                  renderItem={renderItem}
                />
              </View>
              
              <View style={styles.gridItem}>
                <View style={styles.remembercontainer}>
                  <View style={styles.recover}>
                    <CheckBox
                      checked={isSelected}
                      onPress={() => setSelected(!isSelected)}
                      checkedColor='#1976d2'
                      uncheckedColor='#aaa'
                      size={20}
                      style={{marginRight: 5}} />
                    <Text style={{ color: '#7398A9', marginLeft: 5, flex: 1, fontSize: 11 }} numberOfLines={1}>Book For Delivery</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom Row */}
            <View style={styles.gridRow}>
  
              
              <View style={styles.gridItem}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data1}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Payment"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }}
                  renderItem={renderItem}
                />
              </View>

              <View style={styles.gridItem}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.textStyle}>Set Schedule</Text>
                    <Image  source={time} style={styles.ordericon}/>
                </Pressable>
              </View>
            </View>
          </View>
           <View style={styles.swiperContainer}>
  <Swiper style={styles.swiperWrapper} showsButtons={true} height={200}
  >
    {[
      { id: 'foot', label: 'On Foot - ₱ 10', image: onfoot },
      { id: 'dulog', label: 'Dulog - ₱ 25', image: dulog },
      { id: 'motorcycle', label: 'Motorcycle - ₱ 20', image: motorcycle },
      { id: 'rela', label: 'Rela - ₱ 15', image: rela },
      { id: 'bike', label: 'Bicycle - ₱ 10', image: bike },
      { id: 'passenger', label: 'Passenger Car - ₱ 40', image: passengercar },
      { id: 'truck', label: 'Truck - ₱ 90', image: truck },
    ].map(item => (
      <Pressable
  key={item.id}
  onPress={() =>
    setSelectedSlide(selectedSlide === item.id ? null : item.id)
  }
  style={[
    styles.slide,
    selectedSlide === item.id && styles.selectedSlide
  ]}
>
  <Text style={styles.swiperText}>{item.label}</Text>
  <Image source={item.image} style={styles.slideimg} />
</Pressable>
    ))}
  </Swiper>
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



          <Pressable style={styles.mainbutton}
                                        onPress={()=>router.push('/(customer)/home/ordersearch')}
                                        > 
                                           <Text style={styles.maintextbutton}>Order</Text>
                                              </Pressable>   


        </BottomSheetView> 
      </BottomSheet>
      
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
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
  },
  bottomSheetBackground: {
    backgroundColor: '#363D47',
  },
  handleIndicator: {
    backgroundColor: '#0AB3FF',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 20,
  },
  bottomshtcontainer:{





  },
  inputlocationcontainer:{
    
position: 'absolute',
justifyContent:'center',
width: 381,
height: 221,
left: 17,
top: 95,
backgroundColor:'#363D47',
borderRadius: 28
  },
  inputcontainer:{
    flexDirection:'column',
    width:'101%',
    height:'30%',
    maxWidth:1024,
    padding:9,
    marginHorizontal:'auto',
    pointerEvents:'auto',
    },
   textinputloc: {
  flexDirection: 'row',          // horizontal layout
  alignItems: 'center',          // vertically center content
  justifyContent: 'space-between', // text left, icon right
  backgroundColor: '#192028',
  borderColor: '#192028',
  borderWidth: 1,
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 15,
  marginBottom: 8,
},

textloc: {
  flexShrink: 1,
  color: '#7398A9',
  fontFamily: 'Roboto-light',
  fontSize: 18,
  lineHeight: 23,
  
},

nexticon: {
  width: 30,
  height: 28,
  resizeMode: 'contain',
  tintColor: '#00bfff',  // matches your accent blue
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
           marginTop: verticalScale(30),
          },
          maintextbutton:{
          fontSize:18,
          color:'black',
          fontFamily: 'Roboto-Bold', 
          },
          dropdown: {
            backgroundColor: '#192028',
            borderColor:'#192028',
            color: '#7398A9',
            height: 50,
            borderRadius: 12,
            padding: 12,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0.1,
          },
          icon: {
            marginRight: 5,
            color: '#7398A9',
          },
          item: {
            color: '#7398A9',
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        
          },
          textItem: {
            flex: 1,
            fontSize: 16,
          },
          placeholderStyle: {
            fontSize: 16,
            color: '#7398A9',
            fontFamily: 'Roboto-regular',
            marginLeft:5, marginLeft:5,
          },
          selectedTextStyle: {
            fontSize: 16,
            color: '#7398A9',
            fontFamily: 'Roboto-regular',
             marginLeft:5,
          },
          iconStyle: {
            width: 20,
            height: 20,
            color: '#7398A9',
          },
          inputSearchStyle: {
            height: 40,
            fontSize: 16,
            color: '#7398A9',
             marginLeft:5,
          },
          bottomsheetcontainer:{
            flex: 1,
            paddingHorizontal: 8,
            paddingVertical: 8,
          },
          gridRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
            alignItems: 'stretch',
            width: '100%',
          },
          gridItem: {
            flex: 1,
            marginHorizontal: 2,
            justifyContent: 'center',
            minWidth: 0,
          },
          remembercontainer:{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#192028',
            borderRadius: 12,
            
            height: 50,
            justifyContent: 'flex-start',
            flex: 1,
          },
          recover:{
            flexDirection:'row',
            alignItems: 'center',
            flex: 1,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#192028',
    height: 50,
    padding: 14,
    pointerEvents:'auto',  
    borderRadius: 10,
    justifyContent:"center",
    alignItems:'center',
    fontFamily: 'Roboto-regular',
     flexDirection: 'row',          // horizontal layout
  
  },
  ordericon:{
  width:22,
  height:22,
  resizeMode:'contain',
  marginRight:10,
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
  swiperContainer: {
    height: 200,
    marginVertical: 20,
   width:'100%',
    
  },
  swiperWrapper: {
    height: 200,
   
  },
   slide: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#465569',
  borderRadius: 17,
  width: '70%',
  alignContent: 'center',
  alignSelf: 'center',
  fontFamily: 'Roboto-regular',
  fontSize: 16,
  color: '#7398A9',
  borderWidth: 2,
  borderColor: 'transparent', // default
},

selectedSlide: {
  borderColor: '#0AB3FF', // blue when clicked
  shadowColor: '#0AB3FF',
  shadowOpacity: 0.6,
  shadowRadius: 5,
},
  swiperText: {
      fontWeight:'bold',
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    color: '#7398A9',
    marginBottom: 10, 
    
  },
  slideimg: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  }
}); 