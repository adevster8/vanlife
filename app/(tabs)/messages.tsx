// app/(tabs)/messages.tsx
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BrandHeader from "../../components/ui/BrandHeader";

export default function Messages() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7FAFF" }}>
      {/* Small centered logo */}
      <View style={{ paddingTop: 4, marginBottom: 6 }}>
        <BrandHeader />
      </View>

      {/* Page heading */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#0F172A" }}>
          Messages
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 12, paddingBottom: 16 }}
        data={[
          { id: "1", name: "Riley", preview: "See you tomorrow!", time: "2m" },
          { id: "2", name: "Jordan", preview: "Coffee after the run?", time: "1h" },
          { id: "3", name: "Sam", preview: "Loved the cookout!", time: "1d" },
        ]}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              borderWidth: 1,
              borderColor: "rgba(2,6,23,0.06)",
            }}
          >
            <Text style={{ fontWeight: "800", fontSize: 17, color: "#0F172A" }}>
              {item.name}
            </Text>
            <Text style={{ color: "#475569", marginTop: 4 }}>{item.preview}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
