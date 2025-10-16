import '../../styles/principal/SidebarAmigos.css';
import amigosData from '../../dados/amigos.json';

export default function SidebarAmigos() {
  const amigosOnline = amigosData.amigos.filter(amigo => amigo.online);
  const amigosOffline = amigosData.amigos.filter(amigo => !amigo.online);

  const handleImageError = (e) => {
    e.target.src = '/images/avatars/default-avatar.jpg';
  };

  return (
    <aside className="sidebar-amigos">
      
      {/* Cabeçalho do Chat */}
      <div className="cabecalho-chat">
        <h3>Chat</h3>
        <button className="botao-novo-chat">💬</button>
      </div>

      {/* Amigos Online */}
      <div className="secao-amigos">
        <h4>Online Agora ({amigosOnline.length})</h4>
        <div className="lista-amigos">
          {amigosOnline.map((amigo) => (
            <div key={amigo.id} className="item-amigo online">
              <div className="avatar-amigo">
                <img 
                  src={amigo.avatar} 
                  alt={amigo.nome}
                  onError={handleImageError}
                />
                <span className="status-online"></span>
              </div>
              <span className="nome-amigo">{amigo.nome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Todos os Amigos */}
      <div className="secao-amigos">
        <h4>Todos os Amigos ({amigosData.amigos.length})</h4>
        <div className="lista-amigos">
          {amigosData.amigos.map((amigo) => (
            <div key={amigo.id} className={`item-amigo ${amigo.online ? 'online' : ''}`}>
              <div className="avatar-amigo">
                <img 
                  src={amigo.avatar} 
                  alt={amigo.nome}
                  onError={handleImageError}
                />
                {amigo.online && <span className="status-online"></span>}
              </div>
              <span className="nome-amigo">{amigo.nome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grupos de Pets */}
      <div className="secao-amigos">
        <h4>Grupos de Pets</h4>
        <div className="lista-grupos">
          <div className="item-grupo">
            <span className="icone-grupo">🐕</span>
            <span className="nome-grupo">Cachorros da Cidade</span>
          </div>
          <div className="item-grupo">
            <span className="icone-grupo">🐈</span>
            <span className="nome-grupo">Amantes de Gatos</span>
          </div>
          <div className="item-grupo">
            <span className="icone-grupo">❤️</span>
            <span className="nome-grupo">Adoção Responsável</span>
          </div>
        </div>
      </div>

    </aside>
  );
}