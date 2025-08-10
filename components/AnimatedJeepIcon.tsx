import { FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

type Props = {
  focused: boolean;
  color: string;
  size: number;
  // The tab bar handles presses, so we don't need onPress here,
  // but we keep it for flexibility if you reuse elsewhere.
  onPress?: () => void;
  // Flip the jeep to face left if you ever want to reuse for a left control, etc.
  flipX?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedJeepIcon({
  focused,
  color,
  size,
  onPress,
  flipX = false,
}: Props) {
  // Shared values for bobbing and tilting
  const bob = useSharedValue(0);     // translateY
  const tilt = useSharedValue(0);    // degrees
  const scale = useSharedValue(1);   // quick tap feedback if needed

  // Start/stop the hover animation based on focus (active tab)
  useEffect(() => {
    if (focused) {
      // Gentle bob + tilt loop
      bob.value = withRepeat(
        withSequence(
          withTiming(-3, { duration: 650, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 650, easing: Easing.inOut(Easing.ease) })
        ),
        -1, // infinite
        true
      );
      tilt.value = withRepeat(
        withSequence(
          withTiming(-3, { duration: 650, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 650, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      // Stop animation and reset
      cancelAnimation(bob);
      cancelAnimation(tilt);
      bob.value = withTiming(0, { duration: 200 });
      tilt.value = withTiming(0, { duration: 200 });
    }
  }, [focused]);

  // Optional quick “boop” on press (if used outside tabBar)
  const onPressIn = () => {
    scale.value = withTiming(0.95, { duration: 80 });
  };
  const onPressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bob.value },
      { rotateZ: `${tilt.value}deg` },
      { scale: scale.value },
      ...(flipX ? [{ scaleX: -1 }] : []),
    ],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      // The tab bar will wrap this, so accessibility is handled upstream
      style={animatedStyle}
      hitSlop={8}
    >
      <FontAwesome6 name="truck-monster" size={size} color={color} />
    </AnimatedPressable>
  );
}
