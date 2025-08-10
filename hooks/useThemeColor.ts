// hooks/useThemeColor.ts
// Guarded hook: never throws if a key is missing.

import Colors, { ColorName, ThemeName } from "../constants/Colors";
import { useColorScheme } from "./useColorScheme";

type Args = {
  light?: string;
  dark?: string;
  name: ColorName;
};

export function useThemeColor({ light, dark, name }: Args) {
  const scheme = (useColorScheme?.() ?? "light") as ThemeName;

  // If a specific color value was provided via props, prefer it
  if (scheme === "light" && light) return light;
  if (scheme === "dark" && dark) return dark;

  // Safe fallback lookups
  const palette = Colors[scheme] ?? Colors.light;

  // If the requested key isn't in the palette, fall back to something sane
  if (!name || !(name in palette)) {
    // Background when used for containers, text otherwise
    return name === "background" ? palette.background : palette.text;
  }

  return palette[name];
}
