import { View, StyleSheet, Alert, Image, ImageBackground, StatusBar, Platform } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Button } from "@components/button";
import { Input } from "@components/input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUsuario } from "../services/api"; // Importar a função de login


export default function Index() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  async function handleNext() {
    if (!matricula || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const result = await loginUsuario(matricula, senha);
      
      if (result.sucesso) {
        // SALVA o usuário no AsyncStorage
        await AsyncStorage.setItem("usuarioLogado", JSON.stringify(result.usuario));

        router.navigate("../menu"); // ou a tela principal
      } else {
        Alert.alert("Erro", result.mensagem || "Credenciais inválidas");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha na conexão");
    }
  }

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      
      <ImageBackground
        source={require("@assets/images/background.jpg")}
        style={[styles.background, { marginTop: -statusBarHeight }]}
        resizeMode="cover"
      >
        <View style={[styles.container, { paddingTop: statusBarHeight }]}>
          <View style={styles.card}>
            <Image
              source={require("@assets/images/libris2.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Input
              onChangeText={setMatricula}
              value={matricula}
              placeholder="Digite sua matrícula"
              keyboardType="numeric" // Adicionado teclado numérico
            />
            <Input
              onChangeText={setSenha}
              value={senha}
              placeholder="Digite sua senha"
              secureTextEntry={true}
            />
            <Button 
              title="Entrar" 
              onPress={handleNext}
            />
          </View>
        </View>
      </ImageBackground>
    </>
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
  background: { 
    flex: 1,
  },
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