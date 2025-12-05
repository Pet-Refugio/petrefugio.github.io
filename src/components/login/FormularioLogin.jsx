// src/components/login/FormularioLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ← IMPORTE O useAuth
import '../../styles/login/estiloForm.css';

const FormLogin = () => {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth(); // ← USE O HOOK
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    if (!dados.email || !dados.senha) {
      setErro('Preencha todos os campos');
      setCarregando(false);
      return;
    }

    try {
      const resultado = await login(dados.email, dados.senha);
      
      if (resultado.success) {
        console.log('Login realizado com sucesso!');
        navigate('/principal'); // ← REDIRECIONE PARA /principal
      }
    } catch (error) {
      setErro(error.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    if (erro) setErro('');
  };

  // Preencher automaticamente para teste
  const preencherTeste = (email, senha) => {
    setDados({ email, senha });
  };

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <h1>Entre na sua conta</h1>
      {erro && <div className="erro-mensagem">{erro}</div>}

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
      <Link to='/'>
      <button className='botaovoltar'>
        Voltar
      </button>
      </Link>
      <button 
        type="submit" 
        className="botao-principal" 
        disabled={carregando}
        style={{ marginTop: '20px' }}
      >
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
      
      <div className="link-cadastro">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </form>
  );
};


export default FormLogin;
