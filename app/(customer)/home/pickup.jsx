import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View, Alert } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import GeoapifyMap from '../../../components/GeoapifyMap';
import { useOrder } from '../../../context/OrderContext';
import { useTheme } from '../../../context/ThemeContext';

const backimg = require("../../../assets/images/back.png");

export default function PickupScreen() {
  const router = useRouter();
  const { setPickupLocation, pickupLocation, dropoffLocation } = useOrder();
  const { colors } = useTheme();

  const handleLocationSelect = (locationData) => {
    if (dropoffLocation) {
      const isSameLat = Math.abs(locationData.latitude - dropoffLocation.latitude) < 0.0001;
      const isSameLon = Math.abs(locationData.longitude - dropoffLocation.longitude) < 0.0001;

      if (isSameLat && isSameLon) {
        Alert.alert(
          "Invalid Location",
          "Pickup location cannot be the same as Drop-off location. Please choose a different point."
        );
        return;
      }
    }

    console.log("Setting Pickup:", locationData);
    setPickupLocation(locationData);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Pick Up Service', headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image source={backimg} style={styles.backimg} />
          </Pressable>
        </View>

        <View style={styles.mapContainer}>
          <GeoapifyMap
            placeholder="Where to pick-up?"
            initialLocation={pickupLocation}
            onConfirm={handleLocationSelect}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    paddingTop: verticalScale(40),
    paddingLeft: 10
  },
  backimg: {
    padding: 10,
  },
  mapContainer: {
    flex: 1,
  }
});