import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>This screen does not exist.</Text>
        <Link href="/(tabs)/discover" style={{ fontSize: 16, color: "#0EA5E9", fontWeight: "800" }}>
          Go to Discover
        </Link>
      </View>
    </>
  );
}
