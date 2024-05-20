document.addEventListener('DOMContentLoaded', function() {
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');
    const instrumentList = document.getElementById('instrumentList');
    const instrumentForm = document.getElementById('instrumentForm');
    const instrumentSelect = document.getElementById('instrumentSelect');
    const instrumentTagInput = document.getElementById('instrumentTag');
    const instrumentDescriptionInput = document.getElementById('instrumentDescription');

    addItemBtn.addEventListener('click', function() {
        const selectedInstrument = instrumentSelect.value;
        const tag = instrumentTagInput.value;
        const description = instrumentDescriptionInput.value;

        if (tag && description) {
            const newItem = createInstrumentItem(tag, description);
            instrumentList.appendChild(newItem);
            // Limpa os campos do formulário
            instrumentTagInput.value = '';
            instrumentDescriptionInput.value = '';
        } else {
            alert('Por favor, preencha a TAG e a descrição do instrumento.');
        }
    });

    removeItemBtn.addEventListener('click', function() {
        const items = instrumentList.querySelectorAll('.instrument-item');
        if (items.length > 0) {
            items[items.length - 1].remove();
        }
    });

    function createInstrumentItem(tag, description) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('instrument-item');

        const tagElement = document.createElement('p');
        tagElement.textContent = 'TAG: ' + tag;
        itemDiv.appendChild(tagElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = 'Descrição: ' + description;
        itemDiv.appendChild(descriptionElement);

        // Adicionando botões para editar e excluir o item
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.addEventListener('click', function() {
            // Exibe os campos de edição
            const editForm = createEditForm(tag, description);
            itemDiv.appendChild(editForm);
            // Remove o botão de edição e o botão de exclusão
            itemDiv.removeChild(editBtn);
            itemDiv.removeChild(itemDiv.querySelector('button[data-action="delete"]'));
        });
        itemDiv.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.dataset.action = 'delete'; // Usado para identificar o botão de exclusão
        deleteBtn.addEventListener('click', function() {
            itemDiv.remove(); // Remove o item da lista
        });
        itemDiv.appendChild(deleteBtn);

        return itemDiv;
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
                // Atualiza o item na lista
                itemDiv.querySelector('p:first-child').textContent = 'TAG: ' + newTag;
                itemDiv.querySelector('p:nth-child(2)').textContent = 'Descrição: ' + newDescription;
                // Remove o formulário de edição
                itemDiv.removeChild(editForm);
                // Restaura o botão de edição e o botão de exclusão
                itemDiv.appendChild(editBtn);
                itemDiv.appendChild(deleteBtn);
            } else {
                alert('Por favor, preencha a TAG e a descrição do instrumento.');
            }
        });
        editForm.appendChild(saveBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancelar';
        cancelBtn.addEventListener('click', function() {
            itemDiv.removeChild(editForm); // Remove o formulário de edição
            // Restaura o botão de edição e o botão de exclusão
            itemDiv.appendChild(editBtn);
            itemDiv.appendChild(deleteBtn);
        });
        editForm.appendChild(cancelBtn);

        return editForm;
    }
});
