import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/perfil/InfoUsuario.css';

const InfoUsuario = () => {
  const { usuario, atualizarPerfil } = useAuth();
  const [editando, setEditando] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [capaError, setCapaError] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    bio: '',
    localizacao: '',
    idade: ''
  });

  React.useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome || '',
        username: usuario.username || '',
        bio: usuario.bio || '',
        localizacao: usuario.localizacao || '',
        idade: usuario.idade || ''
      });
    }
  }, [usuario]);

  const calcularIdade = (dataNascimento) => {
    try {
      if (!dataNascimento) return '--';
      
      const nascimento = new Date(dataNascimento);
      const hoje = new Date();
      
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();
      
      if (mesAtual < mesNascimento || 
          (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      
      return idade;
    } catch (error) {
      return '--';
    }
  };

  const formatarData = (dataString) => {
    try {
      if (!dataString) return '--/--/----';
      
      const data = new Date(dataString);
      
      if (isNaN(data.getTime())) {
        return '--/--/----';
      }
      
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return '--/--/----';
    }
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const handleCapaError = () => {
    setCapaError(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelarEdicao = () => {
    setEditando(false);
    setErro('');
    setSucesso('');
    if (usuario) {
      setFormData({
        nome: usuario.nome || '',
        username: usuario.username || '',
        bio: usuario.bio || '',
        localizacao: usuario.localizacao || '',
        idade: usuario.idade || ''
      });
    }
  };

  const handleSalvarPerfil = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    try {
      const atualizado = atualizarPerfil(formData);
      
      if (atualizado) {
        setSucesso('Perfil atualizado com sucesso!');
        setTimeout(() => {
          setEditando(false);
          setSucesso('');
        }, 2000);
      } else {
        setErro('Erro ao atualizar perfil');
      }
    } catch (error) {
      setErro('Erro ao atualizar perfil');
    } finally {
      setCarregando(false);
    }
  };

  const handleSelecionarFoto = (tipo) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            setCarregando(true);
            // Converter para base64
            const base64 = event.target.result;
            
            // Comprimir imagem
            const img = new Image();
            img.src = base64;
            await new Promise((resolve) => {
              img.onload = resolve;
            });
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = tipo === 'perfil' ? 400 : 1200;
            canvas.height = (img.height * canvas.width) / img.width;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imagemComprimida = canvas.toDataURL('image/jpeg', 0.8);
            
            // Atualizar perfil com a nova imagem
            const dadosAtualizados = tipo === 'perfil' 
              ? { fotoPerfil: imagemComprimida }
              : { fotoCapa: imagemComprimida };
              
            const atualizado = atualizarPerfil(dadosAtualizados);
            
            if (atualizado) {
              setSucesso(tipo === 'perfil' ? 'Foto de perfil atualizada!' : 'Capa atualizada!');
              setTimeout(() => setSucesso(''), 2000);
              
              // Atualizar estado de erro
              if (tipo === 'perfil') setAvatarError(false);
              if (tipo === 'capa') setCapaError(false);
            } else {
              setErro('Erro ao salvar imagem');
            }
          } catch (error) {
            setErro('Erro ao processar imagem');
          } finally {
            setCarregando(false);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  if (!usuario) {
    return (
      <div className="info-usuario perfil-carregando">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="info-usuario">
      <div className="capa-perfil">
        {!capaError && usuario.fotoCapa ? (
          <img 
            src={usuario.fotoCapa} 
            alt="Capa do perfil" 
            onError={handleCapaError}
          />
        ) : (
          <div className="placeholder-capa">
            <div className="texto-capa">🌅 Capa do Perfil</div>
            <div className="subtitulo-capa">Adicione uma foto de capa personalizada</div>
          </div>
        )}
        <button 
          className="botao-alterar-capa"
          onClick={() => handleSelecionarFoto('capa')}
          disabled={carregando}
        >
          📷 {usuario.fotoCapa && !capaError ? 'Alterar capa' : 'Adicionar capa'}
        </button>
      </div>

      {erro && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '12px 20px',
          textAlign: 'center',
          fontSize: '0.95rem'
        }}>
          {erro}
        </div>
      )}

      {sucesso && (
        <div style={{
          backgroundColor: '#e8f5e8',
          color: '#2e7d32',
          padding: '12px 20px',
          textAlign: 'center',
          fontSize: '0.95rem'
        }}>
          {sucesso}
        </div>
      )}

      <div className="conteudo-perfil">
        
        {/* Avatar e Nome */}
        <div className="cabecalho-info">
          <div className="avatar-container">
            {!avatarError && usuario.fotoPerfil ? (
              <img 
                src={usuario.fotoPerfil} 
                alt={usuario.nome} 
                className="avatar-usuario"
                onError={handleAvatarError}
              />
            ) : (
              <div className="avatar-placeholder">
                <span className="avatar-inicial">{usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U'}</span>
              </div>
            )}
            <button 
              className="botao-alterar-avatar"
              onClick={() => handleSelecionarFoto('perfil')}
              disabled={carregando}
              title="Alterar foto de perfil"
            >
              📷
            </button>
          </div>
          
          <div className="nomes-usuario">
            {editando ? (
              <>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="input-editar nome-completo"
                  placeholder="Nome completo"
                  disabled={carregando}
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input-editar apelido"
                  placeholder="@username"
                  disabled={carregando}
                />
              </>
            ) : (
              <>
                <h1 className="nome-completo">{usuario.nome}</h1>
                <p className="apelido">@{usuario.username}</p>
              </>
            )}
          </div>
        </div>
            
        {/* Botões de Ação */}
        <div className="acoes-usuario">
          {editando ? (
            <>
              <button 
                className="botao-acao-principal"
                onClick={handleSalvarPerfil}
                disabled={carregando}
              >
                {carregando ? 'Salvando...' : '💾 Salvar'}
              </button>
              <button 
                className="botao-acao-secundario"
                onClick={handleCancelarEdicao}
                disabled={carregando}
              >
                ❌ Cancelar
              </button>
            </>
          ) : (
            <>
              <button 
                className="botao-acao-principal"
                onClick={() => setEditando(true)}
              >
                ✏️ Editar Perfil
              </button>
              <button className="botao-acao-secundario">
                📤 Compartilhar
              </button>
            </>
          )}
        </div>

        {/* Detalhes do Usuário */}
        <div className="detalhes-usuario">
          {/* Biografia */}
          {editando ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="textarea-editar"
              placeholder="Conte um pouco sobre você e seus pets..."
              disabled={carregando}
              rows="3"
            />
          ) : (
            <p className="bio">{usuario.bio || 'Sem biografia para exibir.'}</p>
          )}

          {/* Estatísticas */}
          <div className="estatisticas">
            <div className="estatistica">
              <span className="numero">{usuario.posts?.length || 0}</span>
              <span className="rotulo">Posts</span>
            </div>
            <div className="estatistica">
              <span className="numero">{usuario.seguidores?.length || 0}</span>
              <span className="rotulo">Seguidores</span>
            </div>
            <div className="estatistica">
              <span className="numero">{usuario.seguindo?.length || 0}</span>
              <span className="rotulo">Seguindo</span>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="info-contato">
            <div className="info-item">
              <span className="icone">📧</span>
              <span>{usuario.email}</span>
            </div>
            
            {editando ? (
              <>
                <div className="info-item">
                  <span className="icone">📍</span>
                  <input
                    type="text"
                    name="localizacao"
                    value={formData.localizacao}
                    onChange={handleInputChange}
                    className="input-editar"
                    placeholder="Cidade, Estado"
                    disabled={carregando}
                    style={{ width: '200px' }}
                  />
                </div>
                <div className="info-item">
                  <span className="icone">🎂</span>
                  <input
                    type="number"
                    name="idade"
                    value={formData.idade}
                    onChange={handleInputChange}
                    className="input-editar"
                    placeholder="Idade"
                    disabled={carregando}
                    min="1"
                    max="120"
                    style={{ width: '80px' }}
                  />
                  <span>anos</span>
                </div>
              </>
            ) : (
              <>
                {usuario.localizacao && (
                  <div className="info-item">
                    <span className="icone">📍</span>
                    <span>{usuario.localizacao}</span>
                  </div>
                )}
                {usuario.idade && (
                  <div className="info-item">
                    <span className="icone">🎂</span>
                    <span>{usuario.idade} anos</span>
                  </div>
                )}
              </>
            )}
            
            {usuario.dataCadastro && (
              <div className="info-item">
                <span className="icone">📅</span>
                <span>No PetRefugio desde {formatarData(usuario.dataCadastro)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUsuario;