import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import GeoapifyMap from '../../../components/GeoapifyMap';
import { useOrder } from '../../../context/OrderContext';

const backimg = require("../../../assets/images/back.png");

export default function DropoffScreen() {
  const router = useRouter();
  const { setDropoffLocation, dropoffLocation } = useOrder();

  const handleLocationSelect = (locationData) => {
    // 1. Save to Context
    console.log("Setting Dropoff:", locationData);
    setDropoffLocation(locationData);

    // 2. Navigate back to Home/Index
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Drop Off Service', headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Image source={backimg} style={styles.backimg} />
          </Pressable>
        </View>

        <View style={styles.mapContainer}>
          <GeoapifyMap
            placeholder="Where to drop-off?"
            initialLocation={dropoffLocation}
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
    backgroundColor: '#141519'
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