import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" options={{ headerShown: true, title: "Verify OTP" }} />
      <Stack.Screen name="terms" options={{ headerShown: true, title: "Terms" }} />
    </Stack>
  );
}


