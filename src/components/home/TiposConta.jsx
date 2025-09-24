import '../../styles/home/TiposConta.css';
export default function TiposConta() {
    return (
      <section id="tipos-conta" className="tipos-conta">
        <div className="container">
          <div className="cabecalho-secao">
            <h2 className="titulo-secao">Tipos de Conta</h2>
            <p className="subtitulo-secao">Escolha o tipo ideal para você</p>
          </div>
          <div className="grade-contas">
            <div className="cartao-conta usuario">
              <div className="icone-conta">👥</div>
              <h3>Usuário</h3>
              <p>Para tutores que querem compartilhar e buscar serviços.</p>
              <ul className="lista-carac">
                <li>Posts de fotos</li>
                <li>Perfil para pets</li>
                <li>Busca por serviços</li>
                <li>Processo de adoção</li>
              </ul>
              <button className="btn">Cadastrar Grátis</button>
            </div>
  
            <div className="cartao-conta ong">
              <div className="icone-conta">🏠</div>
              <h3>ONG</h3>
              <p>Para organizações dedicadas ao resgate animal.</p>
              <ul className="lista-carac">
                <li>Perfil verificado</li>
                <li>Sistema de doações</li>
                <li>Localização no mapa</li>
                <li>Gestão de adoções</li>
              </ul>
              <button className="btn">Cadastrar ONG</button>
            </div>
  
            <div className="cartao-conta profissional">
              <div className="icone-conta">💼</div>
              <h3>Profissional</h3>
              <p>Para veterinários, pet shops e prestadores de serviços.</p>
              <ul className="lista-carac">
                <li>Perfil profissional</li>
                <li>Sistema de agendamento</li>
                <li>Avaliações de clientes</li>
                <li>Loja online</li>
              </ul>
              <button className="btn">Cadastrar Negócio</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  