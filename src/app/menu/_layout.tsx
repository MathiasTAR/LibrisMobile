import { Tabs } from "expo-router";
import { IdentificationCard, Books, List } from "phosphor-react-native";
import { Platform } from 'react-native';

export default function NavBar() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#d69456',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { 
          backgroundColor: '#ffffff',
          height: Platform.OS === 'android' ? 70 : 80,
          paddingTop: Platform.OS === 'android' ? 10 : 10,
          paddingBottom: Platform.OS === 'android' ? 10 : 5,
          borderTopWidth: 0,
          elevation: 0, // sombra no Android
          shadowRadius: 5,
          shadowOffset: { width: 0, height: -3 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === 'android' ? 5 : 0,
        },
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
            <List size={size} color={color} weight="duotone" />
          ),
        }}
      />
    </Tabs>
  );
}