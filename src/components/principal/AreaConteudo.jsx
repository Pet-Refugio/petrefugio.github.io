import '../../styles/principal/AreaConteudo.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import empresasServicosData from '../../dados/empresasServicos.json';

export default function AreaConteudo() {
  const [novoPost, setNovoPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const [imagemCapturada, setImagemCapturada] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Dados do JSON externo
  const { empresas, servicos } = empresasServicosData;

  // Carregar posts do Local Storage ao inicializar
  useEffect(() => {
    const postsSalvos = localStorage.getItem('postsPetRefugio');
    if (postsSalvos) {
      setPosts(JSON.parse(postsSalvos));
    } else {
      // Posts iniciais padrão
      const postsIniciais = [
        {
          id: 1,
          usuarioId: 1,
          usuario: {
            id: 1,
            nome: "Ana Silva",
            avatar: "/images/avatars/anasilva.jpg",
            tipo: "usuario"
          },
          conteudo: {
            texto: "Meu gatinho acabou de fazer 1 ano! 🎉 Comemorem com a gente!",
            midia: {
              tipo: "imagem",
              url: "/images/posts/gatopost1_anasilva.jpg",
              alt: "Gato de aniversário com chapéu"
            }
          },
          engajamento: {
            curtidas: 24,
            comentarios: 8,
            compartilhamentos: 3
          },
          data: "2024-03-15T10:30:00Z",
          localizacao: "São Paulo, SP",
          hashtags: ["gato", "aniversario", "pet"]
        },
        {
          id: 2,
          usuarioId: 2,
          usuario: {
            id: 2,
            nome: "Carlos Santos",
            avatar: "/images/avatars/carlossantos.jpg",
            tipo: "usuario"
          },
          conteudo: {
            texto: "Encontrei esse doguinho perdido no Parque Ibirapuera. Alguém conhece? 🐶 Estava com coleira azul.",
            midia: null
          },
          engajamento: {
            curtidas: 42,
            comentarios: 15,
            compartilhamentos: 8
          },
          data: "2024-03-15T08:15:00Z",
          localizacao: "Parque Ibirapuera, SP",
          hashtags: ["animalperdido", "achado", "cachorro"]
        }
      ];
      setPosts(postsIniciais);
      localStorage.setItem('postsPetRefugio', JSON.stringify(postsIniciais));
    }
  }, []);

  // Salvar posts no Local Storage sempre que mudar
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('postsPetRefugio', JSON.stringify(posts));
    }
  }, [posts]);

  // Dados para sugestões
  const sugestoesPessoas = [
    {
      id: 7,
      nome: "Carla Joares",
      avatar: "/images/avatars/carlajoares.jpg",
      online: true,
      mutualFriends: 7
    },
    {
      id: 8,
      nome: "João Galvão",
      avatar: "/images/avatars/joaogalvao.jpg", 
      online: false,
      mutualFriends: 11
    }
  ];

  const grupos = [
    {
      id: 1,
      nome: "Cachorros da Cidade",
      icone: "🐕",
      membros: 128,
      descricao: "Grupo para donos de cachorros"
    }
  ];

  const eventos = [
    {
      id: 1,
      data: "15/06",
      titulo: "Feira de Adoção",
      local: "Parque Ibirapuera"
    }
  ];

  // Função para iniciar a câmera
  const iniciarCamera = async () => {
    try {
      setMostrarCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
      setMostrarCamera(false);
    }
  };

  // Função para tirar foto
  const tirarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      const imageDataURL = canvasRef.current.toDataURL('image/jpeg');
      setImagemCapturada(imageDataURL);
      pararCamera();
    }
  };

  // Função para parar a câmera
  const pararCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setMostrarCamera(false);
  };

  // Função para selecionar arquivo
  const selecionarArquivo = () => {
    fileInputRef.current?.click();
  };

  // Função para lidar com upload de arquivo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagemCapturada(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageError = (e) => {
    console.log('❌ Imagem não carregou, usando placeholder');
    
    if (e.target.className.includes('avatar')) {
      const parent = e.target.parentNode;
      const nome = e.target.alt || 'Usuário';
      const inicial = nome.charAt(0).toUpperCase();
      
      const placeholder = document.createElement('div');
      placeholder.className = 'avatar-placeholder';
      placeholder.innerHTML = `<span>${inicial}</span>`;
      placeholder.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #F26B38, #FF9D71);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
      `;
      
      e.target.style.display = 'none';
      parent.appendChild(placeholder);
    } else {
      e.target.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.className = 'placeholder-imagem';
      placeholder.innerHTML = '🖼️ Imagem não disponível';
      placeholder.style.cssText = `
        background: #f8f9fa;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
        padding: 40px 20px;
        text-align: center;
        color: #6c757d;
        font-size: 14px;
        margin: 10px 0;
      `;
      e.target.parentNode.appendChild(placeholder);
    }
  };

  const handleAvatarError = (e) => {
    console.log('❌ Avatar não carregou no card criar post');
    const parent = e.target.parentNode;
    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder-criar';
    placeholder.innerHTML = '<span>A</span>';
    placeholder.style.cssText = `
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F26B38, #FF9D71);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
    `;
    e.target.style.display = 'none';
    parent.appendChild(placeholder);
  };

  const handlePublicar = () => {
    if (novoPost.trim() || imagemCapturada) {
      const novoPostObj = {
        id: Date.now(),
        usuarioId: 1,
        usuario: {
          id: 1,
          nome: "Ana Silva",
          avatar: "/images/avatars/anasilva.jpg",
          tipo: "usuario"
        },
        conteudo: {
          texto: novoPost,
          midia: imagemCapturada ? {
            tipo: "imagem",
            url: imagemCapturada,
            alt: "Foto do post"
          } : null
        },
        engajamento: {
          curtidas: 0,
          comentarios: 0,
          compartilhamentos: 0
        },
        data: new Date().toISOString(),
        localizacao: "São Paulo, SP",
        hashtags: extrairHashtags(novoPost)
      };

      const novosPosts = [novoPostObj, ...posts];
      setPosts(novosPosts);
      setNovoPost('');
      setImagemCapturada(null);
    } else {
      alert('⚠️ Digite algo para publicar ou adicione uma foto!');
    }
  };

  // Função para extrair hashtags do texto
  const extrairHashtags = (texto) => {
    const hashtags = texto.match(/#\w+/g);
    return hashtags ? hashtags.map(tag => tag.substring(1)) : [];
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const agora = new Date();
    const diffMs = agora - data;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMin < 60) {
      return `há ${diffMin} min`;
    } else if (diffHrs < 24) {
      return `há ${diffHrs} h`;
    } else if (diffDias < 7) {
      return `há ${diffDias} dia${diffDias > 1 ? 's' : ''}`;
    } else {
      return data.toLocaleDateString('pt-BR');
    }
  };

  const renderizarMidia = (post) => {
    if (!post.conteudo.midia) return null;

    return (
      <div className="container-midia">
        <img
          src={post.conteudo.midia.url}
          alt={post.conteudo.midia.alt}
          className="imagem-post"
          onError={handleImageError}
        />
      </div>
    );
  };

  const handleAbrirPerfil = (usuarioId) => {
    navigate(`/perfil/publico/${usuarioId}`);
  };

  const handleSeguir = (usuarioId, e) => {
    e.stopPropagation();
    alert(`✅ Seguindo usuário!`);
  };

  const handleAbrirGrupo = (grupoId) => {
    alert(`📖 Abrindo grupo ${grupoId}`);
  };

  const handleAbrirEvento = (eventoId) => {
    alert(`📅 Abrindo evento ${eventoId}`);
  };

  const handleAbrirEmpresa = (empresaId) => {
    alert(`🏢 Abrindo perfil da empresa ${empresaId}`);
  };

  const handleInteresseServico = (servicoId) => {
    alert(`💼 Mostrando interesse no serviço ${servicoId}`);
  };

  return (
    <main className="area-conteudo">
      
      {/* Modal da Câmera */}
      {mostrarCamera && (
        <div className="modal-camera-overlay">
          <div className="modal-camera">
            <div className="cabecalho-camera">
              <h3>Tirar Foto</h3>
              <button className="botao-fechar-camera" onClick={pararCamera}>
                ✕
              </button>
            </div>
            <div className="area-camera">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="video-camera"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className="controles-camera">
              <button className="botao-tirar-foto" onClick={tirarFoto}>
                📷
              </button>
              <button className="botao-cancelar" onClick={pararCamera}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feed Principal */}
      <div className="feed-principal">
        
        {/* Card Criar Post */}
        <div className="card-criar-post">
          <div className="cabecalho-criar">
            <img 
              src="/images/avatars/anasilva.jpg"
              alt="Seu perfil"
              className="avatar-usuario"
              onError={handleAvatarError}
            />
            <input 
              type="text" 
              placeholder="🐾Compartilhe fotos vídeos ou histórias!"
              className="input-criar-post"
              value={novoPost}
              onChange={(e) => setNovoPost(e.target.value)}
            />
          </div>

          {/* Preview da Imagem Capturada */}
          {imagemCapturada && (
            <div className="preview-imagem">
              <img src={imagemCapturada} alt="Preview" />
              <button 
                className="botao-remover-imagem"
                onClick={() => setImagemCapturada(null)}
              >
                ✕
              </button>
            </div>
          )}

          <div className="info-placeholder">
            <span className="texto-placeholder">
              Aqui você pode compartilhar fotos, vídeos ou pedir ajuda sobre seu pet!
            </span>
          </div>

          <div className="acoes-criar-post">
            <button 
              type="button" 
              className="botao-midia"
              onClick={iniciarCamera}
            >
              📷 Câmera
            </button>
            <button 
              type="button" 
              className="botao-midia"
              onClick={selecionarArquivo}
            >
              📁 Galeria
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <button 
              type="button" 
              className="botao-publicar" 
              onClick={handlePublicar}
            >
              Publicar
            </button>
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="lista-postagens">
          {posts.map((post) => (
            <div key={post.id} className="card-postagem">
              
              <div className="cabecalho-post">
                <img 
                  src={post.usuario.avatar} 
                  alt={post.usuario.nome}
                  className="avatar-post"
                  onError={handleImageError}
                  onClick={() => handleAbrirPerfil(post.usuario.id)}
                />
                <div className="info-post">
                  <span 
                    className="nome-usuario"
                    onClick={() => handleAbrirPerfil(post.usuario.id)}
                  >
                    {post.usuario.nome}
                  </span>
                  <div className="metadados-post">
                    <span className="tempo-post">{formatarData(post.data)}</span>
                    {post.localizacao && (
                      <>
                        <span className="separador">•</span>
                        <span className="localizacao-post">{post.localizacao}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="conteudo-post">
                <p>{post.conteudo.texto}</p>
                {renderizarMidia(post)}
                
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="hashtags">
                    {post.hashtags.map((hashtag, index) => (
                      <span key={index} className="hashtag">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="engajamento-post">
                <div className="estatisticas">
                  <span>❤️ {post.engajamento.curtidas}</span>
                  <span>💬 {post.engajamento.comentarios}</span>
                  <span>↗️ {post.engajamento.compartilhamentos}</span>
                </div>
              </div>

              <div className="acoes-post">
                <button type="button" className="botao-acao">🤍 Curtir</button>
                <button type="button" className="botao-acao">💬 Comentar</button>
                <button type="button" className="botao-acao">↗️ Compartilhar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Seção: Empresas em Destaque */}
        <div className="secao-empresas">
          <h3>🏢 Empresas em Destaque</h3>
          <div className="lista-empresas">
            {empresas.map((empresa) => (
              <div 
                key={empresa.id} 
                className="card-empresa"
                onClick={() => handleAbrirEmpresa(empresa.id)}
              >
                <div className="empresa-imagem">
                  <img 
                    src={empresa.imagem} 
                    alt={empresa.nome}
                    onError={handleImageError}
                  />
                </div>
                <div className="empresa-info">
                  <h4>{empresa.nome}</h4>
                  <p className="empresa-descricao">{empresa.descricao}</p>
                  <div className="empresa-promocao">
                    <span className="tag-promocao">🎁 {empresa.promocao}</span>
                  </div>
                  <div className="empresa-detalhes">
                    <span className="empresa-localizacao">📍 {empresa.localizacao}</span>
                    <span className="empresa-avaliacao">⭐ {empresa.avaliacao}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção: Serviços que Você Pode se Interessar */}
        <div className="secao-servicos">
          <h3>💼 Serviços que Você Pode se Interessar</h3>
          <div className="lista-servicos">
            {servicos.map((servico) => (
              <div 
                key={servico.id} 
                className="card-servico"
                onClick={() => handleInteresseServico(servico.id)}
              >
                <div className="servico-imagem">
                  <img 
                    src={servico.imagem} 
                    alt={servico.nome}
                    onError={handleImageError}
                  />
                </div>
                <div className="servico-info">
                  <h4>{servico.nome}</h4>
                  <p className="servico-especialidade">{servico.especialidade}</p>
                  <p className="servico-descricao">{servico.descricao}</p>
                  <div className="servico-detalhes">
                    <span className="servico-localizacao">📍 {servico.localizacao}</span>
                    <span className="servico-avaliacao">⭐ {servico.avaliacao}</span>
                  </div>
                </div>
                <button className="botao-interesse">
                  Tenho Interesse
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sidebar Direito */}
      <aside className="sidebar-direito">
        
        {/* Sugestões de Pessoas */}
        <div className="card-sugestoes">
          <h3>👤 Sugestões para seguir</h3>
          <div className="lista-sugestoes">
            {sugestoesPessoas.map((pessoa) => (
              <div 
                key={pessoa.id} 
                className="item-sugestao"
                onClick={() => handleAbrirPerfil(pessoa.id)}
              >
                <div className="avatar-sugestao">
                  <img 
                    src={pessoa.avatar} 
                    alt={pessoa.nome}
                    onError={handleImageError}
                  />
                  {pessoa.online && <span className="status-online" title="Online"></span>}
                </div>
                <div className="info-sugestao">
                  <span>{pessoa.nome}</span>
                  <small>{pessoa.mutualFriends} amigos em comum</small>
                </div>
                <button 
                  className="botao-seguir"
                  onClick={(e) => handleSeguir(pessoa.id, e)}
                >
                  Seguir
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Grupos Sugeridos */}
        <div className="card-grupos">
          <h3>👥 Grupos Sugeridos</h3>
          <div className="lista-grupos">
            {grupos.map((grupo) => (
              <div 
                key={grupo.id} 
                className="item-grupo"
                onClick={() => handleAbrirGrupo(grupo.id)}
              >
                <div className="icone-grupo">{grupo.icone}</div>
                <div className="info-grupo">
                  <span className="nome-grupo">{grupo.nome}</span>
                  <small>{grupo.descricao}</small>
                </div>
                <span className="contador-grupo">{grupo.membros}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos Próximos */}
        <div className="card-eventos">
          <h3>📅 Eventos Próximos</h3>
          <div className="lista-eventos">
            {eventos.map((evento) => (
              <div 
                key={evento.id} 
                className="item-evento"
                onClick={() => handleAbrirEvento(evento.id)}
              >
                <span className="data-evento">{evento.data}</span>
                <span className="titulo-evento">{evento.titulo}</span>
              </div>
            ))}
          </div>
        </div>

      </aside>

    </main>
  );
}