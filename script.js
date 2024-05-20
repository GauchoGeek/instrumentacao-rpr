document.getElementById('instrument-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const tag = document.getElementById('tag').value;
    const description = document.getElementById('description').value;

    if (tag && description) {
        addInstrumentToTable(tag, description);
        saveInstrument({ tag, description });
        document.getElementById('tag').value = '';
        document.getElementById('description').value = '';
    }
});

function addInstrumentToTable(tag, description) {
    const tableBody = document.getElementById('inventory-table').querySelector('tbody');
    const row = document.createElement('tr');

    const tagCell = document.createElement('td');
    tagCell.textContent = tag;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;

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
    instruments.forEach(instrument => addInstrumentToTable(instrument.tag, instrument.description));
}

function getInstruments() {
    const instruments = localStorage.getItem('instruments');
    return instruments ? JSON.parse(instruments) : [];
}

document.addEventListener('DOMContentLoaded', loadInstruments);
