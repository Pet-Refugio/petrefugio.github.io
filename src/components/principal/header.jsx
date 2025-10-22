import '../../styles/principal/header.css'
import { Link } from 'react-router-dom';
import perfil from "../perfil/img/anasilva.jpg"
import SinoNotificacoes from '../notificacoes/notificacao';
export default function HeaderPrincipal() {
  return (
    <header className="header-principal">
      <nav className="nav-principal">
        <div className="nav-container-principal">
          <div className="logo-principal">
            <span className="logo-icone">🐾</span>
            <span className="logo-texto-principal">PetRefugio</span>
          </div>
          <div className="menu-central">
          <Link to="/principal/amigos">
            <button className="menu-item-principal">
              <span className="menu-icone">👥</span>
              <span className="menu-texto-principal">Amigos</span>
            </button> 
            </Link>           
            <button className="menu-item-principal">
              <span className="menu-icone">📝</span>
              <span className="menu-texto-principal"> Fazer post</span>
            </button>
          </div>
          <div className="area-perfil">
            <button className="botao-notificacao">
            <SinoNotificacoes />
            </button>
            <div className="perfil-usuario">
              <div className="avatar-perfil">
                <Link to="/perfil">
                <img src={perfil} className="imagem-perfil"
                />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}