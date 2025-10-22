import { Link } from 'react-router-dom';
import '../../styles/perfil/PetCard.css';

const PetCard = ({ pet }) => {
  // Garantir que pet existe e tem propriedades básicas
  if (!pet || !pet.id) {
    console.log('❌ Pet inválido:', pet);
    return null;
  }

  const handleImageError = (e) => {
    console.log('❌ Imagem do pet não carregou:', e.target.src);
    e.target.src = '/images/pets/default-pet.jpg';
  };

  // Valores padrão para evitar erros
  const petData = {
    id: pet.id || 0,
    nome: pet.nome || 'Pet sem nome',
    apelido: pet.apelido || '',
    avatar: pet.avatar || '/images/pets/default-pet.jpg',
    capa: pet.capa || '/images/capas/default-capa.jpg',
    idade: pet.idade || '0',
    raca: pet.raca || 'Não informada',
    tipo: pet.tipo || 'pet',
    bio: pet.bio || 'Este pet ainda não tem uma descrição.',
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
            onError={handleImageError}
          />
        </div>

        {/* Informações do Pet */}
        <div className="info-pet">
          
          {/* Avatar e Nome */}
          <div className="cabecalho-pet">
            <img 
              src={petData.avatar} 
              alt={petData.nome} 
              className="avatar-pet"
              onError={handleImageError}
            />
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
              <span className="valor">{petData.idade} {petData.idade === '1' ? 'ano' : 'anos'}</span>
            </div>
            <div className="caracteristica">
              <span className="rotulo">Raça:</span>
              <span className="valor">{petData.raca}</span>
            </div>
            <div className="caracteristica">
              <span className="rotulo">Tipo:</span>
              <span className="valor">{petData.tipo}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="bio-pet">{petData.bio}</p>

          {/* Estatísticas */}
          <div className="estatisticas-pet">
            <span className="estatistica">{petData.estatisticas.posts} posts</span>
            <span className="estatistica">{petData.estatisticas.seguidores} seguidores</span>
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