// src/components/amigos/ListaAmigos.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 🔧 IMPORTAR useAuth
import '../../styles/amigos/ListaAmigos.css';
import HeaderPrincipal from '../principal/Header';

const ListaAmigos = () => {
  const { usuarios, usuario: usuarioLogado } = useAuth(); // 🔧 USAR DADOS REAIS
  const navigate = useNavigate();
  const [amigoParaRemover, setAmigoParaRemover] = useState(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  // 🔧 CORREÇÃO: Usar usuários reais do sistema como "amigos"
  const amigos = Object.values(usuarios || {})
    .filter(user => user.email !== usuarioLogado?.email)
    .filter(user => user.tipo !== 'admin');

  const handleImageError = (e, nome) => {
    console.log('❌ Avatar não carregou, usando placeholder');
    const parent = e.target.parentNode;
    const inicial = nome ? nome.charAt(0).toUpperCase() : 'U';
    
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

  const handleAbrirChat = (amigoUsername) => {
    // 🔧 CORREÇÃO: Usar username para navegação
    navigate(`/chat/${amigoUsername}`);
  };

  const handleVerPerfil = (amigoUsername) => {
    // 🔧 CORREÇÃO: Usar username para perfil público
    navigate(`/perfil/publico/${amigoUsername}`);
  };

  const handleRemoverAmigo = (amigo) => {
    setAmigoParaRemover(amigo);
    setMostrarConfirmacao(true);
  };

  const confirmarRemocao = () => {
    if (amigoParaRemover) {
      // 🔧 CORREÇÃO: Em um sistema real, aqui faria uma chamada API
      // Para demo, apenas remove do estado local
      setMostrarConfirmacao(false);
      setAmigoParaRemover(null);
      alert(`${amigoParaRemover.nome} removido dos amigos (em um sistema real)`);
    }
  };

  const cancelarRemocao = () => {
    setMostrarConfirmacao(false);
    setAmigoParaRemover(null);
  };

  const getStatusColor = (online) => {
    return online ? '#4CAF50' : '#9E9E9E';
  };

  const getStatusText = (online) => {
    return online ? 'Online' : 'Offline';
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
            <div key={amigo.email} className="card-amigo"> {/* 🔧 KEY por email */}
              
              <div className="info-amigo">
                <div className="avatar-container">
                  <img 
                    src={amigo.fotoPerfil || '/images/avatars/default.jpg'} 
                    alt={amigo.nome}
                    className="avatar-amigo"
                    onError={(e) => handleImageError(e, amigo.nome)}
                    onClick={() => handleVerPerfil(amigo.username)}
                  />
                  <div 
                    className="status-indicador"
                    style={{ backgroundColor: getStatusColor(amigo.online) }}
                  ></div>
                </div>

                <div className="detalhes-amigo">
                  <h3 
                    className="nome-amigo"
                    onClick={() => handleVerPerfil(amigo.username)}
                    style={{cursor: 'pointer'}}
                  >
                    {amigo.nome}
                  </h3>
                  <p className="status-amigo">
                    {getStatusText(amigo.online)}
                  </p>
                  <div className="info-adicional">
                    <span className="pets-amigo">
                      🐾 {amigo.pets?.length || 0} pets
                    </span>
                    <span className="amigos-mutuos">
                      {amigo.seguidores?.length || 0} seguidores
                    </span>
                  </div>
                </div>
              </div>

              <div className="acoes-amigo">
                <button 
                  className="botao-chat"
                  onClick={() => handleAbrirChat(amigo.username)}
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
