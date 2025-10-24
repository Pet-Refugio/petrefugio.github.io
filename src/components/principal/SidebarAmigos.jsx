import { useNavigate } from 'react-router-dom';
import '../../styles/principal/SidebarAmigos.css';
import amigosData from '../../dados/amigos.json';

export default function SidebarAmigos() {
  const navigate = useNavigate();
  
  const amigosOnline = amigosData.amigos.filter(amigo => amigo.online);

  const handleImageError = (e) => {
    console.log('❌ Avatar não carregou, usando placeholder');
    const parent = e.target.parentNode;
    const nome = e.target.alt || 'Usuário';
    const inicial = nome.charAt(0).toUpperCase();
    
    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder';
    placeholder.innerHTML = `<span>${inicial}</span>`;
    placeholder.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F26B38, #FF9D71);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 16px;
    `;
    
    e.target.style.display = 'none';
    parent.appendChild(placeholder);
  };

  const handleAmigoClick = (amigoId) => {
    navigate(`/perfil/publico/${amigoId}`);
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
            </div>
          ))}
        </div>
      </div>

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
        </div>
      </div>

    </aside>
  );
}