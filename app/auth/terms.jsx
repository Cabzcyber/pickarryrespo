import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Terms() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', marginBottom: 16 }}>Terms of Service</Text>
      <Button title="Accept" onPress={() => router.replace('/auth/otp')} />
    </View>
  );
}


