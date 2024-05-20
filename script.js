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
        const actionsCell = document.createElement('td');

        // Adicionando botões para editar e excluir o item
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.addEventListener('click', function() {
            // Exibe os campos de edição
            const editForm = createEditForm(tag, description);
            instrumentTable.parentNode.appendChild(editForm); // Adiciona o formulário de edição após a tabela
            // Remove o botão de edição e o botão de exclusão
            instrumentTable.parentNode.removeChild(actionsCell);
        });
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', function() {
            row.remove(); // Remove o item da tabela
        });
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);

        return row;
    }

    function createEditForm(tag, description) {
        const editForm = document.createElement('form');
        editForm.classList.add('edit-form');

        const newTagInput = document.createElement('input');
        newTagInput.type = 'text';
        newTagInput.value = tag;
        newTagInput.required = true;
        editForm.appendChild(newTagInput);

        const newDescriptionInput = document.createElement('input');
        newDescriptionInput.type = 'text';
        newDescriptionInput.value = description;
        newDescriptionInput.required = true;
        editForm.appendChild(newDescriptionInput);

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Salvar Alterações';
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Evita o envio do formulário
            const newTag = newTagInput.value;
            const newDescription = newDescriptionInput.value;
            if (newTag && newDescription) {
                // Atualiza o item na tabela
                const row = instrumentTable.querySelector(`tr:has(td[data-tag="${tag}"])`);
                row.querySelector('td:nth-child(1)').textContent = newTag;
                row.querySelector('td:nth-child(2)').textContent = newDescription;
                // Remove o formulário de edição
                instrumentTable.parentNode.removeChild(editForm);
                // Restaura o botão de edição e o botão de exclusão
                const actionsCell = row.querySelector('td:nth-child(3)');
                actionsCell.appendChild(editBtn);
                actionsCell.appendChild(deleteBtn);
            } else {
                alert('Por favor, preencha a TAG e a descrição do instrumento.');
            }
        });
        editForm.appendChild(saveBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancelar';
        cancelBtn.addEventListener('click', function() {
            instrumentTable.parentNode.removeChild(editForm); // Remove o formulário de edição
            // Restaura o botão de edição e o botão de exclusão
            const actionsCell = row.querySelector('td:nth-child(3)');
            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });
        editForm.appendChild(cancelBtn);

        return editForm;
    }
});
