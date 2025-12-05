import { Link } from 'react-router-dom';
import '../../styles/perfil/PetCard.css';

const PetCard = ({ pet }) => {
    if (!pet || !pet.id) {
        return null;
    }

    const fotoAvatar = pet.foto || '🐾';
    const fotoCapa = pet.capa || '/images/capas/default-capa.jpg';
    
    const isBase64 = fotoAvatar.startsWith('data:');
    const isEmoji = !isBase64 && fotoAvatar.length <= 5 && !fotoAvatar.includes('/');

    const handleImageError = (e) => {
        const target = e.target;
        const src = target.src;
        console.log('❌ Imagem do pet não carregou:', src);
        
        if (target.className.includes('capa-pet-img')) {
            target.src = '/images/capas/default-capa.jpg'; 
            return;
        }

        if (target.className.includes('avatar-pet')) {
            const container = target.parentElement;
            if (container) {
                target.style.display = 'none'; 
                
                const placeholder = document.createElement('div');
                placeholder.className = 'avatar-placeholder-card';
                placeholder.innerHTML = `<span class="avatar-inicial-card">${isEmoji ? fotoAvatar : '🐾'}</span>`;

                if (!container.querySelector('.avatar-placeholder-card')) {
                     container.appendChild(placeholder);
                }
            }
        }
    };
    
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

                <div className="info-pet">
                    
                    <div className="cabecalho-pet">
                        
                        {!isEmoji ? (
                            <img 
                                src={petData.avatar} 
                                alt={petData.nome} 
                                className="avatar-pet"
                                onError={handleImageError}
                            />
                        ) : (
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
                        <div className="caracteristica">
                            <span className="rotulo">Saúde:</span>
                            <span className="valor saude-icones">
                                {petData.vacinado && <span title="Vacinado">💉</span>}
                                {petData.castrado && <span title="Castrado">✂️</span>}
                                <span title="Sexo">{petData.sexo === 'macho' ? '♂️' : '♀️'}</span>
                            </span>
                        </div>
                    </div>

                    <p className="bio-pet">{petData.bio}</p>

                    <div className="estatisticas-pet">
                        <span className="estatistica">⭐ {petData.estatisticas.posts} posts</span>
                        <span className="estatistica">👤 {petData.estatisticas.seguidores} seguidores</span>
                    </div>

                </div>

            </Link>
        </div>
    );
};

export default PetCard;