// src/components/login/FormularioLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; // Importa o contexto
import '../../styles/login/estiloForm.css'; //

const FormLogin = () => {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  }); // <-- ERRO ESTAVA AQUI (CITAÇÃO REMOVIDA)
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Pega a função 'login' do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (!dados.email || !dados.senha) {
      setErro('Preencha todos os campos');
      return;
    }

    setCarregando(true);

    try {
      // Chama a função 'login' da API
      const resultado = await login(dados);

      if (resultado.success) {
        console.log('Login realizado com sucesso!');
        navigate('/perfil'); // Redireciona para o perfil
      } else {
        // Mostra o erro vindo do backend (ex: "Email ou senha inválidos")
        setErro(resultado.message);
      }
    } catch (error) {
      // Erro de conexão
      setErro('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    if (erro) setErro(''); // Limpa o erro
  };

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <h1>Entre na sua conta</h1>
      
      {erro && <div className="erro-login">{erro}</div>}

      <div className="grupo-form">
        <label htmlFor="email">Email</label>
        <input
          type="email" id="email" name="email"
          value={dados.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
        />
      </div>
      
      <div className="grupo-form">
        <label htmlFor="senha">Senha</label>
        <input
          type="password" id="senha" name="senha"
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
        <button type="submit" className="botao-principal" disabled={carregando}>
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