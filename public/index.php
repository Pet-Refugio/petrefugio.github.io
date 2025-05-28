<?php require_once __DIR__ . '/../src/includes/header.php'; ?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Rede de Cuidados com Animais</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="logo">
                <h1>PetRefugio</h1>
                <p>🐶🐱 Rede de cuidados com animais</p>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="/" class="active">Home</a></li>
                    <li><a href="/posts.php">Posts</a></li>
                    <li><a href="/adocao.php">Adoção</a></li>
                    <li><a href="/mapa.php">Mapa</a></li>
                    <li><a href="/shop.php">Shop</a></li>
                    <li><a href="/med.php">Med</a></li>
                    <?php if(isset($_SESSION['user_id'])): ?>
                        <li><a href="/perfil.php">Meu Perfil</a></li>
                        <li><a href="/logout.php">Sair</a></li>
                    <?php else: ?>
                        <li><a href="/login.php">Login/Cadastro</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <section class="hero">
            <div class="container">
                <h2>Encontre tudo para o seu pet em um só lugar</h2>
                <p>Adoção, cuidados, produtos e uma comunidade apaixonada por animais</p>
                <a href="/adocao.php" class="btn btn-primary">Ver pets para adoção</a>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>O que você pode fazer no PetRefugio</h2>
                <div class="cards-container">
                    <div class="card">
                        <div class="card-icon">🔍</div>
                        <h3>Buscar animal perdido</h3>
                        <p>Encontre animais perdidos na sua região</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🏠</div>
                        <h3>Adoção de animal</h3>
                        <p>Encontre seu novo melhor amigo</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">🛍️</div>
                        <h3>Pet shops e lojas</h3>
                        <p>Produtos e serviços para seu pet</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">💬</div>
                        <h3>Rede social de pets</h3>
                        <p>Conecte-se com outros tutores</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php require_once __DIR__ . '/../src/includes/footer.php'; ?>
    <script src="/assets/js/main.js"></script>
</body>
</html>
