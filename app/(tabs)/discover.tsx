import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ProfileCard from "../../components/swipe/ProfileCard";
import { CANDIDATES, CURRENT_USER } from "../../constants/mockProfiles";
import { matchScore } from "../../lib/match";

type Dir = "left" | "right" | "none";

export default function DiscoverJeep() {
  // Pre-score & sort candidates once
  const cards = React.useMemo(() => {
    return [...CANDIDATES]
      .map((p) => ({ profile: p, score: matchScore(CURRENT_USER, p) }))
      .sort((a, b) => b.score - a.score);
  }, []);

  const [idx, setIdx] = React.useState(0);
  const [dir, setDir] = React.useState<Dir>("none"); // for animation hint
  const [history, setHistory] = React.useState<number[]>([]); // allow going back

  const next = () => {
    setDir("right");
    setTimeout(() => {
      setHistory((h) => [...h, idx]);
      setIdx((i) => Math.min(i + 1, cards.length - 1));
      setDir("none");
    }, 120);
  };

  const prev = () => {
    setDir("left");
    setTimeout(() => {
      setIdx((i) => {
        if (history.length === 0) return Math.max(i - 1, 0);
        const last = history[history.length - 1];
        setHistory((h) => h.slice(0, -1));
        return last;
      });
      setDir("none");
    }, 120);
  };

  const item = cards[idx];
  const canPrev = idx > 0 || history.length > 0;
  const canNext = idx < cards.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.meta}>
          {idx + 1}/{cards.length}
        </Text>
      </View>

      <View style={styles.stage}>
        {item ? (
          <MotiView
            key={item.profile.id}
            from={{
              opacity: 0.6,
              translateX: dir === "right" ? 20 : dir === "left" ? -20 : 0,
              rotateZ: dir === "right" ? "-2deg" : dir === "left" ? "2deg" : "0deg",
            }}
            animate={{ opacity: 1, translateX: 0, rotateZ: "0deg" }}
            transition={{ type: "timing", duration: 180 }}
            style={{ flex: 1 }}
          >
            <ProfileCard profile={item.profile} score={item.score} />
          </MotiView>
        ) : (
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle" size={28} color="#22c55e" />
            <Text style={styles.emptyText}>You’re all caught up!</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Circle disabled={!canPrev} onPress={prev} accessibilityLabel="Previous">
          {/* Left Jeep */}
          <FontAwesome6 name="truck-monster" size={26} color={canPrev ? "#0EA5E9" : "#94A3B8"} style={{ transform: [{ scaleX: -1 }] }} />
        </Circle>

        <Circle onPress={next} disabled={!canNext} size={72} accessibilityLabel="Next">
          {/* Right Jeep */}
          <FontAwesome6 name="truck-monster" size={32} color={canNext ? "#0EA5E9" : "#94A3B8"} />
        </Circle>
      </View>
    </View>
  );
}

function Circle({
  children,
  onPress,
  disabled,
  size = 60,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
  accessibilityLabel?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 10 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  meta: { color: "#64748B", fontWeight: "600" },
  stage: { flex: 1, paddingHorizontal: 18, justifyContent: "center" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 14,
  },
  circle: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0ea5e9",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  empty: { alignItems: "center", gap: 8 },
  emptyText: { color: "#22c55e", fontWeight: "700" },
});
