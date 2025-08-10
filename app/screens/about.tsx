// app/screens/about.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>
        Vanlife is a community for real-world adventure meetups and connections.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8FAFC" },
  title: { fontSize: 22, fontWeight: "800", color: "#0F172A", marginBottom: 8 },
  text: { fontSize: 16, color: "#334155", lineHeight: 22 },
});
