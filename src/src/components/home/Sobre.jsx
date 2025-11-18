import '../../styles/home/Sobre.css';
export default function Sobre() {
    return (
      <section id="sobre" className="sobre">
        <div className="container">
          <div className="cabecalho-secao">
            <h2 className="titulo-secao">O que é o PetRefugio?</h2>
            <p className="subtitulo-secao">Uma comunidade dedicada ao bem-estar animal</p>
          </div>
          <div className="grade-sobre">
            <div className="cartao-sobre">
              <div className="icone-cartao">🔍</div>
              <h3>Busca e Resgate</h3>
              <p>Encontre animais perdidos através da nossa rede colaborativa.</p>
            </div>
            <div className="cartao-sobre">
              <div className="icone-cartao">❤️</div>
              <h3>Adoção</h3>
              <p>Conecte pets que precisam de um lar com famílias que querem amar.</p>
            </div>
            <div className="cartao-sobre">
              <div className="icone-cartao">🏥</div>
              <h3>Serviços</h3>
              <p>Encontre veterinários, pet shops e cuidadores na sua região.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  