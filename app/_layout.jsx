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
    'Roboto-Thin': require("../assets/fonts/Roboto-Thin.ttf"),
    'Roboto-ExtraLight': require("../assets/fonts/Roboto-ExtraLight.ttf"),
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
    'Roboto-Regular': require("../assets/fonts/Roboto-Regular.ttf"),
    'Roboto-Medium': require("../assets/fonts/Roboto-Medium.ttf"),
    'Roboto-SemiBold': require("../assets/fonts/Roboto-SemiBold.ttf"),
    'Roboto-Bold': require("../assets/fonts/Roboto-Bold.ttf"),
    'Roboto-ExtraBold': require("../assets/fonts/Roboto-ExtraBold.ttf"),
    'Roboto-Black': require("../assets/fonts/Roboto-Black.ttf"),
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
