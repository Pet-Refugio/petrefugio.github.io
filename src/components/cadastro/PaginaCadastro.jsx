import FormularioCadastro from './FormularioCadastro'; 
import { Link } from 'react-router-dom';

export default function PaginaCadastro() {
  return (
    <div className="pagina-autenticacao">
      <div className="conteudo-autenticacao">
        {/* Aqui você pode incluir seu HeaderCadastro se ele existir */}
        <FormularioCadastro />
        <p className="link-alternativo">
          Já tem uma conta? <Link to="/login">Fazer Login</Link>
        </p>
      </div>
    </div>
  );
}