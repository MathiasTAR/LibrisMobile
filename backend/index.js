const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'biblioteca'
});

// Rota para buscar livros
app.get('/livros', (req, res) => {
  db.query('SELECT id_livro, autor, disponibilidade, titulo FROM livros', (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
});

// Login - Versão corrigida
app.post('/login', (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Matrícula e senha são obrigatórias' });
  }

  const query = 'SELECT * FROM usuarios WHERE matricula = ? AND senha = ?';
  db.query(query, [matricula, senha], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor' });
    }

    if (results.length > 0) {
      const usuario = results[0];
      res.json({ sucesso: true, usuario });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});