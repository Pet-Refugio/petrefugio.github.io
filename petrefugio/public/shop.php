<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Shop</title>
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
        
        /* Estilos específicos da página da loja */
        .shop-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .shop-title h1 {
            color: var(--primary);
        }
        
        .cart-icon {
            position: relative;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .cart-count {
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: var(--primary);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
        }
        
        .categories {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .category-btn {
            padding: 8px 15px;
            background-color: var(--white);
            border: 1px solid #ddd;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .category-btn:hover, .category-btn.active {
            background-color: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
        }
        
        .product-card {
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
        }
        
        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .product-info {
            padding: 15px;
        }
        
        .product-title {
            font-weight: 500;
            margin-bottom: 10px;
            height: 40px;
            overflow: hidden;
        }
        
        .product-price {
            color: var(--primary);
            font-weight: bold;
            font-size: 1.2rem;
            margin-bottom: 15px;
        }
        
        .product-shop {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 10px;
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
                        <li><a href="shop.php" class="active">Shop</a></li>
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
        <div class="shop-header">
            <div class="shop-title">
                <h1>Pet Shop</h1>
                <p>Encontre os melhores produtos para seu pet</p>
            </div>
            <div class="cart-icon">
                🛒
                <span class="cart-count">3</span>
            </div>
        </div>
        
        <div class="categories">
            <button class="category-btn active">Todos</button>
            <button class="category-btn">Alimentos</button>
            <button class="category-btn">Brinquedos</button>
            <button class="category-btn">Acessórios</button>
            <button class="category-btn">Higiene</button>
            <button class="category-btn">Saúde</button>
        </div>
        
        <div class="products-grid">
            <!-- Produto 1 -->
            <div class="product-card">
                <img src="https://source.unsplash.com/random/300x300/?dog+food" alt="Ração Premium" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">Ração Premium para Cães Adultos</h3>
                    <div class="product-price">R$ 149,90</div>
                    <div class="product-shop">PetShop Amigo Fiel</div>
                    <button class="btn" style="width: 100%;">Adicionar ao Carrinho</button>
                </div>
            </div>
            
            <!-- Produto 2 -->
            <div class="product-card">
                <img src="https://source.unsplash.com/random/300x300/?cat+food" alt="Ração para Gatos" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">Ração para Gatos Castrados</h3>
                    <div class="product-price">R$ 129,90</div>
                    <div class="product-shop">PetShop Amigo Fiel</div>
                    <button class="btn" style="width: 100%;">Adicionar ao Carrinho</button>
                </div>
            </div>
            
            <!-- Produto 3 -->
            <div class="product-card">
                <img src="https://source.unsplash.com/random/300x300/?pet+toy" alt="Brinquedo" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">Brinquedo para Cães Resistente</h3>
                    <div class="product-price">R$ 59,90</div>
                    <div class="product-shop">PetShop Amigo Fiel</div>
                    <button class="btn" style="width: 100%;">Adicionar ao Carrinho</button>
                </div>
            </div>
            
            <!-- Produto 4 -->
            <div class="product-card">
                <img src="https://source.unsplash.com/random/300x300/?pet+bed" alt="Cama para Pet" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">Cama Macia para Cães e Gatos</h3>
                    <div class="product-price">R$ 199,90</div>
                    <div class="product-shop">PetShop Amigo Fiel</div>
                    <button class="btn" style="width: 100%;">Adicionar ao Carrinho</button>
                </div>
            </div>
            
            <!-- Produto 5 -->
            <div class="product-card">
                <img src="https://source.unsplash.com/random/300x300/?pet+shampoo" alt="Shampoo" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">Shampoo Antipulgas para Cães</h3>
                    <div class="product-price">R$ 39,90</div>
                    <div class="product-shop">PetShop Amigo Fiel</div>
                    <button class="btn" style="width: 100%;">Adicionar ao Carrinho</button>
                </div>
            </div>
            
            <!-- Produto 6 -->
            <div class="product-card">
                <img src="download.jpg" alt="Coleira" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">Coleira Antipulgas para Cães</h3>
                    <div class="product-price">R$ 79,90</div>
                    <div class="product-shop">PetShop Amigo Fiel</div>
                    <button class="btn" style="width: 100%;">Adicionar ao Carrinho</button>
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

    <script>
        // Simples funcionalidade de filtro por categoria
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.category-btn.active').classList.remove('active');
                this.classList.add('active');
                
                // Aqui você implementaria a filtragem real dos produtos
                console.log('Filtrar por:', this.textContent);
            });
        });
        
        // Simples funcionalidade do carrinho
        document.querySelectorAll('.product-card .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const countElement = document.querySelector('.cart-count');
                let count = parseInt(countElement.textContent);
                countElement.textContent = count + 1;
                
                // Aqui você implementaria a adição ao carrinho
                const productName = this.closest('.product-card').querySelector('.product-title').textContent;
                console.log('Adicionado ao carrinho:', productName);
            });
        });
    </script>
</body>
</html>