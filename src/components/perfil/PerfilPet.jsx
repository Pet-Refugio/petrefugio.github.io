import { useState, useEffect } from 'react'; 
import { useParams, useNavigate, Link } from 'react-router-dom';
import HeaderPerfil from './HeaderPerfil'; 
import { useAuth } from '../../context/AuthContext'; 
import '../../styles/perfil/PerfilPet.css';

const postsData = {
    posts: [
        { id: 1, petId: 1000, usuario: { nome: "Danilo" }, data: new Date(Date.now() - 3600000).toISOString(), conteudo: { texto: "Primeiro dia de sol!", midia: { url: '/images/posts/exemplo1.jpg', alt: 'sol' } }, engajamento: { curtidas: 10, comentarios: 2, compartilhamentos: 0 } },
        { id: 2, petId: 1000, usuario: { nome: "Danilo" }, data: new Date(Date.now() - 7200000).toISOString(), conteudo: { texto: "Caminhada matinal" }, engajamento: { curtidas: 5, comentarios: 1, compartilhamentos: 0 } },
    ]
};

const PerfilPet = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    
    const { usuarios } = useAuth(); 
    
    const [pet, setPet] = useState(null);
    const [posts, setPosts] = useState([]);
    const [tutor, setTutor] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const carregarPet = () => {
        setCarregando(true);
        const idPet = parseInt(petId);
        
        let petEncontrado = null;
        let tutorPet = null;

        if (usuarios) {
            for (const user of Object.values(usuarios)) {
                const found = user.pets?.find(p => p.id === idPet);
                if (found) {
                    petEncontrado = found;
                    tutorPet = {
                        username: user.username, 
                        nome: user.nome,
                        avatar: user.fotoPerfil,
                    };
                    break;
                }
            }
        }
        
        if (petEncontrado) {
            setPet(petEncontrado);
            setTutor(tutorPet);
            
            // Filtra posts (Use sua API real para isso)
            const postsPet = postsData.posts.filter(post => 
                post.petId === idPet
            ).sort((a, b) => new Date(b.data) - new Date(a.data));
            
            setPosts(postsPet);
        } else {
            setPet(null);
        }
        setCarregando(false);
    };

    useEffect(() => {
        carregarPet();
    }, [petId, usuarios]); 
    const handleImageError = (e, isAvatar) => {
        const target = e.target;
        
        if (!isAvatar) { 
            target.src = '/images/capas/default-capa.jpg';
            return;
        }

        const parent = target.parentNode;
        
        const fotoOuNome = pet?.foto || pet?.nome || 'Pet';
        const inicialOuEmoji = pet?.foto && pet.foto.length <= 5 && !pet.foto.includes('/') ? pet.foto : fotoOuNome.charAt(0).toUpperCase();

        const placeholder = document.createElement('div');
        placeholder.className = 'avatar-placeholder';
        placeholder.innerHTML = `<span>${inicialOuEmoji}</span>`;
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #F26B38, #FF9D71);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
        `;
        
        target.style.display = 'none';
        if (!parent.querySelector('.avatar-placeholder')) {
            parent.appendChild(placeholder);
        }
    };

    const formatarData = (dataString) => {
        try {
            const data = new Date(dataString);
            const agora = new Date();
            const diffMs = agora - data;
            const diffMin = Math.floor(diffMs / (1000 * 60));
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
            if (diffMin < 60) {
                return `há ${diffMin} min`;
            } else if (diffHrs < 24) {
                return `há ${diffHrs} h`;
            } else if (diffDias < 7) {
                return `há ${diffDias} dia${diffDias > 1 ? 's' : ''}`;
            } else {
                return data.toLocaleDateString('pt-BR');
            }
        } catch (error) {
            return 'há algum tempo';
        }
    };

    const calcularIdadePet = (idade) => {
        if (!idade) return '--';
        return `${idade} ${idade === 1 ? 'ano' : 'anos'}`;
    };

    if (carregando) {
          return (
              <div className="pagina-perfil-pet">
                  <HeaderPerfil />
                  <div className="carregando-perfil-pet">
                      <div className="loading-spinner"></div>
                      <div className="carregando-texto">Carregando perfil do pet...</div>
                  </div>
              </div>
          );
    }

    if (!pet) {
          return (
              <div className="pagina-perfil-pet">
                  <HeaderPerfil />
                  <div className="pet-nao-encontrado">
                      <h2>Pet não encontrado</h2>
                      <p>O perfil do pet que você está procurando não existe ou os dados não foram carregados corretamente.</p>
                      <button onClick={() => navigate(-1)} className="botao-voltar">
                          Voltar
                      </button>
                  </div>
              </div>
          );
    }
    
    const fotoPet = pet.foto || '🐾';
    const capaPet = pet.capa || '/images/capas/default-capa.jpg';

    const isEmojiAvatar = fotoPet.length <= 5 && !fotoPet.includes('/') && !fotoPet.startsWith('data:');

    return (
        <div className="pagina-perfil-pet">
            <HeaderPerfil />
            
            <main className="conteudo-perfil-pet">

                {/* Capa e Avatar */}
                <div className="secao-capa-pet">
                <div className="capa-pet-perfil">
                    <img 
                    src={capaPet}
                    alt={`Capa de ${pet.nome}`}
                    className="imagem-capa-pet"
                    onError={(e) => handleImageError(e, false)}
                    />
                    <div className="overlay-capa-pet"></div>
                </div>
                <div className="avatar-container-pet">
                    {isEmojiAvatar ? (
                        <div className="avatar-placeholder avatar-pet-perfil">
                            <span>{fotoPet}</span>
                        </div>
                    ) : (
                        <img 
                            src={fotoPet}
                            alt={pet.nome}
                            className="avatar-pet-perfil"
                            onError={(e) => handleImageError(e, true)}
                        />
                    )}
                </div>
                </div>

                <div className="info-pet-perfil">
                    <div className="cabecalho-info-pet">
                        <div className="nomes-pet-perfil">
                            <h1 className="nome-pet-perfil">{pet.nome}</h1>
                            {pet.apelido && (
                                <p className="apelido-pet-perfil">@{pet.apelido}</p>
                            )}
                        </div>
                        
                        {tutor && (
                        <div className="info-tutor">
                            <span className="rotulo-tutor">Tutor:</span>
                            <Link to={`/perfil/${tutor.username}`} className="link-tutor">
                            <img 
                                src={tutor.avatar || '/images/avatars/default.jpg'}
                                alt={tutor.nome}
                                className="avatar-tutor"
                                onError={(e) => handleImageError(e, true)}
                            />
                            <span className="nome-tutor">{tutor.nome}</span>
                            </Link>
                        </div>
                        )}
                    </div>

                    <p className="bio-pet-perfil">{pet.bio || 'Este pet ainda não tem uma descrição.'}</p>

                    <div className="estatisticas-pet-perfil">
                        <div className="estatistica-item-pet">
                            <span className="numero-pet">{posts.length || 0}</span>
                            <span className="rotulo-pet">Posts</span>
                        </div>
                        <div className="estatistica-item-pet">
                            <span className="numero-pet">{pet.estatisticas?.seguidores || 0}</span>
                            <span className="rotulo-pet">Seguidores</span>
                        </div>
                        <div className="estatistica-item-pet">
                            <span className="numero-pet">{pet.estatisticas?.curtidas || 0}</span>
                            <span className="rotulo-pet">Curtidas</span>
                        </div>
                    </div>

                    <div className="detalhes-pet-perfil">
                        <div className="grid-detalhes">
                            <div className="detalhe-item">
                                <span className="icone-detalhe">🐾</span>
                                <div className="info-detalhe">
                                    <span className="rotulo-detalhe">Tipo</span>
                                    <span className="valor-detalhe">{pet.tipo}</span>
                                </div>
                            </div>
                            
                            <div className="detalhe-item">
                                <span className="icone-detalhe">🎂</span>
                                <div className="info-detalhe">
                                    <span className="rotulo-detalhe">Idade</span>
                                    <span className="valor-detalhe">{calcularIdadePet(pet.idade)}</span>
                                </div>
                            </div>
                            
                            <div className="detalhe-item">
                                <span className="icone-detalhe">🧬</span>
                                <div className="info-detalhe">
                                    <span className="rotulo-detalhe">Raça</span>
                                    <span className="valor-detalhe">{pet.raca || 'Não informada'}</span>
                                </div>
                            </div>
                            
                            <div className="detalhe-item">
                                <span className="icone-detalhe">{pet.sexo === 'macho' ? '♂️' : '♀️'}</span>
                                <div className="info-detalhe">
                                    <span className="rotulo-detalhe">Sexo</span>
                                    <span className="valor-detalhe">{pet.sexo === 'macho' ? 'Macho' : 'Fêmea'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-saude-pet">
                            <h4>Saúde</h4>
                            <div className="status-saude">
                                {pet.vacinado && (
                                    <span className="status-item vacinado">💉 Vacinado</span>
                                )}
                                {pet.castrado && (
                                    <span className="status-item castrado">✂️ Castrado</span>
                                )}
                                {pet.peso && (
                                <span className="status-item peso">⚖️ {pet.peso}kg</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="acoes-pet-perfil">
                        <button className="botao-acao-pet seguir">
                            {pet.seguindo ? '✅ Seguindo' : '👤 Seguir Pet'}
                        </button>
                        <button className="botao-acao-pet secundario">
                            💬 Mensagem
                        </button>
                        <button className="botao-acao-pet secundario">
                            ⭐ Favoritar
                        </button>
                    </div>
                </div>

                <div className="secao-posts-pet">
                    <h3>Posts de {pet.nome}</h3>
                    
                    {posts.length > 0 ? (
                        <div className="lista-posts-pet">
                            {posts.map(post => (
                                <div key={post.id} className="card-post-pet">
                                    <div className="cabecalho-post-pet">
                                        <div className="info-post-pet">
                                            <div className="nomes-post-pet">
                                            <span className="nome-pet-post">{pet.nome}</span>
                                            <span className="postado-por">postado por {post.usuario.nome}</span>
                                            </div>
                                            <div className="metadados-post-pet">
                                            <span className="tempo-post-pet">{formatarData(post.data)}</span>
                                            {post.localizacao && (
                                                <>
                                                <span className="separador">•</span>
                                                <span className="localizacao-post-pet">{post.localizacao}</span>
                                                </>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="conteudo-post-pet">
                                        <p>{post.conteudo.texto}</p>
                                        
                                        {post.conteudo.midia && (
                                            <div className="midia-post-pet">
                                            <img
                                                src={post.conteudo.midia.url}
                                                alt={post.conteudo.midia.alt}
                                                className="imagem-post-pet"
                                                onError={(e) => handleImageError(e, false)}
                                            />
                                            </div>
                                        )}
                                        
                                        {post.hashtags && post.hashtags.length > 0 && (
                                            <div className="hashtags-pet">
                                            {post.hashtags.map((hashtag, index) => (
                                                <span key={index} className="hashtag-pet">
                                                #{hashtag}
                                                </span>
                                            ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="engajamento-post-pet">
                                        <div className="estatisticas-post-pet">
                                            <span>❤️ {post.engajamento.curtidas}</span>
                                            <span>💬 {post.engajamento.comentarios}</span>
                                            <span>↗️ {post.engajamento.compartilhamentos}</span>
                                        </div>
                                    </div>

                                    <div className="acoes-post-pet">
                                        <button className="botao-acao-post-pet">🤍 Curtir</button>
                                        <button className="botao-acao-post-pet">💬 Comentar</button>
                                        <button className="botao-acao-post-pet">↗️ Compartilhar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="sem-posts-pet">
                            <div className="icone-sem-posts">📝</div>
                            <p>{pet.nome} ainda não tem posts</p>
                            <small>Os posts do pet aparecerão aqui quando forem publicados</small>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default PerfilPet;