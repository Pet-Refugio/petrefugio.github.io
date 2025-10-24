import '../../styles/principal/ModalServicos.css';
import servicosData from '../../dados/servicos.json';

export default function ModalServicos({ onFechar }) {
  
  const handleImageError = (e) => {
    e.target.src = '/images/prestadores/default-service.jpg';
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

  const handleContatoClick = (servico, e) => {
    e.stopPropagation();
    alert(`Entrando em contato com: ${servico.nome}\nTelefone: ${servico.contato}`);
  };

  return (
    <div className="modal-servicos">
      
      {/* Cabeçalho do Modal */}
      <div className="modal-cabecalho">
        <h2>🏥 Serviços para seu Pet</h2>
        <button 
          className="botao-fechar-modal"
          onClick={onFechar}
          title="Fechar"
        >
          ✕
        </button>
      </div>

      {/* Lista de Serviços */}
      <div className="modal-lista-servicos">
        {servicosData.servicos.map((servico) => (
          <div key={servico.id} className="modal-card-servico">
            
            <div className="modal-servico-imagem">
              <img 
                src={servico.imagem} 
                alt={servico.nome}
                onError={handleImageError}
              />
              <span className="modal-servico-icone">
                {getIconePorTipo(servico.tipo)}
              </span>
            </div>
            
            <div className="modal-servico-info">
              <h3 className="modal-servico-nome">{servico.nome}</h3>
              <p className="modal-servico-especialidade">{servico.especialidade}</p>
              
              <div className="modal-servico-detalhes">
                <span className="modal-servico-avaliacao">
                  ⭐ {servico.avaliacao}
                </span>
                <span className="modal-servico-localizacao">
                  📍 {servico.localizacao}
                </span>
              </div>
              
              <p className="modal-servico-descricao">{servico.descricao}</p>
              
              <div className="modal-servico-contato">
                <span className="modal-servico-telefone">📞 {servico.contato}</span>
              </div>
            </div>

            <div className="modal-servico-acoes">
              <button 
                className="modal-botao-contato"
                onClick={(e) => handleContatoClick(servico, e)}
              >
                Contatar
              </button>
              <button className="modal-botao-favorito" title="Favoritar">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé do Modal */}
      <div className="modal-rodape">
        <p>Encontre os melhores serviços para seu pet! 🐾</p>
      </div>

    </div>
  );
}