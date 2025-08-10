import { StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Welcome to Your App!</Text>
      <Text style={styles.subtitle}>
        Find people, make friends, or spark a connection.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6e3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center"
  },
});
