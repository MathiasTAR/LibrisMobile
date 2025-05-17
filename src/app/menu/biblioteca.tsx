import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '@components/barrapesquisa';
import { BookCard } from '@components/cards/cardlivros';
import { Card } from "@components/cards/topcard";

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Buscar por:', query);
    // Adicione lógica de filtragem aqui
  };

  return (
    <View style={styles.container}>
      <Card />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
      />
      <ScrollView style={styles.loansScroll} contentContainerStyle={styles.loansContainer}>
        <BookCard
          title="História da Arte de Gombrich"
          status="Disponível"
          id="ART001"
        />
        <BookCard
          title="Botânica de Raven Evert"
          status="Indisponível"
          id="BIO004"
        />
        <BookCard
          title="Fisiologia de Guyton "
          status="Indisponível"
          id="BIO005"
        />
        <BookCard
          title="Biomecânica do Esporte de James Watkins"
          status="Disponível"
          id="EF004"
        />
        <BookCard
          title="Psicologia do Esporte de Samulski"
          status="Disponível"
          id="EF006"
        />
        <BookCard
          title="História da Filosofia de Giovanni Reale"
          status="Disponível"
          id="FIL001"
        />
        <BookCard
          title="Sócrates de Platão"
          status="Indisponível"
          id="FIL003"
        />
        <BookCard
          title="Fundamentos de Física Vol. 1 de David Halliday"
          status="Indisponível"
          id="FIS002"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loansScroll: {
    flex: 1,
  },
  loansContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});