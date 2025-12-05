import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin/admin.css';

const PainelAdmin = () => {
  const { usuarios, posts, adicionarUsuario, removerUsuario } = useAuth();
  const [novoUsuario, setNovoUsuario] = useState({
    email: '',
    senha: '',
    nome: '',
    username: '',
    bio: '',
    tipo: 'usuario'
  });

  const handleAdicionarUsuario = (e) => {
    e.preventDefault();
    adicionarUsuario(novoUsuario);
    setNovoUsuario({
      email: '',
      senha: '',
      nome: '',
      username: '',
      bio: '',
      tipo: 'usuario'
    });
  };

  return (
    <div className="painel-admin">
      <h1>Painel Administrativo</h1>
      
      <div className="secao-admin">
        <h2>Adicionar Novo Usuário</h2>
        <form onSubmit={handleAdicionarUsuario} className="form-admin">
          <input
            type="email"
            value={novoUsuario.email}
            onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={novoUsuario.senha}
            onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
            placeholder="Senha"
            required
          />
          <input
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
            placeholder="Nome completo"
            required
          />
          <input
            value={novoUsuario.username}
            onChange={(e) => setNovoUsuario({...novoUsuario, username: e.target.value})}
            placeholder="Username"
            required
          />
          <textarea
            value={novoUsuario.bio}
            onChange={(e) => setNovoUsuario({...novoUsuario, bio: e.target.value})}
            placeholder="Bio"
          />
          <select
            value={novoUsuario.tipo}
            onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value})}
          >
            <option value="usuario">Usuário</option>
            <option value="veterinario">Veterinário</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Adicionar Usuário</button>
        </form>
      </div>

      {/* Lista de usuários */}
      <div className="secao-admin">
        <h2>Usuários do Sistema ({Object.keys(usuarios).length})</h2>
        <div className="lista-usuarios">
          {Object.entries(usuarios).map(([email, dados]) => (
            <div key={email} className="card-usuario">
              <div className="usuario-info">
                <h3>{dados.nome}</h3>
                <p>@{dados.username} • {email}</p>
                <p>Tipo: {dados.tipo}</p>
                <p>Seguidores: {dados.seguidores.length} • Seguindo: {dados.seguindo.length}</p>
                <p>Pets: {dados.pets.length}</p>
              </div>
              <button 
                onClick={() => removerUsuario(email)}
                className="botao-remover"
                disabled={email === 'admin@admin'}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="secao-admin">
        <h2>Estatísticas</h2>
        <div className="estatisticas-admin">
          <div className="stat-card">
            <h3>Total de Posts</h3>
            <span>{posts.length}</span>
          </div>
          <div className="stat-card">
            <h3>Total de Usuários</h3>
            <span>{Object.keys(usuarios).length}</span>
          </div>
          <div className="stat-card">
            <h3>Total de Pets</h3>
            <span>{Object.values(usuarios).reduce((total, user) => total + user.pets.length, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainelAdmin;