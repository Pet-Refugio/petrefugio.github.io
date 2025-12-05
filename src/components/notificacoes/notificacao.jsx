import { useState, useRef, useEffect } from 'react';
import '../../styles/notificacoes/Sinonotificacoes.css';

export default function SinoNotificacoes() {
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: 'amizade',
      mensagem: 'Ana Silva enviou uma solicitação de amizade',
      tempo: '2 min atrás',
      lida: false
    },
    {
      id: 2,
      tipo: 'curtida',
      mensagem: 'Carlos Santos curtiu seu post',
      tempo: '1 hora atrás',
      lida: false
    },
    {
      id: 3,
      tipo: 'comentario',
      mensagem: 'Maria Oliveira comentou no seu post',
      tempo: '3 horas atrás',
      lida: true
    }
  ]);

  const modalRef = useRef(null);
  const botaoRef = useRef(null);

  const toggleNotificacoes = () => {
    setNotificacoesAbertas(!notificacoesAbertas);
  };

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map(notif => 
      notif.id === id ? { ...notif, lida: true } : notif
    ));
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(notif => ({ ...notif, lida: true })));
  };

  const limparNotificacoes = () => {
    setNotificacoes([]);
  };

  useEffect(() => {
    const handleClickFora = (event) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target) &&
        botaoRef.current &&
        !botaoRef.current.contains(event.target)
      ) {
        setNotificacoesAbertas(false);
      }
    };

    if (notificacoesAbertas) {
      document.addEventListener('mousedown', handleClickFora);
      // Prevenir scroll do body quando modal estiver aberto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickFora);
      document.body.style.overflow = 'unset';
    };
  }, [notificacoesAbertas]);

  const notificacoesNaoLidas = notificacoes.filter(notif => !notif.lida).length;

  return (
    <div className="container-sino-notificacoes">
      <button 
        ref={botaoRef}
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

      {notificacoesAbertas && (
        <div className="modal-notificacoes-overlay">
          <div className="modal-notificacoes" ref={modalRef}>
            <div className="cabecalho-notificacoes">
              <h3>Notificações</h3>
              <div className="acoes-cabecalho">
                {notificacoesNaoLidas > 0 && (
                  <button 
                    className="botao-marcar-lidas"
                    onClick={marcarTodasComoLidas}
                  >
                    Marcar como lidas
                  </button>
                )}
                {notificacoes.length > 0 && (
                  <button 
                    className="botao-limpar"
                    onClick={limparNotificacoes}
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
            
            <div className="lista-notificacoes">
              {notificacoes.length > 0 ? (
                notificacoes.map(notificacao => (
                  <div 
                    key={notificacao.id} 
                    className={`item-notificacao ${notificacao.lida ? '' : 'nao-lida'}`}
                    onClick={() => marcarComoLida(notificacao.id)}
                  >
                    <div className="icone-tipo">
                      {notificacao.tipo === 'amizade' && '👤'}
                      {notificacao.tipo === 'curtida' && '❤️'}
                      {notificacao.tipo === 'comentario' && '💬'}
                    </div>
                    <div className="conteudo-notificacao">
                      <p className="mensagem-notificacao">{notificacao.mensagem}</p>
                      <span className="tempo-notificacao">{notificacao.tempo}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="sem-notificacoes">
                  <div className="icone-sem-notificacoes">🔔</div>
                  <p>Nenhuma notificação</p>
                  <span>Novas notificações aparecerão aqui</span>
                </div>
              )}
            </div>

            {notificacoes.length > 0 && (
              <div className="rodape-notificacoes">
                <button className="botao-ver-todas">
                  Ver todas as notificações
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}