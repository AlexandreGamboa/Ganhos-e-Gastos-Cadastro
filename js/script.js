document.addEventListener('DOMContentLoaded', () => { 
    if (localStorage.getItem('authenticated') !== 'true') { 
        // Redirecionar para a página de login se não estiver autenticado 
        window.location.href = './login.html'; 
    } 
});

const button = document.getElementById('button');

// Função para mudar o botão de enviar para imagem
const addLoading = () => {
    button.innerHTML = '<img src="../images/loading.png" class="loading">';
}

// Função para mudar o botão de enviar para texto
const removeLoading = () => {
    button.innerHTML = 'Enviar';
}

const handleSubmit = (event) => {
    event.preventDefault();

    const userConfirmed = confirm('Deseja enviar a transação?');
    if (!userConfirmed) {
        alert('Transação cancelada.');
        return;  // Sai da função se o usuário cancelar
    }

    addLoading();

    // Coleta os dados dos campos do formulário
    const tipo = document.getElementById('tipo').value; // Tipo de transação (ganho ou gasto)
    const descricao = document.getElementById('descricao').value;   // Descrição da transação
    const valor = document.getElementById('valor').value;   // Valor da transação (em R$)
    const data = document.getElementById('data').value; // Data da transação

    // Cria um objeto com os dados que serão enviados
    const dados = {
        data: [
            {
                tipo: tipo,
                descricao: descricao,
                valor: valor,
                data: data
            }
        ]
    };

    // Usa o método fetch para enviar os dados
    fetch(/*Coloque o link da API aqui, entre '', e coloque esse (,)depois*/ {
        method: 'POST', // Método HTTP POST
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(dados) // Converte as informações do formulário para JSON
    })
    .then(() => {
        removeLoading();
        alert('Transação enviada com sucesso!');
        document.getElementById('gastos-ganhos-form').reset(); // Reseta o formulário depois do envio
    })
    .catch(() => {
        removeLoading();
        alert('Ocorreu um erro ao enviar a transação.');
    });
}

document.getElementById('gastos-ganhos-form').addEventListener('submit', handleSubmit);