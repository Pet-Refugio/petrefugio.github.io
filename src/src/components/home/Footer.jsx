import '../../styles/home/Footer.css';
export default function Footer() {
    return (
      <footer id="contato" className="rodape">
        <div className="container">
          <div className="conteudo-rodape">
            <div className="secao-rodape">
              <div className="logo">
                <span className="icone-logo">🐾</span>
                <span className="texto-logo">PetRefugio</span>
              </div>
              <p>Conectando corações e patas para um mundo melhor.</p>
              <div className="redes-sociais">
                <a href="#" className="link-social">📘</a>
                <a href="#" className="link-social">📷</a>
                <a href="#" className="link-social">🐦</a>
              </div>
            </div>
  
            <div className="secao-rodape">
              <h4>Links</h4>
              <ul>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#recursos">Recursos</a></li>
                <li><a href="#">Privacidade</a></li>
                <li><a href="#">Termos</a></li>
              </ul>
            </div>
  
            <div className="secao-rodape">
              <h4>Contato</h4>
              <ul>
                <li>📧 petrefugio08@gmail.com</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
  
            <div className="secao-rodape">
              <h4>Newsletter</h4>
              <p>Receba novidades sobre adoções</p>
              <form className="form-newsletter">
                <input type="email" placeholder="Seu e-mail" className="entrada-newsletter" />
                <button type="submit" className="btn">Inscrever</button>
              </form>
            </div>
          </div>
  
          <div className="rodape-baixo">
            <p>&copy; 2025 PetRefugio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }
  