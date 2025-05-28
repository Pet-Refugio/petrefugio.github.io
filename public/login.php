<?php
require_once __DIR__ . '/../src/includes/header.php';

if(isset($_SESSION['user_id'])) {
    header('Location: /perfil.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - PetRefugio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/auth.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Login no PetRefugio</h2>
            
            <?php if(isset($_GET['error'])): ?>
                <div class="alert alert-error">
                    <?php echo htmlspecialchars($_GET['error']); ?>
                </div>
            <?php endif; ?>
            
            <form id="loginForm" action="/src/controllers/handle_login.php" method="POST">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" required>
                </div>
                
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
            
            <div class="auth-links">
                <a href="/cadastro.php">Não tem uma conta? Cadastre-se</a>
                <a href="/recuperar_senha.php">Esqueceu sua senha?</a>
            </div>
        </div>
    </div>

    <script src="/assets/js/auth.js"></script>
</body>
</html>
