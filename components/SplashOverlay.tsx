// components/SplashOverlay.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Image, StyleSheet } from "react-native";

const { width: W, height: H } = Dimensions.get("window");
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// Match this to your logo bg so the transparent logo blends
const CENTER_BG = "#E6F6FF";
const TOP_BG = "#F5FAFF";
const BOTTOM_BG = "#FFFFFF";

type Props = { onFinish?: () => void };

// Hearts rise in two vertical columns *outside* the logo
type Heart = {
  tx: Animated.Value;   // tiny horizontal jitter (column wobble)
  ty: Animated.Value;   // upward travel (negative)
  op: Animated.Value;
  scale: Animated.Value;
  size: number;
  toTY: number;
  delay: number;
  anchorX: number;      // absolute X for each column
};

export default function SplashOverlay({ onFinish }: Props) {
  // ---- overlay + logo
  const overlayFade = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.95)).current;

  // ---- timing: ~80% logo, quick heart burst at end
  const LOGO_PHASE_MS   = 1500; // ~1.5s for logo
  const HEART_RISE_MS   = 300;  // fast burst
  const HEART_DELAY_MAX = 100;  // small jitter so they don't sync perfectly
  const HEART_FADE_MS   = 160;
  const OVERLAY_FADE_MS = 300;

  // ---- geometry around the logo
  const LOGO_SIZE = W * 0.70;
  const GAP = 24; // columns sit outside logo edge
  const LEFT_COL_X  = Math.max(12, W / 2 - LOGO_SIZE / 2 - GAP);
  const RIGHT_COL_X = Math.min(W - 12, W / 2 + LOGO_SIZE / 2 + GAP);

  // ---- hearts (straight up columns)
  const EDGE_OFFSET = 80;           // distance above bottom
  const HEARTS_PER_SIDE = 14;
  const BASE_RISE = 260;

  const makeHeart = (anchorX: number): Heart => ({
    tx: new Animated.Value((Math.random() - 0.5) * 8),
    ty: new Animated.Value(0),
    op: new Animated.Value(0),
    scale: new Animated.Value(0.9 + Math.random() * 0.5),
    size: 20 + Math.random() * 10,
    toTY: -(BASE_RISE * (0.7 + Math.random() * 0.9)),
    delay: Math.random() * HEART_DELAY_MAX,
    anchorX,
  });

  const leftHearts: Heart[]  = range(HEARTS_PER_SIDE).map(() => makeHeart(LEFT_COL_X));
  const rightHearts: Heart[] = range(HEARTS_PER_SIDE).map(() => makeHeart(RIGHT_COL_X));

  useEffect(() => {
    // 1) Logo: fade in → pop → settle (fills ~1.5s)
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(logoScale,   { toValue: 1.24, friction: 6, tension: 140, useNativeDriver: true }),
      Animated.spring(logoScale,   { toValue: 1.00, friction: 7, tension: 140, useNativeDriver: true }),
      Animated.delay(Math.max(0, LOGO_PHASE_MS - 220 - 180 - 180)), // pad to ~LOGO_PHASE_MS
    ]).start();

    // 2) Hearts: start only after the logo phase
    const run = (arr: Heart[]) =>
      arr.forEach(h => {
        Animated.sequence([
          Animated.delay(LOGO_PHASE_MS + h.delay),
          Animated.parallel([
            Animated.timing(h.op,    { toValue: 1, duration: 120, useNativeDriver: true }),
            Animated.timing(h.ty,    { toValue: h.toTY, duration: HEART_RISE_MS, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            Animated.timing(h.scale, { toValue: 1.12, duration: HEART_RISE_MS, useNativeDriver: true }),
          ]),
          Animated.timing(h.op, { toValue: 0, duration: HEART_FADE_MS, useNativeDriver: true }),
        ]).start();
      });

    run(leftHearts);
    run(rightHearts);

    // 3) Fade overlay shortly after burst finishes
    const total =
      LOGO_PHASE_MS + HEART_RISE_MS + HEART_DELAY_MAX + HEART_FADE_MS + 80; // small buffer
    const t = setTimeout(() => {
      Animated.timing(overlayFade, {
        toValue: 0,
        duration: OVERLAY_FADE_MS,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(() => onFinish?.());
    }, total);

    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: overlayFade }]}>
      {/* background gradient with brand-matched center */}
      <LinearGradient
        colors={[TOP_BG, CENTER_BG, BOTTOM_BG]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* hearts first (behind), two narrow columns outside the logo */}
      {leftHearts.map((h, i) => (
        <Animated.Text
          key={`L${i}`}
          style={{
            position: "absolute",
            left: h.anchorX,
            bottom: EDGE_OFFSET,
            fontSize: h.size,
            transform: [{ translateX: h.tx }, { translateY: h.ty }, { scale: h.scale }],
            opacity: h.op,
            textShadowColor: "rgba(0,0,0,0.14)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
        >
          ❤️
        </Animated.Text>
      ))}
      {rightHearts.map((h, i) => (
        <Animated.Text
          key={`R${i}`}
          style={{
            position: "absolute",
            left: h.anchorX,
            bottom: EDGE_OFFSET,
            fontSize: h.size,
            transform: [{ translateX: h.tx }, { translateY: h.ty }, { scale: h.scale }],
            opacity: h.op,
            textShadowColor: "rgba(0,0,0,0.14)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
        >
          ❤️
        </Animated.Text>
      ))}

      {/* transparent logo on top so text stays readable */}
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
