// app/_layout.tsx
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import SplashOverlay from "../components/SplashOverlay"; // path from /app -> /components

export default function RootLayout() {
  const [showOverlay, setShowOverlay] = useState(true);

  // safety auto-hide in case onFinish doesn't fire
  useEffect(() => {
    const t = setTimeout(() => setShowOverlay(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      {showOverlay && <SplashOverlay onFinish={() => setShowOverlay(false)} />}
    </View>
  );
}
