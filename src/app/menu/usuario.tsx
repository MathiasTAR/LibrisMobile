import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listarEmprestimosPorMatricula } from '../../services/api';
import { Card } from '@components/cards/topcard';
import { LoanCard } from '@components/emprestimos';

interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  matricula: string;
}

interface Emprestimo {
  id: number;
  bookTitle: string;
  loanDate: string;
  returnDate: string;
  fineAmount?: string | null;
  status?: 'ativo' | 'atrasado';
}

export default function Usuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await AsyncStorage.getItem('usuarioLogado');
        if (!dados) {
          Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
          return;
        }

        const usuarioSalvo: Usuario = JSON.parse(dados);
        setUsuario(usuarioSalvo);

        const dadosEmprestimos = await listarEmprestimosPorMatricula(usuarioSalvo.matricula);

        const emprestimosComStatus = dadosEmprestimos.map((e: Emprestimo) => {
          const hoje = new Date();
          const [d, m, a] = e.returnDate.split('/');
          const dataDevolucao = new Date(`${a}-${m}-${d}`);
          const status = hoje > dataDevolucao ? 'atrasado' : 'ativo';
          return { ...e, status };
        });

        setEmprestimos(emprestimosComStatus);
      } catch (error) {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    carregarDados();
  }, []);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 16 }}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card />

      {/* Informações pessoais */}
      <View style={styles.personalInfoSection}>
        <Text style={styles.sectionTitle}>Informações pessoais</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>nome</Text>
          <Text style={styles.infoValue}>{usuario.nome}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>email</Text>
          <Text style={styles.infoValue}>{usuario.email}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>telefone</Text>
          <Text style={styles.infoValue}>{usuario.telefone}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>matrícula</Text>
          <Text style={styles.infoValue}>{usuario.matricula}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Empréstimos */}
      <ScrollView style={styles.loansScroll} contentContainerStyle={styles.loansContainer}>
        {/* Empréstimos Ativos */}
        <View style={styles.loanSection}>
          <Text style={styles.sectionTitle}>Seus Empréstimos Ativos</Text>
          {emprestimos.filter(e => e.status === 'ativo').length === 0 ? (
            <Text style={styles.emptyText}>📚 Você não possui empréstimos ativos no momento.</Text>
          ) : (
            emprestimos
              .filter(e => e.status === 'ativo')
              .map((e) => (
                <LoanCard
                  key={e.id}
                  status="ativo"
                  bookTitle={e.bookTitle}
                  loanDate={e.loanDate}
                  returnDate={e.returnDate}
                />
              ))
          )}
        </View>

        {/* Empréstimos Atrasados */}
        <View style={styles.loanSection}>
          <Text style={styles.sectionTitle}>Empréstimos Atrasados</Text>
          {emprestimos.filter(e => e.status === 'atrasado').length === 0 ? (
            <Text style={styles.emptyText}>✅ Nenhum empréstimo atrasado encontrado.</Text>
          ) : (
            emprestimos
              .filter(e => e.status === 'atrasado')
              .map((e) => (
                <LoanCard
                  key={e.id}
                  status="atrasado"
                  bookTitle={e.bookTitle}
                  loanDate={e.loanDate}
                  returnDate={e.returnDate}
                  fineAmount={e.fineAmount}
                />
              ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  personalInfoSection: {
    padding: 16,
  },
  loansScroll: {
    flex: 1,
  },
  loansContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  loanSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3F3F46',
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#71717A',
    textTransform: 'lowercase',
  },
  infoValue: {
    fontSize: 16,
    color: '#3F3F46',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E7',
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#71717A',
    fontStyle: 'italic',
    marginBottom: 12,
  },
});
