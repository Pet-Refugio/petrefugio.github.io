import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../styles/perfil/PerfilPet.css';
import petsData from '../../dados/pets.json';
import postsData from '../../dados/posts.json';
import HeaderPerfil from './HeaderPerfil';

const PerfilPet = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tutor, setTutor] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPet();
  }, [petId]);

  const carregarPet = async () => {
    setCarregando(true);
    
    try {
      // Simular carregamento
      setTimeout(() => {
        const petEncontrado = petsData.pets.find(p => p.id === parseInt(petId));
        
        if (petEncontrado) {
          setPet(petEncontrado);
          
          // Carregar posts do pet
          const postsPet = postsData.posts.filter(post => 
            post.petId === parseInt(petId)
          ).sort((a, b) => new Date(b.data) - new Date(a.data));
          
          setPosts(postsPet);
          
          // Simular dados do tutor (em um sistema real, viria do backend)
          setTutor({
            id: petEncontrado.tutorId,
            nome: "Ana Silva",
            avatar: "/images/avatars/anasilva.jpg",
            apelido: "aninhapets"
          });
        }
        setCarregando(false);
      }, 800);
    } catch (error) {
      console.error('Erro ao carregar pet:', error);
      setCarregando(false);
    }
  };

  const handleImageError = (e) => {
    console.log('❌ Imagem não carregou:', e.target.src);
    
    if (e.target.className.includes('avatar')) {
      const parent = e.target.parentNode;
      const nome = e.target.alt || 'Pet';
      const inicial = nome.charAt(0).toUpperCase();
      
      const placeholder = document.createElement('div');
      placeholder.className = 'avatar-placeholder';
      placeholder.innerHTML = `<span>${inicial}</span>`;
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
      
      e.target.style.display = 'none';
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
    return `${idade} ${idade === '1' ? 'ano' : 'anos'}`;
  };

  if (carregando) {
    return (
      <div className="pagina-perfil-pet">
        <HeaderPerfil />
        <div className="carregando-perfil-pet">
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
          <p>O perfil do pet que você está procurando não existe.</p>
          <button onClick={() => navigate('/perfil')} className="botao-voltar">
            Voltar para Meu Perfil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-perfil-pet">
      <HeaderPerfil />
      
      <main className="conteudo-perfil-pet">

        {/* Capa e Avatar */}
        <div className="secao-capa-pet">
        <div className="capa-pet-perfil">
            <img 
            src={pet.avatar}
            alt={`Capa de ${pet.nome}`}
            className="imagem-capa-pet"
            onError={handleImageError}
            />
            <div className="overlay-capa-pet"></div>
        </div>
        <div className="avatar-container-pet">
            <img 
            src={pet.avatar} 
            alt={pet.nome}
            className="avatar-pet-perfil"
            onError={handleImageError}
            />
        </div>
        </div>

        {/* Informações do Pet */}
        <div className="info-pet-perfil">
          <div className="cabecalho-info-pet">
            <div className="nomes-pet-perfil">
              <h1 className="nome-pet-perfil">{pet.nome}</h1>
              {pet.apelido && (
                <p className="apelido-pet-perfil">@{pet.apelido}</p>
              )}
            </div>
            
            {/* Tutor */}
            {tutor && (
            <div className="info-tutor">
                <span className="rotulo-tutor">Tutor:</span>
                <Link to="/perfil" className="link-tutor"> {}
                <img 
                    src={tutor.avatar} 
                    alt={tutor.nome}
                    className="avatar-tutor"
                    onError={handleImageError}
                />
                <span className="nome-tutor">{tutor.nome}</span>
                </Link>
            </div>
            )}
          </div>

          <p className="bio-pet-perfil">{pet.bio}</p>

          {/* Estatísticas */}
          <div className="estatisticas-pet-perfil">
            <div className="estatistica-item-pet">
              <span className="numero-pet">{pet.estatisticas?.posts || 0}</span>
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

          {/* Detalhes do Pet */}
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
                  <span className="valor-detalhe">{pet.raca}</span>
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

            {/* Informações de Saúde */}
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

          {/* Ações */}
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

        {/* Posts do Pet */}
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
                          onError={handleImageError}
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
