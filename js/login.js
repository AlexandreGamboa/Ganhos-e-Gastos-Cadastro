async function fetchPasswords() {
    try {
        const response = await fetch(/*Coloque o link da API aqui, entre ''*/);
        const data = await response.json();
        console.log('Dados recebidos da API:', data); // Adicionado para depuração
        return data.reduce((acc, user) => {
            acc[user.email] = user.senha;
            return acc;
        }, {});
    } catch (error) {
        console.error('Erro ao buscar senhas:', error);
        return null;
    }
}

async function validateLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwords = await fetchPasswords();

    if (!passwords) {
        alert('Erro ao buscar senhas. Tente novamente.');
        return;
    }

    if (passwords[email] && passwords[email] === password) {
        localStorage.setItem('authenticated', 'true');
        window.location.href = './cadastro.html';
    } else {
        alert('Email ou senha incorretos.');
        document.getElementById('password').reset();
    }
}

document.getElementById('loginForm').addEventListener('submit', validateLogin);