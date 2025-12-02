// src/components/perfil/PerfilPublico.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';

const PerfilPublico = () => {
    const { usuarioId } = useParams();
    const { usuarios, posts } = useAuth();
    const navigate = useNavigate();
    
    const [perfil, setPerfil] = useState(null);
    const [postsUsuario, setPostsUsuario] = useState([]);
    const [petsUsuario, setPetsUsuario] = useState([]);

    useEffect(() => {
        const user = Object.values(usuarios || {}).find(u => u.username === usuarioId);
        
        if (user) {
            setPerfil(user);
            const userPosts = (posts || []).filter(post => post.usuario?.username === user.username);
            setPostsUsuario(userPosts);
            setPetsUsuario(user.pets || []);
        } else {
            setPerfil(null);
        }
    }, [usuarioId, usuarios, posts]);

    const getDefaultCapaStyle = () => {
        return {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
    };

    const handleCapaError = (e) => {
        e.target.style.display = 'none';
        const parent = e.target.parentNode;
        parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    const handleAvatarError = (e) => {
        e.target.style.display = 'none';
        const parent = e.target.parentNode;
        
        if (!parent.querySelector('.avatar-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'avatar-fallback';
            fallback.style.cssText = `
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background: linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 3rem;
                font-weight: bold;
                border: 5px solid white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `;
            fallback.innerHTML = `<span>${perfil?.nome ? perfil.nome.charAt(0).toUpperCase() : 'U'}</span>`;
            parent.appendChild(fallback);
        }
    };

    if (!perfil) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando perfil ou usuário não encontrado...</div>;
    }

    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <button 
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#FF6B35',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                ← Voltar
            </button>
            
            <div 
                style={{ 
                    height: '300px',
                    ...getDefaultCapaStyle(),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '15px',
                    position: 'relative',
                    marginBottom: '80px',
                    overflow: 'hidden'
                }}
            >
                {perfil.fotoCapa && perfil.fotoCapa.startsWith('data:image') && (
                    <img 
                        src={perfil.fotoCapa} 
                        alt="Capa"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                        onLoad={(e) => {
                            e.target.parentNode.style.background = 'none';
                        }}
                        onError={handleCapaError}
                    />
                )}
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '30px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '20px',
                    zIndex: 2
                }}>
                    <div style={{ position: 'relative' }}>
                        {perfil.fotoPerfil && perfil.fotoPerfil.startsWith('data:image') ? (
                            <img 
                                src={perfil.fotoPerfil} 
                                alt={perfil.nome}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '5px solid white',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }}
                                onError={handleAvatarError}
                            />
                        ) : (
                            <div style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                border: '5px solid white',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                            }}>
                                {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                    </div>
                    <div style={{ marginBottom: '20px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        <h1 style={{ margin: '0 0 5px 0', color: 'white', fontSize: '2rem' }}>{perfil.nome}</h1>
                        <p style={{ margin: '0 0 10px 0', color: 'white', fontSize: '1.2rem' }}>@{perfil.username}</p>
                        <p style={{ margin: 0, color: 'white', maxWidth: '600px' }}>{perfil.bio || 'Sem biografia para exibir.'}</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ marginBottom: '20px', color: '#333' }}>
                        🐾 Pets de {perfil.nome} ({petsUsuario.length})
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                        gap: '20px' 
                    }}>
                        {petsUsuario.length > 0 ? (
                            petsUsuario.map(pet => (
                                <div 
                                    key={pet.id} 
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        transform: 'translateY(0)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    onClick={() => navigate(`/pet/${pet.id}`)}
                                >
                                    <div style={{
                                        height: '120px',
                                        backgroundColor: '#f0f0f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '3rem',
                                        position: 'relative'
                                    }}>
                                        {pet.foto && pet.foto.startsWith('data:image') ? (
                                            <img 
                                                src={pet.foto} 
                                                alt={pet.nome}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const parent = e.target.parentNode;
                                                    parent.innerHTML = pet.foto || '🐾';
                                                    parent.style.fontSize = '3rem';
                                                    parent.style.display = 'flex';
                                                    parent.style.alignItems = 'center';
                                                    parent.style.justifyContent = 'center';
                                                }}
                                            />
                                        ) : (
                                            <span>{pet.foto || '🐾'}</span>
                                        )}
                                    </div>
                                    <div style={{ padding: '15px' }}>
                                        <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{pet.nome}</h3>
                                        <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.9rem' }}>
                                            {pet.tipo} • {pet.raca}
                                        </p>
                                        <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>{pet.descricao}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#666' }}>Nenhum pet cadastrado publicamente.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 style={{ marginBottom: '20px', color: '#333' }}>
                        📸 Posts de {perfil.nome} ({postsUsuario.length})
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                        gap: '20px' 
                    }}>
                        {postsUsuario.length > 0 ? (
                            postsUsuario.map(post => (
                                <div 
                                    key={post.id} 
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <div style={{ 
                                        height: '200px', 
                                        backgroundColor: '#f0f0f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}>
                                        {post.imagem && post.imagem.startsWith('data:image') ? (
                                            <img 
                                                src={post.imagem} 
                                                alt={`Post de ${perfil.nome}`}
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const parent = e.target.parentNode;
                                                    parent.innerHTML = '<span style="color: #999">Imagem não disponível</span>';
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: '#999' }}>Sem imagem</span>
                                        )}
                                    </div>
                                    <div style={{ padding: '15px' }}>
                                        <p style={{ 
                                            margin: '0 0 10px 0', 
                                            color: '#333',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {post.conteudo}
                                        </p>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontSize: '0.8rem',
                                            color: '#666'
                                        }}>
                                            <span>{new Date(post.data).toLocaleDateString('pt-BR')}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span style={{ color: '#ff4757' }}>❤️</span>
                                                <span>{post.curtidas?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#666' }}>Nenhum post publicado.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PerfilPublico;