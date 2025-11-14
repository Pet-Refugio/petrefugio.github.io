import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/perfil/InfoUsuario.css';

const InfoUsuario = () => {
  const { usuario, atualizarPerfil, logout } = useAuth();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({
    nome: usuario?.nome || '',
    username: usuario?.username || '',
    bio: usuario?.bio || ''
  });
  const [fotoPerfil, setFotoPerfil] = useState(usuario?.fotoPerfil || null);
  const [fotoCapa, setFotoCapa] = useState(usuario?.fotoCapa || null);

  if (!usuario) {
    return (
      <div className="perfil-carregando">
        <p>Carregando perfil...</p>
        <button onClick={() => navigate('/login')}>Fazer Login</button>
      </div>
    );
  }

  const handleSalvarPerfil = () => {
    const dadosAtualizados = {
      ...dadosEditados,
      ...(fotoPerfil && { fotoPerfil }),
      ...(fotoCapa && { fotoCapa })
    };
    atualizarPerfil(dadosAtualizados);
    setEditando(false);
  };

  const handleCancelarEdicao = () => {
    setDadosEditados({
      nome: usuario.nome,
      username: usuario.username,
      bio: usuario.bio
    });
    setFotoPerfil(usuario.fotoPerfil || null);
    setFotoCapa(usuario.fotoCapa || null);
    setEditando(false);
  };

  const selecionarArquivo = (tipo, usarCamera = false) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    if (usarCamera) {
      input.capture = 'camera';
    }
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (tipo === 'perfil') {
            setFotoPerfil(event.target.result);
          } else {
            setFotoCapa(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const getInicialNome = () => {
    return usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="info-usuario">
      <div className="capa-perfil">
        {fotoCapa ? (
          <img src={fotoCapa} alt="Capa do perfil" />
        ) : (
          <div className="placeholder-capa">
            <div className="texto-capa">PetRefugio</div>
            <div className="subtitulo-capa">Compartilhando amor pelos animais</div>
          </div>
        )}
        
        {editando && (
          <button 
            onClick={() => selecionarArquivo('capa')}
            className="botao-alterar-capa"
          >
            📷 Alterar Capa
          </button>
        )}
      </div>

      <div className="conteudo-perfil">
        <div className="cabecalho-info">
          <div className="avatar-container">
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Foto de perfil" className="avatar-usuario" />
            ) : (
              <div className="avatar-placeholder">
                <span className="avatar-inicial">{getInicialNome()}</span>
              </div>
            )}
            
            {editando && (
              <button 
                onClick={() => selecionarArquivo('perfil')}
                className="botao-alterar-avatar"
                title="Alterar foto"
              >
                📷
              </button>
            )}
          </div>

          <div className="nomes-usuario">
            {editando ? (
              <>
                <input
                  type="text"
                  value={dadosEditados.nome}
                  onChange={(e) => setDadosEditados({...dadosEditados, nome: e.target.value})}
                  className="input-editar nome-completo"
                  placeholder="Seu nome completo"
                />
                <input
                  type="text"
                  value={dadosEditados.username}
                  onChange={(e) => setDadosEditados({...dadosEditados, username: e.target.value})}
                  className="input-editar apelido"
                  placeholder="nome_de_usuario"
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

        <div className="detalhes-usuario">
          {editando ? (
            <textarea
              value={dadosEditados.bio}
              onChange={(e) => setDadosEditados({...dadosEditados, bio: e.target.value})}
              className="textarea-editar bio"
              placeholder="Conte um pouco sobre você e seus pets..."
              rows="3"
            />
          ) : (
            <p className="bio">{usuario.bio || 'Este usuário ainda não adicionou uma biografia.'}</p>
          )}

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
            <div className="estatistica">
              <span className="numero">{usuario.pets?.length || 0}</span>
              <span className="rotulo">Pets</span>
            </div>
          </div>

          <div className="info-contato">
            <div className="info-item">
              <span className="icone">📧</span>
              <span>{usuario.email}</span>
            </div>
            <div className="info-item">
              <span className="icone">🐾</span>
              <span>{usuario.tipo === 'veterinario' ? 'Veterinário' : 
                     usuario.tipo === 'admin' ? 'Administrador' : 'Amante de Pets'}</span>
            </div>
          </div>

          <div className="redes-sociais">
            <a href="#" className="rede-social">
              <span className="icone-rede">📘</span>
              <span>Facebook</span>
            </a>
            <a href="#" className="rede-social">
              <span className="icone-rede">📷</span>
              <span>Instagram</span>
            </a>
            <a href="#" className="rede-social">
              <span className="icone-rede">🐦</span>
              <span>Twitter</span>
            </a>
          </div>

          <div className="acoes-usuario">
            {editando ? (
              <>
                <button onClick={handleSalvarPerfil} className="botao-acao-principal">
                  💾 Salvar Alterações
                </button>
                <button onClick={handleCancelarEdicao} className="botao-acao-secundario">
                  ❌ Cancelar
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setEditando(true)}
                  className="botao-acao-principal"
                >
                  ✏️ Editar Perfil
                </button>
                <button 
                  onClick={() => navigate('/perfil/adicionar-pet')}
                  className="botao-acao-secundario"
                >
                  🐾 Adicionar Pet
                </button>
                <button onClick={logout} className="botao-acao-secundario">
                  🚪 Sair
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {editando && (
        <div className="menu-opcoes-avancado">
          <div className="opcoes-foto-avancadas">
            <h4>Opções de Foto</h4>
            <div className="botoes-opcoes">
              <button 
                onClick={() => selecionarArquivo('perfil', true)}
                className="botao-opcao"
              >
                📸 Tirar Foto do Perfil
              </button>
              <button 
                onClick={() => selecionarArquivo('perfil', false)}
                className="botao-opcao"
              >
                🖼️ Escolher Foto do Perfil
              </button>
              <button 
                onClick={() => selecionarArquivo('capa', true)}
                className="botao-opcao"
              >
                🌅 Tirar Foto da Capa
              </button>
              <button 
                onClick={() => selecionarArquivo('capa', false)}
                className="botao-opcao"
              >
                🏞️ Escolher Foto da Capa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoUsuario;