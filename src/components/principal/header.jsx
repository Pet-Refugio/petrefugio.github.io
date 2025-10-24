import '../../styles/principal/Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import perfil from "../perfil/img/anasilva.jpg";
import SinoNotificacoes from '../notificacoes/notificacao';

export default function HeaderPrincipal() {
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
    <header className={`header-principal ${!headerVisivel ? 'header-escondido' : ''}`}>
      <nav className="nav-principal">
        <div className="nav-container-principal">
          
          {/* Logo - Clique volta para Home */}
          <div className="logo-principal" onClick={voltarParaHome}>
            <span className="logo-icone">🐾</span>
            <span className="logo-texto-principal">PetRefugio</span>
            <span className="status-pagina">
              {paginaAtiva.includes('amigos') ? 'Amigos' : 'Página Principal'}
            </span>
          </div>

          {/* Menu Central Dinâmico */}
          <div className="menu-central">
            <Link to="/principal">
              <button className={`menu-item-principal ${paginaAtiva === '/principal' ? 'active' : ''}`}>
                <span className="menu-icone">🏠</span>
                <span className="menu-texto-principal">Início</span>
              </button>
            </Link>
            
            <Link to="/principal/amigos">
              <button className={`menu-item-principal ${paginaAtiva.includes('amigos') ? 'active' : ''}`}>
                <span className="menu-icone">👥</span>
                <span className="menu-texto-principal">Amigos</span>
              </button>
            </Link>
          </div>

          {/* Área do Perfil */}
          <div className="area-perfil">
            <SinoNotificacoes />
            <div className="perfil-usuario">
              <div className="avatar-perfil">
                <Link to="/perfil">
                  <img src={perfil} className="imagem-perfil" alt="Perfil" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}