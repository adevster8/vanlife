// constants/Theme.ts
import { Platform } from "react-native";

export const Colors = {
  // Brand (Electric Fusion)
  gradA: "#00F0FF",
  gradB: "#00FF81",
  electricBlue: "#00F0FF",
  neonGreen: "#00FF81",
  amber: "#FFA900",
  orange: "#FF6800",
  heartRed: "#FF4B4B",

  // UI
  text: "#0E1525",
  subtext: "rgba(14,21,37,0.75)",
  surface: "#FFFFFF",
  border: "#E6EDF3",
  bg: "#F7FBFE",
};

export const Fonts = {
  display: "Poppins_700Bold",
  section: "Poppins_600SemiBold",
  body: "Lato_400Regular",
  label: "Lato_500Medium",
};

// NEW — Rounded corner sizes
export const Radii = {
  sm: 10,
  md: 16,
  lg: 18,
  xl: 24,
};

// NEW — Soft shadow styles
export const Shadow = {
  soft: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
    },
    android: {
      elevation: 6,
    },
  }) as object,
};

export type ThemeType = {
  Colors: typeof Colors;
  Fonts: typeof Fonts;
  Radii: typeof Radii;
  Shadow: typeof Shadow;
};

const Theme: ThemeType = { Colors, Fonts, Radii, Shadow };
export default Theme;
