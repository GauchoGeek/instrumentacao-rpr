document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o estoque de instrumentos
    let stock = [
        { name: "Termômetros", quantity: 15 },
        { name: "Manômetros", quantity: 20 },
        { name: "Termopares", quantity: 10 }
    ];

    // Função para atualizar a tabela de estoque na página
    function updateStockTable() {
        const tableBody = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar

        stock.forEach((item, index) => {
            let row = tableBody.insertRow();
            let cellName = row.insertCell(0);
            let cellQuantity = row.insertCell(1);
            let cellActions = row.insertCell(2);

            cellName.textContent = item.name;
            cellQuantity.textContent = item.quantity;

            // Adicionar botões de ação
            let addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.className = 'add';
            addButton.onclick = function() { updateQuantity(index, 1); };

            let subtractButton = document.createElement('button');
            subtractButton.textContent = '-';
            subtractButton.className = 'subtract';
            subtractButton.onclick = function() { updateQuantity(index, -1); };

            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.className = 'remove';
            removeButton.onclick = function() { removeItem(index); };

            cellActions.appendChild(addButton);
            cellActions.appendChild(subtractButton);
            cellActions.appendChild(removeButton);
        });
    }

    // Função para atualizar a quantidade de um item no estoque
    function updateQuantity(index, change) {
        stock[index].quantity += change;
        if (stock[index].quantity < 0) {
            stock[index].quantity = 0; // Garante que a quantidade não seja negativa
        }
        updateStockTable(); // Atualiza a tabela após a mudança
    }

    // Função para remover um item do estoque
    function removeItem(index) {
        stock.splice(index, 1); // Remove o item do array
        updateStockTable(); // Atualiza a tabela
    }

    // Função para adicionar ou atualizar um instrumento no estoque
    function addToStock(name, quantity) {
        let index = stock.findIndex(item => item.name.toLowerCase() === name.toLowerCase());

        if (index !== -1) {
            // Produto já existe, atualiza a quantidade
            stock[index].quantity += quantity;
        } else {
            // Produto novo, adiciona ao estoque
            stock.push({ name, quantity });
        }
        updateStockTable();
    }

    // Event listener para o formulário de atualização de estoque
    document.getElementById('stockForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let instrumentName = document.getElementById('instrumentName').value.trim();
        let quantity = parseInt(document.getElementById('quantity').value, 10);

        if (instrumentName && !isNaN(quantity)) {
            addToStock(instrumentName, quantity);
        }

        // Resetar o formulário após a submissão
        document.getElementById('stockForm').reset();
    });

    // Inicializa a tabela de estoque na primeira carga da página
    updateStockTable();
});
