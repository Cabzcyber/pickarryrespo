
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { CheckBox, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const auth = () => {

   const [isSelected, setSelected] = useState(false);
    const router = useRouter(); 
  return (
           <View style={styles.container}>
             <View style={styles.imgcontainer}>
                  
             </View>
                <View style={styles.authbarcontainer}>
                      <View style={styles.logincontainer}>
                        <Pressable style={styles.authbutton}>Log In</Pressable>
                      </View>
                      <View style={styles.logincontainer}>
                        <Pressable  style={styles.authbutton}>Sign In</Pressable>
                      </View>
               </View>
          <View style={styles.maininputcontainer}>
            <View style={styles.inputcontainer}>
            <TextInput style={styles.textinput}/>
            </View>
            <View style={styles.inputcontainer}>
            <TextInput style={styles.textinput}/>
            </View>
           </View>

            <View style={styles.remembercontainer}>
              <View style={{ flexDirection: 'row'}}>
            <CheckBox
             value={isSelected}
            onValueChange={setSelected}
            tintColors={{ true: '#1976d2', false: '#aaa' }} />
            <Text>Remember Me?</Text>
            </View>
            <View>  
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


},
imgcontainer:{

},
TopImage:{

},
authauthbarcontainerbar:{

},
maininputcontainer:{


},
inputcontainer:{



},
textinput:{


},
mainbutton:{


}
})