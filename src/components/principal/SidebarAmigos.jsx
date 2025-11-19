// src/components/principal/SidebarAmigos.jsx
import React  from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/principal/SidebarAmigos.css';

export default function SidebarAmigos({ usuario }) {
  const navigate = useNavigate();
  const { usuarios } = useAuth();

  // Amigos online (usuários que o usuário atual segue)
  const amigosOnline = usuario?.seguindo?.filter(email => {
    const amigo = usuarios[email];
    return amigo && amigo.online;
  }) || [];

  // Todos os amigos (usuários que o usuário atual segue)
  const todosAmigos = usuario?.seguindo?.map(email => usuarios[email]).filter(Boolean) || [];

  const handleImageError = (e, nome) => {
    const parent = e.target.parentNode;
    const inicial = nome ? nome.charAt(0).toUpperCase() : 'U';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder';
    placeholder.innerHTML = `<span>${inicial}</span>`;
    
    e.target.style.display = 'none';
    parent.appendChild(placeholder);
  };

  const handleAmigoClick = (email) => {
    navigate(`/perfil/publico/${email}`);
  };

  const handleNovoChat = () => {
    alert('Funcionalidade de novo chat em desenvolvimento!');
  };

  return (
    <aside className="sidebar-amigos">
      
      <div className="cabecalho-chat">
        <h3>Conversas</h3>
        <button className="botao-novo-chat" onClick={handleNovoChat} title="Nova conversa">
          💬
        </button>
      </div>

      {amigosOnline.length > 0 && (
        <div className="secao-amigos">
          <h4>Online Agora ({amigosOnline.length})</h4>
          <div className="lista-amigos">
            {amigosOnline.map(email => {
              const amigo = usuarios[email];
              if (!amigo) return null;
              
              return (
                <div 
                  key={email} 
                  className="item-amigo online"
                  onClick={() => handleAmigoClick(email)}
                >
                  <div className="avatar-amigo">
                    {amigo.fotoPerfil ? (
                      <img 
                        src={amigo.fotoPerfil} 
                        alt={amigo.nome}
                        onError={(e) => handleImageError(e, amigo.nome)}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        <span>{amigo.nome ? amigo.nome.charAt(0).toUpperCase() : 'U'}</span>
                      </div>
                    )}
                    <span className="status-online" title="Online"></span>
                  </div>
                  <span className="nome-amigo">{amigo.nome}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="secao-amigos">
        <h4>Todos os Amigos ({todosAmigos.length})</h4>
        <div className="lista-amigos">
          {todosAmigos.map(amigo => (
            <div 
              key={amigo.email} 
              className={`item-amigo ${amigo.online ? 'online' : 'offline'}`}
              onClick={() => handleAmigoClick(amigo.email)}
            >
              <div className="avatar-amigo">
                {amigo.fotoPerfil ? (
                  <img 
                    src={amigo.fotoPerfil} 
                    alt={amigo.nome}
                    onError={(e) => handleImageError(e, amigo.nome)}
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <span>{amigo.nome ? amigo.nome.charAt(0).toUpperCase() : 'U'}</span>
                  </div>
                )}
                {amigo.online && <span className="status-online" title="Online"></span>}
              </div>
              <span className="nome-amigo">{amigo.nome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="secao-amigos">
        <h4>Grupos de Pets</h4>
        <div className="lista-grupos">
          <Link to="servicos">
          <div className="item-grupo">
            <span className="icone-grupo">🏪</span>
            <span className="nome-grupo">Serviços</span>
          </div>
          </Link>
          <div className="item-grupo" onClick={() => alert('Grupo em desenvolvimento!')}>
            <span className="icone-grupo">🐕</span>
            <span className="nome-grupo">Cachorros da Cidade</span>
            <span className="contador-grupo">128</span>
          </div>
          <div className="item-grupo" onClick={() => alert('Grupo em desenvolvimento!')}>
            <span className="icone-grupo">🐦</span>
            <span className="nome-grupo">Pássaros e Aves</span>
            <span className="contador-grupo">42</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
