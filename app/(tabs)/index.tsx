import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { MotiText, MotiView } from "moti";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// keep these, per your project
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Colors, Fonts } from "../../constants/Theme";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={[Colors.gradA, Colors.gradB]}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 1, y: 0.9 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 700 }}
          style={styles.content}
        >
          <MotiText
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 200, duration: 600 }}
            style={styles.title}
          >
            🌊 Vanlife
          </MotiText>

          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 400, duration: 600 }}
            style={styles.subtitle}
          >
            Find adventure buddies (and their pups).
          </MotiText>

          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 600, duration: 600 }}
            style={styles.buttons}
          >
            {/* Tabs screens are directly at /profile and /settings */}
            <Link asChild href="/profile">
              <PrimaryButton title="Go to Profile" />
            </Link>

            <Link asChild href="/settings">
              <PrimaryButton title="Settings" />
            </Link>
          </MotiView>

          <Text style={styles.hint}>
            Dev tools:{" "}
            <Text style={styles.bold}>
              {Platform.select({ ios: "⌘D", android: "⌘M", web: "F12" })}
            </Text>
          </Text>
        </MotiView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 24 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontFamily: Fonts.heading,
    fontSize: 36,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: "rgba(14,21,37,0.8)",
    textAlign: "center",
    marginBottom: 28,
  },
  buttons: {
    gap: 12,
    width: "100%",
    maxWidth: 360,
    marginTop: 12,
  },
  hint: {
    marginTop: 24,
    color: "rgba(14,21,37,0.65)",
    fontFamily: Fonts.body,
  },
  bold: { fontWeight: "700" },
});
