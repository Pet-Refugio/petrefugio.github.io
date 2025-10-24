// src/components/perfil/HeaderPerfil.jsx
import '../../styles/perfil/HeaderPerfil.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SinoNotificacoes from '../notificacoes/notificacao';
import perfil from "./img/anasilva.jpg";

export default function HeaderPerfil() {
  const [headerVisivel, setHeaderVisivel] = useState(true);
  const [ultimoScrollY, setUltimoScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const controlarHeader = () => {
      const scrollAtual = window.scrollY;
      
      if (scrollAtual > ultimoScrollY && scrollAtual > 100) {
        setHeaderVisivel(false);
      } else {
        setHeaderVisivel(true);
      }
      
      setUltimoScrollY(scrollAtual);
    };

    window.addEventListener('scroll', controlarHeader);
    
    return () => {
      window.removeEventListener('scroll', controlarHeader);
    };
  }, [ultimoScrollY]);

  const voltarParaHome = () => {
    window.location.href = '/';
  };

  // Determinar qual página está ativa
  const paginaAtiva = location.pathname;

  return (
    <header className={`header-perfil ${!headerVisivel ? 'header-escondido' : ''}`}>
      <nav className="nav-perfil">
        <div className="nav-container-perfil">
          
          {/* Logo - Clique volta para Home */}
          <div className="logo-perfil" onClick={voltarParaHome}>
            <span className="logo-icone">🐾</span>
            <span className="logo-texto">PetRefugio</span>
            <span className="status-pagina">
              {paginaAtiva.includes('publico') ? 'Perfil Público' : 'Meu Perfil'}
            </span>
          </div>

          {/* Menu Central Dinâmico */}
          <div className="menu-central">
            <Link to="/principal">
              <button className={`menu-item ${paginaAtiva === '/principal' ? 'active' : ''}`}>
                <span className="menu-icone">🏠</span>
                <span className="menu-texto">Início</span>
              </button>
            </Link>
            
            <Link to="/principal/amigos">
              <button className={`menu-item ${paginaAtiva.includes('amigos') ? 'active' : ''}`}>
                <span className="menu-icone">👥</span>
                <span className="menu-texto">Amigos</span>
              </button>
            </Link>
          </div>

          {/* Ações */}
          <div className="acoes-perfil">
            <SinoNotificacoes />
            <button className="botao-config">⚙️</button>
            <Link to="/perfil">
            <div className="avatar-perfil-header">
              <img src={perfil} alt="Perfil" />
            </div>
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}