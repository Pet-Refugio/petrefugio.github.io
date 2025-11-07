import FormularioLogin from './FormularioLogin';
import { Link } from 'react-router-dom';

export default function PaginaLogin() {
  return (
    <div className="pagina-autenticacao">
      <div className="conteudo-autenticacao">
        <FormularioLogin />
        <p className="link-alternativo">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}