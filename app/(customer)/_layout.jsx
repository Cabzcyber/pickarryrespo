import { Tabs } from "expo-router";

export default function CustomerTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home/index" options={{ title: "Home" }} />
      <Tabs.Screen name="orders/index" options={{ title: "Orders" }} />
      <Tabs.Screen name="menu/index" options={{ title: "Menu" }} />
    </Tabs>
  );
}


