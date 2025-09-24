import '../../styles/home/Recursos.css';
export default function Recursos() {
    return (
      <section id="recursos" className="recursos">
        <div className="container">
          <div className="cabecalho-secao">
            <h2 className="titulo-secao">Principais Recursos</h2>
            <p className="subtitulo-secao">Tudo que você e seu pet precisam</p>
          </div>
          <div className="grade-recursos">
            <div className="cartao-recurso">
              <div className="icone-recurso">📱</div>
              <h3>Rede Social</h3>
              <p>Compartilhe momentos do seu pet</p>
            </div>
            <div className="cartao-recurso">
              <div className="icone-recurso">🔍</div>
              <h3>Busca por animais</h3>
              <p>Busca e divulgação para ajudar os tutores e animais perdidos</p>
            </div>
            <div className="cartao-recurso">
              <div className="icone-recurso">💰</div>
              <h3>Doações</h3>
              <p>Apoie ONGs e causas importantes</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  