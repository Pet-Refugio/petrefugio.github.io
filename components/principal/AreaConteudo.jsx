import '../../styles/principal/AreaConteudo.css';
import { useState, error } from 'react';

export default function AreaConteudo() {
  const [novoPost, setNovoPost] = useState('');

  // Dados de posts fixos com placeholders
  const [posts, setPosts] = useState([
    {
      id: 1,
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
      engajamento: {
        curtidas: 24,
        comentarios: 8,
        compartilhamentos: 3
      },
      data: "2024-03-15T10:30:00Z",
      localizacao: "São Paulo, SP",
      hashtags: ["#gato", "#aniversario", "#pet"]
    },
    {
      id: 2,
      usuario: {
        id: 102,
        nome: "Carlos Santos",
        avatar: "/images/avatars/carlossantos.jpg",
        tipo: "usuario"
      },
      conteudo: {
        texto: "Encontrei esse doguinho perdido no Parque Ibirapuera. Alguém conhece? 🐶 Estava com coleira azul.",
        midia: null
      },
      engajamento: {
        curtidas: 42,
        comentarios: 15,
        compartilhamentos: 8
      },
      data: "2024-03-15T08:15:00Z",
      localizacao: "Parque Ibirapuera, SP",
      hashtags: ["#animalperdido", "#achado", "#cachorro"]
    },
    {
      id: 3,
      usuario: {
        id: 201,
        nome: "PetShop Amigo Fiel",
        avatar: "/images/lojas/logo_loja1.png",
        tipo: "comercio"
      },
      conteudo: {
        texto: "🎊 PROMOÇÃO ESPECIAL! Esta semana: Banho e tosa com 20% de desconto para todos os clientes PetRefugio! 🐕✨",
        midia: null
      },
      engajamento: {
        curtidas: 89,
        comentarios: 12,
        compartilhamentos: 5
      },
      data: "2024-03-14T14:20:00Z",
      localizacao: "Av. Paulista, 1000 - São Paulo",
      hashtags: ["#promocao", "#petshop", "#desconto", "#banhoetosa"]
    },
    {
      id: 4,
      usuario: {
        id: 103,
        nome: "Maria Oliveira",
        avatar: "/images/avatars/mariaoliveira.jpg",
        tipo: "usuario"
      },
      conteudo: {
        texto: "Primeiro dia de adestramento do Rex! Ele já aprendeu a sentar e deitar! 🐶💕 Quem mais tem dicas de treinamento?",
        midia: null
      },
      engajamento: {
        curtidas: 67,
        comentarios: 23,
        compartilhamentos: 4
      },
      data: "2024-03-14T11:45:00Z",
      localizacao: "Campinas, SP",
      hashtags: ["#adestramento", "#cachorro", "#treinamento", "#peteducado"]
    },
    {
      id: 5,
      usuario: {
        id: 202,
        nome: "Clínica Veterinária Saúde Animal",
        avatar: "/images/lojas/logo_loja2.png",
        tipo: "veterinario"
      },
      conteudo: {
        texto: "DICA DA SEMANA: A importância da escovação dental nos pets! 🦷🐕 Escovar os dentes do seu animal previne tártaro, mau hálito e doenças periodontais. Use escova e pasta específicas para pets!",
        midia: null
      },
      engajamento: {
        curtidas: 156,
        comentarios: 34,
        compartilhamentos: 12
      },
      data: "2024-03-13T09:30:00Z",
      localizacao: "Rua das Flores, 123 - São Paulo",
      hashtags: ["#veterinario", "#saude", "#dica", "#higienebucal", "#cuidados"]
    },
    {
      id: 6,
      usuario: {
        id: 104,
        nome: "João Pereira",
        avatar: "/images/avatars/joaopereira.jpg",
        tipo: "usuario"
      },
      conteudo: {
        texto: "Minha gata Luna acabou de ter 4 filhotes! 🐱❤️ São todos lindos e saudáveis! Alguém interessado em adoção responsável?",
        midia: null
      },
      engajamento: {
        curtidas: 128,
        comentarios: 45,
        compartilhamentos: 28
      },
      data: "2024-03-12T16:20:00Z",
      localizacao: "Osasco, SP",
      hashtags: ["#gatinhos", "#filhotes", "#adocao", "#gato", "#pet"]
    },
    {
      id: 7,
      usuario: {
        id: 301,
        nome: "Abrigo São Francisco",
        avatar: "/images/avatars/default-avatar.jpg",
        tipo: "ong"
      },
      conteudo: {
        texto: "URGENTE: Precisamos de doações de ração para cães e gatos! 🆘 Nosso abrigo está com 50+ animais e estoques baixos. Qualquer ajuda é bem-vinda! ❤️🐾",
        midia: null
      },
      engajamento: {
        curtidas: 234,
        comentarios: 67,
        compartilhamentos: 89
      },
      data: "2024-03-12T10:15:00Z",
      localizacao: "Rua dos Animais, 123 - São Paulo",
      hashtags: ["#doacao", "#ajuda", "#abrigo", "#animais", "#solidariedade"]
    },
    {
      id: 8,
      usuario: {
        id: 105,
        nome: "Juliana Costa",
        avatar: "/images/avatars/julianacosta.jpg",
        tipo: "usuario"
      },
      conteudo: {
        texto: "Dia de passeio no parque com meu golden Thor! 🐕💨 Ele adora correr atrás da bolinha! Qual é o brinquedo preferido do pet de vocês?",
        midia: null
      },
      engajamento: {
        curtidas: 78,
        comentarios: 18,
        compartilhamentos: 3
      },
      data: "2024-03-11T15:40:00Z",
      localizacao: "Parque do Ibirapuera, SP",
      hashtags: ["#passeio", "#parque", "#goldenretriever", "#brinquedos", "#petativo"]
    }
  ]);

  const handleImageError = (e) => {
    console.log('❌ Imagem não encontrada:', e.target.src);
    // Substitui por placeholder
    if (e.target.className.includes('avatar')) {
      e.target.src = '/images/avatars/default-avatar.jpg';
    } else {
      e.target.style.display = 'none';
      // Adiciona mensagem de placeholder
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
    // Substitui por placeholder com inicial
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
        usuario: {
          id: 101,
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
        return data.toLocaleDateString('pt-BR');
      }
    } catch (error) {
      return 'há algum tempo';
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
        <div className="placeholder-carregando">
          🖼️ Carregando imagem...
        </div>
      </div>
    );
  };

  return (
    <main className="area-conteudo">
      
      {/* Feed Principal */}
      <div className="feed-principal">
        
        {/* Card para Criar Postagem - COM MELHORIAS DO NOVO CÓDIGO */}
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
              placeholder="🐾Compartilhe fotos, dicas ou histórias!"
              className="input-criar-post"
              value={novoPost}
              onChange={(e) => setNovoPost(e.target.value)}
            />
          </div>
          <div className="info-placeholder">
            <span className="texto-placeholder">
              💡Você pode compartilhar fotos, vídeo e interagir com a comunidade!
            </span>
          </div>
          <div className="acoes-criar-post">
            <button type="button" className="botao-midia">📷 Foto</button>
            <button type="button" className="botao-midia">🎥 Vídeo</button>
            <button type="button" className="botao-publicar" onClick={handlePublicar}>
              Publicar
            </button>
          </div>
        </div>

        {/* Lista de Posts - MANTIDO DO CÓDIGO ANTIGO */}
        <div className="lista-postagens">
          {posts.map((post) => (
            <div key={post.id} className="card-postagem">
              
              {/* Cabeçalho do Post */}
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
              
              {/* Conteúdo do Post */}
              <div className="conteudo-post">
                <p>{post.conteudo.texto}</p>
                {renderizarMidia(post)}
                
                {/* Hashtags */}
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
              
              {/* Engajamento */}
              <div className="engajamento-post">
                <div className="estatisticas">
                  <span>❤️ {post.engajamento.curtidas}</span>
                  <span>💬 {post.engajamento.comentarios}</span>
                  <span>↗️ {post.engajamento.compartilhamentos}</span>
                </div>
              </div>

              {/* Ações */}
              <div className="acoes-post">
                <button type="button" className="botao-acao">🤍 Curtir</button>
                <button type="button" className="botao-acao">💬 Comentar</button>
                <button type="button" className="botao-acao">↗️ Compartilhar</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Sidebar Direito Simplificado - MANTIDO DO CÓDIGO ANTIGO */}
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
            <div className="item-sugestao">
              <div className="avatar-placeholder">👤</div>
              <div className="info-sugestao">
                <span>Maria Oliveira</span>
                <small>5 amigos em comum</small>
              </div>
              <button type="button" className="botao-seguir">Seguir</button>
            </div>
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
            <div className="item-evento">
              <span className="data-evento">25/06</span>
              <span className="titulo-evento">Campanha de Vacinação</span>
            </div>
          </div>
        </div>

      </aside>

    </main>
  );
}