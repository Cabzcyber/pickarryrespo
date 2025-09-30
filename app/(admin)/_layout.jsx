import { Tabs } from "expo-router";

export default function AdminTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home/index" options={{ title: "Home" }} />
      <Tabs.Screen name="courier/index" options={{ title: "Courier" }} />
      <Tabs.Screen name="customer/index" options={{ title: "Customer" }} />
      <Tabs.Screen name="order/index" options={{ title: "Order" }} />
      <Tabs.Screen name="menu/index" options={{ title: "Menu" }} />
    </Tabs>
  );
}


