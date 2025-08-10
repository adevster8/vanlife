// components/ThemedText.tsx
import * as React from "react";
import { Text, type TextProps } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: "text" | "tint" | "icon";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  colorName = "text",
  ...otherProps
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor, name: colorName });
  return <Text style={[{ color }, style]} {...otherProps} />;
}

export default ThemedText;
