import '../../styles/principal/AreaConteudo.css';
import perfil from "../perfil/img/mulher1.jpg"
export default function AreaConteudo() {
  return (
    <main className="area-conteudo">
      
      {/* Feed Principal */}
      <div className="feed-principal">
        
        <div className="card-criar-post">
          <div className="cabecalho-criar">
            <img 
              src={perfil}
              alt="Seu perfil"
              className="avatar-usuario"
            />
            <input 
              type="text" 
              placeholder="O que está acontecendo com seu pet?"
              className="input-criar-post"
            />
          </div>
          <div className="acoes-criar-post">
            <button className="botao-midia">📷 Foto</button>
            <button className="botao-midia">🎥 Vídeo</button>
            <button className="botao-midia">📍 Local</button>
            <button className="botao-publicar">Publicar</button>
          </div>
        </div>

        {/* Postagens */}
        <div className="lista-postagens">
          
          {/* Postagem 1 */}
          <div className="card-postagem">
            <div className="cabecalho-post">
              <img 
                src="/assets/avatars/ana.jpg" 
                alt="Ana Silva"
                className="avatar-post"
              />
              <div className="info-post">
                <span className="nome-usuario">Ana Silva</span>
                <span className="tempo-post">há 2 horas</span>
              </div>
            </div>
            
            <div className="conteudo-post">
              <p>Meu gatinho acabou de fazer 1 ano! 🎉 Comemorem com a gente!</p>
              <img 
                src="/assets/posts/gato-aniversario.jpg" 
                alt="Gato de aniversário"
                className="imagem-post"
              />
            </div>
            
            <div className="acoes-post">
              <button className="botao-acao">❤️ 24</button>
              <button className="botao-acao">💬 8</button>
              <button className="botao-acao">↗️</button>
            </div>
          </div>

          {/* Postagem 2 */}
          <div className="card-postagem">
            <div className="cabecalho-post">
              <img 
                src="/assets/avatars/carlos.jpg" 
                alt="Carlos Santos"
                className="avatar-post"
              />
              <div className="info-post">
                <span className="nome-usuario">Carlos Santos</span>
                <span className="tempo-post">há 4 horas</span>
              </div>
            </div>
            
            <div className="conteudo-post">
              <p>Encontrei esse doguinho perdido no Parque. Alguém conhece? 🐶</p>
            </div>
            
            <div className="acoes-post">
              <button className="botao-acao">❤️ 42</button>
              <button className="botao-acao">💬 15</button>
              <button className="botao-acao">↗️</button>
            </div>
          </div>

        </div>
      </div>
      <aside className="sidebar-direito">
        <div className="card-sugestoes">
          <h3>Sugestões</h3>
          <div className="lista-sugestoes">
            <div className="item-sugestao">
              <img src="/assets/avatars/sugestao1.jpg" alt="Sugestão" />
              <div className="info-sugestao">
                <span>PetShop Amigo Fiel</span>
                <small>12 amigos em comum</small>
              </div>
              <button className="botao-seguir">Seguir</button>
            </div>
            <div className="item-sugestao">
              <img src="/assets/avatars/sugestao2.jpg" alt="Sugestão" />
              <div className="info-sugestao">
                <span>Clínica Veterinária</span>
                <small>8 amigos em comum</small>
              </div>
              <button className="botao-seguir">Seguir</button>
            </div>
          </div>
        </div>
      </aside>

    </main>
  );
}