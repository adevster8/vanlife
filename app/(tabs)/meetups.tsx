import { View } from "react-native";
import HeaderLogo from "../../components/HeaderLogo";
import ListItem from "../../components/ListItem";
import Screen from "../../components/Screen";

const data = [
  { id: "1", title: "Sunset Cookout • Big Sur", subtitle: "Today • 6:30 PM" },
  { id: "2", title: "Beach Yoga • San Onofre", subtitle: "Tomorrow • 9:00 AM" },
];

export default function Meetups() {
  return (
    <Screen>
      <HeaderLogo />
      <View style={{ paddingHorizontal: 16 }}>
        {data.map((m) => (
          <ListItem key={m.id} title={m.title} subtitle={m.subtitle} />
        ))}
      </View>
    </Screen>
  );
}
