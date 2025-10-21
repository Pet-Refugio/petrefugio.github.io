import '../../styles/perfil/HeaderPerfil.css';
import { Link } from 'react-router-dom';
import SinoNotificacoes from '../notificacoes/notificacao';

export default function HeaderPerfil() {
  return (
    <header className="header-perfil">
      <nav className="nav-perfil">
        <div className="nav-container-perfil">
          <div className="logo-perfil"> 
            <span className="logo-icone">🐾</span>
            <span className="logo-texto">PetRefugio</span>
          </div>

          <div className="menu-perfil">
          <Link to="/principal"><button className="menu-item">Início</button></Link>
            <button className="menu-item active"> Perfil</button>
          </div>
          <div className="acoes-perfil">
            <button className="botao-config">⚙️</button>
          </div>

        </div>
      </nav>
    </header>
  );
}