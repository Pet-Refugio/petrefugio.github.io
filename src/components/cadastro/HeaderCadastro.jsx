import { useState, useEffect } from 'react';
import '../../styles/cadastro/HeaderCadastro.css';

export default function HeaderCadastro() {
      const [isVisible, setIsVisible] = useState(true);
      const [lastScrollY, setLastScrollY] = useState(0);

      useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scroll para baixo - esconde header
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            // Scroll para cima - mostra header
            setIsVisible(true);
          }
          
          setLastScrollY(currentScrollY);
        };

      // Debounce para melhor performance
      let ticking = false;
      const debouncedScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', debouncedScroll, { passive: true });
      
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`header-cadastro ${isVisible ? 'visible' : 'hidden'}`}>
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