const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database("C:/Users/Inteli/Documents/testeServidor/curriculo.sql", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Conectado ao banco de dados SQLite.');
});

app.get('/experiencias', (req, res) => {
    const sql = 'SELECT * FROM Experiencia';
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Erro interno do servidor.');
        return;
      }
  
      res.json(rows);
    });
  });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
