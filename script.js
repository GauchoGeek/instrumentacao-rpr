document.addEventListener('document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('instrumentForm');
            const inventoryTable = document.getElementById('inventory').getElementsByTagName('tbody')[0];
            const submitButton = form.querySelector('button[type="submit"]');
            const clearInventoryButton = document.getElementById('clearInventory');
            const apiUrl = 'http://localhost:3000/api/instruments';

            // Função para renderizar o inventário
            async function renderInventory() {
                const response = await fetch(apiUrl);
                const instruments = await response.json();
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
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const quantity = document.getElementById('quantity').value;
                const description = document.getElementById('description').value;

                await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, quantity, description })
                });

                renderInventory();
                form.reset(); // Limpa o formulário após adicionar
            });

            // Função para editar um instrumento existente
            window.editInstrument = async function (index) {
                const response = await fetch(apiUrl);
                const instruments = await response.json();
                const instrument = instruments[index];

                if (instrument) {
                    document.getElementById('name').value = instrument.name;
                    document.getElementById('quantity').value = instrument.quantity;
                    document.getElementById('description').value = instrument.description;

                    // Atualiza o botão para modo de edição
                    submitButton.textContent = 'Atualizar';
                    submitButton.onclick = async function (event) {
                        event.preventDefault();
                        await updateInstrument(index);
                    };
                }
            };

            // Função para atualizar um instrumento no backend
            async function updateInstrument(index) {
                const name = document.getElementById('name').value;
                const quantity = document.getElementById('quantity').value;
                const description = document.getElementById('description').value;

                await fetch(`${apiUrl}/${index}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, quantity, description })
                });

                renderInventory();

                // Restaura o botão e o formulário após atualização
                form.reset();
                submitButton.textContent = 'Adicionar Instrumento';
                submitButton.onclick = async function (event) {
                    event.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                };
            }

            // Função para excluir um instrumento do backend
            window.deleteInstrument = async function (index) {
                await fetch(`${apiUrl}/${index}`, {
                    method: 'DELETE'
                });

                renderInventory();
            };

            // Função para limpar todo o inventário
            clearInventoryButton.addEventListener('click', async function () {
                await fetch(apiUrl, {
                    method: 'DELETE'
                });
                renderInventory();
            });

            // Inicializa a renderização do inventário quando a página é carregada
            renderInventory();
        });

