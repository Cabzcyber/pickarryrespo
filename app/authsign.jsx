import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RadioForm from "react-native-simple-radio-button";
import { verticalScale } from 'react-native-size-matters';

const logoimg =require("@/assets/images/logologin.png")

const radio_props=[
{label:"Male",value:"male"},
{label:"Female",value:"female"}
];

const auth = () => {

   const [isSelected, setSelected] = useState(false);
    const router = useRouter(); 
     const [value, setValue] = useState("male");
  return (
            <ScrollView>
           <View style={styles.container}>
             <View style={styles.allcontainer}>
             <View>
                  <Image  source={logoimg} style={styles.TopImage}/>
             </View>
               <View style={styles.form} > 
                               <View style={styles.authbarcontainer}>
                                     <View style={styles.logincontainer}>
                                       <Pressable style={styles.authbutton}
                                         onPress={()=> router.push('authlog')}>
                                         <Text style={styles.authtext}>
                                           Log In
                                         </Text>
                                       </Pressable>
                                     </View>
                                     <View style={styles.logincontainer}>
                                       <Pressable style={styles.authbutton}
                                       >
                                         <Text style={styles.authtext}>
                                           Sign Up
                                         </Text>
                                       </Pressable>
                                     </View>
                              </View>
                         <View style={styles.maininputcontainer}>
                           <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Full Name</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Full Name'
                           />
                           </View> 

                            <View style={styles.rowinput}> 
                           <View style={styles.inputcontainerr}>
                             <Text  style={styles.title} >Date of Birth</Text>
                           <TextInput style={styles.textinput}
                           placeholder='mm/dd/yyyy'
                           />
                           </View>
                           <View style={styles.inputcontainerr}>
                             <Text  style={styles.title} >Gender</Text>
                             <RadioForm
                                  radio_props={radio_props}
                                  initial={0}
                                  onPress={(val) => setValue(val)}
                                  buttonSize={10}
                                  buttonOuterSize={20}
                                  selectedButtonColor="#2196F3"
                                  labelStyle={{ color: '#FFFFFF' }}
                                />
                           </View>  
                            </View>
                             <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Email Address</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Email Address'
                           />
                           </View> 

                              <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Phone Number</Text>
                           <TextInput style={styles.textinput}
                           placeholder='+63 |  '
                           />
                           </View> 

                             <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Address</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Address'
                           />
                           </View> 

                             <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Password</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Password'
                           />
                           </View> 

                              <View style={styles.remembercontainer}>
                                            <View style={styles.recover}>
                                          <CheckBox
                                            checked={isSelected}
                                            onPress={() => setSelected(!isSelected)}
                                            checkedColor='#1976d2'
                                            uncheckedColor='#aaa'
                                            style={{marginRight:5}} />
                                          <Text style={{ color: '#FFFFFF', marginLeft: 1 }}>
                                                I Agree To The 
                                                <Text
                                                  style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                                                  onPress={() => router.push('terms')}
                                                >
                                                  {"  "}Terms of Service{"  "}
                                                </Text>
                                                and 
                                                <Text
                                                  style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                                                  onPress={() => router.push('terms')}
                                                >
                                                  {"  "}Privacy Policy
                                                </Text>
                                              </Text>
                                          </View>
                                        </View>
                                        <Pressable style={styles.mainbutton}
                                        onPress={()=>router.push('otp')}
                                        > 
                                           <Text style={styles.maintextbutton}>Continue</Text>
                                              </Pressable>       
                               </View>
                                <Text>
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
flex:1,
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
gap:40,
},
maininputcontainer:{
justifyContent:"center",
alignItems:'center',
PointerEvents:'auto',
 marginTop: verticalScale(13.18),
rowGap:10,
},
inputcontainer:{
flexDirection:'column',
width:'90%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
inputcontainerr:{
flexDirection:'column',
width:'50%',
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
  alignItems: 'center',
  justifyContent: 'space-between', // pushes the two items apart
  width: '80%',                    // same width as your inputs
  alignSelf: 'center',
  marginTop: verticalScale(5),
},
recover:{
flexDirection:'row',
alignItems: 'center',
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
}
})