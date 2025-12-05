import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PetCard from './PetCard';
import '../../styles/perfil/ListaPets.css';

const ListaPets = () => {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div className="lista-pets">
        <div className="cabecalho-lista">
          <h2>Meus Pets</h2>
        </div>
        <div className="sem-pets">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-pets">
      <div className="cabecalho-lista">
        <h2>Meus Pets</h2>
        <Link to="/perfil/adicionar-pet" className="botao-adicionar-pet">
          ➕ Adicionar Pet
        </Link>
      </div>

      {usuario.pets && usuario.pets.length > 0 ? (
        <div className="grid-pets">
          {usuario.pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
          <Link to="/perfil/adicionar-pet">
            <div className="card-adicionar">
              <button className="botao-novo-pet">
                <span className="icone-adicionar">➕</span>
                <span className="texto-adicionar">Adicionar Pet</span>
              </button>
            </div>
          </Link>
        </div>
      ) : (
        <div className="sem-pets">
          <div className="icone-sem-pets">🐾</div>
          <h3>Nenhum pet cadastrado</h3>
          <p>Comece adicionando seu primeiro pet!</p>
          <Link to="/perfil/adicionar-pet" className="botao-adicionar-primeiro-pet">
            Adicionar Primeiro Pet
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListaPets;