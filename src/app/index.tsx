import { View, StyleSheet, Alert, Image, ImageBackground } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Button } from "@components/button";
import { Input } from "@components/input";

export default function Index() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  async function handleNext() {
    if (!matricula || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
      router.navigate("../menu")
  }

  return (
    <ImageBackground
      source={require("@assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("@assets/images/libris2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Input
            onChangeText={setMatricula}
            value={matricula}
            placeholder="Digite seu login"
          />
          <Input
            onChangeText={setSenha}
            value={senha}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />
          <Button title="Entrar" onPress={handleNext} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  background: { flex: 1 },
  card: {
    backgroundColor: "rgb(248, 244, 240)",
    padding: 32,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    width: 200,
    height: 80
  },
});
