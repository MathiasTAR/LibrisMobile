import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { listarLivros } from '../../services/api';
import { BookCard } from '@components/cards/cardlivros';
import {SearchBar} from '@components/barrapesquisa';
import {Card} from '@components/cards/topcard';

interface Livro {
  id: string;
  id_livro: string;
  titulo: string;
  autor: string;
  disponibilidade: 'Disponível' | 'Indisponível';
}

export default function biblioteca() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [query, setQuery] = useState('');
  const [todosLivros, setTodosLivros] = useState<Livro[]>([]);

  useEffect(() => {
    const carregarLivros = async () => {
      const data = await listarLivros();
      setLivros(data);
      setTodosLivros(data);
    };
    carregarLivros();
  }, []);

  const handleSearch = () => {
    const filtrados = todosLivros.filter((livro) =>
      livro.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setLivros(filtrados);
  };

  return (
    <View>
      <Card />
      <SearchBar value={query} onChangeText={setQuery} onSearch={handleSearch} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.containerScroll}>
        {livros.map((livro) => (
          <BookCard key={livro.id} title={livro.titulo} autor={livro.autor} status={livro.disponibilidade} id={livro.id_livro} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { marginTop: 12 },
  containerScroll: { paddingBottom: 80 },
});
