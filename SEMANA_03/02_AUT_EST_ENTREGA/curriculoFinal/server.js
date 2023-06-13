const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const DBPATH = 'curriculo.db';
const db = new sqlite3.Database(DBPATH);
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/usuarios', (req, res) => {
    const query = 'SELECT Nome, Cargo, Endereco, Telefone, Email FROM USUARIO';
    db.all(query, [], (err, rows) => {
        if (err) {
            throw err;
        }
        
        res.json(rows);
    });
});

app.post('/usuarios', (req, res) => {
    const { Nome, Cargo, Endereco, Telefone, Email } = req.body;
    const query = 'INSERT INTO USUARIO (Nome, Cargo, Endereco, Telefone, Email) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [Nome, Cargo, Endereco, Telefone, Email], function(err) {
        if (err) {
            throw err;
        }
        const usuarioId = this.lastID;
        res.json({ id: usuarioId });
    });
});

app.delete('/usuarios/:email', (req, res) => {
    const email = req.params.email;
    const query = 'DELETE FROM USUARIO WHERE Email = ?';
    db.run(query, [email], function(err) {
        if (err) {
            throw err;
        }
        res.json({ email: email });
    });
});


app.get('/usuarios/:email', (req, res) => {
    const email = req.params.email;
    const query = 'SELECT Nome, Cargo, Endereco, Telefone, Email FROM USUARIO WHERE Email = ?';
    db.get(query, [email], (err, row) => {
        if (err) {
            throw err;
        }
        res.json(row);
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
