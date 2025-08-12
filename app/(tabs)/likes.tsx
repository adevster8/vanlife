// app/(tabs)/likes.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BrandHeader from "../../components/ui/BrandHeader";

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
const BRAND_ACCENT = "#0EA5E9";
const BRAND_WARN = "#FF5A00";

// fonts loaded in app/_layout.tsx
const FONTS = {
  title: "Poppins_700Bold",
  label: "Lato_500Medium",
  body: "Lato_400Regular",
};

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

function Tag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

function Card({ p, onLike, onDismiss }: {
  p: Person;
  onLike?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: p.avatar }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.name}>
          {p.name} <Text style={styles.age}>{p.age}</Text>
        </Text>
        <Text style={styles.city}>{p.city}</Text>
        {!!p.tags?.length && (
          <View style={styles.tagsRow}>
            {p.tags.slice(0, 3).map((t) => (
              <Tag key={t} text={t} />
            ))}
          </View>
        )}

        <View style={styles.actionsRow}>
          <Pressable style={[styles.cta, styles.ctaLike]} onPress={onLike}>
            <Ionicons name="heart" size={18} color="#fff" />
            <Text style={styles.ctaLikeText}>Like</Text>
          </Pressable>
          <Pressable style={[styles.cta, styles.ctaPass]} onPress={onDismiss}>
            <Ionicons name="close" size={18} color={BRAND_WARN} />
            <Text style={styles.ctaPassText}>Pass</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function Likes() {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
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
        data={LIKED_YOU}
        keyExtractor={(i) => i.id}
        numColumns={COL}
        columnWrapperStyle={{ gap: GAP, paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        renderItem={({ item }) => (
          <Card
            p={item}
            onLike={() => console.log("like back", item.id)}
            onDismiss={() => console.log("dismiss", item.id)}
          />
        )}
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
              renderItem={({ item }) => (
                <Card
                  p={item}
                  onLike={() => console.log("already liked", item.id)}
                  onDismiss={() => console.log("undo like?", item.id)}
                />
              )}
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
    fontFamily: FONTS.title,
    fontSize: 26,
    color: TXT_PRIMARY,
    marginTop: 6,
  },
  subtitle: {
    fontFamily: FONTS.label,
    color: TXT_MUTED,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: FONTS.title,
    fontSize: 18,
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
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: CARD_BORDER,
  },
  cardImage: { width: "100%", height: CARD_W * 1.05 },
  cardBody: { padding: 10 },

  name: { fontFamily: FONTS.title, fontSize: 16, color: TXT_PRIMARY },
  age: { fontFamily: FONTS.label, color: "#334155" },
  city: { fontFamily: FONTS.label, color: TXT_MUTED, marginTop: 2 },

  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#EEF6FF",
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15,23,42,0.08)",
  },
  tagText: { fontFamily: FONTS.label, color: TXT_PRIMARY, fontSize: 12 },

  actionsRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  cta: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  ctaLike: {
    backgroundColor: BRAND_ACCENT,
    borderColor: BRAND_ACCENT,
    flexDirection: "row",
    gap: 6,
  },
  ctaLikeText: { fontFamily: FONTS.label, color: "white" },
  ctaPass: {
    backgroundColor: "#FFF3E6",
    borderColor: "#FFE1C8",
    flexDirection: "row",
    gap: 6,
  },
  ctaPassText: { fontFamily: FONTS.label, color: BRAND_WARN },
});
