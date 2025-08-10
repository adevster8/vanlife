import { Text, View } from "react-native";
import Avatar from "./Avatar";

export default function ListItem({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 }}>
      <Avatar />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#0A0F14" }}>{title}</Text>
        {subtitle ? <Text style={{ color: "#5E6D7A" }}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
