import '../../styles/principal/AreaConteudo.css';
import { useState } from 'react';
import postsData from '../../dados/posts.json';
import empresasData from '../../dados/empresas.json';

export default function AreaConteudo() {
  const [novoPost, setNovoPost] = useState('');
  const [posts, setPosts] = useState(postsData.posts);

  const handleImageError = (e) => {
    console.log('❌ Imagem não carregou, usando placeholder');
    
    if (e.target.className.includes('avatar')) {
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
    } else {
      e.target.style.display = 'none';
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
      e.target.parentNode.appendChild(placeholder);
    }
  };
  const handlePublicar = () => {
    if (novoPost.trim()) {
      const novoPostObj = {
        id: Date.now(),
        usuarioId: 1,
        usuario: {
          id: 1,
          nome: "Ana Silva",
          avatar: "/images/avatars/anasilva.jpg",
          tipo: "usuario"
        },
        conteudo: {
          texto: novoPost,
          midia: null
        },
        engajamento: {
          curtidas: 0,
          comentarios: 0,
          compartilhamentos: 0
        },
        data: new Date().toISOString(),
        localizacao: "São Paulo, SP",
        hashtags: []
      };

      setPosts([novoPostObj, ...posts]);
      setNovoPost('');
      alert('✅ Post publicado com sucesso!');
    } else {
      alert('⚠️ Digite algo para publicar!');
    }
  };

  const formatarData = (dataString) => {
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
      return data.toLocaleDateString('pt-BR');
    }
  };

  const renderizarMidia = (post) => {
    if (!post.conteudo.midia) return null;

    return (
      <div className="container-midia">
        <img
          src={post.conteudo.midia.url}
          alt={post.conteudo.midia.alt}
          className="imagem-post"
          onError={handleImageError}
        />
      </div>
    );
  };

  const handleContratarServico = (empresa) => {
    alert(`📞 Entrando em contato com ${empresa.nome}\nTelefone: ${empresa.telefone}`);
  };

  return (
    <main className="area-conteudo">
      
      <div className="feed-principal">
        
        <div className="card-criar-post"> 
          <div className="cabecalho-criar">
            <img 
              src="/images/avatars/anasilva.jpg"
              alt="Seu perfil"
              className="avatar-usuario"
            />
            <input 
              type="text" 
              placeholder="🐾Compartilhe fotos vídeos ou histórias!"
              className="input-criar-post"
              value={novoPost}
              onChange={(e) => setNovoPost(e.target.value)}
            />
          </div>
          <div className="info-placeholder">
            <span className="texto-placeholder">
              Aqui você pode compartilhar fotos, vídeos ou pedir ajuda sobre seu pet!
            </span>
          </div>
          <div className="acoes-criar-post">
            <button type="button" className="botao-midia">📷 Foto</button>
            <button type="button" className="botao-publicar" onClick={handlePublicar}>
              Publicar
            </button>
          </div>
        </div>

        <div className="lista-postagens">
          {posts.map((post) => (
            <div key={post.id} className="card-postagem">
              
              <div className="cabecalho-post">
                <img 
                  src={post.usuario.avatar} 
                  alt={post.usuario.nome}
                  className="avatar-post"
                  onError={handleImageError}
                />
                <div className="info-post">
                  <span className="nome-usuario">{post.usuario.nome}</span>
                  <div className="metadados-post">
                    <span className="tempo-post">{formatarData(post.data)}</span>
                    {post.localizacao && (
                      <>
                        <span className="separador">•</span>
                        <span className="localizacao-post">{post.localizacao}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="conteudo-post">
                <p>{post.conteudo.texto}</p>
                {renderizarMidia(post)}
                
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="hashtags">
                    {post.hashtags.map((hashtag, index) => (
                      <span key={index} className="hashtag">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="engajamento-post">
                <div className="estatisticas">
                  <span>❤️ {post.engajamento.curtidas}</span>
                  <span>💬 {post.engajamento.comentarios}</span>
                  <span>↗️ {post.engajamento.compartilhamentos}</span>
                </div>
              </div>

              <div className="acoes-post">
                <button type="button" className="botao-acao">🤍 Curtir</button>
                <button type="button" className="botao-acao">💬 Comentar</button>
                <button type="button" className="botao-acao">↗️ Compartilhar</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <aside className="sidebar-direito">
        
        {/* Sugestões de Amigos */}
        <div className="card-sugestoes">
          <h3>🔍 Sugestões para seguir</h3>
          <div className="lista-sugestoes">
            <div className="item-sugestao">
              <div className="avatar-placeholder">🏪</div>
              <div className="info-sugestao">
                <span>PetShop Amigo Fiel</span>
                <small>12 amigos em comum</small>
              </div>
              <button type="button" className="botao-seguir">Seguir</button>
            </div>
            <div className="item-sugestao">
              <div className="avatar-placeholder">🐾</div>
              <div className="info-sugestao">
                <span>Clínica Veterinária</span>
                <small>8 amigos em comum</small>
              </div>
              <button type="button" className="botao-seguir">Seguir</button>
            </div>
          </div>
        </div>

        {/* Prestadores de Serviços */}
        <div className="card-prestadores">
          <h3>🏆 Serviços para seu Pet</h3>
          <div className="lista-prestadores">
            {empresasData.empresas.map((empresa) => (
              <div key={empresa.id} className="item-prestador">
                <div className="avatar-prestador">
                  <img 
                    src={empresa.avatar} 
                    alt={empresa.nome}
                    onError={handleImageError}
                  />
                  <span className="categoria-prestador">{empresa.categoria}</span>
                </div>
                <div className="info-prestador">
                  <span className="nome-prestador">{empresa.nome}</span>
                  <div className="avaliacao-prestador">
                    <span className="estrelas">{"⭐".repeat(Math.floor(empresa.avaliacao))}</span>
                    <span className="nota">{empresa.avaliacao}</span>
                  </div>
                  <small className="local-prestador">{empresa.localizacao}</small>
                  <p className="bio-prestador">{empresa.bio}</p>
                  <div className="servicos-prestador">
                    {empresa.servicos.slice(0, 2).map((servico, index) => (
                      <span key={index} className="servico-tag">{servico}</span>
                    ))}
                    {empresa.servicos.length > 2 && (
                      <span className="servico-tag">+{empresa.servicos.length - 2}</span>
                    )}
                  </div>
                </div>
                <button 
                  type="button" 
                  className="botao-contratar"
                  onClick={() => handleContratarServico(empresa)}
                >
                  📞 Contatar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos Próximos */}
        <div className="card-eventos">
          <h3>📅 Eventos Próximos</h3>
          <div className="lista-eventos">
            <div className="item-evento">
              <span className="data-evento">15/06</span>
              <span className="titulo-evento">Feira de Adoção</span>
            </div>
            <div className="item-evento">
              <span className="data-evento">20/06</span>
              <span className="titulo-evento">Palestra sobre Pets</span>
            </div>
          </div>
        </div>

      </aside>

    </main>
  );
}