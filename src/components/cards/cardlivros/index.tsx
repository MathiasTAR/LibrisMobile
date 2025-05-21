import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { Book } from 'phosphor-react-native';

type BookCardProps = {
  title: string;
  autor: string;
  status: 'Disponível' | 'Indisponível';
  id: string;
};

export const BookCard = ({ title, status, id, autor }: BookCardProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    Alert.alert(
      '📚 Detalhes do Livro',
      `Título: ${title}\nAutor: ${autor}\nStatus: ${status}\nID: ${id}`,
      [
        { text: 'OK', onPress: () => {} }
      ],
      { cancelable: true }
    );
  };

  const statusStyle = status === 'Disponível' ? styles.available : styles.unavailable;

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.headerRow}>
        <Book size={24} weight="duotone" color="#c47f17" style={styles.icon} />
        <Text style={styles.title}>{title}. {autor}</Text>
      </View>
      <View style={styles.footerRow}>
        <View style={statusStyle}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
    </TouchableOpacity>
  );
};
