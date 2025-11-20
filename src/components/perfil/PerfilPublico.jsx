// src/components/perfil/PerfilPublico.jsx - CÓDIGO FINAL E CORRIGIDO

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import '../../styles/perfil/PerfilPublico.css';

const PerfilPublico = () => {
    const { usuarioId } = useParams();
    const { usuarios, posts } = useAuth();
    const navigate = useNavigate(); // Hook para navegação
    
    const [perfil, setPerfil] = useState(null);
    const [postsUsuario, setPostsUsuario] = useState([]);
    const [petsUsuario, setPetsUsuario] = useState([]);

    useEffect(() => {
        // 1. Busca o usuário pelo username (usuarioId)
        const user = Object.values(usuarios || {}).find(u => u.username === usuarioId);
        
        if (user) {
            setPerfil(user);

            // CORREÇÃO: Usamos (posts || []) para garantir que é um array e evitar o erro "Cannot read properties of undefined (reading 'filter')"
            const userPosts = (posts || []).filter(post => post.usuario?.username === user.username);
            setPostsUsuario(userPosts);

            // Assume que o objeto de usuário tem um array 'pets'
            setPetsUsuario(user.pets || []); 
        } else {
            setPerfil(null);
        }
    }, [usuarioId, usuarios, posts]);

    if (!perfil) {
        return <div className="perfil-publico-vazio">Carregando perfil ou usuário não encontrado...</div>;
    }
    
    // URLs de fallback para garantir a exibição, mesmo que os caminhos estejam incorretos
    const defaultCapa = '/images/capas/default-capa.jpg';
    const defaultAvatar = '/images/avatars/default.jpg';
    const defaultPet = '/images/pets/default.jpg';

    // Função auxiliar para renderizar avatar
    const renderAvatar = (user) => (
        <div className="perfil-avatar-wrapper">
            <img 
                src={user.fotoPerfil || defaultAvatar} 
                alt={user.nome} 
                // Fallback caso o caminho da imagem esteja errado ou a imagem não carregue
                onError={(e) => e.target.src = defaultAvatar} 
            />
        </div>
    );

    return (
        <div className="perfil-publico-container">
            {/* NOVO ITEM: BOTÃO VOLTAR */}
            <button onClick={() => navigate(-1)} className="botao-voltar-perfil">
                ← Voltar
            </button>
            
            {/* Cabeçalho/Capa do Perfil */}
            <div 
                className="perfil-header" 
                // Garante que a imagem de capa ou o default apareça
                style={{ 
                    backgroundImage: `url(${perfil.fotoCapa || defaultCapa})` 
                }}
            >
                <div className="perfil-info-overlay">
                    {renderAvatar(perfil)}
                    <h1 className="perfil-nome">{perfil.nome}</h1>
                    <p className="perfil-username">@{perfil.username}</p>
                    <p className="perfil-bio">{perfil.bio || 'Sem biografia para exibir.'}</p>
                </div>
            </div>

            {/* Conteúdo Principal (Pets e Posts) */}
            <div className="perfil-content">
                
                {/* Pets Vinculados */}
                <section className="perfil-section">
                    <h2>🐾 Pets de {perfil.nome} ({petsUsuario.length})</h2>
                    <div className="perfil-publico-pets-grid"> {/* CLASSE RENOMEADA */}
                        {petsUsuario.length > 0 ? (
                            petsUsuario.map(pet => (
                                <Link to={`/pet/${pet.id}`} key={pet.id} className="perfil-publico-pet-card"> {/* CLASSE RENOMEADA */}
                                    <img src={pet.fotoPerfil || defaultPet} alt={pet.nome} />
                                    <p>{pet.nome}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="info-vazio">Nenhum pet cadastrado publicamente.</p>
                        )}
                    </div>
                </section>

                {/* Posts Vinculados */}
                <section className="perfil-section">
                    <h2>📸 Posts de {perfil.nome} ({postsUsuario.length})</h2>
                    <div className="posts-grid">
                        {postsUsuario.length > 0 ? (
                            postsUsuario.map(post => (
                                <div key={post.id} className="post-card-grid">
                                    <img 
                                        src={post.conteudo.midia?.url} 
                                        alt={`Post de ${perfil.nome}`}
                                        onError={(e) => e.target.src = '/images/placeholder-post.jpg'} 
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="info-vazio">Nenhum post publicado.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PerfilPublico;