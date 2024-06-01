const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Conexão com o MongoDB (ajuste a URI de acordo com seu ambiente)
mongoose.connect('mongodb://localhost:27017/inventoryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema do banco de dados
const instrumentSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    description: String
});

const Instrument = mongoose.model('Instrument', instrumentSchema);

// Middleware
app.use(bodyParser.json());

// Rota para listar todos os instrumentos
app.get('/api/instruments', async (req, res) => {
    try {
        const instruments = await Instrument.find();
        res.status(200).json(instruments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para criar um novo instrumento
app.post('/api/instruments', async (req, res) => {
    const { name, quantity, description } = req.body;
    const instrument = new Instrument({
        name,
        quantity,
        description
    });

    try {
        const newInstrument = await instrument.save();
        res.status(201).json(newInstrument);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para obter um único instrumento por ID
app.get('/api/instruments/:id', async (req, res) => {
    try {
        const instrument = await Instrument.findById(req.params.id);
        if (instrument) {
            res.status(200).json(instrument);
        } else {
            res.status(404).json({ message: "Instrumento não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para atualizar um instrumento por ID
app.put('/api/instruments/:id', async (req, res) => {
    try {
        const updatedInstrument = await Instrument.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedInstrument);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para deletar um instrumento por ID
app.delete('/api/instruments/:id', async (req, res) => {
    try {
        const deletedInstrument = await Instrument.findByIdAndDelete(req.params.id);
        if (deletedInstrument) {
            res.status(200).json({ message: "Instrumento deletado" });
        } else {
            res.status(404).json({ message: "Instrumento não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
