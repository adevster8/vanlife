import { Image, View } from "react-native";

export default function Avatar({ uri, size = 44 }: { uri?: string; size?: number }) {
  const r = size / 2;
  return (
    <View style={{ width: size, height: size, borderRadius: r, overflow: "hidden", backgroundColor: "#E9F3F9" }}>
      {uri ? <Image source={{ uri }} style={{ width: size, height: size }} /> : null}
    </View>
  );
}
