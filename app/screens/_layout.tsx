import { Stack } from "expo-router";

export default function ScreensLayout() {
  // This creates a Stack navigator for everything under app/screens/*
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
