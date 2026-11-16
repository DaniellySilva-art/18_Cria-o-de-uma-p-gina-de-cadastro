const form = document.querySelector('form');

const campos = [
    { id: 'nome',      nome: 'Nome',      tipo: 'texto' },
    { id: 'sobrenome', nome: 'Sobrenome', tipo: 'texto' },
    { id: 'email',     nome: 'E-mail',    tipo: 'email' },
    { id: 'senha',     nome: 'Senha',     tipo: 'texto' },
];

function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function mostrarErro(campo, mensagem) {
    const divCampo = document.getElementById(campo.id).closest('.campo');
    const spanErro = divCampo.querySelector('.mensagem-erro');

    divCampo.classList.add('erro');
    spanErro.textContent = mensagem;
}

function removerErro(campo) {
    const divCampo = document.getElementById(campo.id).closest('.campo');
    const spanErro = divCampo.querySelector('.mensagem-erro');

    divCampo.classList.remove('erro');
    spanErro.textContent = '';
}

function validarCampo(campo) {
    const input = document.getElementById(campo.id);
    const valor = input.value.trim();

    if (valor === '') {
        mostrarErro(campo, campo.nome + ' não pode ficar vazio');
        return false;
    }

    if (campo.tipo === 'email' && !emailValido(valor)) {
        mostrarErro(campo, 'Parece que este e-mail não é válido');
        return false;
    }

    removerErro(campo);
    return true;
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    let formularioValido = true;

    campos.forEach(function (campo) {
        const campoValido = validarCampo(campo);
        if (!campoValido) {
            formularioValido = false;
        }
    });

    if (formularioValido) {
        alert('Conta criada com sucesso! 🎉');
        form.reset();
    }
});

campos.forEach(function (campo) {
    const input = document.getElementById(campo.id);

    input.addEventListener('input', function () {
        const divCampo = input.closest('.campo');
        if (divCampo.classList.contains('erro')) {
            removerErro(campo);
        }
    });
});
