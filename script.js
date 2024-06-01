document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('instrumentForm');
    const inventoryTable = document.getElementById('inventory').getElementsByTagName('tbody')[0];
    let editId = null; // ID do item sendo editado

    // Carrega os instrumentos do servidor e renderiza na tabela
    async function fetchInstruments() {
        try {
            const response = await fetch('/api/instruments');
            const instruments = await response.json();
            renderInventory(instruments);
        } catch (error) {
            console.error('Erro ao buscar instrumentos:', error);
        }
    }

    // Renderiza os instrumentos na tabela
    function renderInventory(instruments) {
        inventoryTable.innerHTML = ''; // Limpa a tabela

        instruments.forEach((instrument) => {
            let row = inventoryTable.insertRow();
            row.insertCell(0).textContent = instrument.name;
            row.insertCell(1).textContent = instrument.quantity;
            row.insertCell(2).textContent = instrument.description;
            let actionCell = row.insertCell(3);
            actionCell.innerHTML = `<button onclick="editInstrument('${instrument._id}')">Editar</button> <button onclick="deleteInstrument('${instrument._id}')">Excluir</button>`;
        });
    }

    // Adiciona ou atualiza um instrumento no estoque
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const description = document.getElementById('description').value;

        const instrumentData = { name, quantity, description };

        try {
            let response;
            if (editId) {
                // Atualiza o instrumento
                response = await fetch(`/api/instruments/${editId}`, {
