let titulo = document.getElementById('titulo');
let texto = document.getElementById('toggleText');

let modoLogin = true;

function handleToggleClick(e) {
    e.preventDefault();

    modoLogin = !modoLogin;

    if (!modoLogin) {
        titulo.textContent = 'Criar Conta';
        texto.innerHTML = 'Já tem conta? <a href="#" id="toggleLink">Faça login</a>';
    } else {
        titulo.textContent = 'Login';
        texto.innerHTML = 'Não tem conta? <a href="#" id="toggleLink">Criar conta</a>';
    }

    adicionarEventoToggle();
}

function adicionarEventoToggle() {
    let link = document.getElementById('toggleLink');
    link.addEventListener('click', handleToggleClick);
}

adicionarEventoToggle();

let form = document.querySelector('form');

function handleSubmit(e) {
    e.preventDefault();

    let email = document.getElementById('inputEmail').value;
    let senha = document.getElementById('inputSenha').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (!modoLogin) {
        let usuarioExiste = usuarios.find(u => u.email === email);

        if (usuarioExiste) {
            alert('Usuário já existe!');
            return;
        }

        usuarios.push({ email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro realizado com sucesso!');
    } else {
        let usuario = usuarios.find(u => u.email === email && u.senha === senha);

        if (!usuario) {
            alert('Usuário inexistente ou senha incorreta!');
            return;
        }

        alert('Login bem sucedido!');

    
        window.location.href = 'home.html';
    }
}

form.addEventListener('submit', handleSubmit);