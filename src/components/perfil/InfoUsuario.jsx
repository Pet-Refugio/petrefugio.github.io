import '../../styles/perfil/InfoUsuario.css';
import { useState } from 'react';
const InfoUsuario = () => {
  const [avatarError, setAvatarError] = useState(false);
  const [capaError, setCapaError] = useState(false);
// Adicione estas funções no seu componente, antes do return

const calcularIdade = (dataNascimento) => {
  try {
    if (!dataNascimento) return '--';
    
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    // Ajusta se ainda não fez aniversário este ano
    if (mesAtual < mesNascimento || 
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  } catch (error) {
    console.error('Erro ao calcular idade:', error);
    return '--';
  }
};

const formatarData = (dataString) => {
  try {
    if (!dataString) return '--/--/----';
    
    const data = new Date(dataString);
    
    // Verifica se a data é válida
    if (isNaN(data.getTime())) {
      return '--/--/----';
    }
    
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '--/--/----';
  }
};
  // Dados do usuário com caminhos corrigidos
  const usuario = {
    id: 101,
    nome: "Ana Silva",
    apelido: "aninhapets",
    email: "ana.silva@email.com",
    avatar: "/images/avartars/anasilva.jpg", // CAMINHO CORRETO
    capa: "/images/capas/perfil-ana.jpg",
    bio: "Amante de animais, mãe de 3 pets e voluntária em abrigos. ❤️🐾",
    localizacao: "São Paulo, SP",
    dataNascimento: "1990-05-15",
    telefone: "(11) 99999-9999",
    estatisticas: {
      seguindo: 245,
      seguidores: 1560,
      posts: 89
    },
    redesSociais: {
      instagram: "@aninhapets",
      facebook: "Ana Silva Pets"
    },
    dataCadastro: "2022-03-10"
  };

  const handleAvatarError = () => {
    console.log('❌ Avatar não encontrado:', usuario.avatar);
    setAvatarError(true);
  };

  const handleCapaError = () => {
    console.log('❌ Capa não encontrada:', usuario.capa);
    setCapaError(true);
  };

  // ... resto do código permanece igual ...

  return (
    <div className="info-usuario">
      
      {/* Capa do Perfil */}
      <div className="capa-perfil">
        {!capaError ? (
          <img 
            src={usuario.capa} 
            alt="Capa do perfil" 
            onError={handleCapaError}
          />
        ) : (
          <div className="placeholder-capa">
            <div className="texto-capa">🌅 Capa do Perfil</div>
            <div className="subtitulo-capa">Adicione uma foto de capa personalizada</div>
          </div>
        )}
        <button className="botao-alterar-capa">📷 Alterar capa</button>
      </div>

      {/* Informações Principais */}
      <div className="conteudo-perfil">
        
        {/* Avatar e Nome */}
        <div className="cabecalho-info">
          <div className="avatar-container">
            {!avatarError ? (
              <img 
                src={usuario.avatar} 
                alt={usuario.nome} 
                className="avatar-usuario"
                onError={handleAvatarError}
              />
            ) : (
              <div className="avatar-placeholder">
                <span className="avatar-inicial">{usuario.nome.charAt(0)}</span>
              </div>
            )}
            <button className="botao-alterar-avatar">📷</button>
          </div>
          
          <div className="nomes-usuario">
            <h1 className="nome-completo">{usuario.nome}</h1>
            <p className="apelido">@{usuario.apelido}</p>
          </div>
        </div>
            
        {/* Bio e Estatísticas */}
        <div className="detalhes-usuario">
          <p className="bio">{usuario.bio}</p>
          
          <div className="estatisticas">
            <div className="estatistica">
              <span className="numero">{usuario.estatisticas.posts}</span>
              <span className="rotulo">Posts</span>
            </div>
            <div className="estatistica">
              <span className="numero">{usuario.estatisticas.seguidores}</span>
              <span className="rotulo">Seguidores</span>
            </div>
            <div className="estatistica">
              <span className="numero">{usuario.estatisticas.seguindo}</span>
              <span className="rotulo">Seguindo</span>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="info-contato">
            <div className="info-item">
              <span className="icone">📍</span>
              <span>{usuario.localizacao}</span>
            </div>
            <div className="info-item">
              <span className="icone">🎂</span>
              <span>{calcularIdade(usuario.dataNascimento)} anos</span>
            </div>
            <div className="info-item">
              <span className="icone">📅</span>
              <span>No PetRefugio desde {formatarData(usuario.dataCadastro)}</span>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="redes-sociais">
            {usuario.redesSociais.instagram && (
              <a href="#" className="rede-social">
                <span className="icone-rede">📷</span>
                {usuario.redesSociais.instagram}
              </a>
            )}
            {usuario.redesSociais.facebook && (
              <a href="#" className="rede-social">
                <span className="icone-rede">📘</span>
                {usuario.redesSociais.facebook}
              </a>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="acoes-usuario">
            <button className="botao-acao-principal">✏️ Editar Perfil</button>
            <button className="botao-acao-secundario">📤 Compartilhar</button>
          </div>
        </div>

      </div>
    </div>
  );
};
export default InfoUsuario;