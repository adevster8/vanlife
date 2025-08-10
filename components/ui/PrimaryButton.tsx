// components/ui/PrimaryButton.tsx
import { MotiView } from "moti";
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { Colors, Fonts } from "../../constants/Theme";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: "primary" | "outline";
};

export default function PrimaryButton({
  title,
  onPress,
  style,
  variant = "primary",
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <MotiView
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      style={[{ width: "100%" }, style]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: isPrimary ? Colors.orange : "transparent",
            borderColor: Colors.orange,
            borderWidth: 2,
            paddingVertical: 14,
            borderRadius: 16,
            alignItems: "center",
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <Text
          style={{
            color: isPrimary ? "#fff" : Colors.orange,
            fontFamily: Fonts.heading,
            fontWeight: "800",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </MotiView>
  );
}
