import { View } from "react-native";
import EmptyState from "../../components/EmptyState";
import HeaderLogo from "../../components/HeaderLogo";
import Screen from "../../components/Screen";

export default function Messages() {
  return (
    <Screen>
      <HeaderLogo />
      <View style={{ paddingHorizontal: 16 }}>
        <EmptyState title="No messages yet." cta="Start a chat" />
      </View>
    </Screen>
  );
}
