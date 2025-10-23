import '../../styles/principal/AreaConteudo.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postsData from '../../dados/posts.json';
import SidebarServicos from './SidebarServicos';


export default function AreaConteudo() {
  const [novoPost, setNovoPost] = useState('');
  const [posts, setPosts] = useState(postsData.posts);
  const navigate = useNavigate();

  // Dados para sugestões (alguns amigos como sugestões)
  const sugestoesPessoas = [
    {
      id: 7,
      nome: "Carla Joares",
      avatar: "/images/avatars/carlajoares.jpg",
      online: true,
      mutualFriends: 7
    },
    {
      id: 8,
      nome: "João Galvão",
      avatar: "/images/avatars/joaogalvao.jpg", 
      online: false,
      mutualFriends: 11
    },
    {
      id: 10,
      nome: "Juliana Almeida",
      avatar: "/images/avatars/julianaalmeida.jpg",
      online: true,
      mutualFriends: 14
    }
  ];

  // Dados para grupos
  const grupos = [
    {
      id: 1,
      nome: "Cachorros da Cidade",
      icone: "🐕",
      membros: 128,
      descricao: "Grupo para donos de cachorros"
    },
    {
      id: 2,
      nome: "Amantes de Gatos",
      icone: "🐈",
      membros: 95,
      descricao: "Comunidade de tutores de gatos"
    },
    {
      id: 3,
      nome: "Adoção Responsável",
      icone: "❤️",
      membros: 203,
      descricao: "Encontre seu novo amigo"
    }
  ];

  // Dados para eventos
  const eventos = [
    {
      id: 1,
      data: "15/06",
      titulo: "Feira de Adoção",
      local: "Parque Ibirapuera"
    },
    {
      id: 2,
      data: "20/06", 
      titulo: "Palestra sobre Pets",
      local: "Centro Cultural"
    },
    {
      id: 3,
      data: "25/06",
      titulo: "Campanha de Vacinação",
      local: "Praça da Sé"
    }
  ];

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

  const handleAvatarError = (e) => {
    console.log('❌ Avatar não carregou no card criar post');
    const parent = e.target.parentNode;
    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder-criar';
    placeholder.innerHTML = '<span>A</span>';
    placeholder.style.cssText = `
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F26B38, #FF9D71);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
    `;
    e.target.style.display = 'none';
    parent.appendChild(placeholder);
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

  const handleAbrirPerfil = (usuarioId) => {
    navigate(`/perfil/publico/${usuarioId}`);
  };

  const handleSeguir = (usuarioId, e) => {
    e.stopPropagation();
    alert(`✅ Seguindo usuário!`);
  };

  const handleAbrirGrupo = (grupoId) => {
    alert(`📖 Abrindo grupo ${grupoId}`);
  };

  const handleAbrirEvento = (eventoId) => {
    alert(`📅 Abrindo evento ${eventoId}`);
  };

  return (
    <main className="area-conteudo">
      
      {/* Feed Principal */}
      <div className="feed-principal">
        
        <div className="card-criar-post">
          <div className="cabecalho-criar">
            <img 
              src="/images/avatars/anasilva.jpg"
              alt="Seu perfil"
              className="avatar-usuario"
              onError={handleAvatarError}
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
                  onClick={() => handleAbrirPerfil(post.usuario.id)}
                />
                <div className="info-post">
                  <span 
                    className="nome-usuario"
                    onClick={() => handleAbrirPerfil(post.usuario.id)}
                  >
                    {post.usuario.nome}
                  </span>
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

      {/* Sidebar Direito */}
      <aside className="sidebar-direito">
        
        {/* Botão de Serviços */}
        <SidebarServicos />


        {/* Sugestões de Pessoas */}
        <div className="card-sugestoes">
          <h3>👤 Sugestões para seguir</h3>
          <div className="lista-sugestoes">
            {sugestoesPessoas.map((pessoa) => (
              <div 
                key={pessoa.id} 
                className="item-sugestao"
                onClick={() => handleAbrirPerfil(pessoa.id)}
              >
                <div className="avatar-sugestao">
                  <img 
                    src={pessoa.avatar} 
                    alt={pessoa.nome}
                    onError={handleImageError}
                  />
                  {pessoa.online && <span className="status-online" title="Online"></span>}
                </div>
                <div className="info-sugestao">
                  <span>{pessoa.nome}</span>
                  <small>{pessoa.mutualFriends} amigos em comum</small>
                </div>
                <button 
                  className="botao-seguir"
                  onClick={(e) => handleSeguir(pessoa.id, e)}
                >
                  Seguir
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Grupos Sugeridos */}
        <div className="card-grupos">
          <h3>👥 Grupos Sugeridos</h3>
          <div className="lista-grupos">
            {grupos.map((grupo) => (
              <div 
                key={grupo.id} 
                className="item-grupo"
                onClick={() => handleAbrirGrupo(grupo.id)}
              >
                <div className="icone-grupo">{grupo.icone}</div>
                <div className="info-grupo">
                  <span className="nome-grupo">{grupo.nome}</span>
                  <small>{grupo.descricao}</small>
                </div>
                <span className="contador-grupo">{grupo.membros}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos Próximos */}
        <div className="card-eventos">
          <h3>📅 Eventos Próximos</h3>
          <div className="lista-eventos">
            {eventos.map((evento) => (
              <div 
                key={evento.id} 
                className="item-evento"
                onClick={() => handleAbrirEvento(evento.id)}
              >
                <span className="data-evento">{evento.data}</span>
                <span className="titulo-evento">{evento.titulo}</span>
              </div>
            ))}
          </div>
        </div>

      </aside>

    </main>
  );
}