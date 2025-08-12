import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import PressableScale from "./PressableScale";

export default function LikeButton({ onPress }: { onPress?: () => void }) {
  const [liked, setLiked] = useState(false);
  const scale = useSharedValue(1);
  const burst = useSharedValue(0);

  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const burstStyle = useAnimatedStyle(() => ({
    opacity: burst.value,
    transform: [{ scale: burst.value }],
  }));

  const handle = () => {
    setLiked((v) => !v);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(1.15, {}, () => (scale.value = withSpring(1)));
    burst.value = 0;
    burst.value = withTiming(1, { duration: 160 }, () => (burst.value = withTiming(0, { duration: 160 })));
    onPress?.();
  };

  return (
    <View style={{ width: 56, height: 48, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(14,165,233,0.18)",
          },
          burstStyle,
        ]}
      />
      <PressableScale onPress={handle} style={{ paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, backgroundColor: "#E6F6FF" }}>
        <Animated.View style={heartStyle}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={20} color="#0EA5E9" />
        </Animated.View>
      </PressableScale>
    </View>
  );
}
