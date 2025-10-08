import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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
  
           <View style={styles.container}>
             <View style={styles.allcontainer}>
             <View>
                  <Image  source={logoimg} style={styles.TopImage}/>
             </View>
               <View style={styles.form} >   
                
                            
                         <View style={styles.maininputcontainer}>
                           <View style={styles.inputcontainer}>
                            <Text style={styles.title}>
                              We sent a message with a code to
                            </Text>
                            <Text style={styles.phonenumber} >0423634634</Text>

                            <View style={styles.inputcontainer}>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your OTP Code'
                           placeholderTextColor='#7398A9'
                           />
                           </View> 
                           </View>
                          
                              <Pressable style={styles.mainbutton}
                                        onPress={()=>router.replace('/(courier)/registration/terms')}
                                        > 
                                           <Text style={styles.maintextbutton}>Submit</Text>
                                              </Pressable>       
                               </View>


            </View>
              </View>
               </View>

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
    top: hp('4.30%'),   // 40 px ➜ ~4.5 % of screen height
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
phonenumber:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#00AEEF", // blue like in your image
    textAlign: "center",
    marginBottom: 20,


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
width:'95%',
height:'45%',
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
fontFamily: 'Roboto-Bold',
  alignItems: 'center',
  justifyContent: 'space-between', // pushes the two items apart
  alignSelf: 'center',
color: '#FFFFFF',
fontSize: 18,
lineHeight: 18,
letterSpacing: 0.12,
marginBottom:11,
},
textinput:{
  flex:1,
fontFamily: 'Roboto-Regular',
color: '#7398A9',
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
borderColor:'#FFFFFF',
borderRadius: 10,
padding:10,
marginRight:10,
borderWidth:1,
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
 marginTop: verticalScale(100),
},
maintextbutton:{
fontSize:18,
color:'black',
fontFamily: 'Roboto-Bold', 
},
})