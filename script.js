document.addEventListener('DOMContentLoaded', function() {
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');
    const instrumentList = document.getElementById('instrumentList');
    const instrumentForm = document.getElementById('instrumentForm');
    const instrumentSelect = document.getElementById('instrumentSelect');

    addItemBtn.addEventListener('click', function() {
        // Verifica se um instrumento foi selecionado
        if (instrumentSelect.value) {
            const selectedInstrument = instrumentSelect.value;
            const newItem = createInstrumentItem(selectedInstrument, 'Descrição do ' + selectedInstrument);
            instrumentList.appendChild(newItem);
        } else {
            alert('Por favor, selecione um instrumento.');
        }
    });

    removeItemBtn.addEventListener('click', function() {
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

        return item
        }
    }
});
