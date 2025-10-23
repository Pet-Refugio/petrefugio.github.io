// src/components/principal/SidebarServicos.jsx
import '../../styles/principal/SidebarServicos.css';
import servicosData from '../../dados/servicos.json';

export default function SidebarServicos() {
  
  const handleImageError = (e) => {
    e.target.src = '/images/prestadores/default-service.jpg';
  };

  const handleServicoClick = (servicoId) => {
    console.log('Abrindo serviço:', servicoId);
    // Navegar para página do serviço ou abrir modal
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

  return (
    <aside className="sidebar-servicos">
      
      {/* Cabeçalho */}
      <div className="cabecalho-servicos">
        <h3>🏥 Serviços Pet</h3>
        <button className="botao-ver-todos" title="Ver todos os serviços">
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

    </aside>
  );
}