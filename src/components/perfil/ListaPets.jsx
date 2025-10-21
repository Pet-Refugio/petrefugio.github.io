import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import petsData from '../../dados/pets.json';
import '../../styles/perfil/ListaPets.css';
const ListaPets = () => {
  return (
    <div className="lista-pets">
      <div className="cabecalho-lista">
        <h2>Meus Pets</h2>
        <Link to="/perfil/adicionar-pet" className="botao-adicionar-pet">
          ➕ Adicionar Pet
        </Link>
      </div>
      <div className="grid-pets">
        {petsData.pets.map((pet) => (
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

    </div>
  );
};

export default ListaPets;