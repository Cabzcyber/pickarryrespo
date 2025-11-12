import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { DatePickerInput } from 'react-native-paper-dates';
import PhoneInput from "react-native-phone-number-input";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RadioForm from "react-native-simple-radio-button";
import { verticalScale } from 'react-native-size-matters';
import { supabase } from '../lib/supabase';
const logoimg =require("@/assets/images/logologin.png")
const radio_props=[
{label:"Male",value:"male"},
{label:"Female",value:"female"}
];

const auth = () => {
   const [isSelected, setSelected] = useState(false);
    const router = useRouter(); 
      const [loading, setLoading] = useState(false)
      const [fullname,setFullName]= useState('')
     
      const [gender,setgender]= useState(radio_props[0].value)
      const [email,setEmailAddress]= useState('')
  const [phonenumber,setphonenumber]= useState('')
  const [formattedPhone, setFormattedPhone] = useState(''); 
      const [address,setaddress]= useState('')
      const [password,setpassword]= useState('')

      const phoneToSend = formattedPhone.replace('+','');

const [inputDate,setInputDate]= useState(undefined)

  async function signupauth() {
  setLoading(true);
  try {
    if (!email || !password) {
      Alert.alert('Missing Credentials', 'Please enter email and password.');
      setLoading(false);
      return;
    }
    if (!inputDate) {
      Alert.alert('Missing Birthdate', 'Please select your birthdate.');
      setLoading(false);
      return;
    }

    const normalizedPhone = formattedPhone ? formattedPhone.replace('+','') : phonenumber;
    const birthDateString = new Date(inputDate).toISOString();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    if (authError) {
      Alert.alert('Sign-up Error', authError.message);
      setLoading(false);
      return;
    }

    router.push({
      pathname: '/otp',
      params: {
        email: email.trim(),
        
        password: password,
        phone: normalizedPhone,
        fullname: fullname.trim(),
        birthDateString: birthDateString,
        gender: gender,
        address: address.trim(),
      },
    });
  } finally {
    setLoading(false);
  }
}
  
  

const today = new Date();


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
                                         onPress={()=> router.push('authlog')}>
                                         <Text style={styles.authtext}>
                                           Log In
                                         </Text>
                                       </Pressable>
                                     </View>
                                     <View style={styles.logincontainer}>
                                       <Pressable style={styles.authbutton}
                                       >
                                         <Text style={styles.authtext1}>
                                           Sign Up
                                         </Text>
                                       </Pressable>
                                     </View>
                              </View>
                               <View style={styles.separator} />
                         <View style={styles.maininputcontainer}>
                           <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Full Name</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Full Name'
                           placeholderTextColor='#7398A9'
                             onChangeText={(text)=>setFullName(text)}
                            value={fullname}
                             autoCapitalize='none' 
                           />
                           
                           </View> 

                            <View style={styles.rowinput}> 
                           <View style={styles.inputcontainerr}>
                             <Text  style={styles.title} >Date of Birth</Text>
                   
      <View style={styles.container}>
        <DatePickerInput
          locale="en"
          label="Birthdate"
          value={inputDate}
          
          onChange={(date) => setInputDate(date)}
          endDate={today}
          inputMode="start" 
          mode="flat" 
          
          borderColor='#ffffff'
           placeholderTextColor='#7398A9'
           style={{ width: 100,height: 50,borderRadius:8,marginBottom:-23,backgroundColor:'#',}}
        />
      </View>
   
                           </View>


                           <View style={styles.inputcontainerr}>
                             <Text  style={styles.title} >Gender</Text>
                             <RadioForm
                                  radio_props={radio_props}
                              
                                  initial={radio_props.findIndex(r => r.value === gender)}
                                  onPress={(value) => setgender(String(value))}
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
                           placeholderTextColor='#7398A9'
                            onChangeText={(text)=>setEmailAddress(text)}
                            value={email}
                             autoCapitalize='none'    

                           />
                           </View> 

                              <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Phone Number</Text>
                            <PhoneInput
                                    defaultValue={phonenumber}
                                    defaultCode="PH" 
                                    layout="first"
                                    onChangeText={(text) => {
                                      setphonenumber(text); 
                                    }}
                                    onChangeFormattedText={(text) => {
                                      setFormattedPhone(text); 
                                    }}
                                    containerStyle={styles.phoneInputContainer}
                                    textInputStyle={styles.textinputphone}
                                  />
                           </View> 

                             <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Address</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Address'
                           placeholderTextColor='#7398A9'
                            onChangeText={(text)=>setaddress(text)}
                            value={address}
                             autoCapitalize='none'
                           />
                           </View> 

                             <View style={styles.inputcontainer}>
                            <Text style={styles.title}>Password</Text>
                           <TextInput style={styles.textinput}
                           placeholder='Enter Your Password'
                           placeholderTextColor='#7398A9'
                            onChangeText={(text)=>setpassword(text)}
                            value={password}
                             autoCapitalize='none'
                           
                           />
                           </View> 

                              <View style={styles.remembercontainer}>
                                            <View style={styles.recover}>
                                          <CheckBox
                                            checked={isSelected}
                                            onPress={() => setSelected(!isSelected)}
                                            checkedColor='#1976d2'
                                            uncheckedColor='#aaa'
                                            style={{marginRight:0}} />
                                          <Text style={{ color: '#FFFFFF',}}>
                                              I Agree to
                                                <Text
                                                  style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                                                  onPress={() => router.push('terms')}
                                                >
                                                  {"  "}Terms of Service{"  "}
                                                </Text>&
                                                <Text
                                                  style={{ color: '#1976d2', textDecorationLine: 'underline' }}
                                                  onPress={() => router.push('terms')}
                                                >
                                                  {"  "}
                                                  Privacy Policy
                                                </Text>
                                              </Text>
                                          </View>
                                        </View>
                                        <Pressable style={styles.mainbutton}
                                        onPress={()=>signupauth()}
                                        disabled={loading} 
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
fontFamily: 'Roboto-Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 23,
    color: '#ffffff',
},
authtext1:{
fontFamily: 'Roboto-Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 23,
    color: '#0AB3FF',
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
height:'10.5%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
inputcontainerr:{
flexDirection:'column',
width:'55%',
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
phoneInputContainer:{
width:'95%',
height:'80%',
maxWidth:1024,
padding:0,
borderColor:'#ffffff',

borderRadius: 10,
},
textinputphone:{

  
}
})