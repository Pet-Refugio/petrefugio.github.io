// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

// Usuários pré-cadastrados COMPLETOS e CORRETOS
const usuariosPreCadastrados = {
  "wenderviana@gmail.com": {
    senha: "12345678",
    nome: "Wender Viana",
    username: "wender_viana",
    bio: "Amo animais e tenho 3 gatos resgatados 🐱 | Fotógrafo de pets",
    tipo: "usuario",
    seguidores: ["danilosilva@gmail.com", "igormiada@gmail.com"],
    seguindo: ["danilosilva@gmail.com"],
    pets: [
      {
        id: 1,
        nome: "Luna",
        tipo: "Gato",
        raca: "SRD",
        idade: "2 anos",
        foto: "🐱",
        descricao: "Gatinha preta muito carinhosa"
      },
      {
        id: 2,
        nome: "Bolinha",
        tipo: "Cachorro",
        raca: "Poodle",
        idade: "5 anos",
        foto: "🐩",
        descricao: "Poodle branco cheio de energia"
      }
    ],
    posts: [
      {
        id: 1,
        conteudo: "A Luna hoje descobriu que as plantas não são brinquedos! 🌿😸 #Gatos #PetRefugio",
        data: "2024-01-15T10:30:00Z",
        curtidas: ["danilosilva@gmail.com"],
        comentarios: [
          {
            usuario: "danilosilva@gmail.com",
            texto: "Haha, a Thor também adora uma plantinha!",
            data: "2024-01-15T11:00:00Z"
          }
        ]
      },
      {
        id: 2,
        conteudo: "Passeio no parque com a Bolinha hoje! Ela adora correr atrás das borboletas 🦋🐕",
        data: "2024-01-14T16:45:00Z",
        curtidas: ["igormiada@gmail.com"],
        comentarios: []
      }
    ]
  },
  "danilosilva@gmail.com": {
    senha: "12345678",
    nome: "Danilo Silva",
    username: "danilo_silva",
    bio: "Veterinário especializado em animais silvestres 🦜 | Cuido do seu pet com amor",
    tipo: "veterinario",
    seguidores: ["wenderviana@gmail.com"],
    seguindo: ["wenderviana@gmail.com", "igormiada@gmail.com"],
    pets: [
      {
        id: 1,
        nome: "Thor",
        tipo: "Cachorro",
        raca: "Labrador",
        idade: "4 anos",
        foto: "🐶",
        descricao: "Labrador dourado muito brincalhão"
      }
    ],
    posts: [
      {
        id: 1,
        conteudo: "Dica do dia: A hidratação é fundamental para a saúde do seu pet! 💧🐾 #DicasVeterinárias",
        data: "2024-01-15T08:15:00Z",
        curtidas: ["wenderviana@gmail.com", "igormiada@gmail.com"],
        comentarios: [
          {
            usuario: "wenderviana@gmail.com",
            texto: "Ótima dica! Quantos ml por kg?",
            data: "2024-01-15T09:20:00Z"
          }
        ]
      }
    ]
  },
  "igormiada@gmail.com": {
    senha: "12345678",
    nome: "Igor Miada",
    username: "igor_miada",
    bio: "Fotógrafo de animais e voluntário em ONGs 📸 | Ajudo pets a encontrarem um lar",
    tipo: "usuario",
    seguidores: ["danilosilva@gmail.com"],
    seguindo: ["wenderviana@gmail.com"],
    pets: [
      {
        id: 1,
        nome: "Mel",
        tipo: "Cachorro",
        raca: "Vira-lata",
        idade: "3 anos",
        foto: "🐕",
        descricao: "Vira-lata caramelo muito esperta"
      }
    ],
    posts: [
      {
        id: 1,
        conteudo: "Session de fotos com a Mel hoje! Ela é uma modelo natural 📸❤️ #FotografiaPet",
        data: "2024-01-14T14:20:00Z",
        curtidas: ["wenderviana@gmail.com"],
        comentarios: []
      }
    ]
  },
  "admin@admin": {
    senha: "senhaadmin123",
    nome: "Administrador PetRefugio",
    username: "admin_petrefugio",
    bio: "Administrador do sistema | Aqui para ajudar todos os pets 🐾",
    tipo: "admin",
    seguidores: [],
    seguindo: ["wenderviana@gmail.com", "danilosilva@gmail.com", "igormiada@gmail.com"],
    pets: [],
    posts: [
      {
        id: 1,
        conteudo: "Bem-vindos ao PetRefugio! 🎉 A rede social para quem ama animais. #NovoApp #PetRefugio",
        data: "2024-01-13T09:00:00Z",
        curtidas: ["wenderviana@gmail.com", "danilosilva@gmail.com", "igormiada@gmail.com"],
        comentarios: []
      }
    ]
  }
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [posts, setPosts] = useState([]);
  const [usuarios, setUsuarios] = useState({});

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioPetRefugio');
    const postsSalvos = localStorage.getItem('postsPetRefugio');
    const usuariosSalvos = localStorage.getItem('usuariosPetRefugio');

    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }

    if (postsSalvos) {
      try {
        setPosts(JSON.parse(postsSalvos));
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
      }
    }

    if (usuariosSalvos) {
      try {
        setUsuarios(JSON.parse(usuariosSalvos));
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        // Se der erro, usar os pré-cadastrados
        setUsuarios(usuariosPreCadastrados);
        localStorage.setItem('usuariosPetRefugio', JSON.stringify(usuariosPreCadastrados));
      }
    } else {
      // Salvar usuários pré-cadastrados no localStorage
      setUsuarios(usuariosPreCadastrados);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(usuariosPreCadastrados));
    }

    setCarregando(false);
  }, []);

  // Login - VERSÃO CORRIGIDA E SEGURA
  const login = (email, senha) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarioEncontrado = usuarios[email];
        
        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
          // GARANTIR QUE TODAS AS PROPRIEDADES EXISTEM
          const usuarioLogado = {
            email,
            nome: usuarioEncontrado.nome || 'Usuário',
            username: usuarioEncontrado.username || 'usuario',
            bio: usuarioEncontrado.bio || '',
            tipo: usuarioEncontrado.tipo || 'usuario',
            seguidores: Array.isArray(usuarioEncontrado.seguidores) ? usuarioEncontrado.seguidores : [],
            seguindo: Array.isArray(usuarioEncontrado.seguindo) ? usuarioEncontrado.seguindo : [],
            pets: Array.isArray(usuarioEncontrado.pets) ? usuarioEncontrado.pets : [],
            posts: Array.isArray(usuarioEncontrado.posts) ? usuarioEncontrado.posts : []
          };
          
          setUsuario(usuarioLogado);
          localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioLogado));
          resolve({ success: true, usuario: usuarioLogado });
        } else {
          reject({ success: false, message: 'Email ou senha incorretos' });
        }
      }, 500);
    });
  };

  // Logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioPetRefugio');
    window.location.href = '/login';
  };

  // Criar post - VERSÃO CORRIGIDA E SEGURA
  const criarPost = (conteudo, imagem = null) => {
    if (!usuario) return null;

    const novoPost = {
      id: Date.now(),
      usuarioEmail: usuario.email,
      usuarioNome: usuario.nome,
      usuarioUsername: usuario.username,
      conteudo,
      imagem,
      data: new Date().toISOString(),
      curtidas: [],
      comentarios: []
    };

    try {
      // ATUALIZAR USUÁRIO NO STATE
      const novosUsuarios = { ...usuarios };
      
      // GARANTIR QUE O USUÁRIO TEM UM ARRAY DE POSTS
      if (!novosUsuarios[usuario.email]) {
        novosUsuarios[usuario.email] = {};
      }
      if (!Array.isArray(novosUsuarios[usuario.email].posts)) {
        novosUsuarios[usuario.email].posts = [];
      }
      
      novosUsuarios[usuario.email].posts.unshift(novoPost);
      
      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));

      // ATUALIZAR POSTS GLOBAIS
      const novosPosts = [novoPost, ...posts];
      setPosts(novosPosts);
      localStorage.setItem('postsPetRefugio', JSON.stringify(novosPosts));

      // ATUALIZAR USUÁRIO ATUAL
      const usuarioAtualizado = {
        ...usuario,
        posts: novosUsuarios[usuario.email].posts
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
      
      return novoPost;
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return null;
    }
  };

  // Curtir post - VERSÃO SEGURA
  const curtirPost = (postId) => {
    if (!usuario || !posts) return;

    try {
      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex === -1) return;

      const novosPosts = [...posts];
      const curtidas = Array.isArray(novosPosts[postIndex].curtidas) ? novosPosts[postIndex].curtidas : [];
      
      if (curtidas.includes(usuario.email)) {
        // Remover curtida
        novosPosts[postIndex].curtidas = curtidas.filter(email => email !== usuario.email);
      } else {
        // Adicionar curtida
        novosPosts[postIndex].curtidas = [...curtidas, usuario.email];
      }

      setPosts(novosPosts);
      localStorage.setItem('postsPetRefugio', JSON.stringify(novosPosts));

      // Atualizar também nos usuários
      const novosUsuarios = { ...usuarios };
      Object.keys(novosUsuarios).forEach(email => {
        if (Array.isArray(novosUsuarios[email].posts)) {
          const userPostIndex = novosUsuarios[email].posts.findIndex(post => post.id === postId);
          if (userPostIndex !== -1) {
            novosUsuarios[email].posts[userPostIndex].curtidas = novosPosts[postIndex].curtidas;
          }
        }
      });
      
      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));
    } catch (error) {
      console.error('Erro ao curtir post:', error);
    }
  };

  // Adicionar comentário - VERSÃO SEGURA
  const adicionarComentario = (postId, comentario) => {
    if (!usuario || !posts) return;

    try {
      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex === -1) return;

      const novosPosts = [...posts];
      const comentarios = Array.isArray(novosPosts[postIndex].comentarios) ? novosPosts[postIndex].comentarios : [];
      
      novosPosts[postIndex].comentarios = [...comentarios, {
        id: Date.now(),
        usuarioEmail: usuario.email,
        usuarioNome: usuario.nome,
        texto: comentario,
        data: new Date().toISOString()
      }];

      setPosts(novosPosts);
      localStorage.setItem('postsPetRefugio', JSON.stringify(novosPosts));

      // Atualizar também nos usuários
      const novosUsuarios = { ...usuarios };
      Object.keys(novosUsuarios).forEach(email => {
        if (Array.isArray(novosUsuarios[email].posts)) {
          const userPostIndex = novosUsuarios[email].posts.findIndex(post => post.id === postId);
          if (userPostIndex !== -1) {
            novosUsuarios[email].posts[userPostIndex].comentarios = novosPosts[postIndex].comentarios;
          }
        }
      });
      
      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  // Seguir usuário - VERSÃO SEGURA
  const seguirUsuario = (usuarioSeguidoEmail) => {
    if (!usuarios[usuarioSeguidoEmail] || usuarioSeguidoEmail === usuario.email) return;

    try {
      const novosUsuarios = { ...usuarios };
      
      // Garantir arrays
      if (!Array.isArray(novosUsuarios[usuarioSeguidoEmail].seguidores)) {
        novosUsuarios[usuarioSeguidoEmail].seguidores = [];
      }
      if (!Array.isArray(novosUsuarios[usuario.email].seguindo)) {
        novosUsuarios[usuario.email].seguindo = [];
      }
      
      // Adicionar aos seguidores do usuário seguido
      if (!novosUsuarios[usuarioSeguidoEmail].seguidores.includes(usuario.email)) {
        novosUsuarios[usuarioSeguidoEmail].seguidores.push(usuario.email);
      }
      
      // Adicionar aos seguindo do usuário atual
      if (!novosUsuarios[usuario.email].seguindo.includes(usuarioSeguidoEmail)) {
        novosUsuarios[usuario.email].seguindo.push(usuarioSeguidoEmail);
      }

      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));

      // Atualizar usuário logado
      const usuarioAtualizado = {
        ...usuario,
        seguindo: novosUsuarios[usuario.email].seguindo
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
    }
  };

  // Deixar de seguir usuário - VERSÃO SEGURA
  const deixarSeguir = (usuarioSeguidoEmail) => {
    try {
      const novosUsuarios = { ...usuarios };
      
      // Garantir arrays
      if (!Array.isArray(novosUsuarios[usuarioSeguidoEmail].seguidores)) {
        novosUsuarios[usuarioSeguidoEmail].seguidores = [];
      }
      if (!Array.isArray(novosUsuarios[usuario.email].seguindo)) {
        novosUsuarios[usuario.email].seguindo = [];
      }
      
      // Remover dos seguidores do usuário seguido
      novosUsuarios[usuarioSeguidoEmail].seguidores = 
        novosUsuarios[usuarioSeguidoEmail].seguidores.filter(email => email !== usuario.email);
      
      // Remover dos seguindo do usuário atual
      novosUsuarios[usuario.email].seguindo = 
        novosUsuarios[usuario.email].seguindo.filter(email => email !== usuarioSeguidoEmail);

      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));

      // Atualizar usuário logado
      const usuarioAtualizado = {
        ...usuario,
        seguindo: novosUsuarios[usuario.email].seguindo
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
    } catch (error) {
      console.error('Erro ao deixar de seguir:', error);
    }
  };

  // Atualizar perfil - VERSÃO SEGURA
  const atualizarPerfil = (novosDados) => {
    if (!usuario) return;

    try {
      const novosUsuarios = { ...usuarios };
      novosUsuarios[usuario.email] = {
        ...novosUsuarios[usuario.email],
        ...novosDados
      };

      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));

      const usuarioAtualizado = {
        ...usuario,
        ...novosDados
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  // Adicionar pet - VERSÃO SEGURA
  const adicionarPet = (novoPet) => {
    if (!usuario) return;

    try {
      const petComId = {
        ...novoPet,
        id: Date.now()
      };

      const novosUsuarios = { ...usuarios };
      
      // Garantir array de pets
      if (!Array.isArray(novosUsuarios[usuario.email].pets)) {
        novosUsuarios[usuario.email].pets = [];
      }
      
      novosUsuarios[usuario.email].pets.push(petComId);

      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));

      const usuarioAtualizado = {
        ...usuario,
        pets: novosUsuarios[usuario.email].pets
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
    } catch (error) {
      console.error('Erro ao adicionar pet:', error);
    }
  };

  // Remover pet - VERSÃO SEGURA
  const removerPet = (petId) => {
    if (!usuario) return;

    try {
      const novosUsuarios = { ...usuarios };
      
      // Garantir array de pets
      if (Array.isArray(novosUsuarios[usuario.email].pets)) {
        novosUsuarios[usuario.email].pets = novosUsuarios[usuario.email].pets.filter(pet => pet.id !== petId);
      }

      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));

      const usuarioAtualizado = {
        ...usuario,
        pets: novosUsuarios[usuario.email].pets
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
    } catch (error) {
      console.error('Erro ao remover pet:', error);
    }
  };

  const value = {
    usuario,
    carregando,
    posts,
    usuarios,
    login,
    logout,
    criarPost,
    curtirPost,
    adicionarComentario,
    seguirUsuario,
    deixarSeguir,
    atualizarPerfil,
    adicionarPet,
    removerPet
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};