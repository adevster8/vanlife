import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

export default function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7FBFE" }}>
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
