import React, { useState } from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Card } from '@components/cards/topcard';
import { Feather } from '@expo/vector-icons';

export default function Mais() {
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

  return (
    <View style={styles.container}>
      <Card />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        <View style={styles.settingItem}>
          <Feather name="moon" size={20} color="#3F3F46" />
          <Text style={styles.settingLabel}>Tema Escuro</Text>
          <Switch value={temaEscuro} onValueChange={() => setTemaEscuro(prev => !prev)} />
        </View>

        <View style={styles.settingItem}>
          <Feather name="bell" size={20} color="#3F3F46" />
          <Text style={styles.settingLabel}>Notificações</Text>
          <Switch value={notificacoes} onValueChange={() => setNotificacoes(prev => !prev)} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={16} color="#fff" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F3F46',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  settingLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#3F3F46',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
