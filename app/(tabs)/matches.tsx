// app/(tabs)/matches.tsx
import React from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BrandHeader from "../../components/ui/BrandHeader";

type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  avatar: string;
};

const MATCHES: Match[] = [
  { id: "m1", name: "Ella", age: 26, city: "Denver",  avatar: "https://i.pravatar.cc/140?img=5"  },
  { id: "m2", name: "Mia",  age: 28, city: "Seattle", avatar: "https://i.pravatar.cc/140?img=21" },
  { id: "m3", name: "Zoe",  age: 29, city: "Austin",  avatar: "https://i.pravatar.cc/140?img=36" },
  { id: "m4", name: "Ava",  age: 27, city: "Portland",avatar: "https://i.pravatar.cc/140?img=18" },
  { id: "m5", name: "Lia",  age: 25, city: "Nashville",avatar:"https://i.pravatar.cc/140?img=7"  },
  { id: "m6", name: "Nora", age: 30, city: "Chicago", avatar: "https://i.pravatar.cc/140?img=47" },
];

const COL = 2;
const GAP = 12;
const H_PADDING = 16;
const SCREEN_W = Dimensions.get("window").width;
const CARD_W = (SCREEN_W - H_PADDING * 2 - GAP) / COL;

const BG_APP = "#F7FAFF";
const TXT_PRIMARY = "#0F172A";
const SUBDUED = "#64748B";
const CARD_BG = "#FFFFFF";
const CARD_BORDER = "rgba(2,6,23,0.06)";

// font families loaded in app/_layout.tsx
const FONTS = {
  title: "Poppins_700Bold",
  label: "Lato_500Medium",
  body: "Lato_400Regular",
};

function MatchCard({ m, onPress }: { m: Match; onPress?: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: m.avatar }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.name}>
          {m.name}, {m.age}
        </Text>
        <Text style={styles.city}>{m.city}</Text>
      </View>
    </Pressable>
  );
}

export default function Matches() {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <BrandHeader />
            <Text style={styles.title}>Matches</Text>
            <Text style={styles.subtitle}>{MATCHES.length} total matches</Text>
          </View>
        }
        data={MATCHES}
        keyExtractor={(i) => i.id}
        numColumns={COL}
        columnWrapperStyle={{ gap: GAP, paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        renderItem={({ item }) => (
          <MatchCard m={item} onPress={() => console.log("open match", item.id)} />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG_APP,
  },
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
    color: SUBDUED,
    marginTop: 4,
  },
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
  cardImage: {
    width: "100%",
    height: CARD_W * 1.05,
  },
  cardBody: {
    padding: 10,
  },
  name: {
    fontFamily: FONTS.title,
    fontSize: 16,
    color: TXT_PRIMARY,
  },
  city: {
    fontFamily: FONTS.label,
    color: SUBDUED,
    marginTop: 2,
  },
});
