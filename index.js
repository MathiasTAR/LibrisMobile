const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // sua senha
  database: "biblioteca",
});

app.post("/login", (req, res) => {
  const { matricula, senha } = req.body;
  console.log("Recebido do app:", { matricula, senha });

  if (!matricula || !senha) {
    console.log("Dados incompletos recebidos");
    return res.status(400).json({ autenticado: false, mensagem: "Dados incompletos" });
  }

  const sql = "SELECT * FROM usuarios WHERE matricula = ? AND senha = ?";
  db.query(sql, [matricula, senha], (err, results) => {
    if (err) {
      console.log("Erro no banco de dados:", err);
      return res.status(500).json({ autenticado: false, mensagem: "Erro no servidor" });
    }

    console.log("Resultados da query:", results);

    if (results.length > 0) {
      console.log("Usuário autenticado");
      return res.status(200).json({ autenticado: true });
    } else {
      console.log("Usuário ou senha incorretos");
      return res.status(401).json({ autenticado: false, mensagem: "Login ou senha incorretos" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
