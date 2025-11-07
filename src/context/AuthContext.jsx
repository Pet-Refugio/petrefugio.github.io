// src/context/AuthContext.js (COMPLETO E ATUALIZADO)
import  { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  
  // Variável que indica se o usuário é administrador
  const isAdmin = usuario ? usuario.tipo_conta === 'admin' : false;

  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('petrefugio_token');
    const storedUsuario = localStorage.getItem('petrefugio_usuario');

    if (storedToken && storedUsuario) {
      setToken(storedToken);
      try {
        setUsuario(JSON.parse(storedUsuario)); 
      } catch (e) {
        console.error("Erro ao carregar JSON de usuário do localStorage:", e);
        localStorage.removeItem('petrefugio_usuario');
        localStorage.removeItem('petrefugio_token');
      }
    }
    setCarregandoSessao(false);
  }, []);

  // Inicia a sessão
  const login = (userData, userToken) => {
    setUsuario(userData);
    setToken(userToken);
    
    // Persistência
    localStorage.setItem('petrefugio_token', userToken);
    localStorage.setItem('petrefugio_usuario', JSON.stringify(userData));
  };

  // Encerra a sessão
  const logout = () => {
    setUsuario(null);
    setToken(null);
    
    // Limpeza
    localStorage.removeItem('petrefugio_token');
    localStorage.removeItem('petrefugio_usuario');
  };

  const value = {
    usuario,
    token,
    carregandoSessao,
    login,
    logout,
    isAuthenticated: !!token, 
    isAdmin, // 👈 NOVO: Propriedade para verificar Admin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};