document.addEventListener('DOMContentLoaded', function() {
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');
    const instrumentTable = document.getElementById('instrumentTable').getElementsByTagName('tbody')[0];
    const instrumentForm = document.getElementById('instrumentForm');
    const instrumentSelect = document.getElementById('instrumentSelect');
    const instrumentTagInput = document.getElementById('instrumentTag');
    const instrumentDescriptionInput = document.getElementById('instrumentDescription');

    addItemBtn.addEventListener('click', function() {
        const tag = instrumentTagInput.value;
        const description = instrumentDescriptionInput.value;

        if (tag && description) {
            const newRow = createTableRow(tag, description);
            instrumentTable.appendChild(newRow);
            // Limpa os campos do formulário
            instrumentTagInput.value = '';
            instrumentDescriptionInput.value = '';
        } else {
            alert('Por favor, preencha a TAG e a descrição do instrumento.');
        }
    });

    removeItemBtn.addEventListener('click', function() {
        const rows = instrumentTable.rows;
        if (rows.length > 0) {
            rows[rows.length - 1].remove();
        }
    });

    function createTableRow(tag, description) {
        const row = document.createElement('tr');

        const tagCell = document.createElement('td');
        tagCell.textContent = tag;
        row.appendChild(tagCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = description;
        row.appendChild(description
