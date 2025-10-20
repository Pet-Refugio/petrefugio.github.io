// src/components/principal/ChatConversa.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/principal/ChatConversa.css';
import amigosData from '../../dados/amigos.json';
import { chatService } from '../../services/chatService';

export default function ChatConversa() {
  const { amigoId } = useParams();
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState([]);
  const [amigo, setAmigo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const areaMensagensRef = useRef(null);

  useEffect(() => {
    carregarAmigo();
  }, [amigoId]);

  useEffect(() => {
    scrollParaBaixo();
  }, [conversa]);

  const carregarAmigo = async () => {
    if (!amigoId) return;
    
    setCarregando(true);
    
    try {
      const amigoEncontrado = amigosData.amigos.find(a => a.id === parseInt(amigoId));
      if (amigoEncontrado) {
        setAmigo(amigoEncontrado);
        setConversa([]);
      } else {
        navigate('/principal');
      }
    } catch (error) {
      console.error('Erro ao carregar amigo:', error);
    } finally {
      setCarregando(false);
    }
  };

  const scrollParaBaixo = () => {
    if (areaMensagensRef.current) {
      areaMensagensRef.current.scrollTop = areaMensagensRef.current.scrollHeight;
    }
  };

  const voltarParaPrincipal = () => {
    navigate('/principal');
  };

  const enviarMensagem = async () => {
    if (mensagem.trim()) {
      try {
        const resultado = await chatService.enviarMensagem(amigoId, mensagem);
        if (resultado.success) {
          setConversa(prev => [...prev, resultado.data]);
          setMensagem('');
          
          // SÓ RESPONDE SE O AMIGO ESTIVER ONLINE
          if (amigo && amigo.online) {
            setTimeout(async () => {
              const respostas = [
                'Que legal! 🐾',
                'Vou ver isso!',
                'Meu pet também adora isso!',
                'Ótima dica! 💡',
                'Vamos marcar um encontro dos pets?',
                'Interessante!',
                'Conte-me mais!',
                'Hahaha que fofo! 😄'
              ];
              const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];
              
              const resposta = await chatService.enviarMensagem(amigoId, respostaAleatoria);
              if (resposta.success) {
                setConversa(prev => [...prev, { ...resposta.data, remetente: 'amigo' }]);
              }
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        alert('Erro ao enviar mensagem. Tente novamente.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/images/avatars/default-avatar.jpg';
  };

  if (carregando) {
    return (
      <div className="pagina-chat carregando">
        <div className="carregando-chat">
          <p>Carregando conversa...</p>
          <button onClick={voltarParaPrincipal} className="botao-voltar-carregando">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!amigo) {
    return (
      <div className="pagina-chat erro">
        <div className="erro-chat">
          <p>Amigo não encontrado</p>
          <button onClick={voltarParaPrincipal}>Voltar para Principal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-chat">
      
      {/* Header do Chat - COM BOTÃO VOLTAR */}
      <div className="header-chat">
        <button 
          className="botao-voltar" 
          onClick={voltarParaPrincipal}
          title="Voltar para o feed principal"
        >
          ← Voltar para o Feed
        </button>
        <div className="info-amigo-chat">
          <img 
            src={amigo.avatar} 
            alt={amigo.nome}
            className="avatar-chat"
            onError={handleImageError}
          />
          <div className="detalhes-amigo">
            <span className="nome-amigo-chat">{amigo.nome}</span>
            <span className="status-amigo-chat">
              {amigo.online ? '🟢 Online' : '⚫ Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="area-mensagens" ref={areaMensagensRef}>
        {conversa.length === 0 ? (
          <div className="sem-mensagens">
            <p>Nenhuma mensagem ainda</p>
            <small>
              {amigo.online 
                ? 'Envie uma mensagem para iniciar a conversa! 🐾' 
                : `${amigo.nome} está offline. Sua mensagem será entregue quando ele estiver online.`}
            </small>
          </div>
        ) : (
          conversa.map((msg) => (
            <div 
              key={msg.id} 
              className={`mensagem ${msg.remetente === 'eu' ? 'minha-mensagem' : 'mensagem-amigo'}`}
            >
              <div className="conteudo-mensagem">
                <p>{msg.texto}</p>
                <span className="hora-mensagem">{msg.tempo}</span>
                {!msg.lida && msg.remetente === 'eu' && (
                  <span className="status-envio">
                    {amigo.online ? '✓' : '⌛'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input de Mensagem */}
      <div className="input-chat">
        <div className="acoes-rapidas">
          <button type="button" className="botao-acao-chat" title="Enviar imagem">📷</button>
          <button type="button" className="botao-acao-chat" title="Enviar figurinha">🎵</button>
          <button type="button" className="botao-acao-chat" title="Emojis">😊</button>
        </div>
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            amigo.online 
              ? "Digite sua mensagem..." 
              : `${amigo.nome} está offline. Digite uma mensagem...`
          }
          className="input-mensagem"
          rows="1"
        />
        <button 
          onClick={enviarMensagem}
          disabled={!mensagem.trim()}
          className="botao-enviar"
          title={amigo.online ? "Enviar mensagem" : "Enviar mensagem (offline)"}
        >
          {amigo.online ? '➤' : '⏳'}
        </button>
      </div>

    </div>
  );
}
