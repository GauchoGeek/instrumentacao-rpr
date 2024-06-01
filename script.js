document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('instrumentForm');
            const inventoryTable = document.getElementById('inventory').getElementsByTagName('tbody')[0];
            const submitButton = form.querySelector('button[type="submit"]');

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
                    actionCell.innerHTML = `
                        <button onclick="editInstrument(${index})">Editar</button>
                        <button onclick="deleteInstrument(${index})">Excluir</button>
                    `;
                });
            }

            // Função para adicionar um novo instrumento ao estoque
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const quantity = document.getElementById('quantity').value;
                const description = document.getElementById('description').value;

                let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
                instruments.push({ name, quantity, description });

                localStorage.setItem('instruments', JSON.stringify(instruments));
                renderInventory();

                // Limpa o formulário após adicionar
                form.reset();
            });
    // Função para editar um instrumento existente
            window.editInstrument = function (index) {
                let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
                let instrument = instruments[index];

                if (instrument) {
                    document.getElementById('name').value = instrument.name;
                    document.getElementById('quantity').value = instrument.quantity;
                    document.getElementById('description').value = instrument.description;

                    // Atualiza o botão para modo de edição
                    submitButton.textContent = 'Atualizar';
                    submitButton.onclick = function (event) {
                        event.preventDefault();
                        updateInstrument(index);
                    };
                }
            };

            // Função para atualizar um instrumento no localStorage
            function updateInstrument(index) {
                let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
                instruments[index] = {
                    name: document.getElementById('name').value,
                    quantity: document.getElementById('quantity').value,
                    description: document.getElementById('description').value
                };

                localStorage.setItem('instruments', JSON.stringify(instruments));
                renderInventory();

                // Restaura o botão e o formulário após atualização
                form.reset();
                submitButton.textContent = 'Adicionar Instrumento';
                submitButton.onclick = function (event) {
                    event.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                };
            }

            // Função para excluir um instrumento do inventário
            window.deleteInstrument = function (index) {
                let instruments = JSON.parse(localStorage.getItem('instruments')) || [];
                instruments.splice(index, 1); // Remove o instrumento do array

                localStorage.setItem('instruments', JSON.stringify(instruments));
                renderInventory();
            };

            // Função para limpar todo o inventário
            document.getElementById('clearInventory').addEventListener('click', function () {
                localStorage.removeItem('instruments');
                renderInventory();
            });

            // Inicializa a renderização do inventário quando a página é carregada
            renderInventory();
        });
