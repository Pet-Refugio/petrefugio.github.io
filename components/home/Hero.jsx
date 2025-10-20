import '../../styles/home/Hero.css';
export default function Hero() {
    return (
      <section id="inicio" className="hero">
        <div className="conteudo-hero">
          <h1 className="titulo-hero">
            Conectando <span className="destaque">corações</span> e <span className="destaque">patas</span>
          </h1>
          <p className="descricao-hero">
            Uma rede completa de cuidados para animais que conecta tutores, ONGs, veterinários, pet shops e todos que amam os pets.
          </p>
          <div className="acoes-hero">
            <button className="btn">Começar Agora</button>
            <button className="btn">Saiba Mais</button>
          </div>
        </div>
      </section>
    );
  }
  