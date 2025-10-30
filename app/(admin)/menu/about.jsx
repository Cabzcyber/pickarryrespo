import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export default function About() {
  const router = useRouter();
  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const aboutlogo = require("@/assets/images/aboutlogo.png");
  const edit = require("@/assets/images/edit.png");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(admin)/menu')}>
          <Image source={backimg} style={styles.backicon}/>
        </Pressable>
        <Text style={styles.title}>Fare</Text>
      </View>
      <View style={styles.separator} />
      <ScrollView style={styles.mainContent}>
         <Text style={styles.sectionTitle}>Delivery Fare Management</Text>
      <View style={styles.sectionCard}>
                <Text style={styles.sectionText}>
                  <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Base Fare (₱ of Every Delivery)</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Base Fare'
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Time Rate  (₱ of Every Minute)</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter  Time Rate '
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Platform Commission (% Every Delivery)</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter  Platform Commission '
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Distance Rate (₱ Per Kilometer)</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter  Distance Rate '
                                            placeholderTextColor='#87AFB9'
                                            
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Ipa-Dali Bonus (Minimum Set Price)</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Minimum Set Price'
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Penalty Rate (₱ Per Minute)</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Penalty Rate '
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             
                </Text>

                  <Pressable style={styles.mainbutton}
                                                       
                                                        > 
                                                           <Text style={styles.maintextbutton}>Edit Fare</Text>
                                                              </Pressable>  
                
              </View>
                  <Text style={styles.sectionTitle}>Delivery Vehicle Management</Text>
      <View style={styles.sectionCard}>
                <Text style={styles.sectionText}>
                  <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Motorcycle Fare </Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Motorcycle Fare'
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>On-Foot  Fare</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter  On-Foot  Fare'
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Dulog  Fare</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter  Dulog  Fare'
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Rela  Fare</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Rela  Fare '
                                            placeholderTextColor='#87AFB9'
                                            
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Passenger Car  Fare</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Passenger Car  Fare'
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             <View style={styles.inputcontainer}>
                                             <Text style={styles.title1}>Truck  Fare</Text>
                                            <TextInput style={styles.textinput}
                                            placeholder='Enter Truck  Fare '
                                            placeholderTextColor='#87AFB9'
                                            />
                                            </View> 
                                             
                </Text>

                  <Pressable style={styles.mainbutton}
                                                       
                                                        > 
                                                           <Text style={styles.maintextbutton}>Edit Fare</Text>
                                                              </Pressable>  
                
              </View>
              <Text>{'\n'}
{'\n'}
{'\n'}

{'\n'}</Text>




      </ScrollView>
    </View>
  );
}

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
    marginTop: verticalScale(31),
  },
  backicon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  logo: {
    width: 120,
    height: 28,
    resizeMode: 'contain',
  },
  editicon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft:''
    
  },
  separator: {
    height: 1,
    backgroundColor: '#363D47',
    width: '100%',
    marginBottom: 1,
    marginTop: verticalScale(6),
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: verticalScale(8),
  },
  scrollContent: {
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  aboutlogo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  descriptionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: '#363D47',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    height:'47%',
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: '#0AB3FF',
    marginBottom: 15,
  },
  sectionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 20,
    textAlign: 'justify',
  },
  inputcontainer:{
flexDirection:'column',
width:'90%',
height:'18%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
},
title1:{
  flexDirection:'column',
justifyContent:'flex-start',
fontfamily: 'Roboto Flex',
color: '#0AB3FF',
fontWeight: 700,
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
marginBottom:11,
},
textinput:{
  flex:1,
fontFamily: 'Roboto Flex',
backgroundColor: '#22262F',
color:'#7398A9',
fontWeight: 'bold',
fontSize: 15,
lineHeight: 18,
letterSpacing: 0.12,
borderColor:'#22262F',
borderRadius: 10,
padding:12,
marginRight:10,
borderWidth:1,

},
mainbutton:{
flexDirection:'column',
width:'92%',
maxWidth:1024,
padding:10,
marginHorizontal:'auto',
pointerEvents:'auto',
backgroundColor:'#3BF579',
borderRadius: 10,
justifyContent:"center",
alignItems:'center',
marginTop:verticalScale(45),
},
maintextbutton:{
fontSize:18,
color:'black',
fontFamily: 'Roboto', 
fontWeight: '700',
}
});
