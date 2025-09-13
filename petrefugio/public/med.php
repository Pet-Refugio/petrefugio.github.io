<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Saúde</title>
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
        
        /* Estilos específicos da página de saúde */
        .page-header {
            text-align: center;
            margin: 30px 0;
        }
        
        .page-header h1 {
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .health-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .health-card {
            background: var(--white);
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .health-card:hover {
            transform: translateY(-5px);
        }
        
        .health-card h2 {
            color: var(--primary);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .health-card ul {
            list-style: none;
        }
        
        .health-card ul li {
            margin-bottom: 10px;
            padding-left: 25px;
            position: relative;
        }
        
        .health-card ul li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--primary);
        }
        
        .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
        }
        
        .article-card {
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .article-card:hover {
            transform: translateY(-5px);
        }
        
        .article-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
        }
        
        .article-content {
            padding: 20px;
        }
        
        .article-content h3 {
            margin-bottom: 10px;
            color: var(--primary);
        }
        
        .article-meta {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
        }
        
        .article-excerpt {
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
                        <li><a href="adocao.php">Adoção</a></li>
                        <li><a href="mapa.php">Mapa</a></li>
                        <li><a href="shop.php">Shop</a></li>
                        <li><a href="med.php" class="active">Med</a></li>
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
            <h1>Saúde e Bem-estar Animal</h1>
            <p>Informações e dicas para manter seu pet saudável</p>
        </div>
        
        <div class="health-sections">
            <div class="health-card">
                <h2>🐾 Cuidados Básicos</h2>
                <ul>
                    <li>Alimentação balanceada</li>
                    <li>Higiene e banho</li>
                    <li>Exercícios físicos</li>
                    <li>Check-ups regulares</li>
                    <li>Vacinação em dia</li>
                </ul>
            </div>
            
            <div class="health-card">
                <h2>⚠️ Sinais de Alerta</h2>
                <ul>
                    <li>Mudanças de comportamento</li>
                    <li>Perda de apetite</li>
                    <li>Vômitos ou diarreia</li>
                    <li>Coceira excessiva</li>
                    <li>Dificuldade para respirar</li>
                </ul>
            </div>
            
            <div class="health-card">
                <h2>🏥 Emergências</h2>
                <ul>
                    <li>Envenenamento</li>
                    <li>Acidentes e traumas</li>
                    <li>Convulsões</li>
                    <li>Dificuldade para urinar</li>
                    <li>Hemorragias</li>
                </ul>
            </div>
        </div>
        
        <h2 style="margin-bottom: 20px; color: var(--primary);">Artigos Recentes</h2>
        
        <div class="articles-grid">
            <!-- Artigo 1 -->
            <div class="article-card">
                <img src="https://source.unsplash.com/random/600x400/?vaccine" alt="Vacinação" class="article-image">
                <div class="article-content">
                    <h3>Calendário de Vacinação para Cães e Gatos</h3>
                    <div class="article-meta">
                        <span>Dr. Carlos Veterinário</span>
                        <span>15/06/2023</span>
                    </div>
                    <p class="article-excerpt">Saiba quais são as vacinas essenciais e quando aplicá-las para manter seu pet protegido.</p>
                    <a href="#" class="btn">Ler Mais</a>
                </div>
            </div>
            
            <!-- Artigo 2 -->
            <div class="article-card">
                <img src="https://source.unsplash.com/random/600x400/?dog+food" alt="Alimentação" class="article-image">
                <div class="article-content">
                    <h3>Alimentação Natural para Pets: Prós e Contras</h3>
                    <div class="article-meta">
                        <span>Dra. Ana Nutricionista</span>
                        <span>10/06/2023</span>
                    </div>
                    <p class="article-excerpt">Descubra se a alimentação natural é a melhor opção para o seu animal de estimação.</p>
                    <a href="#" class="btn">Ler Mais</a>
                </div>
            </div>
            
            <!-- Artigo 3 -->
            <div class="article-card">
                <img src="https://source.unsplash.com/random/600x400/?anxious+dog" alt="Ansiedade" class="article-image">
                <div class="article-content">
                    <h3>Como Lidar com a Ansiedade de Separação em Cães</h3>
                    <div class="article-meta">
                        <span>Dra. Sofia Comportamentalista</span>
                        <span>05/06/2023</span>
                    </div>
                    <p class="article-excerpt">Dicas práticas para ajudar seu cão a superar o estresse quando fica sozinho.</p>
                    <a href="#" class="btn">Ler Mais</a>
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