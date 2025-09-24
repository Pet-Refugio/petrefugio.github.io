
import { Link } from 'react-router-dom';
import '../../styles/perfil/PetCard.css';
import cachorro1 from "./img/cachorro1.webp";
import cachorro2 from "./img/cachorro2.jpg"
const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <Link to={`/pet/${pet.id}`} className="link-pet">
        
        <div className="capa-pet">
          <img src={cachorro1} alt={`Capa de ${pet.nome}`} />
        </div>

        <div className="info-pet">
          
          <div className="cabecalho-pet">
            <img src={cachorro2} alt={pet.nome} className="avatar-pet" />
            <div className="nomes-pet">
              <h3 className="nome-pet">{pet.nome}</h3>
              <p className="apelido-pet">@{pet.apelido}</p>
            </div>
          </div>

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

          <p className="bio-pet">{pet.bio}</p>

          <div className="estatisticas-pet">
            <span className="estatistica">{pet.estatisticas.posts} posts</span>
            <span className="estatistica">{pet.estatisticas.seguidores} seguidores</span>
          </div>

        </div>

      </Link>
      
      <button className="botao-gerenciar">
        ⚙️ Gerenciar
      </button>
    </div>
  );
};

export default PetCard;