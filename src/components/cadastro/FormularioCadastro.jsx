import React, { useState } from 'react';
import { useAuth } from '../../api/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });
    
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    // Validação básica
    if (!dados.email || !dados.senha) {
      setErro('Preencha todos os campos');
      setCarregando(false);
      return;
    }

    try {
      const resultado = await login(dados);
      
      if (resultado.success) {
        console.log('Login realizado com sucesso!');
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
    
    // Limpar erro quando usuário começar a digitar
    if (erro) setErro('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Login</h2>
      
      {erro && (
        <div className="erro-mensagem">
          {erro}
        </div>
      )}

      <div className="campo-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={dados.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo-form">
        <label>Senha:</label>
        <input
          type="password"
          name="senha"
          value={dados.senha}
          onChange={handleChange}
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={carregando}
        className="botao-primario"
      >
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default FormLogin;