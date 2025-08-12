// components/SplashOverlay.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";

const { width: W } = Dimensions.get("window");

// Match your brand background so the transparent logo blends
const CENTER_BG = "#E6F6FF";
const TOP_BG = "#F5FAFF";
const BOTTOM_BG = "#FFFFFF";

type Props = { onFinish?: () => void };

// timing
const LOGO_PHASE_MS = 1200;      // logo pop/settle duration
const OVERLAY_FADE_MS = 300;    // fade to app

export default function SplashOverlay({ onFinish }: Props) {
  const overlayFade = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Logo: fade in → pop → settle (≈900ms total)
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(logoScale,   { toValue: 1.24, friction: 6, tension: 140, useNativeDriver: true }),
      Animated.spring(logoScale,   { toValue: 1.00, friction: 7, tension: 140, useNativeDriver: true }),
      Animated.delay(Math.max(0, LOGO_PHASE_MS - 220 - 180 - 180)),
    ]).start();

    // Fade the overlay out after the logo finishes
    const t = setTimeout(() => {
      Animated.timing(overlayFade, {
        toValue: 0,
        duration: OVERLAY_FADE_MS,
        useNativeDriver: true,
      }).start(() => onFinish?.());
    }, LOGO_PHASE_MS + 200); // tiny buffer

    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: overlayFade }]}>
      {/* background gradient */}
      <LinearGradient
        colors={[TOP_BG, CENTER_BG, BOTTOM_BG]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* transparent logo */}
      <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
        <Image
          source={require("../assets/images/transparent-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: CENTER_BG,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  logo: {
    width: W * 0.7,
    height: W * 0.7,
  },
});
