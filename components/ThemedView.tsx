// components/ThemedView.tsx
import * as React from "react";
import { View, type ViewProps } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  // optional override for which color key to use from the palette
  colorName?: "background" | "card" | "border";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorName = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({
    light: lightColor,
    dark: darkColor,
    name: colorName,
  });

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export default ThemedView;
