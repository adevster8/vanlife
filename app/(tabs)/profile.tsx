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
const CARD = (W - PAD * 2 - 8 * 2) / 3;

// Fonts loaded in app/_layout.tsx
const FONTS = {
  display: "Poppins_700Bold",
  section: "Poppins_600SemiBold",
  body: "Lato_400Regular",
  label: "Lato_500Medium",
};

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

// --- “Why I’m here” ---
type Intent = "dating" | "relationship" | "flings" | "friends" | "unsure";
const INTENT_OPTIONS: { id: Intent; label: string; icon: any }[] = [
  { id: "dating",       label: "Dating",               icon: "heart-outline" },
  { id: "relationship", label: "Serious relationship", icon: "infinite-outline" },
  { id: "flings",       label: "Flings",               icon: "flash-outline" },
  { id: "friends",      label: "Friends",              icon: "people-outline" },
  { id: "unsure",       label: "Not sure yet",         icon: "help-circle-outline" },
];

// --- “Only the Best” compact summary + editor (mock) ---
type BestTopic =
  | "foods" | "movies" | "countries" | "animals" | "actors" | "comedians"
  | "music" | "books" | "sports" | "podcasts" | "games" | "apps"
  | "cities" | "hobbies" | "drinks";

const BEST_LABELS: Record<BestTopic, string> = {
  foods: "Food",
  movies: "Movies",
  countries: "Countries to visit",
  animals: "Animals",
  actors: "Actors",
  comedians: "Comedians",
  music: "Music artists",
  books: "Books",
  sports: "Sports",
  podcasts: "Podcasts",
  games: "Games",
  apps: "Apps",
  cities: "Cities",
  hobbies: "Hobbies",
  drinks: "Drinks",
};

const BEST_OPTIONS: Record<BestTopic, string[]> = {
  foods: ["Teriyaki","Burgers","Buffalo wings","Sushi","Tacos","Pho","Ramen","Pasta"],
  movies: ["Interstellar","Inception","Her","La La Land","Parasite","Dune"],
  countries: ["Japan","Italy","Portugal","Iceland","New Zealand","Mexico"],
  animals: ["Dog","Cat","Otter","Red Panda","Elephant"],
  actors: ["Denzel","Meryl","Zendaya","Gosling","Leo"],
  comedians: ["Mulaney","Ali Wong","Bo Burnham","Hasan Minhaj","Bill Burr"],
  music: ["Frank Ocean","SZA","Kendrick","Taylor Swift","The Weeknd"],
  books: ["1984","Sapiens","Atomic Habits","Dune","Becoming"],
  sports: ["Running","Climbing","Tennis","Soccer","Yoga"],
  podcasts: ["The Daily","Radiolab","Huberman","HIBT","99PI"],
  games: ["Zelda","Mario Kart","Stardew","Minecraft","Overcooked"],
  apps: ["Spotify","Notion","Maps","YouTube","Reddit"],
  cities: ["Austin","NYC","SF","Seattle","Chicago"],
  hobbies: ["Photography","Cooking","Hiking","Writing","Gardening"],
  drinks: ["Cold brew","Matcha","Espresso","Chai","Boba"],
};

