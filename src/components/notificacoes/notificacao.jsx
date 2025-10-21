import React, { useState, useRef, useEffect } from 'react';
import '../../styles/notificacoes/notificacao.css';

const SinoNotificacoes = () => {
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: 'amizade',
      mensagem: 'Ana Silva aceitou sua solicitação de amizade',
      tempo: '2 min atrás',
      lida: false,
      avatar: '/images/avatars/anasilva.jpg'
    },
    {
      id: 2,
      tipo: 'curtida',
      mensagem: 'Carlos Santos curtiu sua foto com o Thor',
      tempo: '1 hora atrás',
      lida: false,
      avatar: '/images/avatars/carlossantos.jpg'
    },
    {
      id: 3,
      tipo: 'comentario',
      mensagem: 'Maria Oliveira comentou no seu post',
      tempo: '3 horas atrás',
      lida: true,
      avatar: '/images/avatars/mariaoliveira.jpg'
    },
    {
      id: 4,
      tipo: 'sistema',
      mensagem: 'Seu pet Luna completou 1 ano no PetRefugio! 🎉',
      tempo: '1 dia atrás',
      lida: true,
      avatar: null
    },
    {
      id: 5,
      tipo: 'amizade',
      mensagem: 'João Pereira enviou uma solicitação de amizade',
      tempo: '2 dias atrás',
      lida: true,
      avatar: '/images/avatars/joaopereira.jpg'
    }
  ]);

  const modalRef = useRef(null);
  const sinoRef = useRef(null);

  // Fechar modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) &&
          sinoRef.current && !sinoRef.current.contains(event.target)) {
        setNotificacoesAbertas(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotificacoes = () => {
    setNotificacoesAbertas(!notificacoesAbertas);
    
    // Marcar notificações como lidas quando abrir
    if (!notificacoesAbertas) {
      setNotificacoes(notificacoes.map(notif => ({
        ...notif,
        lida: true
      })));
    }
  };

  const getIconePorTipo = (tipo) => {
    switch (tipo) {
      case 'amizade':
        return '👋';
      case 'curtida':
        return '❤️';
      case 'comentario':
        return '💬';
      case 'sistema':
        return '🔔';
      default:
        return '📢';
    }
  };

  const getCorPorTipo = (tipo) => {
    switch (tipo) {
      case 'amizade':
        return '#4CAF50';
      case 'curtida':
        return '#E91E63';
      case 'comentario':
        return '#2196F3';
      case 'sistema':
        return '#FF9800';
      default:
        return '#9C27B0';
    }
  };

  const handleLimparNotificacoes = () => {
    setNotificacoes([]);
  };

  const handleMarcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(notif => ({
      ...notif,
      lida: true
    })));
  };

  const notificacoesNaoLidas = notificacoes.filter(notif => !notif.lida).length;

  return (
    <div className="container-sino-notificacoes">
      {/* Botão do Sino */}
      <button 
        ref={sinoRef}
        className="botao-sino"
        onClick={toggleNotificacoes}
        title="Notificações"
      >
        <span className="icone-sino">🔔</span>
        {notificacoesNaoLidas > 0 && (
          <span className="contador-notificacoes">
            {notificacoesNaoLidas > 9 ? '9+' : notificacoesNaoLidas}
          </span>
        )}
      </button>

      {/* Modal de Notificações */}
      {notificacoesAbertas && (
        <div className="modal-notificacoes-overlay">
          <div 
            ref={modalRef}
            className="modal-notificacoes"
          >
            {/* Cabeçalho */}
            <div className="cabecalho-notificacoes">
              <h3>Notificações</h3>
              <div className="acoes-cabecalho">
                {notificacoesNaoLidas > 0 && (
                  <button 
                    className="botao-marcar-lidas"
                    onClick={handleMarcarTodasComoLidas}
                  >
                    Marcar como lidas
                  </button>
                )}
                {notificacoes.length > 0 && (
                  <button 
                    className="botao-limpar"
                    onClick={handleLimparNotificacoes}
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* Lista de Notificações */}
            <div className="lista-notificacoes">
              {notificacoes.length > 0 ? (
                notificacoes.map(notificacao => (
                  <div 
                    key={notificacao.id}
                    className={`item-notificacao ${notificacao.lida ? 'lida' : 'nao-lida'}`}
                  >
                    <div className="icone-tipo" style={{ backgroundColor: getCorPorTipo(notificacao.tipo) }}>
                      {getIconePorTipo(notificacao.tipo)}
                    </div>
                    
                    <div className="conteudo-notificacao">
                      <div className="mensagem-notificacao">
                        {notificacao.mensagem}
                      </div>
                      <div className="tempo-notificacao">
                        {notificacao.tempo}
                      </div>
                    </div>

                    {notificacao.avatar && (
                      <img 
                        src={notificacao.avatar}
                        alt="Avatar"
                        className="avatar-notificacao"
                        onError={(e) => {
                          e.target.src = '/images/avatars/default-avatar.jpg';
                        }}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="sem-notificacoes">
                  <div className="icone-sem-notificacoes">📭</div>
                  <p>Nenhuma notificação</p>
                  <span>Novas notificações aparecerão aqui</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinoNotificacoes;