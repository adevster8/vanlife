import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>This screen does not exist.</Text>
        <Link href="/(tabs)" style={{ fontSize: 16, color: "#0EA5E9", fontWeight: "700" }}>
          Go to home screen!
        </Link>
      </View>
    </>
  );
}
