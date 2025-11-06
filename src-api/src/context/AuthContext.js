// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Função de Cadastro
  const cadastrar = async (dadosUsuario) => {
    try {
      const resultado = await authService.cadastrar(dadosUsuario);
      // Retorna o resultado (sucesso ou erro) para o formulário
      return resultado;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Função de Login
  const login = async (credenciais) => {
    try {
      const resultado = await authService.login(credenciais);
      
      if (resultado.success) {
        // Salva dados no estado e no localStorage
        setUsuario(resultado.data.usuario);
        setToken(resultado.data.token);
        localStorage.setItem('token', resultado.data.token);
      }
      return resultado;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Função de Logout
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    usuario,
    token,
    login,
    logout,
    cadastrar,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};