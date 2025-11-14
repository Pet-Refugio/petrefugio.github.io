// src/components/principal/SidebarServicos.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/principal/SidebarServicos.css';

const SidebarServicos = ({ usuario }) => {
  const servicosPorTipo = {
    veterinario: [
      { icone: '💊', nome: 'Consultas', descricao: 'Agende consultas' },
      { icone: '🏥', nome: 'Emergências', descricao: 'Atendimento 24h' },
      { icone: '💉', nome: 'Vacinas', descricao: 'Cartão de vacinação' }
    ],
    usuario: [
      { icone: '🐕', nome: 'Passeios', descricao: 'Encontre passeadores' },
      { icone: '🏠', nome: 'Hospedagem', descricao: 'Hotéis para pets' },
      { icone: '✂️', nome: 'Banho & Tosa', descricao: 'Cuidados estéticos' }
    ],
    admin: [
      { icone: '👥', nome: 'Usuários', descricao: 'Gerenciar usuários' },
      { icone: '📊', nome: 'Estatísticas', descricao: 'Relatórios do sistema' },
      { icone: '⚙️', nome: 'Configurações', descricao: 'Configurar sistema' }
    ]
  };

  const servicos = servicosPorTipo[usuario.tipo] || servicosPorTipo.usuario;

  return (
    <div className="sidebar-servicos">
      <div className="card-servicos">
        <h3 className="titulo-servicos">
          {usuario.tipo === 'veterinario' ? 'Meus Serviços' : 
           usuario.tipo === 'admin' ? 'Ferramentas Admin' : 'Serviços para Você'}
        </h3>
        
        <div className="lista-servicos">
          {servicos.map((servico, index) => (
            <div key={index} className="item-servico">
              <span className="icone-servico">{servico.icone}</span>
              <div className="info-servico">
                <strong>{servico.nome}</strong>
                <span>{servico.descricao}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seus Pets */}
      <div className="card-meus-pets">
        <h3 className="titulo-pets">Meus Pets</h3>
        
        {usuario.pets.length === 0 ? (
          <div className="sem-pets">
            <p>Nenhum pet cadastrado</p>
            <button 
              onClick={() => window.location.href = '/perfil/adicionar-pet'}
              className="botao-adicionar-pet"
            >
              Adicionar Pet
            </button>
          </div>
        ) : (
          <div className="lista-pets">
            {usuario.pets.map(pet => (
              <div key={pet.id} className="item-pet">
                <span className="icone-pet">{pet.foto}</span>
                <div className="info-pet">
                  <strong>{pet.nome}</strong>
                  <span>{pet.tipo} • {pet.raca}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Atalhos Rápidos */}
      <div className="card-atalhos">
        <h3 className="titulo-atalhos">Atalhos</h3>
        <div className="lista-atalhos">
          <button 
            onClick={() => window.location.href = '/perfil'}
            className="atalho"
          >
            👤 Meu Perfil
          </button>
          <button 
            onClick={() => window.location.href = '/perfil/adicionar-pet'}
            className="atalho"
          >
            🐾 Adicionar Pet
          </button>
          <button 
            onClick={() => window.location.href = '/principal/amigos'}
            className="atalho"
          >
            👥 Amigos
          </button>
          {usuario.tipo === 'admin' && (
            <button 
              onClick={() => window.location.href = '/admin'}
              className="atalho atalho-admin"
            >
              ⚙️ Painel Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarServicos;