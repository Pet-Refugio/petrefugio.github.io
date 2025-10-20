import HeaderPerfil from './HeaderPerfil';
import InfoUsuario from './InfoUsuario';
import ListaPets from './ListaPets';
import '../../styles/perfil/PaginaPerfil.css';


const PaginaPerfil = () => {
  return (
    <div className="pagina-perfil">
      <HeaderPerfil />
      
      <main className="conteudo-perfil">
        <div className="container-perfil">
          <div className="lado-esquerdo">
            <InfoUsuario />
          </div>
          <div className="lado-direito">
            <ListaPets />
          </div>

        </div>
      </main>
    </div>
  );
};

export default PaginaPerfil;