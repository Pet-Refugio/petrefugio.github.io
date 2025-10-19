// src/components/principal/SidebarAmigos.jsx
import '../../styles/principal/SidebarAmigos.css';
import amigosData from '../../dados/amigos.json';
import { useNavigate } from 'react-router-dom';

export default function SidebarAmigos() {
  const navigate = useNavigate();
  
  // Filtrar amigos online/offline
  const amigosOnline = amigosData.amigos.filter(amigo => amigo.online);
  const amigosOffline = amigosData.amigos.filter(amigo => !amigo.online);

  const handleImageError = (e) => {
    e.target.src = '/images/avatars/default-avatar.jpg';
  };

  const handleAmigoClick = (amigoId) => {
    navigate(`/chat/${amigoId}`);
  };

  const handleNovoChat = () => {
    alert('Funcionalidade de novo chat em desenvolvimento!');
  };

  return (
    <aside className="sidebar-amigos">
      
      {/* Cabeçalho do Chat */}
      <div className="cabecalho-chat">
        <h3>Conversas</h3>
        <button className="botao-novo-chat" onClick={handleNovoChat} title="Nova conversa">
          💬
        </button>
      </div>

      {/* Amigos Online */}
      {amigosOnline.length > 0 && (
        <div className="secao-amigos">
          <h4>Online Agora ({amigosOnline.length})</h4>
          <div className="lista-amigos">
            {amigosOnline.map((amigo) => (
              <div 
                key={amigo.id} 
                className="item-amigo online"
                onClick={() => handleAmigoClick(amigo.id)}
              >
                <div className="avatar-amigo">
                  <img 
                    src={amigo.avatar} 
                    alt={amigo.nome}
                    onError={handleImageError}
                  />
                  <span className="status-online" title="Online"></span>
                </div>
                <span className="nome-amigo">{amigo.nome}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Todos os Amigos */}
      <div className="secao-amigos">
        <h4>Todos os Amigos ({amigosData.amigos.length})</h4>
        <div className="lista-amigos">
          {amigosData.amigos.map((amigo) => (
            <div 
              key={amigo.id} 
              className={`item-amigo ${amigo.online ? 'online' : 'offline'}`}
              onClick={() => handleAmigoClick(amigo.id)}
            >
              <div className="avatar-amigo">
                <img 
                  src={amigo.avatar} 
                  alt={amigo.nome}
                  onError={handleImageError}
                />
                {amigo.online && <span className="status-online" title="Online"></span>}
              </div>
              <span className="nome-amigo">{amigo.nome}</span>
              {!amigo.online && <span className="status-offline" title="Offline"></span>}
            </div>
          ))}
        </div>
      </div>

      {/* Grupos de Pets */}
      <div className="secao-amigos">
        <h4>Grupos de Pets</h4>
        <div className="lista-grupos">
          <div className="item-grupo" onClick={() => alert('Grupo em desenvolvimento!')}>
            <span className="icone-grupo">🐕</span>
            <span className="nome-grupo">Cachorros da Cidade</span>
            <span className="contador-grupo">128</span>
          </div>
          <div className="item-grupo" onClick={() => alert('Grupo em desenvolvimento!')}>
            <span className="icone-grupo">🐈</span>
            <span className="nome-grupo">Amantes de Gatos</span>
            <span className="contador-grupo">95</span>
          </div>
          <div className="item-grupo" onClick={() => alert('Grupo em desenvolvimento!')}>
            <span className="icone-grupo">❤️</span>
            <span className="nome-grupo">Adoção Responsável</span>
            <span className="contador-grupo">203</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
