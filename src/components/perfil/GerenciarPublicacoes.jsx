import '../../styles/perfil/GerenciarPublicacoes.css';
import { useState, useEffect } from 'react';
import HeaderPerfil from './HeaderPerfil';

const GerenciarPublicacoes = () => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [publicacaoParaExcluir, setPublicacaoParaExcluir] = useState(null);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const usuarioAtualId = 1; 

  useEffect(() => {
    carregarPublicacoes();
  }, []);

  const carregarPublicacoes = () => {
    try {
      setCarregando(true);
      
      const todasPublicacoes = JSON.parse(localStorage.getItem('postsPetRefugio') || '[]');
      
      let postsParaUsar = todasPublicacoes;
      if (todasPublicacoes.length === 0) {
        const postsIniciais = [
          {
            id: 1,
            usuarioId: 101,
            usuario: {
              id: 101,
              nome: "Ana Silva",
              avatar: "/images/avatars/anasilva.jpg",
              tipo: "usuario"
            },
            conteudo: {
              texto: "Meu gatinho acabou de fazer 1 ano! 🎉 Comemorem com a gente!",
              midia: {
                tipo: "imagem",
                url: "/images/posts/gatopost1_anasilva.jpg",
                alt: "Gato de aniversário com chapéu"
              }
            },
            engajamento: { curtidas: 24, comentarios: 8, compartilhamentos: 3 },
            data: "2024-03-15T10:30:00Z",
            localizacao: "São Paulo, SP",
            hashtags: ["#gato", "#aniversario", "#pet"]
          },
          {
            id: 2,
            usuarioId: 102, // OUTRO USUÁRIO
            usuario: {
              id: 102,
              nome: "Carlos Santos",
              avatar: "/images/avatars/carlossantos.jpg",
              tipo: "usuario"
            },
            conteudo: {
              texto: "Encontrei esse doguinho perdido no Parque Ibirapuera. Alguém conhece? 🐶",
              midia: null
            },
            engajamento: { curtidas: 42, comentarios: 15, compartilhamentos: 8 },
            data: "2024-03-15T08:15:00Z",
            localizacao: "Parque Ibirapuera, SP",
            hashtags: ["#animalperdido", "#achado", "#cachorro"]
          }
        ];
        postsParaUsar = postsIniciais;
        localStorage.setItem('postsPetRefugio', JSON.stringify(postsIniciais));
      }
      
      // Filtrar apenas as publicações do usuário atual
      const publicacoesUsuario = postsParaUsar.filter(post => post.usuarioId === usuarioAtualId);
      
      setPublicacoes(publicacoesUsuario);
    } catch (error) {
      console.error('Erro ao carregar publicações:', error);
    } finally {
      setCarregando(false);
    }
  };

  const confirmarExclusao = (publicacao) => {
    setPublicacaoParaExcluir(publicacao);
    setMostrarConfirmacao(true);
  };

  const excluirPublicacao = () => {
    if (!publicacaoParaExcluir) return;

    try {
      // Obter TODAS as publicações do localStorage
      const todasPublicacoes = JSON.parse(localStorage.getItem('postsPetRefugio') || '[]');
      
      console.log('📊 Antes da exclusão:', todasPublicacoes.length, 'publicações totais');
      
      // Filtrar para remover APENAS a publicação do usuário atual
      const publicacoesAtualizadas = todasPublicacoes.filter(
        post => !(post.id === publicacaoParaExcluir.id && post.usuarioId === usuarioAtualId)
      );
      
      console.log('📊 Após exclusão:', publicacoesAtualizadas.length, 'publicações totais');
      
      // Salvar TODAS as publicações atualizadas no localStorage
      localStorage.setItem('postsPetRefugio', JSON.stringify(publicacoesAtualizadas));
      
      // Atualizar state apenas com as publicações do usuário atual
      const publicacoesUsuarioAtualizadas = publicacoesAtualizadas.filter(
        post => post.usuarioId === usuarioAtualId
      );
      
      setPublicacoes(publicacoesUsuarioAtualizadas);
      
      // Fechar modal
      setMostrarConfirmacao(false);
      setPublicacaoParaExcluir(null);
      
      alert('✅ Sua publicação foi excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir publicação:', error);
      alert('❌ Erro ao excluir publicação. Tente novamente.');
    }
  };

  const cancelarExclusao = () => {
    setMostrarConfirmacao(false);
    setPublicacaoParaExcluir(null);
  };

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      const agora = new Date();
      const diffMs = agora - data;
      const diffMin = Math.floor(diffMs / (1000 * 60));
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMin < 60) {
        return `há ${diffMin} min`;
      } else if (diffHrs < 24) {
        return `há ${diffHrs} h`;
      } else if (diffDias < 7) {
        return `há ${diffDias} dia${diffDias > 1 ? 's' : ''}`;
      } else {
        return data.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    } catch (error) {
      return 'Data desconhecida';
    }
  };

  const handleImageError = (e) => {
    console.log('❌ Imagem não carregou');
    e.target.style.display = 'none';
    
    const parent = e.target.parentNode;
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder-imagem';
    placeholder.innerHTML = '🖼️ Imagem não disponível';
    placeholder.style.cssText = `
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      padding: 40px 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
      margin: 10px 0;
    `;
    parent.appendChild(placeholder);
  };

  const renderizarMidia = (publicacao) => {
    if (!publicacao.conteudo.midia) return null;

    return (
      <div className="midia-publicacao">
        <img
          src={publicacao.conteudo.midia.url}
          alt={publicacao.conteudo.midia.alt || 'Imagem do post'}
          className="imagem-publicacao"
          onError={handleImageError}
        />
      </div>
    );
  };

  if (carregando) {
    return (
      <div className="pagina-gerenciar-publicacoes">
        <HeaderPerfil />
        <div className="gerenciar-publicacoes carregando">
          <div className="carregando-texto">
            <div className="spinner"></div>
            <p>Carregando suas publicações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-gerenciar-publicacoes">
      <HeaderPerfil />
      
      <div className="gerenciar-publicacoes">
        
        {/* Cabeçalho */}
        <div className="cabecalho-gerenciar">
          <h2>📝 Minhas Publicações</h2>
          <p className="subtitulo">
            {publicacoes.length === 0 
              ? 'Você ainda não fez nenhuma publicação' 
              : `${publicacoes.length} publicação${publicacoes.length !== 1 ? 's' : ''} de sua autoria`
            }
          </p>
        </div>

        {/* Lista de Publicações */}
        <div className="lista-publicacoes">
          {publicacoes.length === 0 ? (
            <div className="sem-publicacoes">
              <div className="icone-sem-publicacoes">📝</div>
              <h3>Nenhuma publicação sua encontrada</h3>
              <p>Quando você fizer publicações, elas aparecerão aqui para gerenciamento.</p>
              <button 
                className="botao-nova-publicacao"
                onClick={() => window.location.href = '/principal'}
              >
                🐾 Fazer minha primeira publicação
              </button>
            </div>
          ) : (
            publicacoes.map((publicacao) => (
              <div key={publicacao.id} className="card-publicacao">
                
                {/* Cabeçalho da Publicação */}
                <div className="cabecalho-publicacao">
                  <div className="info-publicacao">
                    <span className="tempo-publicacao">
                      {formatarData(publicacao.data)}
                    </span>
                    {publicacao.localizacao && (
                      <span className="localizacao-publicacao">
                        • {publicacao.localizacao}
                      </span>
                    )}
                    <span className="badge-minha-publicacao">Sua publicação</span>
                  </div>
                  
                  {/* Menu de Opções */}
                  <div className="menu-opcoes">
                    <button 
                      className="botao-opcoes"
                      onClick={() => confirmarExclusao(publicacao)}
                      title="Excluir publicação"
                    >
                      ⋮
                    </button>
                  </div>
                </div>

                {/* Conteúdo da Publicação */}
                <div className="conteudo-publicacao">
                  <p className="texto-publicacao">{publicacao.conteudo.texto}</p>
                  {renderizarMidia(publicacao)}
                  
                  {/* Hashtags */}
                  {publicacao.hashtags && publicacao.hashtags.length > 0 && (
                    <div className="hashtags-publicacao">
                      {publicacao.hashtags.map((hashtag, index) => (
                        <span key={index} className="hashtag">
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Engajamento */}
                <div className="engajamento-publicacao">
                  <div className="estatisticas-publicacao">
                    <span className="estatistica">❤️ {publicacao.engajamento.curtidas}</span>
                    <span className="estatistica">💬 {publicacao.engajamento.comentarios}</span>
                    <span className="estatistica">↗️ {publicacao.engajamento.compartilhamentos}</span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Modal de Confirmação de Exclusão */}
        {mostrarConfirmacao && publicacaoParaExcluir && (
          <div className="modal-overlay">
            <div className="modal-confirmacao">
              <div className="modal-cabecalho">
                <h3>🗑️ Excluir Sua Publicação</h3>
              </div>
              
              <div className="modal-conteudo">
                <p>
                  Tem certeza que deseja excluir <strong>sua</strong> publicação?
                </p>
                
                {/* Preview da publicação a ser excluída */}
                <div className="preview-exclusao">
                  <div className="conteudo-preview">
                    <p className="texto-preview">
                      {publicacaoParaExcluir.conteudo.texto}
                    </p>
                    {publicacaoParaExcluir.conteudo.midia && (
                      <div className="midia-preview">
                        <img 
                          src={publicacaoParaExcluir.conteudo.midia.url} 
                          alt="Preview" 
                          className="imagem-preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="info-exclusao">
                  <span>⚠️ Esta ação afeta apenas SUA publicação e não pode ser desfeita</span>
                </div>
              </div>

              <div className="modal-acoes">
                <button 
                  className="botao-cancelar"
                  onClick={cancelarExclusao}
                >
                  Manter Publicação
                </button>
                <button 
                  className="botao-confirmar-exclusao"
                  onClick={excluirPublicacao}
                >
                  Sim, Excluir Minha Publicação
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GerenciarPublicacoes;