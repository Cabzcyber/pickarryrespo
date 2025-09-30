import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function LoginOrSignup() {
  const router = useRouter();
  const [mode, setMode] = useState('login');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', marginBottom: 16 }}>
        {mode === 'login' ? 'Login' : 'Signup'}
      </Text>
      <Button title="Switch" onPress={() => setMode(mode === 'login' ? 'signup' : 'login')} />
      <View style={{ height: 12 }} />
      <Button title="Continue" onPress={() => {
        if (mode === 'signup') router.push('/auth/otp');
        else router.replace('/');
      }} />
    </View>
  );
}


