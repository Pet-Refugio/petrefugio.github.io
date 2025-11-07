// src/components/login/FormularioLogin.jsx
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 👈 NOVO: Importa o contexto
import { logar } from '../../services/api';         // 👈 NOVO: Importa a função (ajustada para ser chamada diretamente)

// Importa o CSS original (caminho ajustado para a profundidade do componente)
import '../../styles/login/estiloForm.css';

const FormLogin = () => {
  const { login } = useAuth(); // 👈 NOVO: Pega a função de login do contexto
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Chama a função logar (que está no api.js)
      const resultado = await logar(dados);
      
      if (resultado.success) {
        // Usa a função login do AuthContext para salvar estado e localStorage
        login(resultado.data.usuario, resultado.data.token);
        
        console.log('Login realizado com sucesso!', resultado.data.usuario);
        
        // Redireciona para a página principal (rota protegida)
        navigate('/principal', { replace: true });
      } else {
        setErro(resultado.message);
      }
    } catch (error) {
      setErro(error.message || 'Erro ao conectar com o servidor. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <h1>Entre na sua conta</h1>
      
      {erro && (
        <div className="erro-mensagem">
          {erro}
        </div>
      )}
      
      <div className="grupo-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={dados.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
        />
      </div>
      
      <div className="grupo-form">
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={dados.senha}
          onChange={handleChange}
          placeholder="Digite sua senha"
          required
        />
        <div className="esqueci-senha">
          <Link to="/recuperar-senha">Esqueci minha senha</Link>
        </div>
      </div>
      
      <div className="btns">
        <Link to="/">
          <button type="button" className="botao-voltar">
            Voltar
          </button>
        </Link>
        <button 
          type="submit" 
          className="botao-principal"
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
      
      <div className="link-cadastro">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </form>
  );
};

export default FormLogin;