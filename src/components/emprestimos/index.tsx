import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface LoanCardProps {
  status: 'ativo' | 'atrasado';
  bookTitle: string;
  loanDate: string;
  returnDate: string;
  fineAmount?: string;
}

export const LoanCard: React.FC<LoanCardProps> = ({
  status,
  bookTitle,
  loanDate,
  returnDate,
  fineAmount,
}) => {
  const isLate = status === 'atrasado';
  const statusColor = isLate ? '#dc2626' : '#0fc03b';
  const statusTitle = isLate ? 'Empréstimo atrasado' : 'Empréstimo ativo';

  return (
    <View style={[styles.container, { borderLeftColor: statusColor }]}>
      <Text style={[styles.header, { color: statusColor }]}>{statusTitle}</Text>

      <Text style={styles.bookTitle}>{bookTitle}</Text>

      <View style={styles.dateContainer}>
        <View style={styles.dateColumn}>
          <Text style={styles.dateLabel}>Empréstimo:</Text>
          <Text style={styles.dateValue}>{loanDate}</Text>
        </View>
        <View style={styles.dateColumn}>
          <Text style={styles.dateLabel}>Devolução:</Text>
          <Text style={styles.dateValue}>{returnDate}</Text>
        </View>
      </View>

      {isLate && fineAmount && (
        <Text style={[styles.fineText, { color: statusColor }]}>
          Multa: {fineAmount}
        </Text>
      )}
    </View>
  );
};
