import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.18.26:3000" // troque o 192.168.18.26 por seu ip.
});

export const listarLivros = async () => {
  try {
    const response = await api.get('/livros');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const loginUsuario = async (matricula: string, senha: string) => {
  try {
    const response = await api.post('/login', { matricula, senha });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensagem || 'Erro no login');
  }
};
