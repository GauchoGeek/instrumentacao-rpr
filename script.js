document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addItem');
    const removeBtn = document.getElementById('removeItem');
    const instrumentList = document.getElementById('instrumentList');

    addBtn.addEventListener('click', function() {
        // Lógica para adicionar um novo item à lista
        const newItem = createInstrumentItem('Nova Tag', 'Descrição do novo item');
        instrumentList.appendChild(newItem);
    });

    removeBtn.addEventListener('click', function() {
        // Lógica para remover o último item da lista
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

        // Adicionando um botão para editar a TAG
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar TAG';
        editBtn.addEventListener('click', function() {
            const newTag = prompt('Digite a nova TAG:', tag);
            if (newTag) {
                tagElement.textContent = 'TAG: ' + newTag;
            }
        });
        itemDiv.appendChild(editBtn);

        return itemDiv;
    }
});
