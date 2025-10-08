import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
const backimg =require("@/assets/images/back.png")
const headerlogo =require("@/assets/images/headerlogo.png")
const headerheart =require("@/assets/images/heart.png")
export default function Terms() {
    const router = useRouter(); 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
                                <Pressable style={styles.headerbutton}
                                onPress={()=>router.back('/(courier)/registration/otp')}
                                >
                                <Image  source={backimg} style={styles.backIcon}/>
                                </Pressable>
      
                                <Image  source={headerlogo} style={styles.logo}/>
      
                                <Pressable style={styles.headerbutton}
                                onPress={()=>{}}
                                >
                                    <Image  source={headerheart} style={styles.heartIcon}/>  
                                </Pressable>
                        </View> 
      <Text style={{ color: '#2196F3', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
        Terms of Service & Policy Use
      </Text>
      <View style={{ height: 2, backgroundColor: '#2196F3', width: '100%', marginBottom: 16 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Section 1:</Text>
        <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla nunc, condimentum a libero at, convallis mollis est. Morbi in arcu sodales, vehicula magna et, ullamcorper orci. In blandit purus in rutrum mattis. Proin nec auctor magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet felis non elit cursus convallis eu quis augue. Donec non magna ut nisl dignissim rutrum vitae in leo.
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Section 2:</Text>
        <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16, lineHeight: 22 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nulla nunc, condimentum a libero at, convallis mollis est. Morbi in arcu sodales, vehicula magna et, ullamcorper orci. In blandit purus in rutrum mattis. Proin nec auctor magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet felis non elit cursus convallis eu quis augue. Donec non magna ut nisl dignissim rutrum vitae in leo.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 22, height: 22, borderWidth: 1, borderColor: '#fff', borderRadius: 4, marginRight: 8, justifyContent: 'center', alignItems: 'center' }}>
          {/* You can add a checkmark here if checked */}
        </View>
        <Text style={{ color: '#fff', fontSize: 14 }}>
          I agree to the <Text style={{ color: '#2196F3', textDecorationLine: 'underline' }}>Terms of Service</Text> and <Text style={{ color: '#2196F3', textDecorationLine: 'underline' }}>Privacy Policy</Text>.
        </Text>
      </View>
      <Pressable style={styles.mainbutton} onPress={() => router.replace('/(courier)/home')}>
        <Text style={styles.maintextbutton}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#141519',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
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
});
