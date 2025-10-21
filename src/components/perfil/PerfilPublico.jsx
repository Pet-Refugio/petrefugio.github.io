import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/perfil/PerfilPublico.css';


const PerfilPublico = () => {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estado para controlar curtidas
  const [curtidas, setCurtidas] = useState({});

  // Dados mockados
  const usuarios = [
    {
      id: 1,
      nome: 'Ana Silva',
      nomeUsuario: 'ana.silva',
      avatar: '/images/avatars/anasilva.jpg',
      capa: '/images/capas/default-capa.jpg',
      bio: 'Mãe da Luna e do Thor ❤️ | Amante de animais | Compartilhando nosso dia a dia',
      localizacao: 'São Paulo, SP',
      dataCadastro: '2023-05-15',
      estatisticas: {
        posts: 24,
        seguidores: 156,
        seguindo: 89
      },
      pets: [
        { id: 1, nome: 'Luna', tipo: 'gato', avatar: '/images/pets/luna.jpg', idade: 2 },
        { id: 2, nome: 'Thor', tipo: 'cachorro', avatar: '/images/pets/thor.jpg', idade: 1 }
      ]
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      nomeUsuario: 'carlos.santos',
      avatar: '/images/avatars/carlossantos.jpg',
      capa: '/images/capas/default-capa.jpg',
      bio: 'Apaixonado por cachorros | Adestrador amador | Sempre ajudando animais perdidos',
      localizacao: 'Rio de Janeiro, RJ',
      dataCadastro: '2023-08-20',
      estatisticas: {
        posts: 18,
        seguidores: 89,
        seguindo: 45
      },
      pets: [
        { id: 3, nome: 'Rex', tipo: 'cachorro', avatar: '/images/pets/rex.jpg', idade: 4 }
      ]
    }
  ];

  const todosPosts = [
    {
      id: 1,
      usuarioId: 1,
      usuario: {
        id: 1,
        nome: "Ana Silva",
        nomeUsuario: "ana.silva",
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
      usuarioId: 2,
      usuario: {
        id: 2,
        nome: "Carlos Santos",
        nomeUsuario: "carlos.santos",
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
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      const usuarioEncontrado = usuarios.find(u => u.id === parseInt(usuarioId));
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        
        // Filtrar posts do usuário e ordenar por data (mais recentes primeiro)
        const postsUsuario = todosPosts
          .filter(post => post.usuarioId === parseInt(usuarioId))
          .sort((a, b) => new Date(b.data) - new Date(a.data));
        
        setPosts(postsUsuario);

        // Inicializar estado de curtidas
        const curtidasIniciais = {};
        postsUsuario.forEach(post => {
          curtidasIniciais[post.id] = false; // Inicialmente não curtido
        });
        setCurtidas(curtidasIniciais);
      }
      setCarregando(false);
    }, 800);
  }, [usuarioId]);

  // Função para curtir/descurtir
  const handleCurtir = (postId) => {
    setCurtidas(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    console.log(`Post ${postId} ${curtidas[postId] ? 'descurtido' : 'curtido'}`);
  };

  // Função para comentar
  const handleComentar = (postId) => {
    console.log(`Abrir comentários do post ${postId}`);
    alert(`Abrindo comentários do post ${postId}`);
  };

  // Função para compartilhar
  const handleCompartilhar = (postId) => {
    console.log(`Compartilhar post ${postId}`);
    if (navigator.share) {
      navigator.share({
        title: 'PetRefugio',
        text: 'Confira este post no PetRefugio!',
        url: window.location.href,
      });
    } else {
      alert('Link do post copiado para a área de transferência!');
    }
  };

  const handleSeguir = () => {
    if (!usuario) return;
    console.log('Seguir/Deixar de seguir:', usuarioId);
    alert(usuario.estatisticas.seguindo ? 'Deixou de seguir' : 'Começou a seguir');
  };

  const handleMensagem = () => {
    if (!usuario) return;
    navigate(`/chat/${usuarioId}`);
  };

  const formatarData = (dataString) => {
    try {
      if (!dataString) return '--/--/----';
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch (error) {
      return '--/--/----';
    }
  };

  const formatarDataPost = (dataString) => {
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

  // Renderização de carregamento
  if (carregando) {
    return (
      <div className="pagina-perfil-publico carregando">
        <div className="container-perfil-publico">
          <div className="carregando-texto">Carregando perfil...</div>
        </div>
      </div>
    );
  }

  // Renderização de usuário não encontrado
  if (!usuario) {
    return (
      <div className="pagina-perfil-publico">
        <div className="container-perfil-publico">
          <div className="usuario-nao-encontrado">
            <h2>Usuário não encontrado</h2>
            <p>O perfil que você está procurando não existe.</p>
            <button onClick={() => navigate('/amigos')} className="botao-voltar">
              Voltar para Amigos
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderização principal (após carregamento e com usuário válido)
  return (
    <div className="pagina-perfil-publico">
      <div className="container-perfil-publico">
        
        {/* Cabeçalho com Botão Voltar */}
        <div className="cabecalho-perfil">
          <button 
            onClick={() => navigate('/principal/amigos')}
            className="botao-voltar"
          >
            ← Voltar
          </button>
          <h1>Perfil</h1>
        </div>

        {/* Capa e Avatar */}
        <div className="secao-capa">
          <div className="capa-perfil">
            <img 
              src={usuario.capa} 
              alt="Capa do perfil"
              className="imagem-capa"
              onError={(e) => {
                e.target.src = '/images/capas/default-capa.jpg';
              }}
            />
          </div>
          <div className="avatar-container-publico">
            <img 
              src={usuario.avatar} 
              alt={usuario.nome}
              className="avatar-publico"
              onError={(e) => {
                e.target.src = '/images/avatars/default-avatar.jpg';
              }}
            />
          </div>
        </div>

        {/* Informações do Usuário */}
        <div className="info-usuario-publico">
          <div className="nome-container">
            <h2 className="nome-usuario-publico">{usuario.nome}</h2>
            {usuario.nomeUsuario && (
              <span className="nome-usuario">@{usuario.nomeUsuario}</span>
            )}
          </div>
          
          <p className="bio-usuario">{usuario.bio}</p>
          
          <div className="info-contato-publico">
            <div className="info-item">
              <span className="icone">📍</span>
              <span>{usuario.localizacao}</span>
            </div>
            <div className="info-item">
              <span className="icone">📅</span>
              <span>No PetRefugio desde {formatarData(usuario.dataCadastro)}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="acoes-perfil-publico">
            <button className="botao-mensagem" onClick={handleMensagem}>
              💬 Enviar Mensagem
            </button>
            <button className="botao-seguir" onClick={handleSeguir}>
              {usuario.estatisticas.seguindo ? '✅ Seguindo' : '👤 Seguir'}
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="estatisticas-publico">
          <div className="estatistica-item">
            <span className="numero">{usuario.estatisticas.posts}</span>
            <span className="rotulo">Posts</span>
          </div>
          <div className="estatistica-item">
            <span className="numero">{usuario.estatisticas.seguidores}</span>
            <span className="rotulo">Seguidores</span>
          </div>
          <div className="estatistica-item">
            <span className="numero">{usuario.estatisticas.seguindo}</span>
            <span className="rotulo">Seguindo</span>
          </div>
        </div>

        {/* Pets do Usuário */}
        {usuario.pets && usuario.pets.length > 0 && (
          <div className="secao-pets-publico">
            <h3>Pets de {usuario.nome.split(' ')[0]}</h3>
            <div className="lista-pets-publico">
              {usuario.pets.map(pet => (
                <div key={pet.id} className="card-pet-publico">
                  <img 
                    src={pet.avatar} 
                    alt={pet.nome}
                    className="avatar-pet-publico"
                    onError={(e) => {
                      e.target.src = '/images/pets/default-pet.jpg';
                    }}
                  />
                  <div className="info-pet-publico">
                    <span className="nome-pet">{pet.nome}</span>
                    <span className="tipo-pet">{pet.tipo} • {pet.idade} ano{pet.idade !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts do Usuário */}
        <div className="secao-posts-publico">
          <h3>Posts de {usuario.nome.split(' ')[0]}</h3>
          
          {posts.length > 0 ? (
            <div className="lista-posts-publico">
              {posts.map(post => (
                <div key={post.id} className="card-post-publico">
                  
                  {/* Cabeçalho do Post */}
                  <div className="cabecalho-post-publico">
                    <img 
                      src={post.usuario.avatar} 
                      alt={post.usuario.nome}
                      className="avatar-post-publico"
                      onError={(e) => {
                        e.target.src = '/images/avatars/default-avatar.jpg';
                      }}
                    />
                    <div className="info-post-publico">
                      <span className="nome-usuario-post">{post.usuario.nome}</span>
                      <span className="nome-usuario-post">@{post.usuario.nomeUsuario}</span>
                      <div className="metadados-post">
                        <span className="tempo-post">{formatarDataPost(post.data)}</span>
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
                  <div className="conteudo-post-publico">
                    <p>{post.conteudo.texto}</p>
                    
                    {post.conteudo.midia && (
                      <div className="midia-post-publico">
                        <img
                          src={post.conteudo.midia.url}
                          alt={post.conteudo.midia.alt}
                          className="imagem-post-publico"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="hashtags-publico">
                        {post.hashtags.map((hashtag, index) => (
                          <span key={index} className="hashtag-publico">
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Engajamento com Ícones Interativos */}
                  <div className="engajamento-post-publico">
                    <div className="estatisticas-publico">
                      <div 
                        className={`icone-engajamento curtir ${curtidas[post.id] ? 'ativo' : ''}`}
                        onClick={() => handleCurtir(post.id)}
                        title="Curtir"
                      >
                        <span className="icone-coracao">
                          {curtidas[post.id] ? '❤️' : '🤍'}
                        </span>
                        <span>{post.engajamento.curtidas + (curtidas[post.id] ? 1 : 0)}</span>
                      </div>
                      
                      <div 
                        className="icone-engajamento comentar"
                        onClick={() => handleComentar(post.id)}
                        title="Comentar"
                      >
                        <span>💬</span>
                        <span>{post.engajamento.comentarios}</span>
                      </div>
                      
                      <div 
                        className="icone-engajamento compartilhar"
                        onClick={() => handleCompartilhar(post.id)}
                        title="Compartilhar"
                      >
                        <span>↗️</span>
                        <span>{post.engajamento.compartilhamentos}</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          ) : (
            <div className="sem-posts">
              <div className="icone-sem-posts">📝</div>
              <p>{usuario.nome.split(' ')[0]} ainda não fez nenhum post</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PerfilPublico;