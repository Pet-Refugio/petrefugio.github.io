// src/components/principal/BotaoServicos.jsx
import { useState } from 'react';
import '../../styles/principal/BotaoServicos.css';

export default function BotaoServicos() {
  const [modalAberto, setModalAberto] = useState(false);

  const toggleModal = () => {
    setModalAberto(!modalAberto);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <>
      {/* Botão Fixo */}
      <button 
        className="botao-servicos-flutuante"
        onClick={toggleModal}
        title="Serviços para Pets"
      >
        🏥 Serviços
      </button>

      {/* Modal Lateral */}
      <div className={`modal-servicos-overlay ${modalAberto ? 'aberto' : ''}`}>
        <div className="modal-servicos-conteudo">
          <ModalServicos onFechar={fecharModal} />
        </div>
        
        {/* Overlay para fechar ao clicar fora */}
        <div 
          className="modal-servicos-backdrop"
          onClick={fecharModal}
        ></div>
      </div>
    </>
  );
}