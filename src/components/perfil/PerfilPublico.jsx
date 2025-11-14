// src/components/perfil/PerfilPublico.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/perfil/PerfilPublico.css';

const PerfilPublico = () => {
  const { usuarioId } = useParams();
  const { usuario: usuarioLogado, usuarios, seguirUsuario, deixarSeguir } = useAuth();
  const navigate = useNavigate();
  const [usuarioPublico, setUsuarioPublico] = useState(null);

  useEffect(() => {
    if (usuarios && usuarioId) {
      setUsuarioPublico(usuarios[usuarioId]);
    }
  }, [usuarios, usuarioId]);

  if (!usuarioPublico) {
    return (
      <div className="perfil-publico-carregando">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  const estaSeguindo = usuarioLogado?.seguindo?.includes(usuarioId) || false;
  const ehMeuPerfil = usuarioLogado?.email === usuarioId;

  const handleSeguir = () => {
    if (estaSeguindo) {
      deixarSeguir(usuarioId);
    } else {
      seguirUsuario(usuarioId);
    }
  };

  if (ehMeuPerfil) {
    navigate('/perfil');
    return null;
  }

  return (
    <div className="perfil-publico-container">
      <div className="cabecalho-perfil-publico">
        <button onClick={() => navigate(-1)} className="botao-voltar">
          ← Voltar
        </button>
        
        <div className="info-perfil-publico">
          <div className="avatar-perfil-publico">
            {usuarioPublico.fotoPerfil ? (
              <img src={usuarioPublico.fotoPerfil} alt={usuarioPublico.nome} />
            ) : (
              <div className="avatar-placeholder-publico">
                {usuarioPublico.nome ? usuarioPublico.nome.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          
          <div className="detalhes-perfil-publico">
            <h1>{usuarioPublico.nome}</h1>
            <p className="username-publico">@{usuarioPublico.username}</p>
            <p className="bio-publico">{usuarioPublico.bio || 'Sem biografia ainda...'}</p>
            
            <div className="estatisticas-publico">
              <div className="estatistica-publico">
                <strong>{usuarioPublico.posts?.length || 0}</strong>
                <span>Posts</span>
              </div>
              <div className="estatistica-publico">
                <strong>{usuarioPublico.seguidores?.length || 0}</strong>
                <span>Seguidores</span>
              </div>
              <div className="estatistica-publico">
                <strong>{usuarioPublico.seguindo?.length || 0}</strong>
                <span>Seguindo</span>
              </div>
            </div>
            
            <button 
              onClick={handleSeguir}
              className={`botao-seguir-publico ${estaSeguindo ? 'seguindo' : ''}`}
            >
              {estaSeguindo ? '✅ Seguindo' : '👤 Seguir'}
            </button>
          </div>
        </div>
      </div>

      {/* Posts do usuário público */}
      <div className="posts-perfil-publico">
        <h2>Posts de {usuarioPublico.nome}</h2>
        
        {usuarioPublico.posts?.length === 0 ? (
          <div className="sem-posts-publico">
            <p>Este usuário ainda não fez nenhum post</p>
          </div>
        ) : (
          <div className="lista-posts-publico">
            {usuarioPublico.posts?.map(post => (
              <div key={post.id} className="card-post-publico">
                <div className="conteudo-post-publico">
                  <p>{post.conteudo}</p>
                  {post.imagem && (
                    <img src={post.imagem} alt="Post" className="imagem-post-publico" />
                  )}
                </div>
                <div className="info-post-publico">
                  <span>{new Date(post.data).toLocaleDateString('pt-BR')}</span>
                  <span>❤️ {post.curtidas?.length || 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilPublico;