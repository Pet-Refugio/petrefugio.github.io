import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login/estiloForm.css';
import { authService } from '../../services/api';

const FormLogin = () => {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const resultado = await authService.login(dados);
      
      if (resultado.success) {
        // Salvar token no localStorage
        localStorage.setItem('token', resultado.data.token);
        localStorage.setItem('usuario', JSON.stringify(resultado.data.usuario));
        
        console.log('Login realizado com sucesso!', resultado.data.usuario);
        navigate('/perfil');
      } else {
        setErro(resultado.message);
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
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