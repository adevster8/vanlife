import { Tabs } from "expo-router";
import { Map, MessageCircle, User2, Users } from "lucide-react-native";

export default function IconTabBar() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6800",
        tabBarInactiveTintColor: "#5E6D7A",
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "#EEF3F7" },
      }}
    >
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: ({ color, size }) => <Map color={color} size={size} /> }} />
      <Tabs.Screen name="meetups" options={{ title: "Meetups", tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }} />
      <Tabs.Screen name="messages" options={{ title: "Messages", tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User2 color={color} size={size} /> }} />
    </Tabs>
  );
}
