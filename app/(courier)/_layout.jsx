import { Tabs } from "expo-router";

export default function CourierTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home/index" options={{ title: "Home" }} />
      <Tabs.Screen name="history/index" options={{ title: "History" }} />
      <Tabs.Screen name="book/index" options={{ title: "Book" }} />
      <Tabs.Screen name="menu/index" options={{ title: "Menu" }} />
    </Tabs>
  );
}


