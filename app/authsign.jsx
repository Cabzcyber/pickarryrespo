
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { CheckBox, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale } from 'react-native-size-matters';

const logoimg =require("@/assets/images/logologin.png")
const auth = () => {

   
      const [isSelected, setSelected] = useState(false);
       const router = useRouter(); 
       
   
  return (
      

           <View style={styles.container}>
                  <Image  source={logoimg} style={styles.TopImage}/>
             
                <View style={styles.authbarcontainer}>
                      <View style={styles.logincontainer}>
                        <Pressable style={styles.authbutton}>
                          <Text style={styles.authtext}>
                            Log In
                          </Text>
                        </Pressable>
                      </View>
                      <View style={styles.logincontainer}>
                        <Pressable style={styles.authbutton}>
                          <Text style={styles.authtext}>
                            Sign Up
                          </Text>
                        </Pressable>
                      </View>
               </View>
          <View style={styles.maininputcontainer}>
            <View style={styles.inputcontainer}>
              <Text style={styles.title}>Email</Text>
            <TextInput style={styles.textinput}
            placeholder='Enter Your Email Address'
            />
            </View>
            <View style={styles.inputcontainer}>
              <Text  style={styles.title} >Password</Text>
            <TextInput style={styles.textinput}
            placeholder='Enter Your Password'
            />
            </View>
           </View>

            <View style={styles.remembercontainer}>
              <View style={styles.recover}>
            <CheckBox
              value={isSelected}
               onValueChange={setSelected}
               tintColors={{ true: '#1976d2', false: '#aaa' }}
                style={{marginRight:5}} />
            <Text  style={{ color: '#FFFFFF',marginLeft:5}}>Remember Me</Text>
            </View>
            <View style={styles.recover}>  
              <Text
              style={{ color: '#1976d2', textDecorationLine: 'underline' }} 
              onPress={()=> router.push('terms')}
            >Forgot Password?</Text>
            </View>
            </View>

            <View>
              <Pressable style={styles.mainbutton}> 
              <Text></Text>
              </Pressable>
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
    top: hp('4.5%'),   // 40 px ➜ ~4.5 % of screen height
    alignSelf: 'center',
    width: wp('48%'),  // 200 px ➜ ~48 % of screen width
    height: hp('9%'),  // 80 px  ➜ ~9 % of screen height
    resizeMode: 'contain',
},
authbarcontainer:{
justifyContent:"center",
flexDirection:'row',
alignItems:'center',
PointerEvents:'auto',
gap:80,
marginTop: verticalScale(40),
},
authtext:{
fontFamily: 'Roboto',      // or 'Roboto-Bold' if you loaded the TTF
    fontStyle: 'normal',
    fontWeight: '700',         // 700 → 'bold'
    fontSize: 20,
    lineHeight: 23,
    color: '#00D0FF',
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
authbutton:{
width:'100%'

},
maininputcontainer:{
justifyContent:"center",
alignItems:'center',
PointerEvents:'auto',
 marginTop: verticalScale(15),
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
textinput:{
  flex:1,
fontfamily: 'Roboto Flex',
color: '#7398A9',
fontWeight: 300,
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


}
})