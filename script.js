document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('instrumentForm');
    const inventoryTable = document.getElementById('inventory').getElementsByTagName('tbody')[0];

    // Função para renderizar o inventário
    function renderInventory() {
        const instruments = JSON.parse(localStorage.getItem('instruments')) || [];
        inventoryTable.innerHTML = ''; // Limpa a tabela

        instruments.forEach((instrument, index) => {
            let row = inventoryTable.insertRow();
            row.insertCell(0).textContent = instrument.name;
            row.insertCell(1).textContent = instrument.quantity;
            row.insertCell(2).textContent = instrument.description;
            let actionCell = row.insertCell(3);
            actionCell.innerHTML = `<button onclick="editInstrument(${index})">Editar</button>`;
        });
    }

    // Função para adicionar um novo
