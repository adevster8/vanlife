import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0EA5E9",
        tabBarInactiveTintColor: "rgba(15,23,42,0.55)",
        tabBarStyle: {
          position: "absolute",
          height: 64,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          marginHorizontal: 12,
          marginBottom: Platform.OS === "ios" ? 10 : 8,
          borderRadius: 22,
          overflow: "hidden",
        },
        tabBarBackground: () => <BlurView tint="light" intensity={35} style={{ flex: 1 }} />,
      }}
    >
      {/* 1. Discover */}
     <Tabs.Screen
  name="discover"
  options={{
    tabBarIcon: ({ color, focused }) => (
      <Ionicons name={focused ? "compass" : "compass-outline"} size={26} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="matches"
  options={{
    tabBarIcon: ({ color, focused }) => (
      <Ionicons name={focused ? "people" : "people-outline"} size={26} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="messages"
  options={{
    tabBarIcon: ({ color, focused }) => (
      <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={26} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="likes"
  options={{
    tabBarIcon: ({ color, focused }) => (
      <Ionicons name={focused ? "heart" : "heart-outline"} size={26} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="profile"
  options={{
    tabBarIcon: ({ color, focused }) => (
      <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={28} color={color} />
    ),
  }}
/>
    </Tabs>
  );
}
