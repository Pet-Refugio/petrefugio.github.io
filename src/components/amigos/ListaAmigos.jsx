import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/amigos/ListaAmigos.css';
import HeaderPrincipal from '../principal/Header';
import amigosData from '../../dados/amigos.json';

const ListaAmigos = () => {
  const [amigos, setAmigos] = useState(amigosData.amigos);
  const [amigoParaRemover, setAmigoParaRemover] = useState(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const navigate = useNavigate();

  const handleImageError = (e) => {
    console.log('❌ Avatar não carregou, usando placeholder');
    const parent = e.target.parentNode;
    const nome = e.target.alt || 'Usuário';
    const inicial = nome.charAt(0).toUpperCase();
    
    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder';
    placeholder.innerHTML = `<span>${inicial}</span>`;
    placeholder.style.cssText = `
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F26B38, #FF9D71);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    `;
    
    e.target.style.display = 'none';
    parent.appendChild(placeholder);
  };

  const handleAbrirChat = (amigoId) => {
    navigate(`/chat/${amigoId}`);
  };

  const handleVerPerfil = (amigoId) => {
    navigate(`/perfil/publico/${amigoId}`);
  };

  const handleRemoverAmigo = (amigo) => {
    setAmigoParaRemover(amigo);
    setMostrarConfirmacao(true);
  };

  const confirmarRemocao = () => {
    if (amigoParaRemover) {
      setAmigos(amigos.filter(amigo => amigo.id !== amigoParaRemover.id));
      setMostrarConfirmacao(false);
      setAmigoParaRemover(null);
    }
  };

  const cancelarRemocao = () => {
    setMostrarConfirmacao(false);
    setAmigoParaRemover(null);
  };

  const getStatusColor = (online) => {
    return online ? '#4CAF50' : '#9E9E9E';
  };

  const getStatusText = (online, ultimaVez) => {
    return online ? 'Online' : `Visto ${ultimaVez}`;
  };

  return (
    <div className="pagina-amigos">
      <HeaderPrincipal />
      <div className="container-amigos">
        
        <div className="cabecalho-amigos">
          <h1>Meus Amigos</h1>
          <p>{amigos.length} amigos conectados</p>
        </div>

        <div className="lista-amigos">
          {amigos.map(amigo => (
            <div key={amigo.id} className="card-amigo">
              
              <div className="info-amigo">
                <div className="avatar-container">
                  <img 
                    src={amigo.avatar} 
                    alt={amigo.nome}
                    className="avatar-amigo"
                    onError={handleImageError}
                    onClick={() => handleVerPerfil(amigo.id)}
                  />
                  <div 
                    className="status-indicador"
                    style={{ backgroundColor: getStatusColor(amigo.online) }}
                  ></div>
                </div>

                <div className="detalhes-amigo">
                  <h3 
                    className="nome-amigo"
                    onClick={() => handleVerPerfil(amigo.id)}
                  >
                    {amigo.nome}
                  </h3>
                  <p className="status-amigo">
                    {getStatusText(amigo.online, amigo.ultimaVez)}
                  </p>
                  <div className="info-adicional">
                    <span className="pets-amigo">
                      🐾 {amigo.pets ? amigo.pets.join(', ') : 'Sem pets'}
                    </span>
                    <span className="amigos-mutuos">
                      {amigo.mutualFriends} amigos em comum
                    </span>
                  </div>
                </div>
              </div>

              <div className="acoes-amigo">
                <button 
                  className="botao-chat"
                  onClick={() => handleAbrirChat(amigo.id)}
                  title="Enviar mensagem"
                >
                  💬 Chat
                </button>
                <button 
                  className="botao-remover"
                  onClick={() => handleRemoverAmigo(amigo)}
                  title="Remover amigo"
                >
                  🗑️ Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {mostrarConfirmacao && (
          <div className="modal-overlay">
            <div className="modal-confirmacao">
              <div className="modal-cabecalho">
                <h3>Remover Amigo</h3>
              </div>
              
              <div className="modal-conteudo">
                <p>
                  Tem certeza que deseja remover <strong>{amigoParaRemover?.nome}</strong> da sua lista de amigos?
                </p>
                <div className="info-remocao">
                  <span>⚠️ Esta ação não pode ser desfeita</span>
                </div>
              </div>

              <div className="modal-acoes">
                <button 
                  className="botao-cancelar"
                  onClick={cancelarRemocao}
                >
                  Cancelar
                </button>
                <button 
                  className="botao-confirmar"
                  onClick={confirmarRemocao}
                >
                  Sim, Remover
                </button>
              </div>
            </div>
          </div>
        )}

        {amigos.length === 0 && (
          <div className="sem-amigos">
            <div className="icone-sem-amigos">👥</div>
            <h3>Nenhum amigo encontrado</h3>
            <p>Adicione amigos para começar a conversar!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListaAmigos;