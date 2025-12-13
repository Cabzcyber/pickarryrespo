import { Redirect, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Index() {
  const { colors, theme } = useTheme();
  const router = useRouter();
  const logo = require("@/assets/images/logonew.png"); // Make sure this path is correct

  useEffect(() => {
    // Optional: Add a small delay or check for auth state here
    const timer = setTimeout(() => {
      router.replace("/authlog");
    }, 100); // Short delay to prevent flash if needed, or just redirect immediately

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={logo}
        style={[styles.logo, { tintColor: theme === 'dark' ? '#FFFFFF' : undefined }]} // Optional: Tint logo white in dark mode if it's black
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
