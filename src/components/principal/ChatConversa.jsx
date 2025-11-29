// src/components/principal/ChatConversa.jsx - CÓDIGO COMPLETO
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/principal/ChatConversa.css';

// Constantes para respostas automáticas
const RESPOSTAS_AUTOMATICAS = [
  'Que legal! 🐾',
  'Vou ver isso!',
  'Meu pet também adora isso!',
  'Ótima dica! 💡',
  'Vamos marcar um encontro dos pets?',
  'Interessante!',
  'Conte-me mais!',
  'Hahaha que fofo! 😄',
  'Concordo totalmente!',
  'Que bom saber! 🎉'
];

export default function ChatConversa() {
  const { amigoId } = useParams();
  const navigate = useNavigate();
  const { usuarios, usuario: usuarioLogado } = useAuth();
  const [mensagem, setMensagem] = useState('');
  const [conversa, setConversa] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const areaMensagensRef = useRef(null);

  // Encontrar amigo de forma otimizada
  const amigo = useMemo(() => {
    return Object.values(usuarios || {}).find(user => user.username === amigoId);
  }, [usuarios, amigoId]);

  // Carregar dados iniciais
  useEffect(() => {
    const inicializarChat = async () => {
      setCarregando(true);
      
      if (!amigoId || !usuarioLogado) {
        console.log('❌ Dados insuficientes para carregar chat');
        navigate('/principal');
        return;
      }

      // Verificar se o amigo existe e não é o usuário logado
      if (!amigo || amigo.email === usuarioLogado.email) {
        console.log('❌ Amigo não encontrado ou é o próprio usuário');
        navigate('/principal');
        return;
      }

      console.log('✅ Chat carregado com:', amigo.nome);
      
      // Carregar conversa existente do localStorage (simulação)
      const conversaSalva = localStorage.getItem(`chat_${usuarioLogado.username}_${amigo.username}`);
      if (conversaSalva) {
        setConversa(JSON.parse(conversaSalva));
      }
      
      setCarregando(false);
    };

    inicializarChat();
  }, [amigoId, amigo, usuarioLogado, navigate]);

  // Scroll automático para baixo
  useEffect(() => {
    scrollParaBaixo();
  }, [conversa]);

  // Salvar conversa no localStorage quando mudar
  useEffect(() => {
    if (usuarioLogado && amigo && conversa.length > 0) {
      localStorage.setItem(`chat_${usuarioLogado.username}_${amigo.username}`, JSON.stringify(conversa));
    }
  }, [conversa, usuarioLogado, amigo]);

  const scrollParaBaixo = useCallback(() => {
    if (areaMensagensRef.current) {
      areaMensagensRef.current.scrollTop = areaMensagensRef.current.scrollHeight;
    }
  }, []);

  const voltarParaPrincipal = useCallback(() => {
    navigate('/principal');
  }, [navigate]);

  // Simular resposta automática do amigo
  const simularRespostaAmigo = useCallback(() => {
    const respostaAleatoria = RESPOSTAS_AUTOMATICAS[
      Math.floor(Math.random() * RESPOSTAS_AUTOMATICAS.length)
    ];
    
    const resposta = {
      id: Date.now() + 1,
      texto: respostaAleatoria,
      remetente: 'amigo',
      tempo: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      lida: true,
      timestamp: new Date().toISOString()
    };
    
    setConversa(prev => [...prev, resposta]);
  }, []);

  const enviarMensagem = useCallback(async () => {
    if (!mensagem.trim() || !amigo || enviando) return;

    setEnviando(true);
    
    const novaMensagem = {
      id: Date.now(),
      texto: mensagem.trim(),
      remetente: 'eu',
      tempo: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      lida: false,
      timestamp: new Date().toISOString()
    };
    
    setConversa(prev => [...prev, novaMensagem]);
    setMensagem('');
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular resposta automática se o amigo estiver online
    if (amigo.online) {
      setTimeout(simularRespostaAmigo, 2000);
    }
    
    setEnviando(false);
  }, [mensagem, amigo, enviando, simularRespostaAmigo]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  }, [enviarMensagem]);

  const handleImageError = useCallback((e) => {
    console.log('❌ Erro ao carregar avatar, usando placeholder');
    e.target.style.display = 'none';
    
    const parent = e.target.parentNode;
    if (!parent.querySelector('.avatar-placeholder-chat')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'avatar-placeholder-chat';
      placeholder.innerHTML = `<span>${amigo?.nome?.charAt(0)?.toUpperCase() || 'A'}</span>`;
      parent.appendChild(placeholder);
    }
  }, [amigo]);

  // Componente de loading
  if (carregando) {
    return (
      <div className="pagina-chat carregando">
        <div className="carregando-chat">
          <div className="spinner-chat"></div>
          <p>Carregando conversa...</p>
          <button onClick={voltarParaPrincipal} className="botao-voltar-carregando">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  // Componente de erro
  if (!amigo) {
    return (
      <div className="pagina-chat erro">
        <div className="erro-chat">
          <h3>😕 Amigo não encontrado</h3>
          <p>O perfil que você está tentando acessar não existe.</p>
          <button onClick={voltarParaPrincipal} className="botao-voltar-carregando">
            Voltar para Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-chat">
      {/* Header do Chat */}
      <HeaderChat 
        amigo={amigo}
        onVoltar={voltarParaPrincipal}
        onImageError={handleImageError}
      />

      {/* Área de Mensagens */}
      <AreaMensagens 
        ref={areaMensagensRef}
        conversa={conversa}
        amigo={amigo}
      />

      {/* Input de Mensagem */}
      <InputChat 
        mensagem={mensagem}
        setMensagem={setMensagem}
        onEnviar={enviarMensagem}
        onKeyPress={handleKeyPress}
        amigo={amigo}
        enviando={enviando}
      />
    </div>
  );
}

// Componente Header Separado
const HeaderChat = React.memo(({ amigo, onVoltar, onImageError }) => (
  <div className="header-chat">
    <button 
      className="botao-voltar" 
      onClick={onVoltar}
      title="Voltar para a página principal"
      aria-label="Voltar"
    >
      ← Voltar
    </button>
    <div className="info-amigo-chat">
      {amigo.fotoPerfil ? (
        <img 
          src={amigo.fotoPerfil} 
          alt={`Foto de perfil de ${amigo.nome}`}
          className="avatar-chat"
          onError={onImageError}
          loading="lazy"
        />
      ) : (
        <div className="avatar-placeholder-chat">
          <span>{amigo.nome.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="detalhes-amigo">
        <span className="nome-amigo-chat">{amigo.nome}</span>
        <span className={`status-amigo-chat ${amigo.online ? 'online' : 'offline'}`}>
          {amigo.online ? '🟢 Online' : '⚫ Offline'}
          {amigo.ultimoAcesso && !amigo.online && (
            <small> • Visto por último {amigo.ultimoAcesso}</small>
          )}
        </span>
      </div>
    </div>
  </div>
));

// Componente Área de Mensagens
const AreaMensagens = React.memo(({ conversa, amigo }) => (
  <div className="area-mensagens">
    {conversa.length === 0 ? (
      <div className="sem-mensagens">
        <div className="icone-sem-mensagens">💬</div>
        <p>Nenhuma mensagem ainda</p>
        <small>
          {amigo.online 
            ? 'Envie uma mensagem para iniciar a conversa! 🐾' 
            : `${amigo.nome} está offline. Sua mensagem será entregue quando ele estiver online.`}
        </small>
      </div>
    ) : (
      conversa.map((msg) => (
        <Mensagem 
          key={msg.id} 
          mensagem={msg}
          amigoOnline={amigo.online}
        />
      ))
    )}
  </div>
));

// Componente Mensagem Individual
const Mensagem = React.memo(({ mensagem, amigoOnline }) => (
  <div 
    className={`mensagem ${mensagem.remetente === 'eu' ? 'minha-mensagem' : 'mensagem-amigo'}`}
  >
    <div className="conteudo-mensagem">
      <p>{mensagem.texto}</p>
      <div className="info-mensagem">
        <span className="hora-mensagem">{mensagem.tempo}</span>
        {mensagem.remetente === 'eu' && (
          <span className="status-envio">
            {amigoOnline ? '✓✓' : '✓'}
          </span>
        )}
      </div>
    </div>
  </div>
));

// Componente Input de Chat
const InputChat = React.memo(({ mensagem, setMensagem, onEnviar, onKeyPress, amigo, enviando }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setMensagem(e.target.value);
    
    // Auto-ajustar altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleEnviarClick = () => {
    onEnviar();
    // Resetar altura do textarea após envio
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="input-chat">
      <div className="acoes-rapidas">
        <button type="button" className="botao-acao-chat" title="Enviar imagem" disabled={enviando}>
          📷
        </button>
        <button type="button" className="botao-acao-chat" title="Emojis" disabled={enviando}>
          😊
        </button>
        <button type="button" className="botao-acao-chat" title="Enviar localização" disabled={enviando}>
          📍
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={mensagem}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        placeholder={
          amigo.online 
            ? "Digite sua mensagem..." 
            : `${amigo.nome} está offline. Sua mensagem será entregue quando ele estiver online...`
        }
        className="input-mensagem"
        rows="1"
        disabled={enviando}
      />
      <button 
        onClick={handleEnviarClick}
        disabled={!mensagem.trim() || enviando}
        className="botao-enviar"
        title={enviando ? 'Enviando...' : 'Enviar mensagem'}
      >
        {enviando ? '⏳' : (amigo.online ? '➤' : '📨')}
      </button>
    </div>
  );
});
