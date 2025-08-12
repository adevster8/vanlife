import React, { useState } from "react";
import { ImageProps, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function ShimmerImage({ style, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {!loaded && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(200)}
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#eef2f7", borderRadius: 12 }}
        />
      )}
      <Animated.Image
        {...props}
        onLoadEnd={() => setLoaded(true)}
        entering={FadeIn.duration(260)}
        style={[style]}
      />
    </View>
  );
}
