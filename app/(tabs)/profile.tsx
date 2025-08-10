import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const COLOR_TEXT = "#0F172A";
const COLOR_MUTED = "#64748B";
const COLOR_PRIMARY = "#0EA5E9";
const CARD_BORDER = "rgba(2,6,23,0.06)";
const BG_APP = "#F8FAFC";

export default function Profile() {
  const [following, setFollowing] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: BG_APP }}>
      {/* Header */}
      <LinearGradient
        colors={["#cce4ff", "#fdfcff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 220,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        <View
          style={{
            paddingTop: 60,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name="settings-outline" size={24} color={COLOR_TEXT} />
          <Image
            // path from app/(tabs) -> ../../assets/images
            source={require("../../assets/images/logo-blue.png")}
            style={{ width: 36, height: 36, resizeMode: "contain" }}
          />
          <Ionicons name="notifications-outline" size={24} color={COLOR_TEXT} />
        </View>

        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/200?img=5" }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 999,
              borderWidth: 3,
              borderColor: "white",
            }}
          />
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 20, color: COLOR_TEXT }}>
              Jordan Bennett
            </Text>
            <Text style={{ color: COLOR_MUTED }}>@jordan.moves</Text>
          </View>

          <TouchableOpacity
            onPress={() => setFollowing(!following)}
            style={{
              marginTop: 12,
              backgroundColor: following ? "#E2E8F0" : COLOR_PRIMARY,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontWeight: "700", color: following ? COLOR_TEXT : "white" }}>
              {following ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 20, rowGap: 16 }}>
        {/* About */}
        <Card>
          <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 6, color: COLOR_TEXT }}>
            About
          </Text>
          <Text style={{ color: COLOR_TEXT, lineHeight: 20 }}>
            Community builder. Weekend trail runner. Helping people find real-world meetups
            that don’t feel awkward. I host monthly beginner-friendly runs and coffee chats.
          </Text>
        </Card>

        {/* Stats */}
        <Card style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stat icon="walk-outline" label="Meetups" value="27" />
          <Stat icon="people-outline" label="Members" value="412" />
          <Stat icon="star-outline" label="Rating" value="4.9" />
        </Card>

        {/* Upcoming */}
        <Card>
          <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 8, color: COLOR_TEXT }}>
            Upcoming
          </Text>
          <ListItem
            title="Saturday Sunrise Jog"
            subtitle="This Sat • 7:00 AM • Lakeview Loop"
            icon="time-outline"
          />
          <ListItem
            title="Cold Plunge + Coffee"
            subtitle="Sun • 9:30 AM • Riverfront"
            icon="cafe-outline"
          />
          <ListItem
            title="New Member Q&A"
            subtitle="Wed • 6:00 PM • Online"
            icon="chatbubble-ellipses-outline"
          />
        </Card>

        {/* Badges */}
        <Card>
          <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 8, color: COLOR_TEXT }}>
            Badges
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Badge icon="sparkles-outline" text="Community Leader" />
            <Badge icon="shield-checkmark-outline" text="Verified Host" />
            <Badge icon="leaf-outline" text="Outdoors" />
          </View>
        </Card>

        {/* CTA */}
        <TouchableOpacity
          style={{
            backgroundColor: COLOR_PRIMARY,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
            shadowColor: "#0ea5e9",
            shadowOpacity: 0.3,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
          }}
          onPress={() => {}}
        >
          <Text style={{ fontWeight: "700", color: "white", fontSize: 16 }}>
            Start a Meetup with Jordan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------- small inline components (no JSX tricks) ---------- */

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: "rgba(255,255,255,0.75)",
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: CARD_BORDER,
          shadowColor: "#0f172a",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Ionicons name={icon} size={20} color={COLOR_PRIMARY} />
      <Text style={{ fontWeight: "700", marginTop: 6, color: COLOR_TEXT }}>{value}</Text>
      <Text style={{ color: COLOR_MUTED }}>{label}</Text>
    </View>
  );
}

function ListItem({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
      <Ionicons name={icon} size={20} color={COLOR_PRIMARY} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "700", fontSize: 16, color: COLOR_TEXT }}>{title}</Text>
        <Text style={{ color: COLOR_MUTED }}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </View>
  );
}

function Badge({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Ionicons name={icon} size={16} color={COLOR_TEXT} style={{ marginRight: 6 }} />
      <Text style={{ fontWeight: "700", color: COLOR_TEXT }}>{text}</Text>
    </View>
  );
}
