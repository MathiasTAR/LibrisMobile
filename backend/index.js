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

// Rota de login
app.post('/login', (req, res) => {
  const { matricula, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE matricula = ? AND senha = ?';
  db.query(sql, [matricula, senha], (err, results) => {
    if (err) return res.status(500).json({ erro: err });

    if (results.length > 0) {
      res.json({ sucesso: true, usuario: results[0] });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'Matrícula ou senha inválida' });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
