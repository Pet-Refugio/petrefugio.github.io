import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/perfil/PetCard.css';

const PetCard = ({ pet }) => {
  const handleImageError = (e) => {
    e.target.src = '/images/pets/pet-default.jpg';
  };

  return (
    <div className="pet-card">
      <Link to={`/pet/${pet.id}`} className="link-pet">
        
        {/* Capa do Pet */}
        <div className="capa-pet">
          <img 
            src={pet.capa} 
            alt={`Capa de ${pet.nome}`}
            onError={handleImageError}
          />
        </div>

        {/* Informações do Pet */}
        <div className="info-pet">
          
          {/* Avatar e Nome */}
          <div className="cabecalho-pet">
            <img 
              src={pet.avatar} 
              alt={pet.nome} 
              className="avatar-pet"
              onError={handleImageError}
            />
            <div className="nomes-pet">
              <h3 className="nome-pet">{pet.nome}</h3>
              <p className="apelido-pet">@{pet.apelido}</p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="detalhes-pet">
            <div className="caracteristica">
              <span className="rotulo">Idade:</span>
              <span className="valor">{pet.idade} anos</span>
            </div>
            <div className="caracteristica">
              <span className="rotulo">Raça:</span>
              <span className="valor">{pet.raca}</span>
            </div>
            <div className="caracteristica">
              <span className="rotulo">Tipo:</span>
              <span className="valor">{pet.tipo}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="bio-pet">{pet.bio}</p>

          {/* Estatísticas */}
          <div className="estatisticas-pet">
            <span className="estatistica">{pet.estatisticas.posts} posts</span>
            <span className="estatistica">{pet.estatisticas.seguidores} seguidores</span>
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