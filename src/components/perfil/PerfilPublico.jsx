import { useEffect, useState } from 'react';
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

    const getInicialNome = (nome) => {
        return nome ? nome.charAt(0).toUpperCase() : 'U';
    };

    const getCorAvatar = (nome) => {
        const cores = [
            '#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
        ];
        const index = nome ? nome.charCodeAt(0) % cores.length : 0;
        return cores[index];
    };

    if (!perfil) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando perfil ou usuário não encontrado...</div>;
    }

    return (
        <div style={{ 
            maxWidth: '1000px', 
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
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}
            >
                ← Voltar
            </button>
            
            {/* Cabeçalho do Perfil */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    marginBottom: '25px'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: perfil.fotoPerfil ? 'none' : getCorAvatar(perfil.nome),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '3rem',
                        position: 'relative',
                        border: '5px solid white',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}>
                        {perfil.fotoPerfil ? (
                            <img 
                                src={perfil.fotoPerfil} 
                                alt={perfil.nome}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    const parent = e.target.parentNode;
                                    parent.innerHTML = getInicialNome(perfil.nome);
                                    parent.style.display = 'flex';
                                    parent.style.alignItems = 'center';
                                    parent.style.justifyContent = 'center';
                                    parent.style.background = getCorAvatar(perfil.nome);
                                }}
                            />
                        ) : (
                            getInicialNome(perfil.nome)
                        )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                        <h1 style={{ 
                            margin: '0 0 8px 0', 
                            color: '#333',
                            fontSize: '2.2rem'
                        }}>
                            {perfil.nome}
                        </h1>
                        <p style={{ 
                            margin: '0 0 15px 0', 
                            color: '#666',
                            fontSize: '1.1rem'
                        }}>
                            @{perfil.username}
                        </p>
                        <p style={{ 
                            margin: '0 0 20px 0', 
                            color: '#555',
                            fontSize: '1rem',
                            lineHeight: '1.5'
                        }}>
                            {perfil.bio || 'Sem biografia para exibir.'}
                        </p>
                        
                        {/* Estatísticas */}
                        <div style={{
                            display: 'flex',
                            gap: '30px',
                            marginTop: '20px'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: 'bold',
                                    color: '#FF6B35'
                                }}>
                                    {perfil.seguindo?.length || 0}
                                </div>
                                <div style={{ 
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    Seguindo
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: 'bold',
                                    color: '#FF6B35'
                                }}>
                                    {perfil.seguidores?.length || 0}
                                </div>
                                <div style={{ 
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    Seguidores
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: 'bold',
                                    color: '#FF6B35'
                                }}>
                                    {perfil.posts?.length || 0}
                                </div>
                                <div style={{ 
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    Posts
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção de Pets */}
            <section style={{ 
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '25px',
                marginBottom: '30px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    margin: '0 0 25px 0', 
                    color: '#333',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>🐾</span>
                    Pets de {perfil.nome} ({petsUsuario.length})
                </h2>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '20px' 
                }}>
                    {petsUsuario.length > 0 ? (
                        petsUsuario.map(pet => (
                            <div 
                                key={pet.id} 
                                style={{
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid #eee'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                onClick={() => navigate(`/pet/${pet.id}`)}
                            >
                                <div style={{
                                    height: '140px',
                                    backgroundColor: '#e8f4fc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '4rem'
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
                                                parent.style.fontSize = '4rem';
                                                parent.style.display = 'flex';
                                                parent.style.alignItems = 'center';
                                                parent.style.justifyContent = 'center';
                                            }}
                                        />
                                    ) : (
                                        <span>{pet.foto || '🐾'}</span>
                                    )}
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ 
                                        margin: '0 0 8px 0', 
                                        color: '#333',
                                        fontSize: '1.2rem'
                                    }}>
                                        {pet.nome}
                                    </h3>
                                    <p style={{ 
                                        margin: '0 0 5px 0', 
                                        color: '#666', 
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}>
                                        {pet.tipo} • {pet.raca}
                                    </p>
                                    <p style={{ 
                                        margin: '0 0 8px 0', 
                                        color: '#888', 
                                        fontSize: '0.9rem'
                                    }}>
                                        {pet.idade}
                                    </p>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#666', 
                                        fontSize: '0.85rem',
                                        lineHeight: '1.4'
                                    }}>
                                        {pet.descricao}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ 
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '40px',
                            color: '#999'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🐕</div>
                            <p>Nenhum pet cadastrado ainda.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Seção de Posts */}
            <section style={{ 
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    margin: '0 0 25px 0', 
                    color: '#333',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>📸</span>
                    Posts de {perfil.nome} ({postsUsuario.length})
                </h2>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '25px' 
                }}>
                    {postsUsuario.length > 0 ? (
                        postsUsuario.map(post => (
                            <div 
                                key={post.id} 
                                style={{
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid #eee',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ 
                                    height: '180px', 
                                    backgroundColor: '#e8f4fc',
                                    position: 'relative'
                                }}>
                                    {post.imagem && post.imagem.startsWith('data:image') ? (
                                        <img 
                                            src={post.imagem} 
                                            alt={`Post de ${perfil.nome}`}
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover'
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const parent = e.target.parentNode;
                                                parent.innerHTML = `
                                                    <div style="
                                                        width: 100%;
                                                        height: 100%;
                                                        display: flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                        color: #999;
                                                        font-size: 1.2rem;
                                                    ">
                                                        📷 Sem imagem
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#999',
                                            fontSize: '1.2rem'
                                        }}>
                                            📷 Sem imagem
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <p style={{ 
                                        margin: '0 0 15px 0', 
                                        color: '#333',
                                        lineHeight: '1.5',
                                        fontSize: '0.95rem'
                                    }}>
                                        {post.conteudo}
                                    </p>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '0.85rem',
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
                        <div style={{ 
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '40px',
                            color: '#999'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
                            <p>Nenhum post publicado ainda.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PerfilPublico;