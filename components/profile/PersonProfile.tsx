// components/profile/PersonProfile.tsx
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    Text,
    View,
    ViewToken
} from "react-native";
import Animated, {
    Extrapolation,
    FadeIn,
    FadeInDown,
    FadeInUp,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const { width: W } = Dimensions.get("window");
const PAD = 16;
export const HERO_H = Math.min(520, Math.round(W * 1.15)); // keep in sync with Discover

export type Person = {
  name: string;
  age: number;
  handle?: string;
  city?: string;
  countryFlag?: string;
  avatar: string;
  verified?: boolean;
  rating?: number | string;
  meetupsHosted?: number;
  photos: string[];
  about?: string;
  interests?: string[];
  prompts?: { q: string; a: string }[];
  meetupIdeas?: { icon?: string; text: string }[];
};

export default function PersonProfile({
  person,
  showActions = true,
  onLike,
  onMessage,
  onPlanMeetup,
}: {
  person: Person;
  showActions?: boolean;
  onLike?: () => void;
  onMessage?: () => void;
  onPlanMeetup?: () => void;
}) {
  const photos = useMemo(
    () => (person.photos?.length ? person.photos : [person.avatar]),
    [person.photos, person.avatar]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F7FAFF" }}>
      {/* Hero photo carousel (swipe only, no arrows) */}
      <PhotoCarousel photos={photos} />

      {/* Identity */}
      <Animated.View
        entering={FadeInDown.duration(300).springify()}
        style={{ alignItems: "center", paddingTop: 12, paddingHorizontal: PAD }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 26, fontWeight: "900", color: "#0F172A" }}>
            {person.name} {person.age}
          </Text>
          {person.verified && (
            <Ionicons
              name="shield-checkmark"
              size={18}
              color="#0EA5E9"
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
        {(person.city || person.countryFlag) && (
          <Text style={{ color: "#64748B", marginTop: 4 }}>
            {person.city ?? ""} {person.countryFlag ?? ""}
          </Text>
        )}
      </Animated.View>

      {/* Actions (for other people) */}
      {showActions && (
        <Animated.View
          entering={FadeInUp.delay(80).duration(300)}
          style={{
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: PAD,
            paddingTop: 12,
          }}
        >
          <PrimaryButton
            icon="chatbubbles"
            label="Message"
            color="#0EA5E9"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onMessage?.();
            }}
          />
          <PrimaryButton
            icon="calendar"
            label="Make Plans"
            color="#FF7A3E"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onPlanMeetup?.();
            }}
          />
          <IconOnlyButton
            icon="heart"
            color="#0EA5E9"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onLike?.();
            }}
          />
        </Animated.View>
      )}

      {/* About (glass card) */}
      {person.about ? (
        <GlassCard title="About">
          <Text style={{ color: "#0F172A", lineHeight: 22 }}>{person.about}</Text>
        </GlassCard>
      ) : null}

      {/* Get to Know Me */}
      {person.prompts?.length ? (
        <Animated.View entering={FadeInUp.delay(40)} style={{ marginTop: 16 }}>
          <SectionTitle>Get to Know Me</SectionTitle>
          <FlatList
            data={person.prompts}
            keyExtractor={(p, i) => `p-${i}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: PAD, paddingVertical: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInUp.delay(60 + index * 40)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: 16,
                  padding: 14,
                  width: W * 0.72,
                  shadowColor: "#000",
                  shadowOpacity: 0.06,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                }}
              >
                <Text style={{ color: "#64748B", fontWeight: "800" }}>{item.q}</Text>
                <Text style={{ color: "#0F172A", marginTop: 8, fontSize: 16 }}>{item.a}</Text>
              </Animated.View>
            )}
          />
        </Animated.View>
      ) : null}

      {/* Interests (glass chips) */}
      {person.interests?.length ? (
        <>
          <SectionTitle>Interests</SectionTitle>
          <GlassCard noPadding>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 12,
              }}
            >
              {person.interests.map((t, i) => (
                <Pill key={t} text={t} delay={i * 30} />
              ))}
            </View>
          </GlassCard>
        </>
      ) : null}

      {/* Meetup ideas */}
      {person.meetupIdeas?.length ? (
        <>
          <SectionTitle>Meetup ideas</SectionTitle>
          <GlassCard>
            {person.meetupIdeas.map((m, i) => (
              <Animated.View
                key={`${m.text}-${i}`}
                entering={FadeInUp.delay(50 + i * 40)}
                style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}
              >
                <Ionicons name="location-outline" size={18} color="#FF7A3E" />
                <Text style={{ marginLeft: 8, color: "#0F172A" }}>{m.text}</Text>
              </Animated.View>
            ))}
          </GlassCard>
        </>
      ) : null}
    </View>
  );
}

/* ---------------- Photo Carousel (animated dots, no parallax) ---------------- */

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useRef<FlatList<string>>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems?.length) setIdx(viewableItems[0].index ?? 0);
    }
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View style={{ width: W, height: HERO_H, backgroundColor: "#E5E7EB" }}>
      <Animated.FlatList
        ref={ref}
        data={photos}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri, i) => `${i}-${uri}`}
        renderItem={({ item }) => (
          <Animated.Image
            source={{ uri: item }}
            style={{ width: W, height: HERO_H, resizeMode: "cover" }}
            entering={FadeIn.duration(220)}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}
      />

      {/* readability gradients */}
      <LinearGradient
        colors={["rgba(0,0,0,0.25)", "transparent"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: 90 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.28)"]}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120 }}
      />

      {/* photo dots */}
      {photos.length > 1 && (
        <View
          style={{
            position: "absolute",
            bottom: 14,
            alignSelf: "center",
            flexDirection: "row",
            gap: 6,
          }}
        >
          {photos.map((_, i) => (
            <Dot key={i} index={i} scrollX={scrollX} />
          ))}
        </View>
      )}
    </View>
  );
}

/** Dot = separate component (uses hook safely) */
function Dot({
  index,
  scrollX,
}: {
  index: number;
  scrollX: Animated.SharedValue<number>;
}) {
  const dotStyle = useAnimatedStyle(() => {
    const activeWidth = interpolate(
      scrollX.value,
      [(index - 1) * W, index * W, (index + 1) * W],
      [8, 18, 8],
      Extrapolation.CLAMP
    );
    return { width: activeWidth };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.9)",
          marginHorizontal: 2,
        },
        dotStyle,
      ]}
    />
  );
}

/* ---------------- UI atoms ---------------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Animated.Text
      entering={FadeInDown.duration(260)}
      style={{
        fontSize: 18,
        fontWeight: "900",
        color: "#0F172A",
        marginLeft: PAD,
        marginTop: 16,
        marginBottom: 8,
      }}
    >
      {children}
    </Animated.Text>
  );
}

function GlassCard({
  children,
  title,
  noPadding,
}: {
  children: React.ReactNode;
  title?: string;
  noPadding?: boolean;
}) {
  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify()}
      style={{
        marginHorizontal: PAD,
        marginTop: 12,
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <BlurView intensity={22} tint="light" style={{ padding: noPadding ? 0 : 16 }}>
        {title ? (
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#0F172A", marginBottom: 8 }}>
            {title}
          </Text>
        ) : null}
        {children}
      </BlurView>
      <View
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: "rgba(14,165,233,0.18)",
        }}
      />
    </Animated.View>
  );
}

function PrimaryButton({
  icon,
  label,
  color,
  onPress,
}: {
  icon: any;
  label: string;
  color: string;
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.97))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      style={{
        flexGrow: 1,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: color,
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 14,
            flexDirection: "row",
            alignItems: "center",
          },
          aStyle,
        ]}
      >
        <Ionicons name={icon} size={18} color="#fff" />
        <Text style={{ color: "white", fontWeight: "800", marginLeft: 8 }}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

function IconOnlyButton({
  icon,
  color,
  onPress,
}: {
  icon: any;
  color: string;
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: "#E6F6FF",
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 14,
          },
          aStyle,
        ]}
      >
        <Ionicons name={icon} size={20} color={color} />
      </Animated.View>
    </Pressable>
  );
}

function Pill({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(240)}>
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
    </Animated.View>
  );
}
