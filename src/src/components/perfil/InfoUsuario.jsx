// src/components/perfil/InfoUsuario.jsx
import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/perfil/InfoUsuario.css';

const InfoUsuario = () => {
  const { usuario, atualizarPerfil, logout, adicionarFoto } = useAuth();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  
  // Estado para os campos de texto durante a edição
  const [dadosEditados, setDadosEditados] = useState({
    nome: usuario?.nome || '',
    username: usuario?.username || '',
    bio: usuario?.bio || ''
  });
  
  // Estados TEMPORÁRIOS para a pré-visualização da foto ANTES de salvar
  const [fotoPerfilNova, setFotoPerfilNova] = useState(null);
  const [fotoCapaNova, setFotoCapaNova] = useState(null);
  
  // Sincronizar dadosEditados e limpar fotos temporárias quando o usuário ou modo de edição mudar
  useEffect(() => {
    // Sincroniza os campos de texto com os dados do Contexto
    setDadosEditados({
      nome: usuario?.nome || '',
      username: usuario?.username || '',
      bio: usuario?.bio || ''
    });
    
    // Limpa as pré-visualizações temporárias ao iniciar ou cancelar a edição
    setFotoPerfilNova(null); 
    setFotoCapaNova(null);
    
  }, [usuario, editando]); // Dependências adicionadas

  // Variável que decide qual foto mostrar: a nova (em edição) ou a salva (no contexto)
  const fotoPerfilExibir = editando && fotoPerfilNova !== null ? fotoPerfilNova : usuario?.fotoPerfil;
  const fotoCapaExibir = editando && fotoCapaNova !== null ? fotoCapaNova : usuario?.fotoCapa;

  // Verificação de segurança
  if (!usuario) {
    return (
      <div className="perfil-carregando">
        <p>Carregando perfil...</p>
        <button onClick={() => navigate('/login')}>Fazer Login</button>
      </div>
    );
  }

  const handleSalvarPerfil = async () => {
    let fotosSalvas = true;

    // 1. Salva a foto de perfil se uma nova foi selecionada
    if (fotoPerfilNova) {
      fotosSalvas = await adicionarFoto('perfil', fotoPerfilNova);
      setFotoPerfilNova(null); // Limpa o estado temporário
    }
    
    // 2. Salva a foto de capa se uma nova foi selecionada
    if (fotosSalvas && fotoCapaNova) {
      fotosSalvas = await adicionarFoto('capa', fotoCapaNova);
      setFotoCapaNova(null); // Limpa o estado temporário
    }
    
    // 3. Salva os outros dados (nome, username, bio)
    if (fotosSalvas) {
      await atualizarPerfil(dadosEditados);
      setEditando(false);
    } else {
      alert('Houve um erro ao salvar as fotos. Tente novamente.');
    }
  };

  const handleCancelarEdicao = () => {
    // Redefine os dados para o estado do Contexto
    setDadosEditados({
      nome: usuario.nome,
      username: usuario.username,
      bio: usuario.bio
    });
    // Limpa os estados temporários ao cancelar
    setFotoPerfilNova(null); 
    setFotoCapaNova(null); 
    setEditando(false);
  };

  // Função para selecionar arquivo (foto ou capa)
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
          // Salva no estado TEMPORÁRIO para pré-visualização
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

  const getInicialNome = () => {
    return usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="info-usuario">
      {/* Capa do Perfil */}
      <div className="capa-perfil">
        {fotoCapaExibir ? ( // Usa a variável de exibição
          <img src={fotoCapaExibir} alt="Capa do perfil" />
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

      {/* Conteúdo Principal */}
      <div className="conteudo-perfil">
        {/* Avatar e Nome */}
        <div className="cabecalho-info">
          <div className="avatar-container">
            {fotoPerfilExibir ? ( // Usa a variável de exibição
              <img src={fotoPerfilExibir} alt="Foto de perfil" className="avatar-usuario" />
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

        {/* Detalhes do Usuário */}
        <div className="detalhes-usuario">
          {/* Biografia */}
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
            <div className="estatistica">
              <span className="numero">{usuario.pets?.length || 0}</span>
              <span className="rotulo">Pets</span>
            </div>
          </div>

          {/* Informações de Contato */}
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

          {/* Redes Sociais (Placeholder) */}
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

          {/* Ações do Usuário */}
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

      {/* Menu de Opções de Foto (quando em edição) */}
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