// app/_layout.tsx
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import SplashOverlay from "../components/SplashOverlay";

import {
  Lato_400Regular,
  Lato_500Medium,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import {
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Lato_400Regular,
    Lato_500Medium,
    Lato_700Bold,
  });

  const [showOverlay, setShowOverlay] = useState(true);

  // Fail-safe: give the overlay time for the heart burst before hiding
  useEffect(() => {
    const t = setTimeout(() => setShowOverlay(false), 3200); // was 1800
    return () => clearTimeout(t);
  }, []);

  const shouldShowOverlay = !fontsLoaded || showOverlay;

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      {shouldShowOverlay && (
        <SplashOverlay
          onFinish={() => {
            if (fontsLoaded) setShowOverlay(false);
          }}
        />
      )}
    </View>
  );
}
