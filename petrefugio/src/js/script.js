// Menu mobile
const btnHamburguer = document.getElementById('botao-hamburguer');
const menuItens = document.getElementById('menu-itens');

btnHamburguer.addEventListener('click', () => {
    menuItens.classList.toggle('ativo');
    btnHamburguer.classList.toggle('ativo');
});

document.querySelectorAll('.link-menu').forEach(link => {
    link.addEventListener('click', () => {
        menuItens.classList.remove('ativo');
        btnHamburguer.classList.remove('ativo');
    });
});

// Scroll suave
function irParaSecao(idSecao) {
    const secao = document.getElementById(idSecao);
    if (secao) {
        secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Modal simples usando hidden
const modal = document.getElementById('modal');
const conteudoModal = document.getElementById('conteudo-modal');

function abrirModal(tipo) {
    let conteudo = '';

    if (tipo === 'entrar') {
        conteudo = formularioEntrar();
    } else if (tipo === 'cadastrar') {
        conteudo = formularioCadastrar();
    } else {
        conteudo = '<p>Conteúdo não encontrado.</p>';
    }

    conteudoModal.innerHTML = conteudo;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    adicionarEventosForm();
}

function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', e => {
    if (e.target === modal) fecharModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) fecharModal();
});

function formularioEntrar() {
    return `
        <h2>Entrar no PetRefugio</h2>
        <form id="form-entrar">
            <div class="grupo-form">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div class="grupo-form">
                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required />
            </div>
            <div class="grupo-form">
                <button type="submit" class="botao botao-principal" style="width: 100%;">Entrar</button>
            </div>
            <div style="text-align:center; margin-top:20px;">
                <p>Não tem conta? <a href="#" onclick="abrirModal('cadastrar')" style="color: var(--primary-color); text-decoration:none;">Cadastre-se aqui</a></p>
                <p><a href="#" style="color: var(--text-light); text-decoration:none; font-size:0.9rem;">Esqueceu a senha?</a></p>
            </div>
        </form>
    `;
}

function formularioCadastrar() {
    return `
        <h2>Cadastrar no PetRefugio</h2>
        <form id="form-cadastrar">
            <div class="grupo-form">
                <label for="tipoConta">Tipo de Conta:</label>
                <select id="tipoConta" name="tipoConta" required>
                    <option value="">Selecione o tipo</option>
                    <option value="usuario">Usuário</option>
                    <option value="ong">ONG</option>
                    <option value="petshop">Pet Shop</option>
                    <option value="servico">Prestador de Serviço</option>
                    <option value="veterinario">Veterinário</option>
                    <option value="hotel">Hotel para Pets</option>
                </select>
            </div>
            <div class="grupo-form">
                <label for="nomeCompleto">Nome Completo:</label>
                <input type="text" id="nomeCompleto" name="nomeCompleto" required />
            </div>
            <div class="grupo-form">
                <label for="emailCad">E-mail:</label>
                <input type="email" id="emailCad" name="email" required />
            </div>
            <div class="grupo-form">
                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" required />
            </div>
            <div class="grupo-form">
                <label for="senhaCad">Senha:</label>
                <input type="password" id="senhaCad" name="senha" required />
            </div>
            <div class="grupo-form">
                <label for="confirmaSenha">Confirmar Senha:</label>
                <input type="password" id="confirmaSenha" name="confirmaSenha" required />
            </div>
            <div class="grupo-form">
                <button type="submit" class="botao botao-principal" style="width: 100%;">Cadastrar</button>
            </div>
            <div style="text-align:center; margin-top:20px;">
                <p>Já tem conta? <a href="#" onclick="abrirModal('entrar')" style="color: var(--primary-color); text-decoration:none;">Entre aqui</a></p>
                <p style="font-size:0.8rem; color: var(--text-light); margin-top:15px;">
                    Ao se cadastrar, você concorda com nossos <a href="#" style="color: var(--primary-color);">Termos de Uso</a> e <a href="#" style="color: var(--primary-color);">Política de Privacidade</a>.
                </p>
            </div>
        </form>
    `;
}

function adicionarEventosForm() {
    const formEntrar = document.getElementById('form-entrar');
    const formCadastrar = document.getElementById('form-cadastrar');

    if (formEntrar) formEntrar.addEventListener('submit', enviarEntrar);
    if (formCadastrar) formCadastrar.addEventListener('submit', enviarCadastrar);
}

function enviarEntrar(e) {
    e.preventDefault();

    const botao = e.target.querySelector('button[type="submit"]');
    const textoOriginal = botao.innerHTML;
    botao.innerHTML = '<div class="loading"></div> Entrando...';
    botao.disabled = true;

    setTimeout(() => {
        alert('Login realizado com sucesso! (Simulação)');
        fecharModal();
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
    }, 2000);
}

function enviarCadastrar(e) {
    e.preventDefault();

    const botao = e.target.querySelector('button[type="submit"]');
    const textoOriginal = botao.innerHTML;
    botao.innerHTML = '<div class="loading"></div> Cadastrando...';
    botao.disabled = true;

    setTimeout(() => {
        alert('Cadastro realizado com sucesso! (Simulação)');
        fecharModal();
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
    }, 2000);
}
