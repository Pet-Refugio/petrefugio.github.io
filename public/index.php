<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Rede de Cuidados com Animais</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style>
        /* Estilos do header (copiados do header.php) */
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
        
        /* Estilos específicos da página inicial */
        .hero {
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                        url('assets/images/hero-bg.jpg') center/cover no-repeat;
            color: white;
            text-align: center;
            padding: 100px 20px;
            margin-bottom: 40px;
            border-radius: 8px;
        }
        
        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 50px 0;
        }
        
        .feature-card {
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
        }
        
        .feature-card h3 {
            color: var(--primary);
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
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header incorporado -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    PetRefugio
                    <span>🐶🐱 Rede de cuidados com animais</span>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.php" class="active">Home</a></li>
                        <li><a href="posts.php">Posts</a></li>
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
        <section class="hero">
            <h1>Encontre tudo para o seu pet em um só lugar</h1>
            <p>Adoção, cuidados, produtos e uma comunidade apaixonada por animais</p>
            <a href="adocao.php" class="btn">Ver pets para adoção</a>
        </section>

        <section>
            <h2 style="text-align: center; margin-bottom: 30px; color: var(--primary);">O que você pode fazer no PetRefugio</h2>
            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h3>Buscar animal perdido</h3>
                    <p>Encontre animais perdidos na sua região através do nosso mapa colaborativo.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🏠</div>
                    <h3>Adoção de animal</h3>
                    <p>Encontre seu novo melhor amigo entre os pets disponíveis para adoção.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🛍️</div>
                    <h3>Pet shops e lojas</h3>
                    <p>Compre produtos de qualidade para seu pet com vendedores verificados.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💬</div>
                    <h3>Rede social de pets</h3>
                    <p>Conecte-se com outros tutores e compartilhe momentos do seu pet.</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer incorporado -->
    <footer style="background-color: #3E3E3E; color: white; padding: 30px 0; margin-top: 50px;">
        <div class="container" style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px;">
            <div style="flex: 1; min-width: 200px;">
                <h3 style="color: #F26B38; margin-bottom: 15px;">PetRefugio</h3>
                <p>Rede de cuidados com animais</p>
                <p>🐶🐱❤️</p>
            </div>
            
            <div style="flex: 1; min-width: 200px;">
                <h4 style="margin-bottom: 15px;">Links Rápidos</h4>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 8px;"><a href="index.php" style="color: white; text-decoration: none;">Home</a></li>
                    <li style="margin-bottom: 8px;"><a href="adocao.php" style="color: white; text-decoration: none;">Adoção</a></li>
                    <li style="margin-bottom: 8px;"><a href="mapa.php" style="color: white; text-decoration: none;">Mapa</a></li>
                    <li style="margin-bottom: 8px;"><a href="shop.php" style="color: white; text-decoration: none;">Shop</a></li>
                </ul>
            </div>
            
            <div style="flex: 1; min-width: 200px;">
                <h4 style="margin-bottom: 15px;">Contato</h4>
                <p>contato@petrefugio.com</p>
                <p>(11) 9999-8888</p>
                <p>São Paulo - SP</p>
            </div>
            
            <div style="flex: 1; min-width: 200px;">
                <h4 style="margin-bottom: 15px;">Redes Sociais</h4>
                <div style="display: flex; gap: 15px;">
                    <a href="#" style="color: white; font-size: 20px;">📱</a>
                    <a href="#" style="color: white; font-size: 20px;">📷</a>
                    <a href="#" style="color: white; font-size: 20px;">📘</a>
                    <a href="#" style="color: white; font-size: 20px;">🐦</a>
                </div>
            </div>
        </div>
        
        <div class="container" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #555; text-align: center;">
            <p>© <?= date('Y') ?> PetRefugio. Todos os direitos reservados.</p>
        </div>
    </footer>
</body>
</html>
