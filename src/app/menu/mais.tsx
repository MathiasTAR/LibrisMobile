import { View, Text } from "react-native";
import { Card } from "@components/cards/topcard";

export default function Mais() {
  return (
    <View style={{ flex: 1 }}>
      <Card></Card>
      <View style={{ padding: 16 }}>
        <Text>Configurações</Text>
      </View>
    </View>
  );
}
