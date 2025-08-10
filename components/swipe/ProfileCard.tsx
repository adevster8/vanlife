import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export type Profile = {
  id: string;
  name: string;
  age: number;
  bio?: string;
  avatar: any;      // ImageSourcePropType
  photos?: any[];
  interests: string[];
  city?: string;
  lookingFor?: "friends" | "adventure" | "dating";
};

export default function ProfileCard({ profile, score }: { profile: Profile; score?: number }) {
  return (
    <View style={styles.card}>
      <Image source={profile.avatar} style={styles.photo} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.name}>
          {profile.name} <Text style={styles.age}>{profile.age}</Text>
        </Text>
        <Text style={styles.sub}>
          {profile.city ?? "Somewhere"} • {profile.lookingFor ?? "friends"}
        </Text>
        <Text numberOfLines={2} style={styles.int}>
          {profile.interests.join(" • ")}
        </Text>
        {typeof score === "number" && (
          <View style={styles.scorePill}>
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 520,
    overflow: "hidden",
    shadowColor: "#0ea5e9",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  photo: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  name: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  age: { fontWeight: "600", color: "#334155" },
  sub: { marginTop: 4, color: "#475569" },
  int: { marginTop: 6, color: "#334155" },
  scorePill: {
    position: "absolute",
    top: -12,
    right: -12,
    backgroundColor: "#0EA5E9",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  scoreText: { color: "#fff", fontWeight: "800" },
});
