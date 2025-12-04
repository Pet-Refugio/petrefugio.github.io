// src/components/principal/SidebarAmigos.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const SidebarAmigos = () => {
    const { usuarios, usuario: usuarioLogado } = useAuth();
    
    const listaAmigosChat = Object.values(usuarios || {})
        .filter(user => user.email !== usuarioLogado?.email)
        .filter(user => user.tipo !== 'admin')
        .sort((a, b) => (b.online === a.online ? 0 : b.online ? 1 : -1)) 
        .slice(0, 10); 

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
    
    return (
        <aside className="sidebar-amigos">
            
            <div className="cabecalho-chat">
                <h3>Chats e Contatos</h3>
                <button className="botao-novo-chat" title="Novo Chat">
                    +
                </button>
            </div>

            <div className="secao-amigos">
                <h4>AMIGOS ({listaAmigosChat.length})</h4>
                <div className="lista-amigos">
                    {listaAmigosChat.length === 0 ? (
                        <p style={{fontSize: '0.85rem', color: '#7A7A7A', padding: '10px 0'}}>
                            Nenhum contato encontrado.
                        </p>
                    ) : (
                        listaAmigosChat.map((amigo) => (
                            <Link 
                                to={`/perfil/publico/${amigo.username}`} 
                                className={`item-amigo ${amigo.online ? 'online' : 'offline'}`} 
                                key={amigo.email}
                            >
                                <div className="avatar-amigo" style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: getCorAvatar(amigo.nome),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    position: 'relative'
                                }}>
                                    {amigo.fotoPerfil ? (
                                        <img 
                                            src={amigo.fotoPerfil} 
                                            alt={amigo.nome}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const parent = e.target.parentNode;
                                                parent.innerHTML = getInicialNome(amigo.nome);
                                                parent.style.display = 'flex';
                                                parent.style.alignItems = 'center';
                                                parent.style.justifyContent = 'center';
                                            }}
                                        />
                                    ) : (
                                        getInicialNome(amigo.nome)
                                    )}
                                    {amigo.online && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '2px',
                                            right: '2px',
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: '#4CAF50',
                                            border: '2px solid white'
                                        }}></div>
                                    )}
                                </div>
                                <span className="nome-amigo">{amigo.nome}</span>
                                {!amigo.online && (
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ccc',
                                        marginLeft: 'auto'
                                    }} title="Offline"></div>
                                )}
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <div className="secao-amigos">
                <h4>GRUPOS E SERVIÇOS</h4>
                <div className="lista-grupos">
                    
                    <Link to="/principal/servicos" key="servicos-link"> 
                        <div className="item-grupo">
                            <span className="icone-grupo">🏪</span>
                            <span className="nome-grupo">Serviços</span>
                        </div>
                    </Link>

                    {[
                        { id: 1, nome: "Adoção SP", icone: "🐶", membros: 203 },
                        { id: 2, nome: "Treinamento Cães", icone: "🦴", membros: 45 },
                        { id: 3, nome: "Veterinários RJ", icone: "⚕️", membros: 12 },
                    ].map((grupo) => (
                        <div className="item-grupo" key={grupo.id}>
                            <div className="icone-grupo">{grupo.icone}</div>
                            <span className="nome-grupo">{grupo.nome}</span>
                            <span className="contador-grupo">{grupo.membros}</span>
                        </div>
                    ))}
                </div>
            </div>

        </aside>
    );
};

export default SidebarAmigos;