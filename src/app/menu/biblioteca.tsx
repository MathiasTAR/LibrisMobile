import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { listarLivros } from '../../services/api';
import { BookCard } from '@components/cards/cardlivros';
import { SearchBar } from '@components/barrapesquisa';
import { Card } from '@components/cards/topcard';

interface Livro {
  id: string;
  id_livro: string;
  titulo: string;
  autor: string;
  disponibilidade: 'Disponível' | 'Indisponível';
}

export default function Biblioteca() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [query, setQuery] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const data = await listarLivros();
        setLivros(data);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarLivros();
  }, []);

  // Filtro em tempo real
  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Card />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={() => {}}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#c47f17" style={{ marginTop: 20 }} />
      ) : livrosFiltrados.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum livro encontrado.</Text>
      ) : (
        <FlatList
          data={livrosFiltrados}
          keyExtractor={(item) => item.id_livro}
          renderItem={({ item }) => (
            <BookCard
              title={item.titulo}
              autor={item.autor}
              status={item.disponibilidade}
              id={item.id_livro}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  listContainer: {
    paddingHorizontal: 2,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#71717A',
    fontStyle: 'italic',
  },
});
