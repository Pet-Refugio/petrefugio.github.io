<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Posts</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style>
        /* Estilos compartilhados (mesmos do index.php e adocao.php) */
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
        
        /* Estilos específicos da página de posts */
        .page-header {
            text-align: center;
            margin: 30px 0;
        }
        
        .page-header h1 {
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .create-post {
            background: var(--white);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .create-post:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .create-post-content {
            display: flex;
            align-items: center;
            color: #666;
        }
        
        .create-post-content i {
            font-size: 24px;
            margin-right: 15px;
            color: var(--primary);
        }
        
        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
        }
        
        .post-card {
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .post-card:hover {
            transform: translateY(-5px);
        }
        
        .post-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
        
        .post-info {
            padding: 15px;
        }
        
        .post-user {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
        }
        
        .user-name {
            font-weight: 500;
        }
        
        .post-time {
            font-size: 12px;
            color: #999;
            margin-left: auto;
        }
        
        .post-caption {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .post-actions {
            display: flex;
            gap: 15px;
        }
        
        .post-action {
            display: flex;
            align-items: center;
            color: #666;
            font-size: 14px;
        }
        
        .post-action i {
            margin-right: 5px;
            font-size: 18px;
        }
        
        .like-action:hover, .like-action.active {
            color: #ED4956;
        }
        
        .comment-action:hover {
            color: var(--primary);
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
            
            .posts-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <!-- Adicionando ícones do Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
                        <li><a href="posts.php" class="active">Posts</a></li>
                        <li><a href="adocao.php">Adoção</a></li>
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
            <h1>Comunidade PetRefugio</h1>
            <p>Compartilhe momentos e conheça histórias de outros amantes de animais</p>
        </div>
        
        <?php if(isset($_SESSION['user'])): ?>
        <div class="create-post" onclick="location.href='novo-post.php';">
            <div class="create-post-content">
                <i class="fas fa-plus-circle"></i>
                <span>Criar novo post</span>
            </div>
        </div>
        <?php endif; ?>
        
        <div class="posts-grid">
            <!-- Post 1 -->
            <div class="post-card">
                <img src="https://source.unsplash.com/random/600x600/?dog,pet" alt="Cachorro no parque" class="post-image">
                <div class="post-info">
                    <div class="post-user">
                        <img src="https://source.unsplash.com/random/100x100/?person" alt="Ana Silva" class="user-avatar">
                        <span class="user-name">Ana Silva</span>
                        <span class="post-time">2 horas atrás</span>
                    </div>
                    <div class="post-caption">
                        <p>Meu encontro semanal com o Thor no parque! Ele adora correr atrás da bolinha e fazer novos amigos. 🐕💕 #DiaDeParque #CachorroFeliz</p>
                    </div>
                    <div class="post-actions">
                        <div class="post-action like-action">
                            <i class="far fa-heart"></i>
                            <span>124 curtidas</span>
                        </div>
                        <div class="post-action comment-action">
                            <i class="far fa-comment"></i>
                            <span>23 comentários</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Post 2 -->
            <div class="post-card">
                <img src="download.jpg" alt="Gato dormindo" class="post-image">
                <div class="post-info">
                    <div class="post-user">
                        <img src="download.jpg" alt="Carlos Oliveira" class="user-avatar">
                        <span class="user-name">Carlos Oliveira</span>
                        <span class="post-time">1 dia atrás</span>
                    </div>
                    <div class="post-caption">
                        <p>O Loki descobriu o novo arranhador que comprei na PetShop! Melhor investimento da semana. 🐱😴 #Gatos #PetShop</p>
                    </div>
                    <div class="post-actions">
                        <div class="post-action like-action active">
                            <i class="fas fa-heart"></i>
                            <span>89 curtidas</span>
                        </div>
                        <div class="post-action comment-action">
                            <i class="far fa-comment"></i>
                            <span>15 comentários</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Post 3 -->
            <div class="post-card">
                <img src="https://source.unsplash.com/random/600x600/?bird,pet" alt="Pássaro no poleiro" class="post-image">
                <div class="post-info">
                    <div class="post-user">
                        <img src="https://source.unsplash.com/random/100x100/?woman" alt="Mariana Costa" class="user-avatar">
                        <span class="user-name">Mariana Costa</span>
                        <span class="post-time">3 dias atrás</span>
                    </div>
                    <div class="post-caption">
                        <p>Meu periquito Piu-Piu aprendendo um truque novo! Ele já consegue dar a voltinha no poleiro quando peço. 🦜💫 #AvesDeEstimacao #PetInteligente</p>
                    </div>
                    <div class="post-actions">
                        <div class="post-action like-action">
                            <i class="far fa-heart"></i>
                            <span>67 curtidas</span>
                        </div>
                        <div class="post-action comment-action">
                            <i class="far fa-comment"></i>
                            <span>8 comentários</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Post 4 -->
            <div class="post-card">
                <img src="https://source.unsplash.com/random/600x600/?rabbit,pet" alt="Coelho comendo" class="post-image">
                <div class="post-info">
                    <div class="post-user">
                        <img src="https://source.unsplash.com/random/100x100/?girl" alt="Beatriz Santos" class="user-avatar">
                        <span class="user-name">Beatriz Santos</span>
                        <span class="post-time">5 dias atrás</span>
                    </div>
                    <div class="post-caption">
                        <p>O Algodão adorou a cenoura que plantei especialmente para ele! Cultivar comida orgânica para nossos pets é muito gratificante. 🥕🐇 #Coelho #PetSaudavel</p>
                    </div>
                    <div class="post-actions">
                        <div class="post-action like-action">
                            <i class="far fa-heart"></i>
                            <span>102 curtidas</span>
                        </div>
                        <div class="post-action comment-action">
                            <i class="far fa-comment"></i>
                            <span>31 comentários</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Sobre</h3>
                    <p>PetRefugio é uma plataforma dedicada a conectar amantes de animais e promover o bem-estar pet.</p>
                </div>
                <div class="footer-section">
                    <h3>Links Rápidos</h3>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="posts.php">Posts</a></li>
                        <li><a href="adocao.php">Adoção</a></li>
                        <li><a href="mapa.php">Mapa</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contato</h3>
                    <ul>
                        <li>contato@petrefugio.com</li>
                        <li>(11) 98765-4321</li>
                        <li>São Paulo - SP</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 PetRefugio. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
</body>
</html>