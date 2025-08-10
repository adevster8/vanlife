// constants/Colors.ts
// Safe, complete light/dark palettes with typed exports.

export const Colors = {
  light: {
    text: "#0F172A",
    background: "#FFFFFF",
    tint: "#0EA5E9",
    icon: "#64748B",
    tabIconDefault: "#94A3B8",
    tabIconSelected: "#0EA5E9",
    card: "#F8FAFC",
    border: "#E2E8F0",
  },
  dark: {
    text: "#ECEDEE",
    background: "#0B0B0B",
    tint: "#0EA5E9",
    icon: "#9BA1A6",
    tabIconDefault: "#4B5563",
    tabIconSelected: "#0EA5E9",
    card: "#111418",
    border: "#1F2937",
  },
} as const;

export type ThemeName = keyof typeof Colors;            // 'light' | 'dark'
export type ColorName = keyof (typeof Colors)["light"]; // 'text' | 'background' | ...

export default Colors;
