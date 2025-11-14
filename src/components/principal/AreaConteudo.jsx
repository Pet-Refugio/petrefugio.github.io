// src/components/principal/AreaConteudo.jsx - VERSÃO ATUALIZADA
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/principal/AreaConteudo.css';

const AreaConteudo = ({ usuario }) => {
  const { usuarios, criarPost, curtirPost, seguirUsuario, deixarSeguir } = useAuth();
  const navigate = useNavigate();
  const [novoPost, setNovoPost] = useState('');
  const [imagemPost, setImagemPost] = useState(null);
  const [mostrarOpcoesFoto, setMostrarOpcoesFoto] = useState(false);

  // Função segura para obter posts
  const getTodosPosts = () => {
    if (!usuarios || !usuario) return [];
    
    return Object.values(usuarios)
      .flatMap(user => {
        const postsDoUsuario = Array.isArray(user.posts) ? user.posts : [];
        return postsDoUsuario.map(post => ({
          ...post,
          usuarioNome: user.nome || 'Usuário',
          usuarioUsername: user.username || 'usuario',
          usuarioEmail: Object.keys(usuarios).find(email => usuarios[email] === user) || '',
          usuarioFoto: user.fotoPerfil || null
        }));
      })
      .filter(post => {
        const usuariosParaMostrar = [usuario.email, ...(Array.isArray(usuario.seguindo) ? usuario.seguindo : [])];
        return usuariosParaMostrar.includes(post.usuarioEmail);
      })
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  };

  const todosPosts = getTodosPosts();

  const handleCriarPost = (e) => {
    e.preventDefault();
    if (novoPost.trim() || imagemPost) {
      criarPost(novoPost, imagemPost);
      setNovoPost('');
      setImagemPost(null);
      setMostrarOpcoesFoto(false);
    }
  };

  const tirarFoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    
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
    if (curtirPost) {
      curtirPost(postId);
    }
  };

  const estaSeguindo = (emailUsuario) => {
    return Array.isArray(usuario.seguindo) && usuario.seguindo.includes(emailUsuario);
  };

  const irParaPerfil = (emailUsuario) => {
    if (emailUsuario === usuario.email) {
      navigate('/perfil');
    } else {
      navigate(`/perfil/publico/${emailUsuario}`);
    }
  };

  return (
    <div className="area-conteudo">
      {/* Criar Post - DESIGN MODERNO */}
      <div className="card-criar-post">
        <div className="cabecalho-criar-post">
          <div 
            className="usuario-criar-post"
            onClick={() => irParaPerfil(usuario.email)}
            style={{cursor: 'pointer'}}
          >
            {usuario.fotoPerfil ? (
              <img src={usuario.fotoPerfil} alt="Seu perfil" className="avatar-usuario" />
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
                  <button type="button" onClick={tirarFoto} className="opcao-foto">
                    📸 Tirar Foto
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
        {!Array.isArray(todosPosts) || todosPosts.length === 0 ? (
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
          todosPosts.map(post => (
            <div key={post.id || Math.random()} className="card-post">
              <div className="cabecalho-post">
                <div 
                  className="usuario-post"
                  onClick={() => irParaPerfil(post.usuarioEmail)}
                  style={{cursor: 'pointer'}}
                >
                  {post.usuarioFoto ? (
                    <img src={post.usuarioFoto} alt={post.usuarioNome} className="avatar-post" />
                  ) : (
                    <div className="avatar-placeholder-post">
                      {post.usuarioNome ? post.usuarioNome.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="info-usuario-post">
                    <strong>{post.usuarioNome}</strong>
                    <span>@{post.usuarioUsername}</span>
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
                  className={`botao-acao ${post.curtidas && Array.isArray(post.curtidas) && post.curtidas.includes(usuario.email) ? 'curtido' : ''}`}
                >
                  ❤️ <span>{post.curtidas && Array.isArray(post.curtidas) ? post.curtidas.length : 0}</span>
                </button>
                <button className="botao-acao">
                  💬 <span>{post.comentarios && Array.isArray(post.comentarios) ? post.comentarios.length : 0}</span>
                </button>
                <button className="botao-acao">
                  🔄
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AreaConteudo;