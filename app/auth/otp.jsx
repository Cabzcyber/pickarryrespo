import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Otp() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', marginBottom: 16 }}>Enter OTP</Text>
      <Button title="Submit" onPress={() => router.replace('/')} />
    </View>
  );
}


