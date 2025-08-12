// app/(tabs)/likes.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BrandHeader from "../../components/ui/BrandHeader";

type Person = {
  id: string;
  name: string;
  age: number;
  city: string;
  avatar: string;
  tags: string[];
};

const LIKED_YOU: Person[] = [
  { id: "a1", name: "Maya",  age: 25, city: "Portland", avatar: "https://i.pravatar.cc/140?img=9",  tags: ["trail run", "latte"] },
  { id: "a2", name: "Chris", age: 30, city: "Boise",    avatar: "https://i.pravatar.cc/140?img=33", tags: ["mountain bike", "dogs"] },
  { id: "a3", name: "Ava",   age: 28, city: "Boulder",  avatar: "https://i.pravatar.cc/140?img=20", tags: ["yoga", "hikes"] },
];

const YOUR_LIKES: Person[] = [
  { id: "b1", name: "Leo",  age: 27, city: "San Diego", avatar: "https://i.pravatar.cc/140?img=4",  tags: ["surf", "tacos"] },
  { id: "b2", name: "Nina", age: 26, city: "Phoenix",   avatar: "https://i.pravatar.cc/140?img=47", tags: ["desert hikes"] },
  { id: "b3", name: "Kai",  age: 29, city: "Honolulu",  avatar: "https://i.pravatar.cc/140?img=14", tags: ["beach run"] },
];

// layout
const COL = 2;
const GAP = 12;
const H_PADDING = 16;
const SCREEN_W = Dimensions.get("window").width;
const CARD_W = (SCREEN_W - H_PADDING * 2 - GAP) / COL;

// theme
const BG_APP = "#F7FAFF";
const TXT_PRIMARY = "#0F172A";
const TXT_MUTED = "#64748B";
const CARD_BG = "#FFFFFF";
const CARD_BORDER = "rgba(2,6,23,0.06)";
const CTA_BLUE_BG = "#E6F6FF";
const CTA_ORANGE_BG = "#FFF3E6";
const BRAND_ACCENT = "#0EA5E9";
const BRAND_WARN = "#FF5A00";

function Card({ p }: { p: Person }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: p.avatar }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.name}>
          {p.name} <Text style={styles.age}>{p.age}</Text>
        </Text>
        <Text style={styles.city}>{p.city}</Text>
        <Text style={styles.tags} numberOfLines={1}>
          {p.tags.join(" • ")}
        </Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.cta, styles.ctaBlue]} activeOpacity={0.8}>
            <Ionicons name="heart" size={18} color={BRAND_ACCENT} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cta, styles.ctaOrange]} activeOpacity={0.8}>
            <Ionicons name="close" size={18} color={BRAND_WARN} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Likes() {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        // Header (brand + section label)
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <BrandHeader />
            <Text style={styles.title}>Likes</Text>
            <Text style={styles.subtitle}>
              {LIKED_YOU.length} liked you • {YOUR_LIKES.length} your likes
            </Text>
            <Text style={styles.sectionTitle}>Liked You</Text>
          </View>
        }
        // First grid
        data={LIKED_YOU}
        keyExtractor={(i) => i.id}
        numColumns={COL}
        columnWrapperStyle={{ gap: GAP, paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        renderItem={({ item }) => <Card p={item} />}
        // Footer (second grid)
        ListFooterComponent={
          <View>
            <View style={styles.footerHeader}>
              <Text style={styles.sectionTitle}>Your Likes</Text>
            </View>
            <FlatList
              data={YOUR_LIKES}
              keyExtractor={(i) => `y-${i.id}`}
              numColumns={COL}
              columnWrapperStyle={{ gap: GAP, paddingHorizontal: H_PADDING }}
              ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
              renderItem={({ item }) => <Card p={item} />}
              scrollEnabled={false}
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
            />
          </View>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG_APP },

  // header
  headerWrap: {
    paddingHorizontal: H_PADDING,
    paddingTop: 4,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: TXT_PRIMARY,
  },
  subtitle: {
    color: TXT_MUTED,
    marginTop: 4,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 16,
    color: TXT_PRIMARY,
  },
  footerHeader: {
    paddingHorizontal: H_PADDING,
    paddingTop: 18,
  },

  // card
  card: {
    width: CARD_W,
    backgroundColor: CARD_BG,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: CARD_BORDER,
  },
  cardImage: { width: "100%", height: CARD_W * 1.05 },
  cardBody: { padding: 10 },
  name: { fontWeight: "800", fontSize: 16, color: TXT_PRIMARY },
  age: { fontWeight: "700", color: "#334155" },
  city: { color: TXT_MUTED, marginTop: 2, fontWeight: "600" },
  tags: { color: TXT_PRIMARY, marginTop: 6 },
  actionsRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  cta: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  ctaBlue: { backgroundColor: CTA_BLUE_BG, borderColor: "#CBEFFF" },
  ctaOrange: { backgroundColor: CTA_ORANGE_BG, borderColor: "#FFE1C8" },
});
