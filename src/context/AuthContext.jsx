import  { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api.js'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, senha) => {
    try {
      setLoading(true);
      const response = await authService.login(email, senha);
      
      if (response.success && response.token && response.usuario) {
        setUsuario(response.usuario);
        navigate('/principal'); 
        return { success: true, message: 'Login realizado com sucesso!' };
      }
      throw new Error(response.message || 'Falha no login.');
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async (dadosCadastro) => {
    try {
      setLoading(true);
      // 1. CHAMA O CADASTRO NA API
      const cadastroResponse = await authService.cadastrar(dadosCadastro);
      
      if (cadastroResponse.success) {
        console.log("Cadastro bem-sucedido. Tentando login automático...");
        
        // 2. REALIZA O LOGIN AUTOMÁTICO
        const email = dadosCadastro.email;
        const senha = dadosCadastro.senha; 
        
        // Chama a função de login local do contexto
        await login(email, senha); 
        
        return { success: true, message: "Cadastro e login automáticos realizados!" };
      }
      return cadastroResponse;
    } catch (error) {
      console.error("Erro no AuthContext durante o cadastro:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUsuario(null);
    navigate('/login');
  };

  useEffect(() => {
    // Simula a verificação de um token existente ao carregar o app
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Aqui você faria uma chamada para validar o token no backend e buscar os dados do usuário
      // Por enquanto, apenas simula um usuário logado
      setUsuario({ id: 100, nome: 'Usuário Logado', email: 'simulado@pet.com' });
    }
    setLoading(false);
  }, []);

  const value = {
    usuario,
    isAuthenticated: !!usuario,
    loading,
    login,
    cadastrar,
    logout,
    // Outras funções relacionadas ao usuário...
  };

  // Se o usuário estiver em uma rota de autenticação, o RouterProvider vai gerenciar.
  // O AuthProvider só precisa garantir que o contexto é fornecido.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};