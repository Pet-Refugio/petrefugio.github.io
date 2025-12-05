import { useAuth } from '../../context/AuthContext';
import Header from './header';
import SidebarAmigos from './SidebarAmigos';
import AreaConteudo from './AreaConteudo';
import '../../styles/principal/header.css';
import '../../styles/principal/SidebarAmigos.css';
import '../../styles/principal/SidebarServicos.css';
import '../../styles/principal/AreaConteudo.css';

const PagPrincipal = () => {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div className="pagina-carregando">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="pagina-principal">
      <Header usuario={usuario} />
      
      <div className="conteudo-principal">
        <SidebarAmigos usuario={usuario} />
        <AreaConteudo usuario={usuario} />
      </div>
    </div>
  );
};

export default PagPrincipal;
