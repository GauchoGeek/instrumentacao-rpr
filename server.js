// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/inventario', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const instrumentSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    description: String
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

app.use(cors());
app.use(bodyParser.json());

// Obter todos os instrumentos
app.get('/api/instruments', async (req, res) => {
    try {
        const instruments = await Instrument.find();
        res.json(instruments);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os instrumentos' });
    }
});

// Adicionar um novo instrumento
app.post('/api/instruments', async (req, res) => {
    try {
        const { name, quantity, description } = req.body;
        const newInstrument = new Instrument({ name, quantity, description });
        await newInstrument.save();
        res.json({ message: 'Instrumento adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar o instrumento' });
    }
});

// Atualizar um instrumento
app.put('/api/instruments/:id', async (req, res) => {
    try {
        const { name, quantity, description } = req.body;
        const instrument = await Instrument.findByIdAndUpdate(
            req.params.id,
            { name, quantity, description },
            { new: true }
        );

        if (instrument) {
            res.json({ message: 'Instrumento atualizado com sucesso!' });
        } else {
            res.status(404).json({ error: 'Instrumento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o instrumento' });
    }
});

// Excluir um instrumento
app.delete('/api/instruments/:id', async (req, res) => {
    try {
        const instrument = await Instrument.findByIdAndDelete(req.params.id);

        if (instrument) {
            res.json({ message: 'Instrumento excluído com sucesso!' });
        } else {
            res.status(404).json({ error: 'Instrumento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o instrumento' });
    }
});

// Limpar todo o inventário
app.delete('/api/instruments', async (req, res) => {
    try {
        await Instrument.deleteMany({});
        res.json({ message: 'Inventário limpo com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao limpar o inventário' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
