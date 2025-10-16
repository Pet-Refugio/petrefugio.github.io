import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import PaginaCadastro from './components/cadastro/PaginaCadastro.jsx';
import PaginaLogin from './components/login/paginaLogin.jsx';
import Principal from './components/principal/PagPrincipal.jsx';
import PaginaPerfil from './components/perfil/PaginaPerfil.jsx';
import AdicionarPet from './components/perfil/AdicionarPet.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
  },
  {
    path:"/cadastro",
    element:<PaginaCadastro/>,
  },
  {
    path:"/login",
    element:<PaginaLogin/>,
  },
  {
    path:"/principal",
    element:<Principal/>,
  },
  {
    path:"/perfil",
    element:<PaginaPerfil/>,
  },
  {
  path:"/perfil/adicionar-pet",
  element: <AdicionarPet />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
