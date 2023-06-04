const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const port = 3000;

const dbPath = path.join(__dirname, 'curriculo.db');
const db = new sqlite3.Database(dbPath);

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM Usuario';

  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar dados do currículo');
      return;
    }

    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao ler o arquivo HTML');
        return;
      }

      let html = data;
      if (rows && rows.length > 0) {
        console.log("entrou no if");
        for (let i = 0; i < rows.length; i++) {
          html = html.replace(`{nome${i}}`, rows[i].nome);
          html = html.replace(`{cargo${i}}`, rows[i].cargo);
          html = html.replace(`{endereco${i}}`, rows[i].endereco);
          html = html.replace(`{telefone${i}}`, rows[i].telefone);
          html = html.replace(`{email${i}}`, rows[i].email);
          html = html.replace(`{resumo${i}}`, rows[i].resumo);
        }
      } else {
        console.log(rows);
        html = html.replace('{curriculo}', 'Não há dados do currículo disponíveis.');
      }

      res.send(html);
    });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
