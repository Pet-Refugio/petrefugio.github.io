import '../../styles/principal/AreaConteudo.css';
import { useState } from 'react';
import ListaPosts from '../posts/ListaPosts';

export default function AreaConteudo() {
  const [novoPost, setNovoPost] = useState('');

  const handlePublicar = () => {
    if (novoPost.trim()) {
      console.log('Novo post:', novoPost);
      setNovoPost('');
      alert('Post publicado com sucesso!');
    }
  };

  return (
    <main className="area-conteudo">
      
      {/* Feed Principal */}
      <div className="feed-principal">
        
        {/* Card para Criar Postagem */}
        <div className="card-criar-post">
          <div className="cabecalho-criar">
            <img 
              src="/images/avatars/anasilva.jpg"
              alt="Seu perfil"
              className="avatar-usuario"
            />
            <input 
              type="text" 
              placeholder="O que está acontecendo com seu pet?"
              className="input-criar-post"
              value={novoPost}
              onChange={(e) => setNovoPost(e.target.value)}
            />
          </div>
          <div className="acoes-criar-post">
            <button className="botao-midia">📷 Foto</button>
            <button className="botao-midia">🎥 Vídeo</button>
            <button className="botao-midia">📍 Local</button>
            <button className="botao-publicar" onClick={handlePublicar}>
              Publicar
            </button>
          </div>
        </div>

        {/* Lista de Posts */}
        <ListaPosts />

      </div>

      {/* Sidebar Direito */}
      <aside className="sidebar-direito">
        
        {/* Sugestões de Amigos */}
        <div className="card-sugestoes">
          <h3>Sugestões</h3>
          <div className="lista-sugestoes">
            <div className="item-sugestao">
              <img src="/images/lojas/logo_loja1.png" alt="PetShop Amigo Fiel" />
              <div className="info-sugestao">
                <span>PetShop Amigo Fiel</span>
                <small>12 amigos em comum</small>
              </div>
              <button className="botao-seguir">Seguir</button>
            </div>
            <div className="item-sugestao">
              <img src="/images/lojas/logo_loja2.png" alt="Clínica Veterinária" />
              <div className="info-sugestao">
                <span>Clínica Veterinária</span>
                <small>8 amigos em comum</small>
              </div>
              <button className="botao-seguir">Seguir</button>
            </div>
            <div className="item-sugestao">
              <img src="/images/avatars/mariaoliveira.jpg" alt="Maria Oliveira" />
              <div className="info-sugestao">
                <span>Maria Oliveira</span>
                <small>5 amigos em comum</small>
              </div>
              <button className="botao-seguir">Seguir</button>
            </div>
          </div>
        </div>

        {/* Eventos Próximos */}
        <div className="card-eventos">
          <h3>Eventos Próximos</h3>
          <div className="lista-eventos">
            <div className="item-evento">
              <span className="data-evento">15/06</span>
              <span className="titulo-evento">Feira de Adoção</span>
            </div>
            <div className="item-evento">
              <span className="data-evento">20/06</span>
              <span className="titulo-evento">Palestra sobre Pets</span>
            </div>
            <div className="item-evento">
              <span className="data-evento">25/06</span>
              <span className="titulo-evento">Campanha de Vacinação</span>
            </div>
          </div>
        </div>

        {/* Pets em Destaque */}
        <div className="card-pets-destaque">
          <h3>Pets em Destaque</h3>
          <div className="lista-pets-destaque">
            <div className="item-pet-destaque">
              <img src="/images/pets/pet-default.jpg" alt="Luna" />
              <div className="info-pet-destaque">
                <span>Luna</span>
                <small>Labrador - 3 anos</small>
              </div>
            </div>
            <div className="item-pet-destaque">
              <img src="/images/pets/pet-default.jpg" alt="Thor" />
              <div className="info-pet-destaque">
                <span>Thor</span>
                <small>Siamês - 2 anos</small>
              </div>
            </div>
          </div>
        </div>

      </aside>

    </main>
  );
}