// src/components/principal/SidebarServicos.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/principal/SidebarServicos.css';

export default function SidebarServicos({ usuario }) {
  const navigate = useNavigate();

  // Dados de serviços mockados (substitua por dados reais depois)
  const servicosData = {
    servicos: [
      {
        id: 1,
        nome: "Clínica Veterinária PetCare",
        especialidade: "Clínica Geral",
        tipo: "veterinario",
        avaliacao: "4.8",
        localizacao: "Centro",
        descricao: "Atendimento 24h com profissionais especializados",
        imagem: "/images/prestadores/veterinario1.jpg"
      },
      {
        id: 2,
        nome: "Hotel Para Pets HappyStay",
        especialidade: "Hospedagem",
        tipo: "hotel", 
        avaliacao: "4.9",
        localizacao: "Zona Sul",
        descricao: "Hospedagem premium com monitoramento 24h",
        imagem: "/images/prestadores/hotel1.jpg"
      },
      {
        id: 3,
        nome: "Pet Shop AnimalLove",
        especialidade: "Banho e Tosa",
        tipo: "petshop",
        avaliacao: "4.7", 
        localizacao: "Shopping Center",
        descricao: "Produtos de qualidade e serviços especializados",
        imagem: "/images/prestadores/petshop1.jpg"
      },
      {
        id: 4,
        nome: "ONG Amigos dos Animais",
        especialidade: "Adoção",
        tipo: "ong",
        avaliacao: "5.0",
        localizacao: "Vila Nova", 
        descricao: "Resgate e adoção responsável de animais",
        imagem: "/images/prestadores/ong1.jpg"
      }
    ]
  };

  const handleImageError = (e) => {
    // Criar placeholder gradiente baseado no nome do serviço
    const card = e.target.closest('.card-servico');
    const nome = card?.querySelector('.servico-nome')?.textContent || 'Serviço';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'servico-placeholder';
    placeholder.style.cssText = `
      width: 60px;
      height: 60px;
      border-radius: 10px;
      background: linear-gradient(135deg, #F26B38, #FF9D71);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
    `;
    placeholder.textContent = nome.charAt(0);
    
    e.target.replaceWith(placeholder);
  };

  const getIconePorTipo = (tipo) => {
    const icones = {
      cuidador: '🏠',
      hotel: '🏨',
      treinador: '🎓',
      veterinario: '🏥',
      petshop: '🛍️',
      ong: '❤️'
    };
    return icones[tipo] || '🐾';
  };

  const handleServicoClick = (servicoId) => {
    console.log('Abrindo serviço:', servicoId);
    // Navegar para página do serviço ou abrir modal
    alert(`Serviço ${servicoId} em desenvolvimento!`);
  };

  const handleVerTodos = () => {
    navigate('/servicos');
  };

  return (
    <aside className="sidebar-servicos">
      
      {/* Cabeçalho */}
      <div className="cabecalho-servicos">
        <h3>🏥 Serviços Pet</h3>
        <button className="botao-ver-todos" onClick={handleVerTodos} title="Ver todos os serviços">
          Ver Todos
        </button>
      </div>

      {/* Lista de Serviços */}
      <div className="lista-servicos">
        {servicosData.servicos.map((servico) => (
          <div 
            key={servico.id} 
            className="card-servico"
            onClick={() => handleServicoClick(servico.id)}
          >
            <div className="servico-imagem">
              <img 
                src={servico.imagem} 
                alt={servico.nome}
                onError={handleImageError}
              />
              <span className="servico-icone">
                {getIconePorTipo(servico.tipo)}
              </span>
            </div>
            
            <div className="servico-info">
              <h4 className="servico-nome">{servico.nome}</h4>
              <p className="servico-especialidade">{servico.especialidade}</p>
              
              <div className="servico-detalhes">
                <span className="servico-avaliacao">
                  ⭐ {servico.avaliacao}
                </span>
                <span className="servico-localizacao">
                  📍 {servico.localizacao}
                </span>
              </div>
              
              <p className="servico-descricao">{servico.descricao}</p>
            </div>

            <div className="servico-acoes">
              <button className="botao-contato" title="Entrar em contato">
                📞 Contato
              </button>
              <button className="botao-favorito" title="Favoritar">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Pets do Usuário */}
      <div className="secao-meus-pets">
        <h4>🐾 Meus Pets</h4>
        {usuario?.pets?.length === 0 ? (
          <div className="sem-pets">
            <p>Nenhum pet cadastrado</p>
            <button 
              onClick={() => navigate('/perfil/adicionar-pet')}
              className="botao-adicionar-pet"
            >
              Adicionar Pet
            </button>
          </div>
        ) : (
          <div className="lista-meus-pets">
            {usuario?.pets?.slice(0, 3).map(pet => (
              <div key={pet.id} className="item-meu-pet">
                <span className="pet-icone">{pet.foto || '🐕'}</span>
                <span className="pet-nome">{pet.nome}</span>
                <span className="pet-tipo">{pet.tipo}</span>
              </div>
            ))}
            {usuario?.pets?.length > 3 && (
              <button 
                onClick={() => navigate('/perfil')}
                className="botao-ver-mais-pets"
              >
                Ver todos ({usuario.pets.length})
              </button>
            )}
          </div>
        )}
      </div>

    </aside>
  );
}