import HeaderCadastro from '../home/Footer';
import Footer from '../cadastro/HeaderCadastro';
import FormularioLogin from '../login/FormularioLogin';

function PaginaLogin() {
    return(
      <div className="pagina-cadastro">
        <FormularioLogin />
        <HeaderCadastro />
        <Footer />
      </div>
    )
}
export default PaginaLogin;