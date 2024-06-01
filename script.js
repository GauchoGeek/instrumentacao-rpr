document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('instrumentForm');
    const inventoryTable = document.getElementById('inventory').getElementsByTagName('tbody')[0];
    let editIndex = -1; // Index do item sendo editado

    // Carrega os instrumentos do localStorage e renderiza na tabela
    function renderInventory() {
        const instruments = JSON.parse(localStorage.getItem('instruments')) || [];
        inventoryTable.innerHTML = ''; // Limpa a tabela

        instruments.forEach((instrument, index) => {
            let row = inventoryTable.insertRow();
            row.insertCell(0).textContent = instrument.name;
            row.insertCell(1).textContent = instrument.quantity;
            row.insertCell(2).textContent = instrument.description;
            let actionCell = row.insertCell(3);
            actionCell.innerHTML = `<button onclick="editInstrument(${index})">Editar</button> <button onclick="deleteInstrument(${index})">Excluir</button>`;
        });
    }

    // Adiciona ou atualiza um instrumento no estoque
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const description = document.getElementById('description').value;

        let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
        
        // Atualiza se estamos em modo de edição
        if (editIndex !== -1) {
            instruments[editIndex] = { name, quantity, description };
            editIndex = -1; // Reset edit index
        } else {
            instruments.push({ name, quantity, description });
        }

        localStorage.setItem('instruments', JSON.stringify(instruments));
        renderInventory();

        // Limpa o formulário após adicionar/atualizar
        form.reset();
        document.querySelector('button[type="submit"]').textContent = 'Adicionar Instrumento';
    });

    // Edita um instrumento existente
    window.editInstrument = function(index) {
        let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
        let instrument = instruments[index];

        if (instrument) {
            document.getElementById('name').value = instrument.name;
            document.getElementById('quantity').value = instrument.quantity;
            document.getElementById('description').value = instrument.description;

            editIndex = index; // Set edit index

            document.getElementById('form-container').scrollIntoView();
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Atualizar';
        }
    };

    // Exclui um instrumento do estoque
    window.deleteInstrument = function(index) {
        let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
        instruments.splice(index, 1);

        localStorage.setItem('instruments', JSON.stringify(instruments));
        renderInventory();
    };

    // Inicializa a renderização do inventário quando a página é carregada
    renderInventory();
});
