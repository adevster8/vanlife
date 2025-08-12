// app/(tabs)/discover.tsx
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PersonProfile, { Person } from "../../components/profile/PersonProfile";
import EdgeArrows from "../../components/ui/EdgeArrows";


// ---- mock people for now ----
const PEOPLE: Person[] = [
  {
    name: "Sam", age: 27, city: "Austin", countryFlag: "🇺🇸",
    avatar: "https://i.pravatar.cc/200?img=12",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
    ],
    about: "Weekend hikes, coffee after. Dog dad.",
    interests: ["trail runs", "dogs", "coffee", "photography"],
    prompts: [
      { q: "Perfect Saturday?", a: "Sunrise jog, farmer’s market, iced latte." },
      { q: "Unpopular opinion", a: "Running in light rain is elite." },
    ],
    meetupIdeas: [{ text: "Greenbelt jog" }, { text: "Dog park + picnic" }],
  },
  {
    name: "Riley", age: 29, city: "Denver", countryFlag: "🇺🇸",
    avatar: "https://i.pravatar.cc/200?img=5",
    verified: false,
    photos: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200",
    ],
    about: "Climbing and campfires. Always down for hot springs.",
    interests: ["climbing", "campfires", "board games"],
    prompts: [{ q: "Green flag I look for", a: "Suggests a plan." }],
    meetupIdeas: [{ text: "Bouldering session" }],
  },
  {
    name: "Alex", age: 26, city: "Seattle", countryFlag: "🇺🇸",
    avatar: "https://i.pravatar.cc/200?img=15",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
    ],
    about: "Sunrise hikes and board games. Cold plunge enthusiast.",
    interests: ["sunrise hikes", "board games", "coffee"],
    prompts: [{ q: "Go-to meetup idea", a: "Lake loop + breakfast tacos." }],
    meetupIdeas: [{ text: "Discovery Park walk" }],
  },
];

export default function Discover() {
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(PEOPLE.length - 1, i + 1));
  const atStart = index === 0;
  const atEnd = index === PEOPLE.length - 1;

  // Sit the arrows visually “flush” to the tab bar curve, but not behind it.
  const bottomOffset = Math.max(8, tabBarHeight + insets.bottom - 6);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7FAFF" }}>
      {/* One person per screen */}
      <ScrollView contentContainerStyle={{ paddingBottom: bottomOffset + 12 }}>
        <PersonProfile
          person={PEOPLE[index]}
          showActions
          onLike={() => console.log("like", PEOPLE[index].name)}
          onMessage={() => console.log("message", PEOPLE[index].name)}
          onPlanMeetup={() => console.log("plans", PEOPLE[index].name)}
        />
      </ScrollView>

      {/* Floating circular arrows, screen-level (never clipped by cards) */}
      <EdgeArrows side="left" onPress={prev} disabled={atStart} bottom={bottomOffset} />
      <EdgeArrows side="right" onPress={next} disabled={atEnd} bottom={bottomOffset} />
    </SafeAreaView>
  );
}
