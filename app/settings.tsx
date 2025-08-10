import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText } from "moti";

import GlassCard from "../components/ui/GlassCard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors, Fonts, Shadow } from "../constants/Theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.gradA, Colors.gradB]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.9 }}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 550 }}
          style={styles.header}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800",
            }}
            style={styles.avatar}
          />
          <View style={styles.nameBlock}>
            <MotiText
              from={{ opacity: 0, translateY: 6 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 150, duration: 500 }}
              style={styles.name}
            >
              Alex Rivers
            </MotiText>
            <MotiText
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 260, duration: 500 }}
              style={styles.meta}
            >
              Pacific Northwest • Vanlife + Coaching
            </MotiText>
          </View>
        </MotiView>

        {/* About */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 180, duration: 550 }}
        >
          <GlassCard style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.body}>
              I help people plan road trips, build minimalist routines, and
              transition into remote work while staying grounded. Coffee, trail
              runs, and coastal drives.
            </Text>
          </GlassCard>
        </MotiView>

        {/* Focus */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 280, duration: 550 }}
        >
          <GlassCard style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>Focus</Text>
            <Text style={styles.tagRow}>
              • Trip Planning   • Budget Builds   • Remote Career
            </Text>
          </GlassCard>
        </MotiView>

        {/* CTAs */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 380, duration: 550 }}
          style={styles.ctaRow}
        >
          <PrimaryButton title="Message" onPress={() => {}} style={{ flex: 1 }} />
          <PrimaryButton title="Book Session" onPress={() => {}} style={{ flex: 1 }} />
        </MotiView>
      </SafeAreaView>
    </View>
  );
}

const AVATAR = 92;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  safe: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    ...Shadow.soft,
  },
  nameBlock: { marginLeft: 14, flex: 1 },
  name: { fontFamily: Fonts.heading, fontSize: 24, color: Colors.text },
  meta: { mar
