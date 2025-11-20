// src/components/principal/SidebarAmigos.jsx - CÓDIGO COMPLETO

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import '../../styles/principal/SidebarAmigos.css'; 

// Função auxiliar para evitar erros de imagem e mostrar placeholder
const handleImageError = (e, nome) => {
    const target = e.target;
    target.style.display = 'none';

    const parent = target.parentNode;
    const initial = nome ? nome.charAt(0).toUpperCase() : '👤';

    let placeholder = parent.querySelector('.avatar-placeholder-amigo');
    if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'avatar-placeholder-amigo';
        placeholder.innerHTML = `<span>${initial}</span>`;
        parent.appendChild(placeholder);
    }
};

const SidebarAmigos = () => {
    const { usuarios, usuario: usuarioLogado } = useAuth();
    
    // 1. Lista de "Amigos" (Contatos)
    const listaAmigosChat = Object.values(usuarios || {})
        .filter(user => user.username !== usuarioLogado?.username)
        .filter(user => user.username !== 'admin' && user.username !== 'administrador') // <-- FILTRANDO ADMINISTRADOR
        .sort((a, b) => (b.online === a.online ? 0 : b.online ? 1 : -1)) 
        .slice(0, 10); 

    // 2. Dados de Grupos (Placeholder simples)
    const gruposPlaceholder = [
        { id: 1, nome: "Adoção SP", icone: "🐶", membros: 203 },
        { id: 2, nome: "Treinamento Cães", icone: "🦴", membros: 45 },
        { id: 3, nome: "Veterinários RJ", icone: "⚕️", membros: 12 },
    ];
    
    // Helper para renderizar avatar
    const renderAvatar = (user) => (
        <div className="avatar-amigo">
            {user.fotoPerfil ? (
                <img 
                    src={user.fotoPerfil} 
                    alt={user.nome}
                    // A foto agora deve aparecer se o caminho estiver correto
                    onError={(e) => handleImageError(e, user.nome)}
                />
            ) : (
                <div className="avatar-placeholder-amigo">
                    <span>{user.nome.charAt(0).toUpperCase()}</span>
                </div>
            )}
            {user.online && <div className="status-online"></div>}
        </div>
    );
    
    return (
        <aside className="sidebar-amigos">
            
            {/* 1. Cabeçalho do Chat */}
            <div className="cabecalho-chat">
                <h3>Chats e Contatos</h3>
                <button className="botao-novo-chat" title="Novo Chat">
                    +
                </button>
            </div>

            {/* 2. Seção de Amigos (Contatos/Chats Recentes) */}
            <div className="secao-amigos">
                <h4>AMIGOS ({listaAmigosChat.length})</h4>
                <div className="lista-amigos">
                    {listaAmigosChat.length === 0 ? (
                        <p style={{fontSize: '0.85rem', color: '#7A7A7A', padding: '10px 0'}}>Nenhum contato encontrado.</p>
                    ) : (
                        listaAmigosChat.map((amigo) => (
                            <Link 
                                to={`/perfil/publico/${amigo.username}`} 
                                className={`item-amigo ${amigo.online ? 'online' : 'offline'}`} 
                                key={amigo.username} 
                            >
                                {renderAvatar(amigo)}
                                <span className="nome-amigo">{amigo.nome}</span>
                                {!amigo.online && <div className="status-offline" title="Offline"></div>} 
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* 3. Seção de Grupos e Serviços */}
            <div className="secao-amigos">
                <h4>GRUPOS E SERVIÇOS</h4>
                <div className="lista-grupos">
                    
                    {/* LINK DE SERVIÇOS */}
                    <Link to="servicos" key="servicos-link"> 
                        <div className="item-grupo">
                            <span className="icone-grupo">🏪</span>
                            <span className="nome-grupo">Serviços</span>
                        </div>
                    </Link>

                    {/* Mapeamento dos grupos existentes */}
                    {gruposPlaceholder.map((grupo) => (
                        <div 
                            className="item-grupo" 
                            key={grupo.id} 
                        >
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