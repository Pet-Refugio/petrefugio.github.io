// src/components/principal/AreaConteudo.jsx
import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/principal/AreaConteudo.css';

const AreaConteudo = ({ usuario }) => {
  const { usuarios, criarPost, curtirPost, seguirUsuario, deixarSeguir } = useAuth();
  const navigate = useNavigate();
  const [novoPost, setNovoPost] = useState('');
  const [imagemPost, setImagemPost] = useState(null);
  const [mostrarOpcoesFoto, setMostrarOpcoesFoto] = useState(false);
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const [imagemCapturada, setImagemCapturada] = useState(null);
  
  // Refs para a câmera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const getTodosPosts = () => {
    if (!usuarios || !usuario) return [];
    
    try {
      const postsMap = new Map();
      
      Object.entries(usuarios).forEach(([email, user]) => {
        if (user.posts && Array.isArray(user.posts)) {
          user.posts.forEach(post => {
            const chaveUnica = `${email}-${post.id}`;
            if (!postsMap.has(chaveUnica)) {
              postsMap.set(chaveUnica, {
                ...post,
                usuarioNome: user.nome,
                usuarioUsername: user.username,
                usuarioEmail: email,
                usuarioFoto: user.fotoPerfil,
                usuarioTipo: user.tipo,
                username: user.username
              });
            }
          });
        }
      });

      const postsArray = Array.from(postsMap.values());
      return postsArray.sort((a, b) => {
        try {
          return new Date(b.data) - new Date(a.data);
        } catch {
          return 0;
        }
      });
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      return [];
    }
  };

  const todosPosts = getTodosPosts();

  const irParaPerfil = (postUsername, postEmail) => {
    console.log('Navegando para perfil:', { postUsername, postEmail, usuarioEmail: usuario.email });
    
    if (postEmail === usuario.email) {
      navigate('/perfil');
    } else if (postUsername) {
      navigate(`/perfil/publico/${postUsername}`);
    } else {
      const user = Object.values(usuarios || {}).find(u => u.email === postEmail);
      if (user && user.username) {
        navigate(`/perfil/publico/${user.username}`);
      } else {
        console.error('Não foi possível encontrar o perfil');
      }
    }
  };

  const handleCriarPost = async (e) => {
    e.preventDefault();
    if (novoPost.trim() || imagemPost) {
      const resultado = await criarPost(novoPost, imagemPost);
      if (resultado) {
        setNovoPost('');
        setImagemPost(null);
        setMostrarOpcoesFoto(false);
        setTimeout(() => window.location.reload(), 500);
      } else {
        alert('Erro ao criar post. Tente novamente.');
      }
    }
  };

  const iniciarCamera = async () => {
    try {
      setMostrarCamera(true);
      setMostrarOpcoesFoto(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
      setMostrarCamera(false);
    }
  };

  const tirarFotoCamera = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      context.drawImage(videoRef.current, 0, 0);
      
      const imageDataURL = canvasRef.current.toDataURL('image/jpeg', 0.8);
      setImagemCapturada(imageDataURL);
      setImagemPost(imageDataURL); 
      pararCamera();
    }
  };

  const pararCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    setMostrarCamera(false);
  };

  const escolherFoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagemPost(event.target.result);
          setMostrarOpcoesFoto(false);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const removerFoto = () => {
    setImagemPost(null);
  };

  const handleCurtirPost = (postId) => {
    curtirPost(postId);
  };

  const estaSeguindo = (emailUsuario) => {
    return usuario.seguindo && Array.isArray(usuario.seguindo) && usuario.seguindo.includes(emailUsuario);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const parent = e.target.parentNode;
    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder';
    placeholder.textContent = '👤';
    parent.appendChild(placeholder);
  };

  return (
    <div className="area-conteudo">
      {/* Criar Post */}
      <div className="card-criar-post">
        <div className="cabecalho-criar-post">
          <div 
            className="usuario-criar-post"
            onClick={() => irParaPerfil(usuario.username, usuario.email)}
            style={{cursor: 'pointer'}}
          >
            {usuario.fotoPerfil ? (
              <img 
                src={usuario.fotoPerfil} 
                alt={usuario.nome} 
                className="avatar-usuario"
                onError={handleImageError}
              />
            ) : (
              <div className="avatar-placeholder-usuario">
                {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="info-usuario-criar">
              <strong>{usuario.nome}</strong>
              <span>@{usuario.username}</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleCriarPost} className="form-criar-post">
          <textarea
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
            placeholder={`O que seu pet fez hoje, ${usuario.nome?.split(' ')[0] || 'amigo'}? 🐾`}
            rows="3"
            className="textarea-post"
          />
          
          {/* Preview da imagem */}
          {imagemPost && (
            <div className="preview-imagem">
              <img src={imagemPost} alt="Preview" className="imagem-preview" />
              <button type="button" onClick={removerFoto} className="botao-remover-imagem">
                ✕
              </button>
            </div>
          )}

          <div className="rodape-criar-post">
            <div className="acoes-midia">
              <button 
                type="button" 
                onClick={() => setMostrarOpcoesFoto(!mostrarOpcoesFoto)}
                className="botao-midia"
                title="Adicionar mídia"
              >
                📷
              </button>
              
              {mostrarOpcoesFoto && (
                <div className="menu-opcoes-foto">
                  <button type="button" onClick={iniciarCamera} className="opcao-foto">
                    📸 Usar Câmera
                  </button>
                  <button type="button" onClick={escolherFoto} className="opcao-foto">
                    🖼️ Escolher da Galeria
                  </button>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={!novoPost.trim() && !imagemPost}
              className="botao-publicar"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>

      {/* Feed de Posts */}
      <div className="feed-posts">
        {todosPosts.length === 0 ? (
          <div className="sem-posts">
            <div className="icone-sem-posts">🐾</div>
            <h3>Seu feed está vazio</h3>
            <p>Siga outros usuários ou faça seu primeiro post!</p>
            <button 
              onClick={() => document.querySelector('.textarea-post')?.focus()}
              className="botao-criar-primeiro-post"
            >
              Criar Primeiro Post
            </button>
          </div>
        ) : (
          <>
            <div className="feed-info">
              <h3>Feed Global</h3>
              <span className="contador-posts">{todosPosts.length} posts</span>
            </div>
            
            {todosPosts.map(post => (
              <div key={`${post.usuarioEmail}-${post.id}`} className="card-post">
                <div className="cabecalho-post">
                  <div 
                    className="usuario-post"
                    onClick={() => irParaPerfil(post.usuarioUsername || post.username, post.usuarioEmail)}
                    style={{cursor: 'pointer'}}
                  >
                    {post.usuarioFoto ? (
                      <img 
                        src={post.usuarioFoto} 
                        alt={post.usuarioNome}
                        className="avatar-post"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="avatar-placeholder-post">
                        {post.usuarioNome ? post.usuarioNome.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="info-usuario-post">
                      <strong>{post.usuarioNome}</strong>
                      <span>@{post.usuarioUsername}</span>
                      {post.usuarioTipo === 'veterinario' && (
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
                
                <div className="conteudo-post">
                  <p>{post.conteudo}</p>
                  
                  {post.imagem && (
                    <div className="imagem-post-container">
                      <img src={post.imagem} alt="Post" className="imagem-post" />
                    </div>
                  )}
                </div>

                <div className="acoes-post">
                  <button 
                    onClick={() => handleCurtirPost(post.id)}
                    className={`botao-acao ${post.curtidas && post.curtidas.includes(usuario.email) ? 'curtido' : ''}`}
                  >
                    ❤️ {post.curtidas ? post.curtidas.length : 0}
                  </button>
                  <button className="botao-acao">
                    💬 {post.comentarios ? post.comentarios.length : 0}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Modal da Câmera */}
      {mostrarCamera && (
        <div className="modal-camera-overlay">
          <div className="modal-camera">
            <div className="cabecalho-camera">
              <h3>Tirar Foto</h3>
              <button className="botao-fechar-camera" onClick={pararCamera}>
                ✕
              </button>
            </div>
            <div className="area-camera">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted
                className="video-camera"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className="controles-camera">
              <button className="botao-tirar-foto" onClick={tirarFotoCamera}>
                📷
              </button>
              <button className="botao-cancelar-camera" onClick={pararCamera}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaConteudo;