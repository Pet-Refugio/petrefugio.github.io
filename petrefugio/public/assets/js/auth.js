document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            if(!email || !senha) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos');
                return false;
            }
            
            // Validação básica de email
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                e.preventDefault();
                alert('Por favor, insira um email válido');
                return false;
            }
            
            return true;
        });
    }
});
