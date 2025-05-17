import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#f4a261',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    // sombra
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  // cabeçalho: ícone + título
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },

  // rodapé: status + ID
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  available: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  unavailable: {
    backgroundColor: '#f44336',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  id: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});
