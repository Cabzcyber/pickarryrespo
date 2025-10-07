import { Tabs } from "expo-router";
import { Text } from "react-native";
export default function CourierTabs() {
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
                name="history/index" 
                options={{ 
                  title: "Orders",
                  tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>📋</Text>
                  )
                }} 
              />
              <Tabs.Screen 
                name="book/index" 
                options={{ 
                  title: "Book",
                  tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>🍔</Text>
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
                name="home/orderview" 
                options={{ 
                  href: null, // This hides it from the tab bar
                  tabBarStyle: { display: 'none' }, // Hide the tab bar on this screen
                }} 
              />
               <Tabs.Screen 
                name="home/deliverongoing" 
                options={{ 
                  href: null, // This hides it from the tab bar
                  tabBarStyle: { display: 'none' }, // Hide the tab bar on this screen
                }} 
              />
                 <Tabs.Screen 
                name="home/delivercomplete" 
                options={{ 
                  href: null, // This hides it from the tab bar
                  tabBarStyle: { display: 'none' }, // Hide the tab bar on this screen
                }} 
              />
                <Tabs.Screen 
                name="delivercomplete/index" 
                options={{ 
                  href: null, // This hides it from the tab bar
                  tabBarStyle: { display: 'none' }, // Hide the tab bar on this screen
                }} 
              />
              
      {/* Menu inner pages - hide tab bar */}
      <Tabs.Screen 
        name="menu/courierprofile" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Tabs.Screen 
        name="menu/couriersettings" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Tabs.Screen 
        name="menu/couriernotification" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Tabs.Screen 
        name="menu/courierabout" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
 <Tabs.Screen 
        name="registration/courierauthsign" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
        <Tabs.Screen 
        name="registration/otp" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
      <Tabs.Screen 
        name="registration/terms" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' },
        }} 
      />
 




    </Tabs>
  );
}


