import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.18.26:3000" // 🔁 Troque pelo seu IP local se mudar
});

// 🔍 Buscar todos os livros
export const listarLivros = async () => {
  try {
    const response = await api.get('/livros');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

// 🔐 Login do usuário
export const loginUsuario = async (matricula: string, senha: string) => {
  try {
    const response = await api.post('/login', { matricula, senha });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensagem || 'Erro no login');
  }
};

// 📚 Buscar empréstimos de um usuário pelo número de matrícula
export const listarEmprestimosPorMatricula = async (matricula: string) => {
  try {
    const response = await api.get(`/emprestimos/${matricula}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar empréstimos:', error);
    throw error;
  }
};
