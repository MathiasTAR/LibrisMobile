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

app.get('/emprestimos/:matricula', (req, res) => {
  const { matricula } = req.params;

  const query = `
    SELECT
      id AS id,
      livro AS bookTitle,
      DATE_FORMAT(dataEmprestimo, '%d/%m/%Y') AS loanDate,
      DATE_FORMAT(dataEmprestimo, '%d/%m/%Y') AS returnDate,
      IF(multa > 0, CONCAT('R$ ', FORMAT(e.multa, 2, 'pt_BR')), NULL) AS fineAmount
    FROM emprestimos e
    WHERE matricula = ?
    ORDER BY dataEmprestimo DESC
  `;

  db.query(query, [matricula], (err, results) => {
    if (err) {
      console.error('Erro ao buscar empréstimos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar empréstimos' });
    }
    res.json(results);
  });
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});