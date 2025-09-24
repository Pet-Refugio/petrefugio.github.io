import '../../styles/cadastro/HeaderCadastro.css';
export default function HeaderCadastro() {
  return (
    <header className="header-cadastro">
      <nav className="nav-cadastro">
        <div className="nav-container-cadastro">
          <div className="logo-cadastro">
            <span className="logo-icone-cadastro">🐾</span>
            <span className="logo-texto-cadastro">
              <span className="petestilo-cadastro">Pet</span>Refugio
            </span>
          </div>
          <div className="nav-acoes-cadastro">
            <a href="/login" className="btn-outline-cadastro">Entrar</a>
            <a href="/cadastro" className="btn-principal-cadastro">Cadastrar</a>
          </div>
        </div>
      </nav>
    </header>
  );
}