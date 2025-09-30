import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  return  (
  <SafeAreaProvider>
    <Stack  screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
      {/** Auth stack lives under app/auth */}
      <Stack.Screen name="auth" />
      {/** Role groups */}
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="(courier)" />
      <Stack.Screen name="(admin)" />
    </Stack>
  </SafeAreaProvider>
      )
}
