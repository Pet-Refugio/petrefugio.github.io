import { useAuth } from '../../context/AuthContext';
import '../../styles/feed/feed.css';

const FeedPrincipal = () => {
  const { usuario, criarPost, curtirPost, adicionarComentario, seguirUsuario, deixarSeguir, logout, obterPostsFeed } = useAuth();
  const [novoPost, setNovoPost] = useState('');
  const [comentarioAtivo, setComentarioAtivo] = useState(null);
  const [textoComentario, setTextoComentario] = useState('');
  const [postsFeed, setPostsFeed] = useState([]);

  useEffect(() => {
    if (usuario) {
      console.log('🔄 Atualizando feed para:', usuario.nome);
      const posts = obterPostsFeed();
      setPostsFeed(posts);
    }
  }, [usuario, obterPostsFeed]);

  const handleCriarPost = (e) => {
    e.preventDefault();
    if (novoPost.trim()) {
      criarPost(novoPost);
      setNovoPost('');
      setTimeout(() => {
        const posts = obterPostsFeed();
        setPostsFeed(posts);
      }, 500);
    }
  };

  const handleComentario = (postId) => {
    if (textoComentario.trim()) {
      adicionarComentario(postId, textoComentario);
      setTextoComentario('');
      setComentarioAtivo(null);
      setTimeout(() => {
        const posts = obterPostsFeed();
        setPostsFeed(posts);
      }, 500);
    }
  };

  const handleCurtir = (postId) => {
    curtirPost(postId);
    setTimeout(() => {
      const posts = obterPostsFeed();
      setPostsFeed(posts);
    }, 500);
  };

  const estaSeguindo = (emailUsuario) => {
    return usuario.seguindo.includes(emailUsuario);
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="feed-container">
      <header className="feed-header">
        <div className="logo">
          <span className="logo-icone">🐾</span>
          <span className="logo-texto">PetRefugio</span>
        </div>
        <div className="usuario-info">
          <span>Olá, {usuario.nome}</span>
          <button onClick={() => window.location.href = '/perfil'} className="botao-perfil">
            Meu Perfil
          </button>
          {usuario.tipo === 'admin' && (
            <button onClick={() => window.location.href = '/admin'} className="botao-admin">
              Admin
            </button>
          )}
          <button onClick={logout} className="botao-sair">
            Sair
          </button>
        </div>
      </header>

      {/* Criar novo post */}
      <div className="criar-post">
        <h3>Criar Post</h3>
        <form onSubmit={handleCriarPost}>
          <textarea
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
            placeholder="O que seu pet fez de engraçado hoje? 🐾"
            rows="3"
          />
          <button type="submit" disabled={!novoPost.trim()}>
            Publicar
          </button>
        </form>
      </div>

      {/* Lista de posts */}
      <div className="posts-container">
        <h3>Feed - Posts de Todos os Usuários</h3>
        {postsFeed.length === 0 ? (
          <div className="sem-posts">
            <p>Nenhum post ainda. Seja o primeiro a postar! 🐾</p>
          </div>
        ) : (
          postsFeed.map(post => (
            <div key={post.id} className="post"> 
              <div className="post-header">
                <div className="post-usuario">
                  <span className="usuario-foto">👤</span>
                  <div>
                    <strong>{post.usuarioNome}</strong>
                    <span>@{post.usuarioUsername}</span>
                    {post.usuario?.tipo === 'veterinario' && (
                      <span className="badge-veterinario">🐾 Veterinário</span>
                    )}
                  </div>
                </div>
                {post.usuarioEmail !== usuario.email && (
                  <button 
                    onClick={() => 
                      estaSeguindo(post.usuarioEmail) 
                        ? deixarSeguir(post.usuarioEmail)
                        : seguirUsuario(post.usuarioEmail)
                    }
                    className={`botao-seguir ${estaSeguindo(post.usuarioEmail) ? 'seguindo' : ''}`}
                  >
                    {estaSeguindo(post.usuarioEmail) ? 'Seguindo' : 'Seguir'}
                  </button>
                )}
              </div>

              <div className="post-conteudo">
                <p>{post.conteudo}</p>
                <small>{new Date(post.data).toLocaleString('pt-BR')}</small>
              </div>

              <div className="post-acoes">
                <button 
                  onClick={() => handleCurtir(post.id)}
                  className={`botao-curtir ${post.curtidas.includes(usuario.email) ? 'curtido' : ''}`}
                >
                  ❤️ {post.curtidas.length}
                </button>
                <button 
                  onClick={() => setComentarioAtivo(comentarioAtivo === post.id ? null : post.id)}
                  className="botao-comentar"
                >
                  💬 {post.comentarios.length}
                </button>
              </div>

              {/* Comentários */}
              {comentarioAtivo === post.id && (
                <div className="comentarios">
                  <div className="novo-comentario">
                    <input
                      type="text"
                      value={textoComentario}
                      onChange={(e) => setTextoComentario(e.target.value)}
                      placeholder="Escreva um comentário..."
                    />
                    <button onClick={() => handleComentario(post.id)}>
                      Comentar
                    </button>
                  </div>
                  {post.comentarios.map(comentario => (
                    <div key={comentario.id} className="comentario">
                      <strong>{comentario.usuarioNome}</strong>
                      <span>{comentario.texto}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedPrincipal;
