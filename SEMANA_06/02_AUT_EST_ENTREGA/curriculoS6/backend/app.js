const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static('frontend'));
app.use(express.static('frontend\style.css', { 'extensions': ['css'] }));


//Exibe o página contida em "index.html"
app.get('/', (req, res) => {
    const indexPath = path.resolve('frontend/index.html')
    res.sendFile(indexPath)
})

//Exibe o conteúdo do arquivo "mensagem.txt"
app.get('/mensagem', (req, res) => {
    const indexPath = path.resolve('backend/mensagem.txt')
    res.sendFile(indexPath)
})

//Inicia o servidor na porta pré-definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
