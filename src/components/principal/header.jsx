// src/components/principal/header.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles//principal/header.css';

const Header = ({ usuario }) => {
  const { logout } = useAuth();

  return (
    <header className="header-principal">
      <div className="logo-header">
        <span className="logo-icone">🐾</span>
        <span className="logo-texto">PetRefugio</span>
      </div>
      <div className="usuario-header">        
        <div className="acoes-header">
          <button 
            onClick={() => window.location.href = '/perfil'}
            className="botao-header botao-perfil"
          >
            Meu Perfil
          </button>
          
          {usuario.tipo === 'admin' && (
            <button 
              onClick={() => window.location.href = '/admin'}
              className="botao-header botao-admin"
            >
              Admin
            </button>
          )}
          
          <button 
            onClick={logout}
            className="botao-header botao-sair"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;