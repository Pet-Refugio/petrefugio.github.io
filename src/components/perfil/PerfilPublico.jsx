import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/perfil/PerfilPublico.css';

const PerfilPublico = () => {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Dados mockados - na prática viriam de uma API
  const usuarios = [
    {
      id: 1,
      nome: 'Ana Silva',
      apelido: 'Ana',
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
    },
    // ... outros usuários
  ];

  const todosPosts = [
    {
      id: 1,
      usuarioId: 1,
      usuario: {
        id: 1,
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
      usuarioId: 2,
      usuario: {
        id: 2,
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
      usuarioId: 1,
      usuario: {
        id: 1,
        nome: "Ana Silva",
        avatar: "/images/avatars/anasilva.jpg",
        tipo: "usuario"
      },
      conteudo: {
        texto: "Dia de passeio no parque! O Thor adora correr na grama 🐕💚",
        midia: null
      },
      engajamento: {
        curtidas: 31,
        comentarios: 5,
        compartilhamentos: 2
      },
      data: "2024-03-14T16:20:00Z",
      localizacao: "Parque do Ibirapuera, SP",
      hashtags: ["#passeio", "#parque", "#cachorro"]
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
      }
      setCarregando(false);
    }, 800);
  }, [usuarioId]);

  const handleSeguir = () => {
    // Lógica para seguir/parar de seguir
    console.log('Seguir/Deixar de seguir:', usuarioId);
    alert(usuario.estatisticas.seguindo ? 'Deixou de seguir' : 'Começou a seguir');
  };

  const handleMensagem = () => {
    // Navegar para o chat
    navigate(`/chat/${usuarioId}`);
  };

  const formatarData = (dataString) => {
    try {
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

  if (carregando) {
    return (
      <div className="pagina-perfil-publico carregando">
        <div className="container-perfil-publico">
          <div className="carregando-texto">Carregando perfil...</div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="pagina-perfil-publico">
      <div className="container-perfil-publico">
        
        {/* Cabeçalho com Botão Voltar */}
        <div className="cabecalho-perfil">
          <button 
            onClick={() => navigate('/amigos')}
            className="botao-voltar"
          >
            ← Voltar para Amigos
          </button>
          <h1>Perfil Público</h1>
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
            {usuario.apelido && (
              <span className="apelido-usuario">@{usuario.apelido}</span>
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
                    />
                    <div className="info-post-publico">
                      <span className="nome-usuario-post">{post.usuario.nome}</span>
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
                  
                  {/* Engajamento */}
                  <div className="engajamento-post-publico">
                    <div className="estatisticas-publico">
                      <span>❤️ {post.engajamento.curtidas}</span>
                      <span>💬 {post.engajamento.comentarios}</span>
                      <span>↗️ {post.engajamento.compartilhamentos}</span>
                    </div>
                  </div>

                  {/* Ações (apenas interação) */}
                  <div className="acoes-post-publico">
                    <button className="botao-acao-publico">🤍 Curtir</button>
                    <button className="botao-acao-publico">💬 Comentar</button>
                    <button className="botao-acao-publico">↗️ Compartilhar</button>
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