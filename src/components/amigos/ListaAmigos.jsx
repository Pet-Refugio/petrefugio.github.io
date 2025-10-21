import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../../styles/amigos/ListaAmigos.css';
import Header from '../home/Header';
import HeaderPerfil from '../perfil/HeaderPerfil';
import HeaderPrincipal from '../principal/header';

const ListaAmigos = () => {
  const [amigos, setAmigos] = useState([
    {
      id: 1,
      nome: 'Ana Silva',
      avatar: '/images/avatars/anasilva.jpg',
      online: true,
      ultimaVez: '2 min atrás',
      pets: ['Luna', 'Thor'],
      mutualFriends: 12
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      avatar: '/images/avatars/carlossantos.jpg',
      online: false,
      ultimaVez: '1 hora atrás',
      pets: ['Rex'],
      mutualFriends: 8
    },
    {
      id: 3,
      nome: 'Maria Oliveira',
      avatar: '/images/avatars/mariaoliveira.jpg',
      online: true,
      ultimaVez: 'Agora',
      pets: ['Mel', 'Bob'],
      mutualFriends: 15
    },
    {
      id: 4,
      nome: 'João Pereira',
      avatar: '/images/avatars/joaopereira.jpg',
      online: false,
      ultimaVez: '3 horas atrás',
      pets: ['Luna'],
      mutualFriends: 5
    },
    {
      id: 5,
      nome: 'Juliana Costa',
      avatar: '/images/avatars/julianacosta.jpg',
      online: true,
      ultimaVez: '10 min atrás',
      pets: ['Thor', 'Bella'],
      mutualFriends: 9
    },
    {
      id: 6,
      nome: 'Pedro Alves',
      avatar: '/images/avatars/pedroalves.jpg',
      online: false,
      ultimaVez: '1 dia atrás',
      pets: ['Max'],
      mutualFriends: 3
    }
  ]);

  const [amigoParaRemover, setAmigoParaRemover] = useState(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const navigate = useNavigate();

  const handleAbrirChat = (amigoId) => {
    console.log('Abrindo chat com amigo:', amigoId);
    // Navegar para a tela de chat
    navigate(`/chat/${amigoId}`);
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
      console.log('Amigo removido:', amigoParaRemover.nome);
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
        
        {/* Cabeçalho */}
        <div className="cabecalho-amigos">
          <h1>Meus Amigos</h1>
          <p>{amigos.length} amigos conectados</p>
        </div>

        {/* Lista de Amigos */}
        <div className="lista-amigos">
          {amigos.map(amigo => (
            <div key={amigo.id} className="card-amigo">
              
              {/* Informações do Amigo */}
              <div className="info-amigo">
                <div className="avatar-container">
                  <img 
                    src={amigo.avatar} 
                    alt={amigo.nome}
                    className="avatar-amigo"
                    onError={(e) => {
                      e.target.src = '/images/avatars/default-avatar.jpg';
                    }}
                  />
                  <div 
                    className="status-indicador"
                    style={{ backgroundColor: getStatusColor(amigo.online) }}
                  ></div>
                </div>

                <div className="detalhes-amigo">
                  <h3 className="nome-amigo">{amigo.nome}</h3>
                  <p className="status-amigo">
                    {getStatusText(amigo.online, amigo.ultimaVez)}
                  </p>
                  <div className="info-adicional">
                    <span className="pets-amigo">
                      🐾 {amigo.pets.join(', ')}
                    </span>
                    <span className="amigos-mutuos">
                      {amigo.mutualFriends} amigos em comum
                    </span>
                  </div>
                </div>
              </div>

              {/* Ações */}
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

        {/* Modal de Confirmação */}
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

        {/* Mensagem quando não há amigos */}
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