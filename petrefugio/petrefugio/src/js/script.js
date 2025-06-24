// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for internal links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal Functions
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

function openModal(type) {
    let content = '';
    
    switch(type) {
        case 'login':
            content = getLoginForm();
            break;
        case 'signup':
            content = getSignupForm();
            break;
        default:
            content = '<p>Conteúdo não encontrado.</p>';
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    addFormEventListeners();
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

function getLoginForm() {
    return `
        <h2>Entrar no PetRefugio</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Entrar
                </button>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <p>Não tem uma conta? <a href="#" onclick="openModal('signup')" style="color: var(--primary-color); text-decoration: none;">Cadastre-se aqui</a></p>
                <p><a href="#" style="color: var(--text-light); text-decoration: none; font-size: 0.9rem;">Esqueceu sua senha?</a></p>
            </div>
        </form>
    `;
}

function getSignupForm() {
    return `
        <h2>Cadastrar no PetRefugio</h2>
        <form id="signupForm">
            <div class="form-group">
                <label for="accountType">Tipo de Conta:</label>
                <select id="accountType" name="accountType" required>
                    <option value="">Selecione o tipo</option>
                    <option value="user">Usuário</option>
                    <option value="ong">ONG</option>
                    <option value="petshop">Pet Shop</option>
                    <option value="service">Prestador de Serviço</option>
                    <option value="vet">Veterinário</option>
                    <option value="hotel">Hotel para Pets</option>
                </select>
            </div>
            <div class="form-group">
                <label for="fullName">Nome Completo:</label>
                <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="emailSignup">E-mail:</label>
                <input type="email" id="emailSignup" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Telefone:</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="passwordSignup">Senha:</label>
                <input type="password" id="passwordSignup" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirmar Senha:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Cadastrar
                </button>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <p>Já tem uma conta? <a href="#" onclick="openModal('login')" style="color: var(--primary-color); text-decoration: none;">Entre aqui</a></p>
                <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 15px;">
                    Ao se cadastrar, você concorda com nossos <a href="#" style="color: var(--primary-color);">Termos de Uso</a> e <a href="#" style="color: var(--primary-color);">Política de Privacidade</a>.
                </p>
            </div>
        </form>
    `;
}

function addFormEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Entrando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Login realizado com sucesso! (Simulação)');
        closeModal();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Cadastrando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Cadastro realizado com sucesso! (Simulação)');
        closeModal();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Newsletter subscription
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const emailInput = event.target.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                alert('Obrigado por se inscrever na nossa newsletter! (Simulação)');
                emailInput.value = '';
            }
        });
    }
});

console.log('PetRefugio - Sistema carregado! 🐾');