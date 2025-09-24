import '../../styles/principal/SidebarAmigos.css';

export default function SidebarAmigos() {
  const amigosOnline = [
    { nome: 'Ana Silva', online: true, avatar: '/assets/avatars/ana.jpg' },
    { nome: 'Carlos Santos', online: true, avatar: '/assets/avatars/carlos.jpg' },
    { nome: 'Maria Oliveira', online: true, avatar: '/assets/avatars/maria.jpg' }
  ];

  const todosAmigos = [
    { nome: 'João Pereira', online: false, avatar: '/assets/avatars/joao.jpg' },
    { nome: 'Juliana Costa', online: false, avatar: '/assets/avatars/juliana.jpg' },
    { nome: 'Pedro Alves', online: false, avatar: '/assets/avatars/pedro.jpg' }
  ];

  return (
    <aside className="sidebar-amigos">
      <div className="cabecalho-chat">
        <h3>Chat</h3>
        <button className="botao-novo-chat">💬</button>
      </div>

      {/* Amigos Online */}
      <div className="secao-amigos">
        <h4>Online Agora</h4>
        <div className="lista-amigos">
          {amigosOnline.map((amigo, index) => (
            <div key={index} className="item-amigo online">
              <div className="avatar-amigo">
                <img src={amigo.avatar} alt={amigo.nome} />
                <span className="status-online"></span>
              </div>
              <span className="nome-amigo">{amigo.nome}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="secao-amigos">
        <h4>Todos os Amigos</h4>
        <div className="lista-amigos">
          {todosAmigos.map((amigo, index) => (
            <div key={index} className="item-amigo">
              <div className="avatar-amigo">
                <img src={amigo.avatar} alt={amigo.nome} />
              </div>
              <span className="nome-amigo">{amigo.nome}</span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}