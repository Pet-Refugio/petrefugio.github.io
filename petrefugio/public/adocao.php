<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Adoção</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style>
        /* Estilos compartilhados (mesmos do index.php) */
        :root {
            --primary: #F26B38;
            --secondary: #3E3E3E;
            --light: #F2F2F2;
            --white: #FFFFFF;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Roboto', sans-serif;
        }
        
        body {
            background-color: var(--light);
            color: var(--secondary);
            line-height: 1.6;
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            background-color: var(--white);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            color: var(--primary);
            font-size: 24px;
            font-weight: bold;
        }
        
        .logo span {
            font-size: 14px;
            color: var(--secondary);
            display: block;
            font-weight: normal;
        }
        
        nav ul {
            display: flex;
            list-style: none;
        }
        
        nav ul li a {
            padding: 10px 15px;
            text-decoration: none;
            color: var(--secondary);
            font-weight: 500;
            transition: all 0.3s;
        }
        
        nav ul li a:hover, nav ul li a.active {
            color: var(--primary);
        }
        
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        
        footer {
            background-color: var(--secondary);
            color: white;
            padding: 30px 0;
            margin-top: 50px;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        .footer-section {
            flex: 1;
            min-width: 200px;
        }
        
        .footer-section h3 {
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-section ul li {
            margin-bottom: 8px;
        }
        
        .footer-section a {
            color: white;
            text-decoration: none;
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 20px;
            margin-top: 30px;
            border-top: 1px solid #555;
        }
        
        /* Estilos específicos da página de adoção */
        .page-header {
            text-align: center;
            margin: 30px 0;
        }
        
        .page-header h1 {
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .filters {
            background: var(--white);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .filter-group {
            margin-bottom: 15px;
        }
        
        .filter-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        
        .filter-group select, .filter-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .pets-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
        }
        
        .pet-card {
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .pet-card:hover {
            transform: translateY(-5px);
        }
        
        .pet-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .pet-info {
            padding: 20px;
        }
        
        .pet-info h3 {
            color: var(--primary);
            margin-bottom: 10px;
        }
        
        .pet-meta {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            color: #666;
        }
        
        .pet-description {
            margin-bottom: 15px;
        }
        
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 15px;
            }
            
            nav ul {
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    PetRefugio
                    <span>🐶🐱 Rede de cuidados com animais</span>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="posts.php">Posts</a></li>
                        <li><a href="adocao.php" class="active">Adoção</a></li>
                        <li><a href="mapa.php">Mapa</a></li>
                        <li><a href="shop.php">Shop</a></li>
                        <li><a href="med.php">Med</a></li>
                        <?php if(isset($_SESSION['user'])): ?>
                            <li><a href="perfil.php">Perfil</a></li>
                            <li><a href="logout.php">Sair</a></li>
                        <?php else: ?>
                            <li><a href="login.php">Login</a></li>
                        <?php endif; ?>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <main class="container">
        <div class="page-header">
            <h1>Pets para Adoção</h1>
            <p>Encontre seu novo melhor amigo</p>
        </div>
        
        <div class="filters">
            <form action="#" method="get">
                <div class="filter-row" style="display: flex; gap: 20px; margin-bottom: 15px;">
                    <div class="filter-group" style="flex: 1;">
                        <label for="tipo">Tipo de Animal</label>
                        <select id="tipo" name="tipo">
                            <option value="">Todos</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                            <option value="outros">Outros</option>
                        </select>
                    </div>
                    <div class="filter-group" style="flex: 1;">
                        <label for="porte">Porte</label>
                        <select id="porte" name="porte">
                            <option value="">Todos</option>
                            <option value="pequeno">Pequeno</option>
                            <option value="medio">Médio</option>
                            <option value="grande">Grande</option>
                        </select>
                    </div>
                    <div class="filter-group" style="flex: 1;">
                        <label for="idade">Idade</label>
                        <select id="idade" name="idade">
                            <option value="">Todas</option>
                            <option value="filhote">Filhote</option>
                            <option value="adulto">Adulto</option>
                            <option value="idoso">Idoso</option>
                        </select>
                    </div>
                </div>
                <div class="filter-row" style="display: flex; gap: 20px;">
                    <div class="filter-group" style="flex: 1;">
                        <label for="sexo">Sexo</label>
                        <select id="sexo" name="sexo">
                            <option value="">Todos</option>
                            <option value="macho">Macho</option>
                            <option value="femea">Fêmea</option>
                        </select>
                    </div>
                    <div class="filter-group" style="flex: 2;">
                        <label for="localizacao">Localização</label>
                        <input type="text" id="localizacao" name="localizacao" placeholder="Cidade ou estado">
                    </div>
                    <div class="filter-group" style="flex: 1; align-self: flex-end;">
                        <button type="submit" class="btn" style="width: 100%;">Filtrar</button>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="pets-grid">
            <!-- Pet 1 -->
            <div class="pet-card">
                <img src="https://source.unsplash.com/random/400x300/?dog" alt="Rex" class="pet-image">
                <div class="pet-info">
                    <h3>Rex</h3>
                    <div class="pet-meta">
                        <span>🐶 Cachorro</span>
                        <span>3 anos</span>
                    </div>
                    <div class="pet-description">
                        <p>Rex é um vira-lata muito brincalhão e carinhoso. Adora crianças e outros animais.</p>
                    </div>
                    <a href="#" class="btn" style="display: block; text-align: center;">Quero Adotar</a>
                </div>
            </div>
            
            <!-- Pet 2 -->
            <div class="pet-card">
                <img src="https://source.unsplash.com/random/400x300/?cat" alt="Mingau" class="pet-image">
                <div class="pet-info">
                    <h3>Mingau</h3>
                    <div class="pet-meta">
                        <span>🐱 Gato</span>
                        <span>2 anos</span>
                    </div>
                    <div class="pet-description">
                        <p>Mingau é um gato siamês tranquilo e amoroso. Ideal para apartamento.</p>
                    </div>
                    <a href="#" class="btn" style="display: block; text-align: center;">Quero Adotar</a>
                </div>
            </div>
            
            <!-- Pet 3 -->
            <div class="pet-card">
                <img src="https://source.unsplash.com/random/400x300/?rabbit" alt="Cotton" class="pet-image">
                <div class="pet-info">
                    <h3>Cotton</h3>
                    <div class="pet-meta">
                        <span>🐰 Coelho</span>
                        <span>1 ano</span>
                    </div>
                    <div class="pet-description">
                        <p>Cotton é um coelho anão muito dócil e tranquilo. Já está acostumado com crianças.</p>
                    </div>
                    <a href="#" class="btn" style="display: block; text-align: center;">Quero Adotar</a>
                </div>
            </div>
            
            <!-- Pet 4 -->
            <div class="pet-card">
                <img src="https://source.unsplash.com/random/400x300/?puppy" alt="Bolinha" class="pet-image">
                <div class="pet-info">
                    <h3>Bolinha</h3>
                    <div class="pet-meta">
                        <span>🐶 Cachorro</span>
                        <span>6 meses</span>
                    </div>
                    <div class="pet-description">
                        <p>Bolinha é uma filhote cheia de energia. Está procurando uma família amorosa.</p>
                    </div>
                    <a href="#" class="btn" style="display: block; text-align: center;">Quero Adotar</a>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>PetRefugio</h3>
                    <p>Rede de cuidados com animais</p>
                    <p>🐶🐱❤️</p>
                </div>
                
                <div class="footer-section">
                    <h3>Links Rápidos</h3>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="adocao.php">Adoção</a></li>
                        <li><a href="mapa.php">Mapa</a></li>
                        <li><a href="shop.php">Shop</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Contato</h3>
                    <p>contato@petrefugio.com</p>
                    <p>(11) 9999-8888</p>
                    <p>São Paulo - SP</p>
                </div>
                
                <div class="footer-section">
                    <h3>Redes Sociais</h3>
                    <div style="display: flex; gap: 15px;">
                        <a href="#">📱</a>
                        <a href="#">📷</a>
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>© <?= date('Y') ?> PetRefugio. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
</body>
</html>