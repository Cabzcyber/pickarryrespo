import { Tabs } from "expo-router";
import { Image } from "react-native";

// Import your icon assets here. Make sure these files exist in your assets folder.
const homeIcon = require("../../assets/images/house.png"); // Inactive Home
const homeIconActive = require("../../assets/images/house1.png"); // Active Home - You need to add this image
const cartIcon = require("../../assets/images/cart.png"); // Inactive Cart - You need to add this image (previously 'list.png'?)
const cartIconActive = require("../../assets/images//cart1.png"); // Active Cart - You need to add this image
const menuIcon = require("../../assets/images/menus.png"); // Menu Icon - You need to add this image

export default function CustomerTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2937', // Dark background
          borderTopColor: '#374151',
          height: 60, // Adjust height if needed for icons
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#3b82f6', // Blue for active tab
        tabBarInactiveTintColor: '#9ca3af', // Gray for inactive tabs
      }}
    >
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
      <Tabs.Screen
        name="menu/index"
        options={{
          title: "Menu",
          // This ensures the label color changes based on focus state, which is handled by tabBarActiveTintColor
          tabBarLabelStyle: {
            fontSize: 12,
            // You can force specific colors here if the default behavior isn't enough
            // color: focused ? '#3b82f6' : '#9ca3af',
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={menuIcon}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: focused ? '#3b82f6' : '#9ca3af' // Apply tint color for single-icon tabs like Menu
              }}
            />
          )
        }}
      />
      {/* Hidden screens - these won't show in tab bar */}
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
      {/* Order flow inner pages - hide tab bar */}
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

      {/* Menu inner pages - hide tab bar */}
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

    </Tabs>

  );
}