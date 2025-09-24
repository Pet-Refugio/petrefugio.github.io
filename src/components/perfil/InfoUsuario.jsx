import usuarioData from '../dados/usuario.json';
import '../../styles/perfil/InfoUsuario.css';
import capa from "./img/capa1.jpg";
import fotoperfil from "./img/mulher1.jpg";
const InfoUsuario = () => {
  const { usuario } = usuarioData;

  const calcularIdade = (dataNascimento) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="info-usuario">
      
      {/* Capa do Perfil */}
      <div className="capa-perfil">
        <img src={capa} alt="Capa do perfil" />
        <button className="botao-alterar-capa">📷 Alterar capa</button>
      </div>

      {/* Informações Principais */}
      <div className="conteudo-perfil">
        
        {/* Avatar e Nome */}
        <div className="cabecalho-info">
          <div className="avatar-container">
            <img src={fotoperfil} alt={usuario.nome} className="avatar-usuario" />
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
              <a href="#" className="rede-social">📷 {usuario.redesSociais.instagram}</a>
            )}
            {usuario.redesSociais.facebook && (
              <a href="#" className="rede-social">📘 {usuario.redesSociais.facebook}</a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoUsuario;