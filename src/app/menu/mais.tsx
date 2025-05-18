import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@components/cards/topcard';
import { LoanCard } from '@components/emprestimos';

export default function Mais() {
  // Dados de exemplo - idealmente esses dados viriam de uma API ou banco de dados
  const loans = [
    {
      id: 1,
      bookTitle: "1984 de George Orwell",
      loanDate: "16/05/2025",
      returnDate: "30/06/2025",
      fineAmount: null,
    },
    {
      id: 2,
      bookTitle: "Dom Casmurro de Machado de Assis",
      loanDate: "10/05/2025",
      returnDate: "24/06/2025",
      fineAmount: null,
    },
    {
      id: 3,
      bookTitle: "Matemática Basica",
      loanDate: "30/04/2025",
      returnDate: "14/05/2025",
      fineAmount: "R$ 53.00",
    },
  ];

  // Função para converter string "dd/mm/yyyy" em objeto Date
  function parseDate(dateStr: string) {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Data atual para comparação
  const today = new Date();

  // Filtra empréstimos ativos e atrasados
  const loansWithStatus = loans.map(loan => {
    const returnDate = parseDate(loan.returnDate);
    const isLate = today > returnDate;
    return {
      ...loan,
      status: isLate ? 'atrasado' : 'ativo',
    };
  });

  return (
    <View style={styles.container}>
      <Card />

      <View style={styles.personalInfoSection}>
        <Text style={styles.sectionTitle}>Informações pessoais</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>nome</Text>
          <Text style={styles.infoValue}>Ana Clara Santos Silva</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>email</Text>
          <Text style={styles.infoValue}>ana.silva@ifma.edu.br</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>telefone</Text>
          <Text style={styles.infoValue}>(98) 987654321</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>matrícula</Text>
          <Text style={styles.infoValue}>2023-001</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <ScrollView style={styles.loansScroll} contentContainerStyle={styles.loansContainer}>
        {/* Empréstimos Ativos */}
        <View style={styles.loanSection}>
          <Text style={styles.sectionTitle}>Seus Empréstimos Ativos</Text>
          {loansWithStatus.filter(loan => loan.status === 'ativo').map(loan => (
            <LoanCard
              key={loan.id}
              status="ativo"
              bookTitle={loan.bookTitle}
              loanDate={loan.loanDate}
              returnDate={loan.returnDate}
            />
          ))}
        </View>

        {/* Empréstimos Atrasados */}
        <View style={styles.loanSection}>
          <Text style={styles.sectionTitle}>Empréstimos Atrasados</Text>
          {loansWithStatus.filter(loan => loan.status === 'atrasado').map(loan => (
            <LoanCard
              key={loan.id}
              status="atrasado"
              bookTitle={loan.bookTitle}
              loanDate={loan.loanDate}
              returnDate={loan.returnDate}
              fineAmount={loan.fineAmount}
            />
          ))}
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
});
