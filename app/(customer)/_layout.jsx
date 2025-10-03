import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function CustomerTabs() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2937', // Dark background
          borderTopColor: '#374151',
        },
        tabBarActiveTintColor: '#3b82f6', // Blue for active tab
        tabBarInactiveTintColor: '#9ca3af', // Gray for inactive tabs
      }}
    >
      <Tabs.Screen 
        name="home/index" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          )
        }} 
      />
      <Tabs.Screen 
        name="orders/index" 
        options={{ 
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📋</Text>
          )
        }} 
      />
      <Tabs.Screen 
        name="menu/index" 
        options={{ 
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🍔</Text>
          )
        }} 
      />
      {/* Hidden screens - these won't show in tab bar */}
      <Tabs.Screen 
        name="home/pickup" 
        options={{ 
          href: null, // This hides it from the tab bar
        }} 
      />
      <Tabs.Screen 
        name="home/dropoff" 
        options={{ 
          href: null, // This hides it from the tab bar
        }} 
      />
      <Tabs.Screen 
        name="home/setgoods" 
        options={{ 
          href: null, // This hides it from the tab bar
        }} 
      />
    </Tabs>
  );
}


