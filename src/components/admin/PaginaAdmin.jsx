import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PaginaAdmin() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>👨‍💻 Painel de Administração</h1>
      <p>Bem-vindo(a), **{usuario?.nome || 'Admin'}**!</p>
      <p>Seu tipo de conta: **{usuario?.tipo_conta || 'admin'}**.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
        <h2>Ferramentas de Administrador</h2>
        <ul>
          <li>Gerenciar Usuários (Bloquear, Alterar tipo de conta)</li>
          <li>Revisar Conteúdo (Posts Denunciados)</li>
          <li>Configurações Globais do Site</li>
        </ul>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#F26B38', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Sair do Admin
      </button>
    </div>
  );
}