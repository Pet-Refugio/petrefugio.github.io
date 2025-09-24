import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [carregando, setCarregando] = useState(true);

  // Verificar token ao carregar a aplicação
  useEffect(() => {
    const verificarToken = async () => {
      const tokenSalvo = localStorage.getItem('token');
      
      if (tokenSalvo) {
        try {
          const response = await authService.verificarUsuario(tokenSalvo);
          setUsuario(response.data);
          setToken(tokenSalvo);
        } catch (error) {
          console.error('Token inválido:', error);
          logout();
        }
      }
      setCarregando(false);
    };

    verificarToken();
  }, []);

  // Login
  const login = async (credenciais) => {
    try {
      const response = await authService.login(credenciais);
      
      if (response.success) {
        const { usuario, token } = response.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        setUsuario(usuario);
        
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer login' 
      };
    }
  };

  // Cadastro
  const cadastrar = async (dadosUsuario) => {
    try {
      const response = await authService.cadastrar(dadosUsuario);
      
      if (response.success) {
        return { 
          success: true, 
          message: 'Cadastro realizado com sucesso! Faça login.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao cadastrar' 
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  const value = {
    usuario,
    token,
    carregando,
    login,
    cadastrar,
    logout,
    estaLogado: !!token && !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};