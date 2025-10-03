import { Stack, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
const backimg =require("@/assets/images/back.png")
export default function DropoffScreen() {
   const router = useRouter(); 
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Drop Off Service',
          headerShown:false,
        }}
      />
    <View style={styles.container}>
    <View >
        <Pressable
        onPress={()=>router.back('index')}
        >
        <Image  source={backimg} style={styles.backimg}/>
        </Pressable>
              </View>  
               <View style={styles.maininputcontainer}>
                      <View style={styles.inputcontainer}>
                      <TextInput style={styles.textinput}
                      placeholder='Enter Your Drop-Off Location'
                      placeholderTextColor='#7398A9'
                         />
                    </View> 
                   </View> 
              <View style={styles.mainContent}>
                      <Text style={styles.title}>Map Area</Text>
                      <Text style={styles.subtitle}>Soon To Be kuan</Text>
                    </View>
    
            <View  style={styles.bottomcontainer}>
              <View style={styles.bottomcontent}>
              <Text style={styles.title}>Where To Drop-Off</Text>
              <Text style={styles.subtitle}>Zone 2 Lower Jasaan Misamis Oriental </Text>
              </View>
              <Pressable style={styles.mainbutton}
                                                      onPress={()=>router.back('index')}
                                                      > 
                                                         <Text style={styles.maintextbutton}>Done</Text>
                                                            </Pressable>   
            </View>
    
    
    
    
    
    
    
            </View>
    </>
  );
}
const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor: '#141519',
},
mainContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backimg:{
    padding:10,
    marginTop: verticalScale(40),

  },
maininputcontainer:{
justifyContent:"center",
alignItems:'center',
PointerEvents:'auto',
 marginTop: verticalScale(-6),
rowGap:10,
height:'11%',

},
inputcontainer:{
flexDirection:'column',
width:'100%',
height:'80%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
textinput:{
  flex:1,
fontFamily: 'Roboto-regular',
color: '#7398A9',
fontWeight: 'medium',
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
backgroundColor:'#363D47',
borderColor:'#363D47',
borderRadius: 11,
padding:10,
marginRight:10,
borderWidth:1,

},
bottomcontainer:{
flex:1,
position:'absolute',
bottom:0,
width:'100%',
height:verticalScale(150),
backgroundColor:'#363D47',
},
bottomcontent:{
flex:1,
width:'100%',
height:verticalScale(10),
},
title:{
fontFamily: 'Roboto-bold',
fontSize: 24,
color: '#FFFFFF',
padding:10,
},
subtitle:{
fontFamily: 'Roboto-regular',
fontSize: 15,
color: '#FFFFFF',
padding:10,
},
        mainbutton:{
          flexDirection:'column',
          width:'95%',
          maxWidth:1024,
          padding:10,
          justifyContent:"center",
          alignItems:'center',
          marginHorizontal:'auto',
          pointerEvents:'auto',
          backgroundColor:'#3BF579',
          borderRadius: 10,
           marginTop: verticalScale(50),
            marginBottom: verticalScale(10),
          },
          maintextbutton:{
          fontSize:18,
          color:'black',
          fontFamily: 'Roboto-Bold', 
          },
});