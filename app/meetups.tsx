import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  { id: "1", title: "Sunset Cookout • Big Sur", when: "Today · 6:30 PM" },
  { id: "2", title: "Beach Yoga • San Onofre", when: "Tomorrow · 9:00 AM" },
  { id: "3", title: "Trail Run • Lakeview Loop", when: "Sat · 7:00 AM" },
];

export default function MeetupsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Meetups</Text>
      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Ionicons name="calendar-outline" size={22} color="#0EA5E9" />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.when}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 16 },
  header: { fontSize: 22, fontWeight: "800", color: "#0F172A", marginBottom: 8 },
  sep: { height: 10 },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#0ea5e9",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  sub: { color: "#64748B", marginTop: 2 },
});
