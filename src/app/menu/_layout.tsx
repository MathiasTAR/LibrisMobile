import { Tabs } from "expo-router";
import { IdentificationCard, Books, List } from "phosphor-react-native";

export default function navBar() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#d69456',
        tabBarStyle: { backgroundColor: '#f5f5f5', paddingTop: 10, },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="biblioteca"
        options={{
          title: "Biblioteca",
          tabBarIcon: ({ color, size }) => (
            <Books size={size} color={color} weight="duotone" />
          ),
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          title: "Usuário",
          tabBarIcon: ({ color, size }) => (
            <IdentificationCard size={size} color={color} weight="duotone" />
          ),
        }}
      />
      <Tabs.Screen
        name="mais"
        options={{
          title: "Mais",
          tabBarIcon: ({ color, size }) => (
            <List size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
