import { Tabs } from "expo-router";
import { Image } from "react-native";

// Import your icon assets
const homeIcon = require("../../assets/images/house.png");
const homeIconActive = require("../../assets/images/house1.png");
const cartIcon = require("../../assets/images/cart.png");
const cartIconActive = require("../../assets/images/cart1.png");
const menuIcon = require("../../assets/images/menus.png");

export default function CourierTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2937', // Dark background
          borderTopColor: '#374151',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? homeIconActive : homeIcon}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          )
        }}
      />

      {/* 2. Orders Tab (History) */}
      <Tabs.Screen
        name="history/index"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? cartIconActive : cartIcon}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          )
        }}
      />

      {/* 3. Menu Tab */}
      <Tabs.Screen
        name="menu/index"
        options={{
          title: "Menu",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={menuIcon}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: focused ? '#3b82f6' : '#9ca3af'
              }}
            />
          )
        }}
      />

      {/* --- Hidden Screens (Not shown in Tab Bar) --- */}
      {/* Explicitly hiding these keeps the navigation clean */}

      <Tabs.Screen
        name="home/orderview"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="home/deliverongoing"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="home/delivercomplete"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="delivercomplete/index"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />

      {/* Menu Inner Pages */}
      <Tabs.Screen
        name="menu/courierprofile"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="menu/couriersettings"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="menu/couriernotification"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="menu/courierabout"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />

      {/* Registration/Auth Pages */}
      <Tabs.Screen
        name="registration/courierauthsign"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="registration/otp"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="registration/terms"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
    </Tabs>
  );
}