import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

export const SearchBar = ({ value, onChangeText, onSearch }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escreva aqui..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={onSearch}>
        <Feather name="search" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );
};
