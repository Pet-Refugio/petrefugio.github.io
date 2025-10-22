import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/perfil/PerfilPublico.css';
import amigosData from '../../dados/amigos.json';
import postsData from '../../dados/posts.json';

const PerfilPublico = () => {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

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
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #F26B38, #FF9D71);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 2rem;
      `;
      
      e.target.style.display = 'none';
      parent.appendChild(placeholder);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const usuarioEncontrado = amigosData.amigos.find(u => u.id === parseInt(usuarioId));
      
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        
        const postsUsuario = postsData.posts
          .filter(post => post.usuarioId === parseInt(usuarioId))
          .sort((a, b) => new Date(b.data) - new Date(a.data));
        
        setPosts(postsUsuario);
      }
      setCarregando(false);
    }, 500);
  }, [usuarioId]);

  const handleSeguir = () => {
    alert(usuario.estatisticas.seguindo ? 'Deixou de seguir' : 'Começou a seguir');
  };

  const handleMensagem = () => {
    navigate(`/chat/${usuarioId}`);
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarDataPost = (dataString) => {
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
        
        <div className="cabecalho-perfil">
          <button 
            onClick={() => navigate('/principal/amigos')}
            className="botao-voltar"
          >
            ← Voltar
          </button>
          <h1>Perfil Público</h1>
        </div>

        <div className="secao-capa">
          <div className="capa-perfil">
            <img 
              src={usuario.capa} 
              alt="Capa do perfil"
              className="imagem-capa"
              onError={handleImageError}
            />
          </div>
          <div className="avatar-container-publico">
            <img 
              src={usuario.avatar} 
              alt={usuario.nome}
              className="avatar-publico"
              onError={handleImageError}
            />
          </div>
        </div>

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

          <div className="acoes-perfil-publico">
            <button className="botao-mensagem" onClick={handleMensagem}>
              💬 Enviar Mensagem
            </button>
            <button className="botao-seguir" onClick={handleSeguir}>
              {usuario.estatisticas.seguindo ? '✅ Seguindo' : '👤 Seguir'}
            </button>
          </div>
        </div>

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

        {usuario.pets && usuario.pets.length > 0 && (
          <div className="secao-pets-publico">
            <h3>Pets de {usuario.nome.split(' ')[0]}</h3>
            <div className="lista-pets-publico">
              {usuario.pets.map((pet, index) => (
                <div key={index} className="card-pet-publico">
                  <div className="avatar-pet-placeholder">
                    {pet.charAt(0)}
                  </div>
                  <div className="info-pet-publico">
                    <span className="nome-pet">{pet}</span>
                    <span className="tipo-pet">Pet • Amigo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="secao-posts-publico">
          <h3>Posts de {usuario.nome.split(' ')[0]}</h3>
          
          {posts.length > 0 ? (
            <div className="lista-posts-publico">
              {posts.map(post => (
                <div key={post.id} className="card-post-publico">
                  <div className="cabecalho-post-publico">
                    <img 
                      src={post.usuario.avatar} 
                      alt={post.usuario.nome}
                      className="avatar-post-publico"
                      onError={handleImageError}
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
                  
                  <div className="conteudo-post-publico">
                    <p>{post.conteudo.texto}</p>
                    
                    {post.conteudo.midia && (
                      <div className="midia-post-publico">
                        <img
                          src={post.conteudo.midia.url}
                          alt={post.conteudo.midia.alt}
                          className="imagem-post-publico"
                          onError={handleImageError}
                        />
                      </div>
                    )}
                    
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
                  
                  <div className="engajamento-post-publico">
                    <div className="estatisticas-publico">
                      <span>❤️ {post.engajamento.curtidas}</span>
                      <span>💬 {post.engajamento.comentarios}</span>
                      <span>↗️ {post.engajamento.compartilhamentos}</span>
                    </div>
                  </div>

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