import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Roboto-Thin': require("@/assets/images/fonts/Roboto-Thin.ttf"),
    'Roboto-ExtraLight': require("@/assets/images/fonts/Roboto-ExtraLight.ttf"),
    'Roboto-Light': require("@/assets/images/fonts/Roboto-Light.ttf"),
    'Roboto-Regular': require("@/assets/images/fonts/Roboto-Regular.ttf"),
    'Roboto-Medium': require("@/assets/images/fonts/Roboto-Medium.ttf"),
    'Roboto-SemiBold': require("@/assets/images/fonts/Roboto-SemiBold.ttf"),
    'Roboto-Bold': require("@/assets/images/fonts/Roboto-Bold.ttf"),
    'Roboto-ExtraBold': require("@/assets/images/fonts/Roboto-ExtraBold.ttf"),
    'Roboto-Black': require("@/assets/images/fonts/Roboto-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return  (
    <PaperProvider> 
  <GestureHandlerRootView style={{ flex: 1 }}>
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
  </GestureHandlerRootView>
  </PaperProvider>
      )
}
