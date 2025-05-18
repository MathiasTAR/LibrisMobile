import { View, StyleSheet, Alert, Image, ImageBackground, StatusBar, Platform } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Button } from "@components/button";
import { Input } from "@components/input";

import { fetchLogin } from '../services/api';

interface Login {
  matricula: string;
  senha: string;
}

export default function Index() {

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const result = await fetchLogin(matricula, senha);
      Alert.alert('Login realizado', `Bem-vindo, ${result.usuario.nome}`);
      router.navigate('../Menu'); // redireciona para o Menu principal
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  // Safe way to get status bar height
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
              placeholder="Digite seu login"
            />
            <Input
              onChangeText={setSenha}
              value={senha}
              placeholder="Digite sua senha"
              secureTextEntry={true}
            />
            <Button title="Entrar" onPress={handleLogin} />
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