import { Pressable, Text, View } from "react-native";

export default function EmptyState({ title, cta, onPress }: { title: string; cta?: string; onPress?: () => void }) {
  return (
    <View style={{ alignItems: "center", paddingVertical: 40 }}>
      <Text style={{ color: "#5E6D7A", fontSize: 16, marginBottom: 16, textAlign: "center" }}>{title}</Text>
      {cta ? (
        <Pressable
          onPress={onPress}
          style={{
            backgroundColor: "#FF6800",
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "white", fontWeight: "800" }}>{cta}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
