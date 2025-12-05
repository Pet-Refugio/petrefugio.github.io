// src/components/perfil/EditarPerfilInline.jsx
import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/perfil/EditarPerfilInline.css';

const EditarPerfilInline = ({ usuario, onCancelar, onSalvo }) => {
  const { atualizarPerfil } = useAuth();
  const [formData, setFormData] = useState({
    nome: usuario.nome || '',
    username: usuario.username || '',
    bio: usuario.bio || '',
    localizacao: usuario.localizacao || '',
    idade: usuario.idade || '',
    instagram: usuario.instagram || '',
    facebook: usuario.facebook || ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [capaFile, setCapaFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(usuario.fotoPerfil);
  const [capaPreview, setCapaPreview] = useState(usuario.fotoCapa);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const avatarInputRef = useRef(null);
  const capaInputRef = useRef(null);

  // Converte imagem para base64
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Comprime imagem
  const compressImage = async (base64, maxWidth = 800) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      
      img.onerror = () => resolve(base64);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      let dadosParaAtualizar = { ...formData };

      // Processa nova foto de perfil
      if (avatarFile) {
        try {
          const base64 = await imageToBase64(avatarFile);
          const compressedImage = await compressImage(base64, 400);
          dadosParaAtualizar.fotoPerfil = compressedImage;
        } catch (error) {
          console.error('Erro ao processar imagem do perfil:', error);
          setErro('Erro ao processar a foto de perfil.');
          setCarregando(false);
          return;
        }
      }

      // Processa nova foto de capa
      if (capaFile) {
        try {
          const base64 = await imageToBase64(capaFile);
          const compressedImage = await compressImage(base64, 1200);
          dadosParaAtualizar.fotoCapa = compressedImage;
        } catch (error) {
          console.error('Erro ao processar imagem da capa:', error);
          setErro('Erro ao processar a foto de capa.');
          setCarregando(false);
          return;
        }
      }

      // Atualiza o perfil
      const atualizado = atualizarPerfil(dadosParaAtualizar);
      
      if (atualizado) {
        setSucesso('Perfil atualizado com sucesso!');
        setTimeout(() => {
          onSalvo();
        }, 1500);
      } else {
        setErro('Erro ao atualizar perfil. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro ao atualizar perfil.');
    } finally {
      setCarregando(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verifica se é uma imagem
      if (!file.type.startsWith('image/')) {
        setErro('Por favor, selecione um arquivo de imagem');
        return;
      }
      
      // Verifica tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErro('A imagem deve ter no máximo 5MB');
        return;
      }
      
      setAvatarFile(file);
      
      // Cria preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      setErro('');
    }
  };

  const handleCapaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verifica se é uma imagem
      if (!file.type.startsWith('image/')) {
        setErro('Por favor, selecione um arquivo de imagem');
        return;
      }
      
      // Verifica tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErro('A imagem deve ter no máximo 5MB');
        return;
      }
      
      setCapaFile(file);
      
      // Cria preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapaPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      setErro('');
    }
  };

  const getInicialNome = () => {
    return usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="editar-perfil-inline">
      <div className="cabecalho-editar">
        <h3>✏️ Editar Perfil</h3>
      </div>

      {erro && (
        <div className="mensagem-erro">
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="mensagem-sucesso">
          {sucesso}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-editar-inline">
        {/* Capa do Perfil */}
        <div className="secao-foto capa">
          <label>Foto de Capa</label>
          <div className="preview-foto capa-preview">
            {capaPreview ? (
              <img 
                src={capaPreview} 
                alt="Preview da capa"
                className="foto-preview"
              />
            ) : (
              <div className="placeholder-foto">
                <span className="icone-placeholder">🌅</span>
                <span className="texto-placeholder">Adicionar capa</span>
              </div>
            )}
          </div>
          <button 
            type="button"
            onClick={() => capaInputRef.current.click()}
            className="botao-selecionar-foto"
          >
            {capaPreview ? 'Alterar Capa' : 'Adicionar Capa'}
          </button>
          <input
            ref={capaInputRef}
            type="file"
            accept="image/*"
            onChange={handleCapaChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Foto de Perfil */}
        <div className="secao-foto perfil">
          <label>Foto de Perfil</label>
          <div className="preview-foto avatar-preview">
            {avatarPreview ? (
              <img 
                src={avatarPreview} 
                alt="Preview do avatar"
                className="foto-preview"
              />
            ) : (
              <div className="avatar-placeholder">
                <span className="avatar-inicial">{getInicialNome()}</span>
              </div>
            )}
          </div>
          <button 
            type="button"
            onClick={() => avatarInputRef.current.click()}
            className="botao-selecionar-foto"
          >
            {avatarPreview ? 'Alterar Foto' : 'Adicionar Foto'}
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Campos do formulário */}
        <div className="grid-campos">
          <div className="campo-form">
            <label>Nome Completo *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
              disabled={carregando}
            />
          </div>

          <div className="campo-form">
            <label>Nome de Usuário *</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              disabled={carregando}
            />
          </div>

          <div className="campo-form full-width">
            <label>Biografia</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows="3"
              placeholder="Conte um pouco sobre você e seus pets..."
              disabled={carregando}
            />
          </div>

          <div className="campo-form">
            <label>Localização</label>
            <input
              type="text"
              value={formData.localizacao}
              onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
              placeholder="Cidade, Estado"
              disabled={carregando}
            />
          </div>

          <div className="campo-form">
            <label>Idade</label>
            <input
              type="number"
              value={formData.idade}
              onChange={(e) => setFormData({...formData, idade: e.target.value})}
              min="1"
              max="120"
              placeholder="Idade"
              disabled={carregando}
            />
          </div>

          <div className="campo-form">
            <label>Instagram</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              placeholder="@seuusuario"
              disabled={carregando}
            />
          </div>

          <div className="campo-form">
            <label>Facebook</label>
            <input
              type="text"
              value={formData.facebook}
              onChange={(e) => setFormData({...formData, facebook: e.target.value})}
              placeholder="nome.sobrenome"
              disabled={carregando}
            />
          </div>
        </div>

        {/* Botões de ação */}
        <div className="acoes-form">
          <button 
            type="button"
            onClick={onCancelar}
            disabled={carregando}
            className="botao-cancelar"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={carregando}
            className="botao-salvar"
          >
            {carregando ? (
              <span className="carregando-texto">
                <span className="spinner"></span>
                Salvando...
              </span>
            ) : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfilInline;