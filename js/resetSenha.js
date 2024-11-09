const button = document.getElementById('buttonSenha');

// Função para mudar o botão de enviar para imagem
const addLoading = () => {
    button.innerHTML = '<img src="../images/loading.png" class="loading">';
}

// Função para mudar o botão de enviar para texto
const removeLoading = () => {
    button.innerHTML = 'Redefinir Senha';
}

document.getElementById('resetForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário
    addLoading();

    const confirmEmail = document.getElementById('confirmEmail').value;
    const passwordAntigo = document.getElementById('passwordAntigo').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        removeLoading();
        return;
    }

    try {
        // Faz uma solicitação GET para obter a senha atual
        const response = await fetch(/*Coloque o link da API aqui, dentro ->*/`/search?email=${confirmEmail}`);
        const data = await response.json();
        
        if (data.length === 0) {
            alert('Email não encontrado.');
            removeLoading();
            return;
        }

        const user = data[0];
        
        if (user.senha !== passwordAntigo) {
            alert('Senha atual inválida.');
            removeLoading();
            return;
        }

        // Verifica o email e atualiza a senha específica
        const updateUrl = /*Coloque o link da API aqui, dentro -> '*/`/email/${confirmEmail}`;
        const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ senha: newPassword })
        });

        if (updateResponse.ok) {
            alert('Senha alterada com sucesso.');
            document.getElementById('resetForm').reset();
        } else {
            alert('Erro ao atualizar a senha. Tente novamente.');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao verificar a senha. Tente novamente.');
    } finally {
        removeLoading();
    }
});