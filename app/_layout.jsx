import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  return  (
  <SafeAreaProvider>
    <Stack  screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
    <Stack.Screen name="authlog"/>
    <Stack.Screen name="authsign"/>
    <Stack.Screen name="otp"  options={{ 
      headerShown: true ,
      headerBackTitleVisible: false,  // hide text, show only arrow
      title: "Verify OTP"             // custom title
      }} />
    <Stack.Screen name="terms"/>
    </Stack>
  </SafeAreaProvider>
      )
}
