import { Tabs } from "expo-router";
import { Image } from "react-native";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

// Import your icon assets
// Ensure these files exist in your assets/images folder
const homeIcon = require("../../assets/images/house.png");
const homeIconActive = require("../../assets/images/house1.png");

// Courier and Customer now use a single image (no active state image)
const courierIcon = require("../../assets/images/courier.png");
const customerIcon = require("../../assets/images/customer.png");

const cartIcon = require("../../assets/images/cart.png");      // For Delivery
const cartIconActive = require("../../assets/images/cart1.png");

const menuIcon = require("../../assets/images/menus.png");

export default function AdminTabs() {
  const backgroundColor = useThemeColor({}, 'tabBar');
  const borderTopColor = useThemeColor({}, 'border');
  const activeTintColor = useThemeColor({}, 'tint');
  const inactiveTintColor = useThemeColor({}, 'tabIconDefault');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopColor: borderTopColor,
          height: 60, // Adjust height for icons
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: activeTintColor, // Brand Color
        tabBarInactiveTintColor: inactiveTintColor, // Dynamic Gray
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

      {/* 2. Courier Tab - Single Icon with Toggle Tint */}
      <Tabs.Screen
        name="courier/index"
        options={{
          title: "Courier",
          tabBarIcon: ({ focused }) => (
            <Image
              source={courierIcon}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                // Only apply Blue tint when focused. When undefined, it shows original image color (White)
                tintColor: focused ? activeTintColor : undefined
              }}
            />
          )
        }}
      />

      {/* 3. Customer Tab - Single Icon with Toggle Tint */}
      <Tabs.Screen
        name="customer/index"
        options={{
          title: "Customer",
          tabBarIcon: ({ focused }) => (
            <Image
              source={customerIcon}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                // Only apply Blue tint when focused. When undefined, it shows original image color (White)
                tintColor: focused ? activeTintColor : undefined
              }}
            />
          )
        }}
      />

      {/* 4. Delivery Tab (Mapped to Cart Icons) */}
      <Tabs.Screen
        name="order/index"
        options={{
          title: "Delivery",
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? cartIconActive : cartIcon}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          )
        }}
      />

      {/* 5. Menu Tab - Single Icon with Toggle Tint */}
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
                // Only apply Blue tint when focused. When undefined, it shows original image color (White)
                tintColor: focused ? activeTintColor : undefined
              }}
            />
          )
        }}
      />

      {/* --- Hidden Screens (Not shown in Tab Bar) --- */}

      <Tabs.Screen
        name="courier/[id]"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="order/[id]"
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