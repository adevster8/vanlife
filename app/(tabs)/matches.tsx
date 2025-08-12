import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
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
  { id: "m1", name: "Ella", age: 26, city: "Denver", avatar: "https://i.pravatar.cc/140?img=5" },
  { id: "m2", name: "Mia", age: 28, city: "Seattle", avatar: "https://i.pravatar.cc/140?img=21" },
  { id: "m3", name: "Zoe", age: 29, city: "Austin", avatar: "https://i.pravatar.cc/140?img=36" },
];

const COL = 2;
const GAP = 12;
const H_PADDING = 16;
const SCREEN_W = Dimensions.get("window").width;
const CARD_W = (SCREEN_W - H_PADDING * 2 - GAP) / COL;

const BG_APP = "#F7FAFF";
const TXT_PRIMARY = "#0F172A";
const CARD_BG = "#FFFFFF";
const CARD_BORDER = "rgba(2,6,23,0.06)";

function MatchCard({ m }: { m: Match }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: m.avatar }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.name}>
          {m.name}, {m.age}
        </Text>
        <Text style={styles.city}>{m.city}</Text>
      </View>
    </View>
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
        renderItem={({ item }) => <MatchCard m={item} />}
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
    fontSize: 28,
    fontWeight: "800",
    color: TXT_PRIMARY,
  },
  subtitle: {
    color: "#64748B",
    marginTop: 4,
    fontWeight: "600",
  },
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
  cardImage: {
    width: "100%",
    height: CARD_W * 1.05,
  },
  cardBody: {
    padding: 10,
  },
  name: {
    fontWeight: "800",
    fontSize: 16,
    color: TXT_PRIMARY,
  },
  city: {
    color: "#64748B",
    marginTop: 2,
    fontWeight: "600",
  },
});
