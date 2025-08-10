import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CHATS = [
  { id: "1", name: "Riley", last: "See you tomorrow!", time: "2m" },
  { id: "2", name: "Jordan", last: "Coffee after the run?", time: "1h" },
  { id: "3", name: "Sam", last: "Loved the cookout!", time: "1d" },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={CHATS}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.preview}>{item.last}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 16 },
  header: { fontSize: 22, fontWeight: "800", color: "#0F172A", marginBottom: 8 },
  sep: { height: 8 },
  row: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#0ea5e9",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { fontWeight: "700", color: "#0F172A" },
  preview: { color: "#64748B", marginTop: 2 },
  time: { color: "#94A3B8", marginRight: 6, fontSize: 12 },
});
