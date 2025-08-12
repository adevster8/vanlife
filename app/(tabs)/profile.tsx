// app/(tabs)/profile.tsx
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import BrandHeader from "../../components/ui/BrandHeader";

const W = Dimensions.get("window").width;
const PAD = 16;
const CARD = (W - PAD * 2 - 8 * 2) / 3; // 3-column photo grid

// ----- Mock profile data (swap with API later) -----
const profile = {
  name: "Jordan",
  age: 27,
  city: "Austin",
  countryFlag: "🇺🇸",
  avatar: "https://i.pravatar.cc/200?img=32",
  verified: true,
  languages: ["English", "Spanish"],
  joined: "Feb 2025",
  photos: [
    "https://images.unsplash.com/photo-1520975682031-5a97f1c7b07d?q=80&w=1200",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
    "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200",
  ],
  about:
    "Community builder and weekend trail runner. I help people find easy, real-world meetups that don’t feel awkward. Big on sunrise jogs, dog parks, and coffee after.",
  interests: [
    "trail runs",
    "dogs",
    "coffee",
    "photography",
    "cold plunge",
    "campfires",
    "board games",
  ],
  prompts: [
    { q: "Perfect Saturday?", a: "Trail loop at sunrise, farmer’s market, then iced latte." },
    { q: "Green flag I look for", a: "Shows up on time and suggests a meetup idea. 😄" },
    { q: "Unpopular opinion", a: "Running in light rain > treadmill every time." },
  ],
  meetupIdeas: [
    { icon: "walk", text: "Lady Bird Lake jog" },
    { icon: "cafe", text: "Try that new roastery" },
    { icon: "paw", text: "Dog park + picnic" },
  ],
};

export default function Profile() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar with brand logo centered */}
      <View style={styles.topBar}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={26} color="#0F172A" />
        </TouchableOpacity>

        <BrandHeader />

        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={26} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + insets.bottom + 24 }}
      >
        {/* Header block with gradient + avatar + identity */}
        <LinearGradient
          colors={["#E6F6FF", "#F7FAFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.identityWrap}>
            <Image
              source={{ uri: profile.avatar }}
              style={styles.heroAvatar}
            />
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>
                {profile.name} {profile.age}
              </Text>
              {profile.verified && (
                <Ionicons name="shield-checkmark" size={18} color="#0EA5E9" style={{ marginLeft: 8 }} />
              )}
            </View>
            <Text style={styles.cityText}>
              {profile.city} {profile.countryFlag}
            </Text>
          </View>
        </LinearGradient>

        {/* Badges */}
        <SectionCard style={{ marginTop: -44, paddingVertical: 16, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Badge icon="home" label="Home Base" value={profile.city} />
            <View style={{ width: 12 }} />
            <Badge icon="chatbubbles" label="Languages" value={profile.languages.join(", ")} />
            <View style={{ width: 12 }} />
            <Badge icon="calendar" label="Joined" value={profile.joined} />
          </View>
        </SectionCard>

        {/* Photos */}
        <SectionTitle>Photos</SectionTitle>
        <SectionCard style={{ paddingTop: 12 }}>
          <FlatList
            data={profile.photos.slice(0, 9)}
            keyExtractor={(uri, idx) => `${idx}-${uri}`}
            numColumns={3}
            columnWrapperStyle={{ gap: 8 }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: CARD, height: CARD, borderRadius: 12, backgroundColor: "#E5E7EB" }}
              />
            )}
            scrollEnabled={false}
          />
        </SectionCard>

        {/* About */}
        <SectionTitle>About</SectionTitle>
        <SectionCard>
          <Text style={{ color: "#0F172A", lineHeight: 22 }}>{profile.about}</Text>
        </SectionCard>

        {/* Get to Know Me */}
        <SectionTitle>Get to Know Me</SectionTitle>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: PAD, paddingVertical: 10 }}
        >
          {profile.prompts.map((p, i) => (
            <PromptCard key={i} q={p.q} a={p.a} />
          ))}
        </ScrollView>

        {/* Interests */}
        <SectionTitle>Interests</SectionTitle>
        <SectionCard>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {profile.interests.map((t) => (
              <Pill key={t} text={t} />
            ))}
          </View>
        </SectionCard>

        {/* Meetup ideas (display only) */}
        <SectionTitle>Meetup ideas</SectionTitle>
        <SectionCard>
          {profile.meetupIdeas.map((m, i) => (
            <View key={`${m.text}-${i}`} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}>
              <Ionicons name="location-outline" size={18} color="#FF5A00" />
              <Text style={{ marginLeft: 8, color: "#0F172A" }}>{m.text}</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- UI atoms ---------------- */

function SectionCard({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          borderRadius: 18,
          padding: 16,
          marginHorizontal: PAD,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: "900",
        color: "#0F172A",
        marginHorizontal: PAD,
        marginTop: 18,
        marginBottom: 10,
      }}
    >
      {children}
    </Text>
  );
}

function Badge({ icon, label, value }: { icon: any; label: string; value: string }) {
  const COLW = (W - PAD * 2 - 16 * 2 - 12 * 2) / 3; // container paddings + 12px gaps
  return (
    <View style={{ alignItems: "center", width: COLW, maxWidth: COLW }}>
      <Ionicons name={icon} size={18} color="#0F172A" />
      <Text
        style={{ fontWeight: "800", color: "#0F172A", marginTop: 6, textAlign: "center", lineHeight: 20 }}
        numberOfLines={2}
      >
        {value}
      </Text>
      <Text style={{ color: "#64748B", marginTop: 2, textAlign: "center", lineHeight: 18 }} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#EEF6FF",
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: "#0F172A", fontWeight: "600" }}>{text}</Text>
    </View>
  );
}

function PromptCard({ q, a }: { q: string; a: string }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 14,
        marginRight: 12,
        width: W * 0.72,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      }}
    >
      <Text style={{ color: "#64748B", fontWeight: "800" }}>{q}</Text>
      <Text style={{ color: "#0F172A", marginTop: 8, fontSize: 16 }}>{a}</Text>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7FAFF" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: PAD,
    paddingTop: 4,
    marginBottom: 6,
  },

  headerGradient: {
    paddingBottom: 72,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  identityWrap: { alignItems: "center", marginTop: 6 },
  heroAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "white",
  },
  nameRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  nameText: { fontSize: 28, fontWeight: "900", color: "#0F172A" },
  cityText: { color: "#64748B", marginTop: 4 },

  // (Optional) standalone text styles if needed elsewhere
  name: { marginTop: 12, fontSize: 22, fontWeight: "700", color: "#0F172A" },
  city: { fontSize: 16, color: "#64748B", marginTop: 2 },
});
