import '../../styles/home/Header.css';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
      <header className="header">
        <nav className="nav">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icone">🐾</span>
              <span className="logo-texto"><span className="petestilo">Pet</span>Refugio</span>
            </div>
            <div className="nav-menu">
              <a href="#inicio" className="nav-link">Início</a>
              <a href="#sobre" className="nav-link">Sobre</a>
              <a href="#recursos" className="nav-link">Recursos</a>
            </div>
            <div className="nav-acoes">
            <Link to="/login"><button className="btn">Entrar</button></Link>
            <Link to="/cadastro"><button className="btn">Cadastrar</button></Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  