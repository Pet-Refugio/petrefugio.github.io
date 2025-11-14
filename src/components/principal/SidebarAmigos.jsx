// src/components/principal/SidebarAmigos.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/principal/SidebarAmigos.css';

const SidebarAmigos = ({ usuario }) => {
  const { usuarios, seguirUsuario, deixarSeguir } = useAuth();

  const estaSeguindo = (emailUsuario) => {
    return usuario.seguindo.includes(emailUsuario);
  };

  return (
    <div className="sidebar-amigos">
      {/* Perfil Resumido */}
      <div className="card-perfil-resumo">
        <div className="avatar-resumo">
          <span className="icone-avatar">👤</span>
        </div>
        <div className="info-resumo">
          <strong>{usuario.nome}</strong>
          <span>@{usuario.username}</span>
          <div className="estatisticas-resumo">
            <div className="estatistica">
              <span className="numero">{usuario.seguidores.length}</span>
              <span className="label">seguidores</span>
            </div>
            <div className="estatistica">
              <span className="numero">{usuario.seguindo.length}</span>
              <span className="label">seguindo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sugestões para Seguir */}
      <div className="card-sugestoes">
        <h3 className="titulo-sugestoes">Quem Seguir</h3>
        
        {Object.entries(usuarios)
          .filter(([email]) => email !== usuario.email && !usuario.seguindo.includes(email))
          .slice(0, 5)
          .map(([email, user]) => (
            <div key={email} className="sugestao-usuario">
              <div className="info-sugestao">
                <span className="avatar-sugestao">👤</span>
                <div className="detalhes-sugestao">
                  <strong>{user.nome}</strong>
                  <span>@{user.username}</span>
                </div>
              </div>
              <button 
                onClick={() => seguirUsuario(email)}
                className="botao-seguir"
              >
                Seguir
              </button>
            </div>
          ))
        }
      </div>

      {/* Amigos que você segue */}
      <div className="card-amigos-seguindo">
        <h3 className="titulo-amigos">Seguindo</h3>
        
        {usuario.seguindo.length === 0 ? (
          <p className="sem-amigos">Ainda não segue ninguém</p>
        ) : (
          usuario.seguindo.slice(0, 5).map(email => {
            const user = usuarios[email];
            if (!user) return null;
            
            return (
              <div key={email} className="amigo-seguindo">
                <div className="info-amigo">
                  <span className="avatar-amigo">👤</span>
                  <div className="detalhes-amigo">
                    <strong>{user.nome}</strong>
                    <span>@{user.username}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deixarSeguir(email)}
                  className="botao-deixar-seguir"
                >
                  Seguindo
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SidebarAmigos;