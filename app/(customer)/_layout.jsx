import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useTheme } from '../../context/ThemeContext';

// Import your icon assets here. Make sure these files exist in your assets folder.
const homeIcon = require("../../assets/images/house.png");
const homeIconActive = require("../../assets/images/house1.png");
const cartIcon = require("../../assets/images/cart.png");
const cartIconActive = require("../../assets/images/cart1.png");
const menuIcon = require("../../assets/images/menus.png");

export default function CustomerTabs() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar, // Dynamic background
          borderTopColor: colors.border,
          height: 60, // Adjust height to fit icons comfortably
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#3b82f6', // Blue for active tab
        tabBarInactiveTintColor: '#9ca3af', // Gray for inactive tabs
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
        name="orders/index"
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
          // This ensures the label color changes based on focus state
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
                tintColor: focused ? '#3b82f6' : '#9ca3af' // Tint applied for single-icon tabs
              }}
            />
          )
        }}
      />

      {/* --- Hidden Screens (Not shown in Tab Bar) --- */}

      {/* Order Creation Flow */}
      <Tabs.Screen
        name="home/pickup"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home/dropoff"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home/setgoods"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* Order Status Flow */}
      <Tabs.Screen
        name="home/ordersearch"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home/ordercancel"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home/orderongoing"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="home/ordercomplete"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* Menu Inner Pages */}
      <Tabs.Screen
        name="menu/profile"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="menu/settings"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="menu/notification"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="menu/about"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="menu/term"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}