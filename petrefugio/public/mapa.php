<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetRefugio - Mapa</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
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
        
        /* Estilos específicos da página do mapa */
        .map-container {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .map-filters {
            flex: 0 0 250px;
            background: var(--white);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            height: fit-content;
        }
        
        .map-view {
            flex: 1;
            height: 600px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        #map {
            width: 100%;
            height: 100%;
        }
        
        .filter-group {
            margin-bottom: 15px;
        }
        
        .filter-group h3 {
            margin-bottom: 10px;
            color: var(--primary);
        }
        
        .filter-option {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .filter-option input {
            margin-right: 10px;
        }
        
        .map-legend {
            background: var(--white);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
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
            
            .map-container {
                flex-direction: column;
            }
            
            .map-filters {
                flex: 1;
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
                        <li><a href="mapa.php" class="active">Mapa</a></li>
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
        <div class="page-header" style="text-align: center; margin: 30px 0;">
            <h1 style="color: var(--primary); margin-bottom: 15px;">Mapa PetRefugio</h1>
            <p>Encontre serviços e animais próximos a você</p>
        </div>
        
        <div class="map-legend">
            <h3 style="margin-bottom: 15px; color: var(--primary);">Legenda do Mapa</h3>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #F26B38;"></div>
                <span>Animais para adoção</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #FFD700;"></div>
                <span>Animais perdidos</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #1E90FF;"></div>
                <span>Pet Shops</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #32CD32;"></div>
                <span>Veterinários</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #9932CC;"></div>
                <span>Hotéis para pets</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #FF4500;"></div>
                <span>Abrigos/ONGs</span>
            </div>
        </div>
        
        <div class="map-container">
            <div class="map-filters">
                <div class="filter-group">
                    <h3>Tipos de Locais</h3>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-adocao" checked>
                        <label for="filter-adocao">Animais para adoção</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-perdidos" checked>
                        <label for="filter-perdidos">Animais perdidos</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-petshops" checked>
                        <label for="filter-petshops">Pet Shops</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-vets" checked>
                        <label for="filter-vets">Veterinários</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-hoteis" checked>
                        <label for="filter-hoteis">Hotéis para pets</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-ongs" checked>
                        <label for="filter-ongs">Abrigos/ONGs</label>
                    </div>
                </div>
                
                <div class="filter-group">
                    <h3>Tipo de Animal</h3>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-cachorros" checked>
                        <label for="filter-cachorros">Cachorros</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-gatos" checked>
                        <label for="filter-gatos">Gatos</label>
                    </div>
                    <div class="filter-option">
                        <input type="checkbox" id="filter-outros" checked>
                        <label for="filter-outros">Outros</label>
                    </div>
                </div>
                
                <button class="btn" style="width: 100%;">Aplicar Filtros</button>
            </div>
            
            <div class="map-view">
                <div id="map"></div>
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

    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
        // Inicializa o mapa
        const map = L.map('map').setView([-23.5505, -46.6333], 12);

        // Adiciona o tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Marcadores de exemplo
        const markers = [
            {
                latlng: [-23.5505, -46.6333],
                title: "Abrigo São Francisco",
                type: "ong",
                description: "Abrigo para animais abandonados",
                animalType: "all"
            },
            {
                latlng: [-23.5632, -46.6543],
                title: "PetShop Amigo Fiel",
                type: "petshop",
                description: "Pet shop com produtos e serviços",
                animalType: "all"
            },
            {
                latlng: [-23.5555, -46.6444],
                title: "Rex - Para adoção",
                type: "adocao",
                description: "Cachorro vira-lata, 3 anos",
                animalType: "cachorro"
            },
            {
                latlng: [-23.5580, -46.6400],
                title: "Mingau - Para adoção",
                type: "adocao",
                description: "Gato siamês, 2 anos",
                animalType: "gato"
            },
            {
                latlng: [-23.5520, -46.6300],
                title: "Thor - Perdido",
                type: "perdido",
                description: "Cachorro Golden, desaparecido no Parque",
                animalType: "cachorro"
            }
        ];

        // Cores para os tipos de marcadores
        const colors = {
            'adocao': '#F26B38',
            'perdido': '#FFD700',
            'petshop': '#1E90FF',
            'veterinario': '#32CD32',
            'hotel': '#9932CC',
            'ong': '#FF4500'
        };

        // Adiciona marcadores ao mapa
        markers.forEach(marker => {
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${colors[marker.type]}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            
            L.marker(marker.latlng, { icon: icon })
                .addTo(map)
                .bindPopup(`<b>${marker.title}</b><br>${marker.description}`);
        });

        // Controle de filtros (simplificado)
        document.querySelectorAll('.map-filters input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Aqui você implementaria a lógica para filtrar os marcadores
                console.log('Filtro alterado:', this.id, this.checked);
            });
        });
    </script>
</body>
</html>