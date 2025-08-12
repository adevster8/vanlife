// app/(tabs)/messages.tsx
import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BrandHeader from "../../components/ui/BrandHeader";

type Thread = {
  id: string;
  name: string;
  preview: string;
  time: string;          // e.g., "2m", "1h"
  avatar?: string;       // optional avatar url
  unread?: boolean;
};

const THREADS: Thread[] = [
  { id: "1", name: "Riley",  preview: "See you tomorrow!",      time: "2m", avatar: "https://i.pravatar.cc/120?img=5",  unread: true },
  { id: "2", name: "Jordan", preview: "Coffee after the run?",  time: "1h", avatar: "https://i.pravatar.cc/120?img=21" },
  { id: "3", name: "Sam",    preview: "Loved the cookout!",     time: "1d", avatar: "https://i.pravatar.cc/120?img=12" },
];

// fonts loaded in app/_layout.tsx
const FONTS = {
  title: "Poppins_700Bold",
  body: "Lato_400Regular",
  label: "Lato_500Medium",
};

const BG_APP = "#F7FAFF";
const TXT_PRIMARY = "#0F172A";
const SUBDUED = "#64748B";
const CARD_BORDER = "rgba(2,6,23,0.06)";

function Avatar({ name, uri }: { name: string; uri?: string }) {
  if (uri) {
    return <Image source={{ uri }} style={styles.avatar} />;
  }
  const letter = name?.[0]?.toUpperCase() ?? "?";
  return (
    <View style={[styles.avatar, styles.avatarFallback]}>
      <Text style={{ fontFamily: FONTS.label, color: "white" }}>{letter}</Text>
    </View>
  );
}

function ChatRow({ item, onPress }: { item: Thread; onPress?: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Avatar name={item.name} uri={item.avatar} />
      <View style={styles.rowMiddle}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.preview}>{item.preview}</Text>
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread ? <View style={styles.unreadDot} /> : null}
      </View>
    </Pressable>
  );
}

export default function Messages() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Top brand */}
      <View style={styles.headerWrap}>
        <BrandHeader />
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>{THREADS.length} conversations</Text>
      </View>

      <FlatList
        data={THREADS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <ChatRow item={item} onPress={() => console.log("open thread", item.id)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG_APP },

  headerWrap: {
    paddingHorizontal: 16,
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: CARD_BORDER,
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
  avatarFallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0EA5E9",
  },
  rowMiddle: { flex: 1 },
  name: {
    fontFamily: FONTS.title,
    fontSize: 16,
    color: TXT_PRIMARY,
  },
  preview: {
    fontFamily: FONTS.body,
    color: SUBDUED,
    marginTop: 2,
  },
  rowRight: { alignItems: "flex-end", justifyContent: "center", marginLeft: 8 },
  time: { fontFamily: FONTS.label, color: SUBDUED, fontSize: 12 },
  unreadDot: {
    marginTop: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0EA5E9",
  },
});
