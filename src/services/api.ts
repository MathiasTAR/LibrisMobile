import axios from 'axios';

const api = axios.create({
  baseURL: "http:/192.168.18.26:3000" // troque o 192.168.18.26 por seu ip.
});


export const fetchLivros = async () => {
  try {
    const response = await api.get('/livros');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const fetchLogin = async () => {
  try {
    const response = await api.get('/login');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar usuarios:', error);
    throw error;
  }
};