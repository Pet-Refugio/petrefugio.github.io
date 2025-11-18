import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/principal/ChatConversa.css';
import amigosData from '../../dados/amigos.json';

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

  const carregarAmigo = () => {
    if (!amigoId) {
      console.log('❌ amigoId não encontrado nos parâmetros');
      navigate('/principal');
      return;
    }
    
    setCarregando(true);
    
    // Converter para número e buscar o amigo
    const id = parseInt(amigoId);
    
    if (isNaN(id)) {
      console.log('❌ amigoId inválido:', amigoId);
      navigate('/principal');
      return;
    }

    const amigoEncontrado = amigosData.amigos.find(a => a.id === id);
    
    if (amigoEncontrado) {
      console.log('✅ Amigo encontrado:', amigoEncontrado.nome);
      setAmigo(amigoEncontrado);
      
      // Inicializar conversa vazia
      setConversa([]);
    } else {
      console.log('❌ Amigo não encontrado com ID:', id);
      navigate('/principal');
    }
    
    setCarregando(false);
  };

  const scrollParaBaixo = () => {
    if (areaMensagensRef.current) {
      areaMensagensRef.current.scrollTop = areaMensagensRef.current.scrollHeight;
    }
  };

  const voltarParaPrincipal = () => {
    navigate('/principal');
  };

  // Serviço de chat simplificado (sem API)
  const chatService = {
    enviarMensagem: (amigoId, texto) => {
      return new Promise((resolve) => {
        const novaMensagem = {
          id: Date.now(),
          texto: texto,
          remetente: 'eu',
          tempo: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          lida: false
        };
        
        resolve({
          success: true,
          data: novaMensagem
        });
      });
    }
  };

  const enviarMensagem = async () => {
    if (mensagem.trim() && amigo) {
      try {
        const resultado = await chatService.enviarMensagem(amigo.id, mensagem);
        if (resultado.success) {
          setConversa(prev => [...prev, resultado.data]);
          setMensagem('');
          
          // Simular resposta automática se o amigo estiver online
          if (amigo.online) {
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
              
              const resposta = {
                id: Date.now() + 1,
                texto: respostaAleatoria,
                remetente: 'amigo',
                tempo: new Date().toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }),
                lida: true
              };
              
              setConversa(prev => [...prev, resposta]);
            }, 2000);
          }
        }
      } catch (error) {
        console.log('❌ Erro ao enviar mensagem:', error);
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
    console.log('❌ Avatar do chat não carregou:', e.target.src);
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
      
      {/* Header do Chat */}
      <div className="header-chat">
        <button 
          className="botao-voltar" 
          onClick={voltarParaPrincipal}
          title="Voltar"
        >
          ← Voltar
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
                {msg.remetente === 'eu' && (
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
        >
          {amigo.online ? '➤' : '⏳'}
        </button>
      </div>

    </div>
  );
}