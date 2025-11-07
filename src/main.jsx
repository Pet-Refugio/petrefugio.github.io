// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Caminho direto
import App from './App.jsx';
import './index.css';

// ⚠️ CORREÇÃO DE CAMINHO: Inclusão de 'components/'
import PaginaCadastro from './components/cadastro/PaginaCadastro.jsx';
import PaginaLogin from './components/login/PaginaLogin.jsx';
import Principal from './components/principal/PagPrincipal.jsx';
import PaginaPerfil from './components/perfil/PaginaPerfil.jsx';
import AdicionarPet from './components/perfil/AdicionarPet.jsx';
import ChatConversa from './components/principal/ChatConversa.jsx';
import ListaAmigos from './components/amigos/ListaAmigos.jsx';
import PerfilPublico from './components/perfil/PerfilPublico.jsx';
import PerfilPet from './components/perfil/PerfilPet.jsx';


// ===============================================
// Componente de Proteção de Rota
// ===============================================
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, carregandoSessao } = useAuth();

  if (carregandoSessao) {
    // Retorna nulo ou um loader simples enquanto verifica o estado
    return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando sessão...</div>;
  }
  
  if (!isAuthenticated) {
    // Se não autenticado, redireciona para a página de Login
    return <Navigate to="/login" replace />; 
  }

  return children;
};

// ===============================================
// Definição das Rotas
// ===============================================
const router = createBrowserRouter([
  // Rotas Abertas (Landing Page)
  {
    path: "/",
    element: <App/>, 
  },
  // Rotas de Autenticação
  {
    path: "/cadastro",
    element: <PaginaCadastro/>,
  },
  {
    path: "/login",
    element: <PaginaLogin/>,
  },
  
  // Rotas Protegidas (Envolvem o ProtectedRoute)
  {
    path: "/principal",
    element: <ProtectedRoute><Principal/></ProtectedRoute>,
  },
  {
    path: "/perfil",
    element: <ProtectedRoute><PaginaPerfil/></ProtectedRoute>,
  },
  {
    path: "/perfil/adicionar-pet",
    element: <ProtectedRoute><AdicionarPet /></ProtectedRoute>,
  },
  {
    path: "/chat/:amigoId",
    element: <ProtectedRoute><ChatConversa /></ProtectedRoute>,
  },
  {
    path: "/principal/amigos",
    element: <ProtectedRoute><ListaAmigos /></ProtectedRoute>
  },
  { 
    path: "/perfil/publico/:usuarioId",
    element: <ProtectedRoute><PerfilPublico /></ProtectedRoute>
  },
  { 
    path: "/pet/:petId",
    element: <ProtectedRoute><PerfilPet /></ProtectedRoute>
  }
]);

// ===============================================
// Renderização Principal com AuthProvider
// ===============================================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Corrigido: Agora sem useNavigate() interno */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);