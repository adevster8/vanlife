import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Main app tabs live in this route group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Fallback for unknown routes */}
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </>
  );
}
