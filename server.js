// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let instruments = []; // Simulação de banco de dados

// Obter todos os instrumentos
app.get('/api/instruments', (req, res) => {
    res.json(instruments);
});

// Adicionar um novo instrumento
app.post('/api/instruments', (req, res) => {
    const { name, quantity, description } = req.body;
    instruments.push({ name, quantity, description });
    res.json({ message: 'Instrumento adicionado com sucesso!' });
});

// Atualizar um instrumento
app.put('/api/instruments/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const { name, quantity, description } = req.body;

    if (index >= 0 && index < instruments.length) {
        instruments[index] = { name, quantity, description };
        res.json({ message: 'Instrumento atualizado com sucesso!' });
    } else {
        res.status(404).json({ error: 'Instrumento não encontrado' });
    }
});

// Excluir um instrumento
app.delete('/api/instruments/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (index >= 0 && index < instruments.length) {
        instruments.splice(index, 1);
        res.json({ message: 'Instrumento excluído com sucesso!' });
    } else {
        res.status(404).json({ error: 'Instrumento não encontrado' });
    }
});

// Limpar todo o inventário
app.delete('/api/instruments', (req, res) => {
    instruments = [];
    res.json({ message: 'Inventário limpo com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
