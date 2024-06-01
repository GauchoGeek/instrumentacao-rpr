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
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(instrumentData)
            });
            editId = null; // Reset edit ID
        } else {
            // Cria um novo instrumento
            response = await fetch('/api/instruments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(instrumentData)
            });
        }

        if (response.ok) {
            fetchInstruments(); // Atualiza a lista de instrumentos
        } else {
            const errorText = await response.text();
            console.error('Falha ao salvar instrumento:', errorText);
        }

        form.reset(); // Limpa o formulário após adicionar/atualizar
        document.querySelector('button[type="submit"]').textContent = 'Adicionar Instrumento';
    });

    // Edita um instrumento existente
    window.editInstrument = async function(id) {
        try {
            const response = await fetch(`/api/instruments/${id}`);
            const instrument = await response.json();

            if (response.ok) {
                document.getElementById('name').value = instrument.name;
                document.getElementById('quantity').value = instrument.quantity;
                document.getElementById('description').value = instrument.description;

                editId = id; // Set edit ID

                document.getElementById('form-container').scrollIntoView();
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.textContent = 'Atualizar';
            } else {
                console.error('Instrumento não encontrado:', id);
            }
        } catch (error) {
            console.error('Erro ao editar instrumento:', error);
        }
    };

    // Exclui um instrumento do estoque
    window.deleteInstrument = async function(id) {
        try {
            const response = await fetch(`/api/instruments/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchInstruments(); // Atualiza a lista de instrumentos
            } else {
                console.error('Falha ao deletar instrumento:', id);
            }
        } catch (error) {
            console.error('Erro ao deletar instrumento:', error);
        }
    };

    // Inicializa a renderização do inventário quando a página é carregada
    fetchInstruments();
});
