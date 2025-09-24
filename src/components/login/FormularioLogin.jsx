import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login/estiloForm.css';


const FormLogin = () => {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });
  
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    console.log('Dados do login:', dados);
    navigate('/perfil');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <h1>Entre na sua conta</h1>
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
      <button className="botao-voltar">
        Voltar
      </button>
      </Link>
      <Link>
      <button type="submit" className="botao-principal">
      Entrar
      </button>
      </Link>
      </div>
      
      <div className="link-cadastro">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </form>
  );
};

export default FormLogin;