export default function Profile() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  // Why I'm here (mock)
  const [intent, setIntent] = React.useState<Intent>("dating");

  // Only the Best (mock selections & editor)
  const [best, setBest] = React.useState<Record<BestTopic, string[]>>({
    foods: ["Teriyaki","Burgers","Buffalo wings"],
    movies: ["Interstellar"],
    countries: ["Japan","Italy"],
  });
  const [bestEditorOpen, setBestEditorOpen] = React.useState(false);
  const [topic, setTopic] = React.useState<BestTopic>("foods");
  const [scratch, setScratch] = React.useState<string[]>(best[topic] ?? []);
  React.useEffect(() => setScratch(best[topic] ?? []), [topic, best]);

  const toggleScratch = (item: string) => {
    setScratch((cur) => {
      const has = cur.includes(item);
      if (has) return cur.filter((x) => x !== item);
      if (cur.length >= 3) return cur;
      return [...cur, item];
    });
  };
  const saveTopic = () => setBest((prev) => ({ ...prev, [topic]: scratch }));
  const selectedCount = (t: BestTopic) => (best[t]?.length ?? 0);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
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
        {/* Header */}
        <LinearGradient
          colors={["#E6F6FF", "#F7FAFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.identityWrap}>
            <Image source={{ uri: profile.avatar }} style={styles.heroAvatar} />
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
                style={{ width: CARD, height: CARD, borderRadius: 14, backgroundColor: "#E5E7EB" }}
              />
            )}
            scrollEnabled={false}
          />
        </SectionCard>

        {/* About */}
        <SectionTitle>About</SectionTitle>
        <SectionCard>
          <Text style={styles.bodyText}>{profile.about}</Text>
        </SectionCard>

        {/* Why I'm here */}
        <SectionTitle>Why I’m here</SectionTitle>
        <SectionCard style={{ paddingVertical: 12 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {INTENT_OPTIONS.map((opt) => (
              <Chip
                key={opt.id}
                label={opt.label}
                icon={opt.icon}
                selected={intent === opt.id}
                onPress={() => setIntent(opt.id)}
              />
            ))}
          </View>
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

        {/* Only the Best — compact summary */}
        <SectionTitle>Only the Best</SectionTitle>
        <SectionCard>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ fontFamily: FONTS.body, color: "#64748B" }}>
              Pick 1–3 per topic. Topics are optional.
            </Text>
            <TouchableOpacity
              onPress={() => setBestEditorOpen(true)}
              activeOpacity={0.9}
              style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: "#0EA5E9" }}
            >
              <Text style={{ fontFamily: FONTS.label, color: "white" }}>Edit</Text>
            </TouchableOpacity>
          </View>

          {(Object.keys(best) as BestTopic[])
            .filter((t) => (best[t]?.length ?? 0) > 0)
            .map((t) => (
              <View key={t} style={{ marginTop: 10 }}>
                <Text style={{ fontFamily: FONTS.section, fontSize: 16, color: "#0F172A", marginBottom: 6 }}>
                  {BEST_LABELS[t]}
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {best[t].map((val) => (
                    <View
                      key={val}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        backgroundColor: "#EEF6FF",
                        borderRadius: 999,
                        marginRight: 8,
                        marginBottom: 8,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "rgba(15,23,42,0.08)",
                      }}
                    >
                      <Text style={{ fontFamily: FONTS.label, color: "#0F172A" }}>{val}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

          {Object.values(best).every((arr) => (arr?.length ?? 0) === 0) && (
            <Text style={{ fontFamily: FONTS.body, color: "#0F172A" }}>
              Add a few favorites to show your vibe.
            </Text>
          )}
        </SectionCard>

        {/* Meetup ideas */}
        <SectionTitle>Meetup ideas</SectionTitle>
        <SectionCard>
          {profile.meetupIdeas.map((m, i) => (
            <View key={`${m.text}-${i}`} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}>
              <Ionicons name="location-outline" size={18} color="#FF5A00" />
              <Text style={[styles.bodyText, { marginLeft: 8 }]}>{m.text}</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>

      {/* Editor Modal (simple bottom sheet) */}
      {bestEditorOpen && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.28)", justifyContent: "flex-end" }]}>
          <View style={{ backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 22 }}>
            <View style={{ alignSelf: "center", width: 44, height: 5, borderRadius: 999, backgroundColor: "#E5E7EB", marginTop: 10 }} />

            {/* topic selector */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}>
              {(Object.keys(BEST_LABELS) as BestTopic[]).map((t) => {
                const active = t === topic;
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setTopic(t)}
                    style={{
                      paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
                      backgroundColor: active ? "#0EA5E9" : "rgba(15,23,42,0.06)",
                      marginRight: 8,
                    }}
                  >
                    <Text style={{ fontFamily: FONTS.label, color: active ? "white" : "#0F172A" }}>
                      {BEST_LABELS[t]} {selectedCount(t) ? `• ${selectedCount(t)}` : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* chips for current topic */}
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={{ fontFamily: FONTS.section, fontSize: 18, color: "#0F172A", marginBottom: 8 }}>
                {BEST_LABELS[topic]} <Text style={{ fontFamily: FONTS.label, color: "#64748B" }}>{scratch.length}/3</Text>
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {(BEST_OPTIONS[topic] ?? []).map((item) => {
                  const sel = scratch.includes(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => toggleScratch(item)}
                      activeOpacity={0.85}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 12,
                        paddingVertical: 9,
                        borderRadius: 999,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: sel ? "#0EA5E9" : "rgba(15,23,42,0.15)",
                        backgroundColor: sel ? "#0EA5E9" : "rgba(255,255,255,0.95)",
                        marginRight: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={{ fontFamily: FONTS.label, color: sel ? "white" : "#0F172A" }}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* actions */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 6 }}>
              <TouchableOpacity onPress={() => setBestEditorOpen(false)} style={{ padding: 12 }}>
                <Text style={{ fontFamily: FONTS.label, color: "#64748B" }}>Skip</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setScratch([])} style={{ padding: 12, marginRight: 4 }}>
                  <Text style={{ fontFamily: FONTS.label, color: "#64748B" }}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { saveTopic(); setBestEditorOpen(false); }}
                  style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, backgroundColor: "#0EA5E9" }}
                >
                  <Text style={{ fontFamily: FONTS.label, color: "white" }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
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
          shadowColor: "#0F172A",
          shadowOpacity: 0.05,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 10 },
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: "rgba(15,23,42,0.06)",
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
        fontFamily: FONTS.section,
        fontSize: 20,
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
  const COLW = (W - PAD * 2 - 16 * 2 - 12 * 2) / 3;
  return (
    <View style={{ alignItems: "center", width: COLW, maxWidth: COLW }}>
      <Ionicons name={icon} size={18} color="#0F172A" />
      <Text
        style={{
          fontFamily: FONTS.section,
          color: "#0F172A",
          marginTop: 6,
          textAlign: "center",
          lineHeight: 20,
        }}
        numberOfLines={2}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.label,
          color: "#64748B",
          marginTop: 2,
          textAlign: "center",
          lineHeight: 18,
        }}
        numberOfLines={1}
      >
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
      <Text style={{ fontFamily: FONTS.label, color: "#0F172A" }}>{text}</Text>
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
        shadowColor: "#0F172A",
        shadowOpacity: 0.05,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(15,23,42,0.06)",
      }}
    >
      <Text style={{ fontFamily: FONTS.label, color: "#64748B" }}>{q}</Text>
      <Text style={{ fontFamily: FONTS.body, color: "#0F172A", marginTop: 8, fontSize: 16 }}>
        {a}
      </Text>
    </View>
  );
}

function Chip({
  label,
  selected,
  onPress,
  icon,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: any;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.chip,
        selected && styles.chipSelected,
      ]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={16}
          color={selected ? "white" : "#0F172A"}
          style={{ marginRight: 6 }}
        />
      ) : null}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
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

  nameText: { fontFamily: FONTS.display, fontSize: 28, color: "#0F172A" },
  cityText: { fontFamily: FONTS.label, color: "#64748B", marginTop: 4 },
  bodyText: { fontFamily: FONTS.body, color: "#0F172A", lineHeight: 22, fontSize: 16 },

  // Chips
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(15,23,42,0.15)",
    backgroundColor: "rgba(255,255,255,0.9)",
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: "#0EA5E9",
    borderColor: "#0EA5E9",
  },
  chipText: {
    fontFamily: FONTS.label,
    color: "#0F172A",
  },
  chipTextSelected: {
    color: "white",
  },
});
