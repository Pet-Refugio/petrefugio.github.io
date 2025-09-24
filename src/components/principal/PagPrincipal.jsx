import React from 'react';
import HeaderPrincipal from './header.jsx';
import SidebarAmigos from './SidebarAmigos.jsx';
import AreaConteudo from './AreaConteudo.jsx';

export default function PaginaPrincipal(){
  return (
    <div className="pagina-principal">
      <HeaderPrincipal />
      <SidebarAmigos />
      <AreaConteudo />
    </div>
  );
};