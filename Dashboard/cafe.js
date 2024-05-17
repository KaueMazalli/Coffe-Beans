document.getElementById('cafe-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submissão do formulário
    var form = event.target;
    var dateTimeField = form.querySelector('#datetime');
    var currentDate = new Date();
    dateTimeField.value = currentDate.toISOString(); // Define o horário atual

    var isEditing = form.getAttribute('data-editing') === 'true';

    if (!isEditing) {
        // Adicionar o café à tabela
        var tableBody = document.getElementById('cafe-list');
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = form.querySelector('#name').value; // Nome do café
        row.insertCell(1).textContent = form.querySelector('#origin').value; // Origem
        row.insertCell(2).textContent = form.querySelector('#roast-level').value; // Nível de torra
        row.insertCell(3).textContent = form.querySelector('#description').value; // Descrição
        row.insertCell(4).textContent = form.querySelector('#price').value; // Preço
        row.insertCell(5).textContent = currentDate.toLocaleString('pt-BR'); // Data de cadastro

        var actionCell = row.insertCell(6); // Célula para as ações
        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.onclick = function() {
            // Preencher o formulário com os dados da linha selecionada
            form.setAttribute('data-editing', 'true'); // Indica que estamos editando
            form.setAttribute('data-row-index', row.rowIndex); // Salva o índice da linha
            document.getElementById('name').value = row.cells[0].textContent;
            document.getElementById('origin').value = row.cells[1].textContent;
            document.getElementById('roast-level').value = row.cells[2].textContent;
            document.getElementById('description').value = row.cells[3].textContent;
            document.getElementById('price').value = row.cells[4].textContent;

            // Mudar o botão de submissão para refletir a edição
            var submitButton = document.querySelector('button[type="submit"]');
            submitButton.textContent = 'Salvar Edição';
            submitButton.onclick = function() {
                // Atualizar os dados na linha da tabela
                row.cells[0].textContent = document.getElementById('name').value;
                row.cells[1].textContent = document.getElementById('origin').value;
                row.cells[2].textContent = document.getElementById('roast-level').value;
                row.cells[3].textContent = document.getElementById('description').value;
                row.cells[4].textContent = document.getElementById('price').value;
                row.cells[5].textContent = new Date().toLocaleString('pt-BR'); // Atualiza a data de edição
                submitButton.textContent = 'Cadastrar'; // Restaurar o texto do botão
                submitButton.onclick = null; // Remover o evento de clique para evitar conflitos
                form.reset(); // Limpar o formulário após a submissão
                form.removeAttribute('data-editing'); // Volta ao modo de cadastro
            };
        };
        actionCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            // Implemente a lógica de remoção aqui
            // Por exemplo, você pode remover a linha da tabela
            row.remove();
            console.log('Remover café:', row);
        };
        actionCell.appendChild(deleteButton);
    } else {
        // Modo de edição
        var rowIndex = parseInt(form.getAttribute('data-row-index'));
        var tableBody = document.getElementById('cafe-list');
        var row = tableBody.rows[rowIndex];

        // Atualizar os dados na linha da tabela
        row.cells[0].textContent = form.querySelector('#name').value;
        row.cells[1].textContent = form.querySelector('#origin').value;
        row.cells[2].textContent = form.querySelector('#roast-level').value;
        row.cells[3].textContent = form.querySelector('#description').value;
        row.cells[4].textContent = form.querySelector('#price').value;
        row.cells[5].textContent = new Date().toLocaleString('pt-BR'); // Atualiza a data de edição

        form.reset(); // Limpar o formulário após a edição
        form.removeAttribute('data-editing'); // Volta ao modo de cadastro
    }
    
    // Limpa os campos do formulário
    document.getElementById('name').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('roast-level').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
});

// Função para atualizar a exibição dos cafés com base na página atual
function updateCafeList() {
    var cafes = document.getElementById('cafe-list').rows;
    var cafesPerPage = 5;
    var currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    var totalPages = Math.ceil(cafes.length / cafesPerPage);
    var start = (currentPage - 1) * cafesPerPage;
    var end = start + cafesPerPage;

    for (var i = 0; i < cafes.length; i++) {
        cafes[i].style.display = (i >= start && i < end) ? 'table-row' : 'none';
    }

    var pagination = document.querySelector('.pagination');
    if (totalPages > 1) {
        pagination.style.display = 'block'; // Mostra a paginação se houver mais de uma página
    } else {
        pagination.style.display = 'none'; // Esconde a paginação se houver apenas uma página
    }
}

// Atualiza a exibição dos cafés quando a página é carregada
window.addEventListener('DOMContentLoaded', function() {
    updateCafeList();
});

// Botão "Próximo"
document.getElementById('nextPage').addEventListener('click', function() {
    var currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    var totalPages = Math.ceil(document.getElementById('cafe-list').rows.length / 5);
    if (currentPage < totalPages) {
        document.getElementById('currentPage').textContent = 'Página ' + (currentPage + 1);
        updateCafeList();
    }
});

// Botão "Anterior"
document.getElementById('prevPage').addEventListener('click', function() {
    var currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    if (currentPage > 1) {
        document.getElementById('currentPage').textContent = 'Página ' + (currentPage - 1);
        updateCafeList();
        }
        });
        
        // Filtrar cafés por nível de torra
        document.getElementById('torra-filter').addEventListener('change', function() {
            const selectedTorra = this.value;
            const rows = document.querySelectorAll('#cafe-list tr');
            rows.forEach(row => {
                const torra = row.children[2].textContent;
                if (selectedTorra === "" || torra === selectedTorra) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
    });

    // Adicionando evento de envio do formulário
    document.getElementById('cafe-form').addEventListener('submit', function(event) {
    // Evita o envio padrão do formulário
    event.preventDefault();
    // Adicione aqui outras ações necessárias após o cadastro
// Por exemplo, exibir uma mensagem de sucesso

// Limpa os campos do formulário
document.getElementById('name').value = '';
document.getElementById('origin').value = '';
document.getElementById('roast-level').value = '';
document.getElementById('description').value = '';
document.getElementById('price').value = '';

// Atualiza a exibição dos cafés
updateCafeList();
});






