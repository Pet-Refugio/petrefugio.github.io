import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/perfil/editar-perfil.css';

const EditarPerfil = ({ onClose }) => {
  const { usuario, mudarNomeUsuario, mudarUsername } = useAuth();
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    username: usuario.username,
    bio: usuario.bio || ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      if (formData.username !== usuario.username) {
        mudarUsername(formData.username);
      }
      
      if (formData.nome !== usuario.nome || formData.bio !== usuario.bio) {
        mudarNomeUsuario(formData.nome, formData.bio);
      }

      setSucesso('Perfil atualizado com sucesso!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="modal-editar-perfil">
      <div className="modal-conteudo">
        <div className="modal-header">
          <h2>Editar Perfil</h2>
          <button onClick={onClose} className="fechar-modal">×</button>
        </div>

        {erro && <div className="mensagem erro">{erro}</div>}
        {sucesso && <div className="mensagem sucesso">{sucesso}</div>}

        <form onSubmit={handleSubmit} className="form-editar-perfil">
          <div className="campo-form">
            <label>Nome completo</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="campo-form">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="seu_username"
            />
          </div>

          <div className="campo-form">
            <label>Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Conte um pouco sobre você..."
              rows="3"
            />
          </div>

          <div className="acoes-form">
            <button type="button" onClick={onClose} className="botao-secundario">
              Cancelar
            </button>
            <button type="submit" className="botao-principal">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
