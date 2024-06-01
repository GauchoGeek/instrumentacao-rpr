const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Alterei para um arquivo para persistência simples, troque pelo caminho desejado
const dbPath = './inventory.db';
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
        process.exit(1); // Encerra o processo caso não consiga conectar
    }
    console.log('Connected to the SQLite database.');

    // Criar a tabela se não existir
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT NOT NULL, quantity INTEGER NOT NULL)", (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
                console.log("Table 'inventory' created or already exists.");
            }
        });
    });
});

// Rota para adicionar itens ao inventário
app.post('/inventory', (req, res) => {
    const { product, quantity } = req.body;
    const sql = 'INSERT INTO inventory (product, quantity) VALUES (?, ?)';
    db.run(sql, [product, quantity], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `${this.lastID} added to the inventory.` });
    });
});

// Rota para obter todos os itens do inventário
app.get('/inventory', (req, res) => {
    db.all('SELECT * FROM inventory', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
