import { useRouter } from 'expo-router';
import { Text, View } from "react-native";
export default function Index() {
   const router = useRouter(); 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
                   style={{ color: '#1976d2', textDecorationLine: 'underline' }} 
                   onPress={()=> router.push('authsign')}
                 >Go To Login</Text>
    </View>
  );
}
