import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@components/cards/topcard';

export default function Configuracoes() {
  const navigation = useNavigation<any>();
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);

  const handleLogout = async () => {
    Alert.alert('Sair', 'Deseja realmente sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('usuarioLogado');
          navigation.reset({
            index: 0,
            routes: [{ name: 'index' }],
          });
        },
      },
    ]);
  };

  const alternarTema = () => {
    setTemaEscuro((prev) => !prev);
    // Aqui você pode salvar em AsyncStorage ou context, se quiser usar globalmente
  };

  const alternarNotificacoes = () => {
    setNotificacoes((prev) => !prev);
    // Pode salvar isso se quiser aplicar logicamente
  };

  return (
    <View style={styles.container}>
      <Card></Card>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.switchRow}>
        <Feather name="moon" size={20} color="#3F3F46" />
        <Text style={styles.switchLabel}>Tema Escuro</Text>
        <Switch value={temaEscuro} onValueChange={alternarTema} />
      </View>

      <View style={styles.switchRow}>
        <Feather name="bell" size={20} color="#3F3F46" />
        <Text style={styles.switchLabel}>Notificações</Text>
        <Switch value={notificacoes} onValueChange={alternarNotificacoes} />
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Feather name="log-out" size={16} color="#fff" />
        <Text style={styles.botaoSairTexto}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FAFAFA',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#3F3F46',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  switchLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#3F3F46',
  },
  botaoSair: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
  },
  botaoSairTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
