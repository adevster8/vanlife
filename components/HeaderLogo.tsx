import { Image, View } from "react-native";
import images from "../constants/images";

export default function HeaderLogo() {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
      <Image source={images.logoBlue} style={{ width: 140, height: 42 }} resizeMode="contain" />
    </View>
  );
}
