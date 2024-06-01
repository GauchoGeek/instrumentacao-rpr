document.getElementById('estoqueForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var produto = document.getElementById('produto').value;
    var quantidade = document.getElementById('quantidade').value;

    // Armazena os dados no Local Storage
    var estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    estoque.push({ produto: produto, quantidade: quantidade });
    localStorage.setItem('estoque', JSON.stringify(estoque));

    // Limpa os campos de entrada
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';

    // Atualiza a exibição
    displayInventory();
});

function displayInventory() {
    var estoqueList = document.getElementById('estoqueList');
    estoqueList.innerHTML = ''; // Limpa a lista antes de atualizar

    var estoque = JSON.parse(localStorage.getItem('estoque')) || [];

    estoque.forEach(function(item, index) {
        var li = document.createElement('li');
        li.textContent = item.produto + ': ' + item.quantidade;
        var removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = function() {
            estoque.splice(index, 1);
            localStorage.setItem('estoque', JSON.stringify(estoque));
            displayInventory(); // Atualiza após remover
        };
        li.appendChild(removeBtn);
        estoqueList.appendChild(li);
    });
}

// Carrega o inventário na página ao carregar a página
window.onload = function() {
    displayInventory();
};
