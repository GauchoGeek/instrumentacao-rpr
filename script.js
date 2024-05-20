document.getElementById('instrument-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const tag = document.getElementById('tag').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;

    const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${tag}</td>
        <td>${description}</td>
        <td>${quantity}</td>
        <td><button onclick="deleteRow(this)">Excluir</button></td>
    `;

    document.getElementById('instrument-form').reset();
});

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
