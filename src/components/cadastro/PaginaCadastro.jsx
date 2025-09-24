import HeaderCadastro from './HeaderCadastro';
import FormCadastro from './FormularioCadastro';
import Footer from '../home/Footer';
import '../../styles/cadastro/pagina.css';

const PaginaCadastro = () => {
  return (
    <div className="pagina-cadastro">
      <HeaderCadastro />
      
      <main className="conteudo-cadastro">
        <div className="container-cadastro">
          <FormCadastro />
        </div>
      </main>
    </div>
  );
};
export default PaginaCadastro;