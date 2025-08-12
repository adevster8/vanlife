// components/ui/EdgeArrows.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
  side: "left" | "right";
  onPress: () => void;
  disabled?: boolean;
  bottom: number;           // distance from bottom (so you can sit it “flush” to the tab bar)
};

export default function EdgeArrows({ side, onPress, disabled, bottom }: Props) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // pin to screen edges; NOT inside cards (prevents clipping)
  const pos = side === "left" ? { left: 14 } : { right: 14 };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        {
          position: "absolute",
          bottom,
          ...pos,
          zIndex: 50, // above content, below any modals
        },
        anim,
      ]}
    >
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        disabled={disabled}
        hitSlop={10}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,                  // perfect circle
          backgroundColor: disabled
            ? "rgba(14,165,233,0.35)"        // medium opacity when not available
            : "rgba(14,165,233,0.92)",       // strong baby-blue when available
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
        }}
      >
        <Ionicons
          name={side === "left" ? "chevron-back" : "chevron-forward"}
          size={28}
          color="#fff"                        // always white inside
        />
      </Pressable>
    </Animated.View>
  );
}
