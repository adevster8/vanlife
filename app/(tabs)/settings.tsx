import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Ionicons name="notifications-outline" size={20} color="#0F172A" style={styles.icon} />
        <Text style={styles.label}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.row}>
        <FontAwesome6 name="shield" size={18} color="#0F172A" style={styles.icon} />
        <Text style={styles.label}>Privacy</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="color-palette-outline" size={20} color="#0F172A" style={styles.icon} />
        <Text style={styles.label}>Theme</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8, color: "#0F172A" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  icon: { marginRight: 10 },
  label: { fontSize: 16, color: "#0F172A", flex: 1 },
});
