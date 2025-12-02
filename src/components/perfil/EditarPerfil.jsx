// src/components/perfil/EditarPerfil.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const EditarPerfil = ({ onClose }) => {
  const { usuario, atualizarPerfil, adicionarFoto } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    bio: ''
  });
  const [fotoPerfilNova, setFotoPerfilNova] = useState(null);
  const [fotoCapaNova, setFotoCapaNova] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome || '',
        username: usuario.username || '',
        bio: usuario.bio || ''
      });
      setFotoPerfilNova(null);
      setFotoCapaNova(null);
      setErro('');
      setSucesso('');
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [usuario]);

  // Função para comprimir imagem
  const compressImage = async (base64, maxWidth = 800, quality = 0.8) => {
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
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      
      img.onerror = () => {
        resolve(base64); // Se falhar, retorna o original
      };
    });
  };

  // Função principal handleSubmit (apenas uma declaração)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      let fotosSalvas = true;

      if (fotoPerfilNova) {
        const compressedImage = await compressImage(fotoPerfilNova, 400);
        fotosSalvas = await adicionarFoto('perfil', compressedImage);
      }
      
      if (fotosSalvas && fotoCapaNova) {
        const compressedImage = await compressImage(fotoCapaNova, 1200);
        fotosSalvas = await adicionarFoto('capa', compressedImage);
      }
      
      if (fotosSalvas) {
        const atualizado = atualizarPerfil(formData);
        if (atualizado) {
          setSucesso('Perfil atualizado com sucesso!');
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setErro('Erro ao atualizar perfil');
        }
      } else {
        setErro('Erro ao salvar as fotos');
      }
    } catch (error) {
      setErro('Erro ao atualizar perfil');
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => {
    onClose();
  };

  const selecionarArquivo = (tipo) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (tipo === 'perfil') {
            setFotoPerfilNova(event.target.result);
          } else {
            setFotoCapaNova(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const fotoPerfilExibir = fotoPerfilNova !== null ? fotoPerfilNova : usuario?.fotoPerfil;
  const fotoCapaExibir = fotoCapaNova !== null ? fotoCapaNova : usuario?.fotoCapa;

  const getInicialNome = () => {
    return usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : 'U';
  };

  if (!usuario) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, color: '#333' }}>✏️ Editar Perfil</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        {erro && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {erro}
          </div>
        )}

        {sucesso && (
          <div style={{
            backgroundColor: '#e8f5e8',
            color: '#2e7d32',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Capa do Perfil</h4>
            <div style={{
              height: '120px',
              backgroundColor: '#f0f0f0',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {fotoCapaExibir ? (
                <img 
                  src={fotoCapaExibir} 
                  alt="Capa" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: '#999' }}>Nenhuma capa selecionada</span>
              )}
            </div>
            <button 
              onClick={() => selecionarArquivo('capa')}
              type="button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {fotoCapaExibir ? 'Alterar Capa' : 'Adicionar Capa'}
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Foto de Perfil</h4>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
              {fotoPerfilExibir ? (
                <img 
                  src={fotoPerfilExibir} 
                  alt="Perfil"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: '#FF6B35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  {getInicialNome()}
                </div>
              )}
            </div>
            <button 
              onClick={() => selecionarArquivo('perfil')}
              type="button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {fotoPerfilExibir ? 'Alterar Foto' : 'Adicionar Foto'}
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nome Completo
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nome de Usuário
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Biografia
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              onClick={handleCancelar}
              disabled={carregando}
              type="button"
              style={{
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: carregando ? 'not-allowed' : 'pointer'
              }}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={carregando}
              style={{
                padding: '10px 20px',
                backgroundColor: carregando ? '#ccc' : '#FF6B35',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: carregando ? 'not-allowed' : 'pointer'
              }}
            >
              {carregando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;