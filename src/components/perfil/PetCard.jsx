// src/components/pets/PetCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/perfil/PetCard.css';

const PetCard = ({ pet }) => {
    if (!pet || !pet.id) {
        return null;
    }

    // --- LÓGICA DE TRATAMENTO DE FOTO (Avatar) ---
    // O campo 'foto' do pet é o Avatar (pode ser Base64, URL ou Emoji)
    const fotoAvatar = pet.foto || '🐾';
    const fotoCapa = pet.capa || '/images/capas/default-capa.jpg'; // Capa ainda é uma URL padrão
    
    const isBase64 = fotoAvatar.startsWith('data:');
    // Verifica se é um Emoji (não Base64, curto e sem barras de URL)
    const isEmoji = !isBase64 && fotoAvatar.length <= 5 && !fotoAvatar.includes('/');

    const handleImageError = (e) => {
        const target = e.target;
        const src = target.src;
        console.log('❌ Imagem do pet não carregou:', src);
        
        // Se a falha for na capa, usa um fallback de URL
        if (target.className.includes('capa-pet-img')) {
            target.src = '/images/capas/default-capa.jpg'; 
            return;
        }

        // Se a falha for no avatar/foto
        if (target.className.includes('avatar-pet')) {
            // Se falhar, substitui o <img> pelo placeholder do emoji '🐾' ou fotoAvatar
            const container = target.parentElement;
            if (container) {
                // Remove a tag <img>
                target.style.display = 'none'; 
                
                // Cria e insere o placeholder do emoji/texto
                const placeholder = document.createElement('div');
                placeholder.className = 'avatar-placeholder-card';
                placeholder.innerHTML = `<span class="avatar-inicial-card">${isEmoji ? fotoAvatar : '🐾'}</span>`;

                // Verifica se já existe um placeholder para evitar duplicação
                if (!container.querySelector('.avatar-placeholder-card')) {
                     container.appendChild(placeholder);
                }
            }
        }
    };
    // ---------------------------------------------
    
    // Preparação dos dados
    const petData = {
        id: pet.id || 0,
        nome: pet.nome || 'Pet sem nome',
        apelido: pet.apelido || '',
        avatar: fotoAvatar, 
        capa: fotoCapa,
        // Garante que a idade tenha "ano(s)"
        idade: pet.idade ? (pet.idade.toString().includes('ano') ? pet.idade : `${pet.idade} anos`) : '0 anos', 
        raca: pet.raca || 'Não informada',
        tipo: pet.tipo || 'pet',
        bio: pet.descricao || pet.bio || 'Este pet ainda não tem uma descrição.',
        vacinado: pet.vacinado || false,
        castrado: pet.castrado || false,
        sexo: pet.sexo || 'macho',
        estatisticas: {
            posts: pet.estatisticas?.posts || 0,
            seguidores: pet.estatisticas?.seguidores || 0
        }
    };


    return (
        <div className="pet-card">
            <Link to={`/pet/${petData.id}`} className="link-pet">
                
                {/* Capa do Pet */}
                <div className="capa-pet">
                    <img 
                        src={petData.capa} 
                        alt={`Capa de ${petData.nome}`}
                        className="capa-pet-img"
                        onError={handleImageError}
                    />
                </div>

                {/* Informações do Pet */}
                <div className="info-pet">
                    
                    {/* Avatar e Nome (Usando o layout do seu CSS) */}
                    <div className="cabecalho-pet">
                        {/* Lógica de exibição do Avatar (Foto/Base64/Emoji) */}
                        
                        {/* 1. Tenta carregar a imagem (URL ou Base64) */}
                        {!isEmoji ? (
                            <img 
                                src={petData.avatar} 
                                alt={petData.nome} 
                                className="avatar-pet"
                                onError={handleImageError}
                            />
                        ) : (
                            // 2. Se for Emoji, exibe o placeholder imediatamente
                             <div className="avatar-placeholder-card avatar-pet is-emoji">
                                <span className="avatar-inicial-card">{petData.avatar}</span>
                            </div>
                        )}
                        

                        <div className="nomes-pet">
                            <h3 className="nome-pet">{petData.nome}</h3>
                            {petData.apelido && (
                                <p className="apelido-pet">@{petData.apelido}</p>
                            )}
                        </div>
                    </div>

                    {/* Detalhes */}
                    <div className="detalhes-pet">
                        <div className="caracteristica">
                            <span className="rotulo">Idade:</span>
                            <span className="valor">{petData.idade}</span>
                        </div>
                        <div className="caracteristica">
                            <span className="rotulo">Raça:</span>
                            <span className="valor">{petData.raca}</span>
                        </div>
                        <div className="caracteristica">
                            <span className="rotulo">Tipo:</span>
                            <span className="valor">{petData.tipo}</span>
                        </div>
                        {/* Adicionando saúde para ter onde estilizá-los */}
                        <div className="caracteristica">
                            <span className="rotulo">Saúde:</span>
                            <span className="valor saude-icones">
                                {petData.vacinado && <span title="Vacinado">💉</span>}
                                {petData.castrado && <span title="Castrado">✂️</span>}
                                <span title="Sexo">{petData.sexo === 'macho' ? '♂️' : '♀️'}</span>
                            </span>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="bio-pet">{petData.bio}</p>

                    {/* Estatísticas */}
                    <div className="estatisticas-pet">
                        <span className="estatistica">⭐ {petData.estatisticas.posts} posts</span>
                        <span className="estatistica">👤 {petData.estatisticas.seguidores} seguidores</span>
                    </div>

                </div>

            </Link>
            
            {/* Botão de Ação */}
            <button className="botao-gerenciar">
                ⚙️ Gerenciar
            </button>
        </div>
    );
};

export default PetCard;