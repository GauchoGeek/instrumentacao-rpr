document.getElementById('instrument-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const tag = document.getElementById('tag').value;
    const description = document.getElementById('description').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    if (tag && description && quantity) {
        addInstrumentToTable(tag, description, quantity);
        saveInstrument({ tag, description, quantity });
        document.getElementById('tag').value = '';
        document.getElementById('description').value = '';
        document.getElementById('quantity').value = '';
    }
});

function addInstrumentToTable(tag, description, quantity) {
    const tableBody = document.getElementById('inventory-table').querySelector('tbody');
    const row = document.createElement('tr');

    const tagCell = document.createElement('td');
    tagCell.textContent = tag;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = quantity;
    quantityCell.classList.add(getQuantityClass(quantity));

    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
        row.remove();
        removeInstrument(tag);
    });

    actionsCell.appendChild(removeButton);

    row.appendChild(tagCell);
    row.appendChild(descriptionCell);
    row.appendChild(quantityCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
}

function saveInstrument(instrument) {
    const instruments = getInstruments();
    instruments.push(instrument);
    localStorage.setItem('instruments', JSON.stringify(instruments));
}

function removeInstrument(tag) {
    let instruments = getInstruments();
    instruments = instruments.filter(instrument => instrument.tag !== tag);
    localStorage.setItem('instruments', JSON.stringify(instruments));
}

function loadInstruments() {
    const instruments = getInstruments();
    instruments.forEach(instrument => addInstrumentToTable(instrument.tag, instrument.description, instrument.quantity));
}

function getInstruments() {
    const instruments = localStorage.getItem('instruments');
    return instruments ? JSON.parse(instruments) : [];
}

function getQuantityClass(quantity) {
    if (quantity >= 10) {
        return 'quantity-high';
    } else if (quantity >= 5) {
        return 'quantity-medium';
    } else {
        return 'quantity-low';
    }
}

document.addEventListener('DOMContentLoaded', loadInstruments);
