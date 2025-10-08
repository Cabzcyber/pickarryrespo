import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale } from 'react-native-size-matters';

const logoimg =require("@/assets/images/logologin.png")

 const data1 = [
    { label: 'On-Foot', value: '1' },
    { label: 'Motorcycle', value: '2' },
     { label: 'Bicycle', value: '3' },
    { label: 'Rela', value: '4' },
    { label: 'Dulog', value: '5' },
    { label: 'Passenger Car', value: '6' },
    { label: 'Truck', value: '7' },
  ];
  
const auth = () => {

  const [value, setValue] = useState(null);

   const [isSelected, setSelected] = useState(false);
    const router = useRouter(); 

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
     
  return (
            <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={true}
            >
           <View style={styles.container}>
             <View style={styles.allcontainer}>
             <View>
                  <Image  source={logoimg} style={styles.TopImage}/>
             </View>
               <View style={styles.form} > 
                               <View style={styles.authbarcontainer}>
                                    
                                     <View style={styles.logincontainer}>
                                       <Pressable style={styles.authbutton}
                                       >
                                         <Text style={styles.authtext}>
                                           Sign Up
                                         </Text>
                                       </Pressable>
                                     </View>
                              </View>
                               <View style={styles.separator} />
                         <View style={styles.maininputcontainer}>
                           {/* Type Of Vehicle Use */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Type Of Vehicle Use</Text>
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

                           {/* Vehicle Color & Plate Number */}
                           <View style={styles.rowinput}>
                             <View style={styles.inputcontainerr}>
                               <Text style={styles.title}>Vehicle Color</Text>
                               <TextInput style={styles.textinput} placeholder="Vehicle Color" placeholderTextColor="#7398A9" />
                             </View>
                             <View style={styles.inputcontainerr}>
                               <Text style={styles.title}>Plate Number</Text>
                               <TextInput style={styles.textinput} placeholder="0-0-0-0-0-0-0" placeholderTextColor="#7398A9" />
                             </View>
                           </View>

                           {/* Driver License Upload */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Driver License <Text style={{ color: 'red', fontSize: 12 }}>Upload Front & Back Image</Text></Text>
                             <Pressable style={[styles.textinput, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                               onPress={() => {}}>
                               <Text style={{ color: '#7398A9' }}>Upload Driver License</Text>
                               <Text style={{ color: '#7398A9', fontSize: 18 }}>⭳</Text>
                             </Pressable>
                           </View>

                           {/* Vehicle Brand */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Vehicle Brand</Text>
                             <TextInput style={styles.textinput} placeholder="Enter Brand Vehicle" placeholderTextColor="#7398A9" />
                           </View>

                           {/* Other Details of Vehicle */}
                           <View style={styles.inputcontainer}>
                             <Text style={styles.title}>Other Details of Vehicle</Text>
                             <TextInput style={styles.textinput} placeholder="Enter Vehicle Details" placeholderTextColor="#7398A9" />
                           </View>

                           {/* Next Button */}
                           <Pressable style={styles.mainbutton} onPress={() => router.push('/(courier)/registration/otp')}>
                             <Text style={styles.maintextbutton}>Next</Text>
                           </Pressable>
                         </View>
                                <Text>
                                  {'\n'}
                                      {'\n'}
                                        {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            {'\n'}
                                          {'\n'}
                                            {'\n'}
                                            
                                            
                                    </Text>


            </View>
              </View>
               </View>
</ScrollView>
  )
}

export default auth

const styles = StyleSheet.create({
container:{
paddingBottom: 30, 
backgroundColor: '#141519',
},
TopImage:{
alignSelf:'center',
    top: hp('1.25%'),   // 40 px ➜ ~4.5 % of screen height
    alignSelf: 'center',
    width: wp('64%'),  // 200 px ➜ ~48 % of screen width
    height: hp('14.54%'),  // 80 px  ➜ ~9 % of screen height
    resizeMode: 'contain',
    flexDirection:'row',
},
allcontainer:{
flex:1,
rowGap:20,
},
authbarcontainer:{
justifyContent:"center",
flexDirection:'row',
alignItems:'center',
PointerEvents:'auto',
gap:80,
marginTop: verticalScale(1),
},
authtext:{
fontFamily: 'Roboto',      // or 'Roboto-Bold' if you loaded the TTF
    fontStyle: 'normal',
    fontWeight: '700',         // 700 → 'bold'
    fontSize: 20,
    lineHeight: 23,
    color: '#ffffff',
},
rowinput:{
flexDirection:'row',
gap:10,
marginHorizontal:'auto',
marginLeft:16
},
maininputcontainer:{
justifyContent:"center",
alignItems:'center',
PointerEvents:'auto',
 marginTop: verticalScale(-75),
rowGap:10,

},
 separator: {
    height: 1,
    backgroundColor: '#363D47',
    alignSelf:'center',
    width: '90%',
    marginTop: 15,
    marginBottom: 20,
  },
inputcontainer:{
flexDirection:'column',
width:'90%',
height:'13%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
inputcontainerr:{
flexDirection:'column',
width:'46%',

maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
title:{
  flexDirection:'column',
justifyContent:'flex-start',
fontfamily: 'Roboto Flex',
color: '#FFFFFF',
fontWeight: 700,
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
marginBottom:11,
},
textinput:{
  flex:1,
fontFamily: 'Roboto Flex',
color: '#7398A9',
fontWeight: 'bold',
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
borderColor:'#FFFFFF',
borderRadius: 10,
padding:10,
marginRight:10,
borderWidth:1,
},
remembercontainer:{
flexDirection: 'row',
  width: '100%',               
  marginTop: verticalScale(1),
  
},
recover:{
flexDirection:'row',
alignItems: 'center',
marginHorizontal:'auto',
},
mainbutton:{
flexDirection:'column',
width:'84%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
backgroundColor:'#3BF579',
borderRadius: 10,
justifyContent:"center",
alignItems:'center',
 marginTop: verticalScale(15),
},
maintextbutton:{
fontSize:18,
color:'black',
fontFamily: 'Roboto', 
fontWeight: '700',
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
})