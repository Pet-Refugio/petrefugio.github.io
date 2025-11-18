import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

// Usuários pré-cadastrados - VERSÃO SIMPLIFICADA E FUNCIONAL
const usuariosPreCadastrados = {
  "wenderviana@gmail.com": {
    senha: "12345678",
    nome: "Wender Viana",
    username: "wender_viana",
    bio: "Amo animais e tenho 3 gatos resgatados 🐱 | Fotógrafo de pets",
    tipo: "usuario",
    online: true,
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
        capa: null, // <-- CAMPO CAPA ADICIONADO
        descricao: "Gatinha preta muito carinhosa"
      }
    ],
    posts: [
      {
        id: 1,
        conteudo: "A Luna hoje descobriu que as plantas não são brinquedos! 🌿😸 #Gatos",
        data: new Date().toISOString(),
        curtidas: ["danilosilva@gmail.com"],
        comentarios: [
          {
            id: 1,
            usuarioEmail: "danilosilva@gmail.com",
            usuarioNome: "Danilo Silva",
            texto: "Haha, a Thor também adora uma plantinha!",
            data: new Date().toISOString()
          }
        ]
      }
    ]
  },
  "danilosilva@gmail.com": {
    senha: "12345678",
    nome: "Danilo Silva",
    username: "danilo_silva",
    bio: "Veterinário especializado em animais silvestres 🦜",
    tipo: "veterinario",
    online: true,
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
        capa: null, // <-- CAMPO CAPA ADICIONADO
        descricao: "Labrador dourado muito brincalhão"
      }
    ],
    posts: [
      {
        id: 1,
        conteudo: "Dica do dia: A hidratação é fundamental para a saúde do seu pet! 💧🐾",
        data: new Date().toISOString(),
        curtidas: ["wenderviana@gmail.com", "igormiada@gmail.com"],
        comentarios: []
      }
    ]
  },
  "igormiada@gmail.com": {
    senha: "12345678",
    nome: "Igor Miada",
    username: "igor_miada",
    bio: "Fotógrafo de animais e voluntário em ONGs 📸",
    tipo: "usuario",
    online: false,
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
        capa: null, // <-- CAMPO CAPA ADICIONADO
        descricao: "Vira-lata caramelo muito esperta"
      }
    ],
    posts: [
      {
        id: 1,
        conteudo: "Sessão de fotos com a Mel hoje! Ela é uma modelo natural 📸❤️",
        data: new Date().toISOString(),
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
    online: true,
    seguidores: [],
    seguindo: ["wenderviana@gmail.com", "danilosilva@gmail.com", "igormiada@gmail.com"],
    pets: [],
    posts: [
      {
        id: 1,
        conteudo: "Bem-vindos ao PetRefugio! 🎉 A rede social para quem ama animais.",
        data: new Date().toISOString(),
        curtidas: ["wenderviana@gmail.com", "danilosilva@gmail.com", "igormiada@gmail.com"],
        comentarios: []
      }
    ]
  }
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [usuarios, setUsuarios] = useState({});

  // Carregar dados do localStorage ao inicializar - VERSÃO CORRIGIDA
  useEffect(() => {
    console.log('🔍 Carregando dados do localStorage...');
    
    const usuarioSalvo = localStorage.getItem('usuarioPetRefugio');
    const usuariosSalvos = localStorage.getItem('usuariosPetRefugio');

    let usuariosCarregados = usuariosPreCadastrados;

    if (usuariosSalvos) {
      try {
        usuariosCarregados = JSON.parse(usuariosSalvos);
        console.log('✅ Usuários carregados do localStorage:', Object.keys(usuariosCarregados));
      } catch (error) {
        console.error('❌ Erro ao carregar usuários:', error);
        usuariosCarregados = usuariosPreCadastrados;
      }
    }

    setUsuarios(usuariosCarregados);

    if (usuarioSalvo) {
      try {
        const usuarioData = JSON.parse(usuarioSalvo);
        // Garantir que o usuário tem os dados mais recentes dos usuários
        if (usuariosCarregados[usuarioData.email]) {
          const usuarioAtualizado = {
            ...usuariosCarregados[usuarioData.email],
            email: usuarioData.email
          };
          setUsuario(usuarioAtualizado);
          console.log('✅ Usuário logado carregado:', usuarioAtualizado.nome);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar usuário:', error);
      }
    }

    setCarregando(false);
  }, []);

  // Função auxiliar para salvar dados - CORRIGIDA
  const salvarDados = (novosUsuarios, usuarioAtualizado = null) => {
    try {
      console.log('💾 Salvando dados...', { 
        usuarios: Object.keys(novosUsuarios).length,
        usuario: usuarioAtualizado?.nome 
      });
      
      setUsuarios(novosUsuarios);
      localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));
      
      if (usuarioAtualizado) {
        setUsuario(usuarioAtualizado);
        localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar dados:', error);
      return false;
    }
  };

  // Login - VERSÃO CORRIGIDA
  const login = (email, senha) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarioEncontrado = usuarios[email];
        
        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
          const usuarioLogado = {
            email,
            ...usuarioEncontrado
          };
          
          // Atualizar status online
          const novosUsuarios = {
            ...usuarios,
            [email]: {
              ...usuarioEncontrado,
              online: true
            }
          };
          
          if (salvarDados(novosUsuarios, usuarioLogado)) {
            console.log('✅ Login realizado com sucesso:', usuarioLogado.nome);
            resolve({ success: true, usuario: usuarioLogado });
          } else {
            reject({ success: false, message: 'Erro ao salvar dados' });
          }
        } else {
          console.log('❌ Login falhou:', email);
          reject({ success: false, message: 'Email ou senha incorretos' });
        }
      }, 500);
    });
  };

  // Logout - VERSÃO CORRIGIDA
  const logout = () => {
    if (usuario) {
      // Atualizar status offline
      const novosUsuarios = {
        ...usuarios,
        [usuario.email]: {
          ...usuarios[usuario.email],
          online: false
        }
      };
      salvarDados(novosUsuarios);
    }

    setUsuario(null);
    localStorage.removeItem('usuarioPetRefugio');
    console.log('🚪 Usuário deslogado');
    window.location.href = '/login';
  };

  // Atualizar perfil - VERSÃO CORRIGIDA E SIMPLIFICADA
  const atualizarPerfil = (novosDados) => {
    if (!usuario) {
      console.error('❌ Nenhum usuário logado para atualizar');
      return false;
    }

    try {
      console.log('📝 Atualizando perfil:', novosDados);
      
      const novosUsuarios = {
        ...usuarios,
        [usuario.email]: {
          ...usuarios[usuario.email],
          ...novosDados
        }
      };

      const usuarioAtualizado = {
        ...usuario,
        ...novosDados
      };

      return salvarDados(novosUsuarios, usuarioAtualizado);
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      return false;
    }
  };

  // Adicionar foto - VERSÃO CORRIGIDA (Esta função é para o Perfil do USUÁRIO)
  const adicionarFoto = async (tipo, base64) => {
    if (!usuario) return false;

    try {
      console.log('📸 Adicionando foto:', tipo);
      
      // Comprimir imagem se for muito grande
      let imagemParaSalvar = base64;
      if (base64.length > 100000) { // ~100KB
        const img = new Image();
        img.src = base64;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = (img.height * 400) / img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imagemParaSalvar = canvas.toDataURL('image/jpeg', 0.8);
      }

      const dadosFoto = tipo === 'perfil' 
        ? { fotoPerfil: imagemParaSalvar }
        : { fotoCapa: imagemParaSalvar };

      return atualizarPerfil(dadosFoto);
    } catch (error) {
      console.error('❌ Erro ao adicionar foto:', error);
      return false;
    }
  };

  // Adicionar pet - VERSÃO ATUALIZADA PARA INCLUIR A CAPA
  const adicionarPet = (novoPet) => {
    if (!usuario) {
      console.error('❌ Nenhum usuário logado para adicionar pet');
      return false;
    }

    try {
      console.log('🐾 Adicionando pet:', novoPet.nome);
      
      const petComId = {
        id: Date.now(),
        ...novoPet,
        // Garantir que tem os campos essenciais, incluindo a capa
        foto: novoPet.foto || '🐾',
        capa: novoPet.capa || null, // <-- INCLUI A CAPA AQUI
        descricao: novoPet.descricao || ''
      };

      const petsAtuais = Array.isArray(usuarios[usuario.email]?.pets) 
        ? usuarios[usuario.email].pets 
        : [];

      const novosUsuarios = {
        ...usuarios,
        [usuario.email]: {
          ...usuarios[usuario.email],
          pets: [...petsAtuais, petComId]
        }
      };

      const usuarioAtualizado = {
        ...usuario,
        pets: [...petsAtuais, petComId]
      };

      const sucesso = salvarDados(novosUsuarios, usuarioAtualizado);
      
      if (sucesso) {
        console.log('✅ Pet adicionado com sucesso:', petComId.nome);
      } else {
        console.error('❌ Falha ao adicionar pet');
      }
      
      return sucesso;
    } catch (error) {
      console.error('❌ Erro ao adicionar pet:', error);
      return false;
    }
  };

  // Criar post - VERSÃO CORRIGIDA
  const criarPost = async (conteudo, imagem = null) => {
    if (!usuario) {
      console.error('❌ Nenhum usuário logado para criar post');
      return null;
    }

    try {
      console.log('📝 Criando post:', conteudo.substring(0, 50) + '...');
      
      const novoPost = {
        id: Date.now(),
        usuarioEmail: usuario.email,
        usuarioNome: usuario.nome,
        usuarioUsername: usuario.username,
        usuarioFoto: usuario.fotoPerfil,
        conteudo: conteudo.trim(),
        imagem: imagem,
        data: new Date().toISOString(),
        curtidas: [],
        comentarios: []
      };

      const postsAtuais = Array.isArray(usuarios[usuario.email]?.posts) 
        ? usuarios[usuario.email].posts 
        : [];

      const novosUsuarios = {
        ...usuarios,
        [usuario.email]: {
          ...usuarios[usuario.email],
          posts: [novoPost, ...postsAtuais]
        }
      };

      const usuarioAtualizado = {
        ...usuario,
        posts: [novoPost, ...postsAtuais]
      };

      if (salvarDados(novosUsuarios, usuarioAtualizado)) {
        console.log('✅ Post criado com sucesso');
        return novoPost;
      } else {
        console.error('❌ Falha ao criar post');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao criar post:', error);
      return null;
    }
  };

  // Curtir post - VERSÃO CORRIGIDA
  const curtirPost = (postId) => {
    if (!usuario) return;

    try {
      console.log('❤️ Curtindo post:', postId);
      
      // Encontrar o post em todos os usuários
      let postEncontrado = null;
      let usuarioDono = null;

      Object.keys(usuarios).forEach(email => {
        const userPosts = usuarios[email]?.posts || [];
        const postIndex = userPosts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          postEncontrado = userPosts[postIndex];
          usuarioDono = email;
        }
      });

      if (!postEncontrado || !usuarioDono) {
        console.error('❌ Post não encontrado:', postId);
        return;
      }

      const curtidasAtuais = Array.isArray(postEncontrado.curtidas) ? postEncontrado.curtidas : [];
      const novasCurtidas = curtidasAtuais.includes(usuario.email)
        ? curtidasAtuais.filter(email => email !== usuario.email)
        : [...curtidasAtuais, usuario.email];

      // Atualizar o post específico
      const novosUsuarios = { ...usuarios };
      const postsUsuario = [...(novosUsuarios[usuarioDono].posts || [])];
      const postIndex = postsUsuario.findIndex(post => post.id === postId);
      
      if (postIndex !== -1) {
        postsUsuario[postIndex] = {
          ...postsUsuario[postIndex],
          curtidas: novasCurtidas
        };
        
        novosUsuarios[usuarioDono] = {
          ...novosUsuarios[usuarioDono],
          posts: postsUsuario
        };

        salvarDados(novosUsuarios);
        console.log('✅ Post curtido/descurtido com sucesso');
      }
    } catch (error) {
      console.error('❌ Erro ao curtir post:', error);
    }
  };

  // Seguir usuário - VERSÃO CORRIGIDA
  const seguirUsuario = (usuarioSeguidoEmail) => {
    if (!usuario || !usuarios[usuarioSeguidoEmail] || usuarioSeguidoEmail === usuario.email) {
      console.error('❌ Não é possível seguir este usuário');
      return;
    }

    try {
      console.log('👤 Seguindo usuário:', usuarioSeguidoEmail);
      
      const novosUsuarios = { ...usuarios };
      
      // Adicionar aos seguidores do usuário seguido
      const seguidoresAtuais = Array.isArray(novosUsuarios[usuarioSeguidoEmail].seguidores) 
        ? novosUsuarios[usuarioSeguidoEmail].seguidores 
        : [];
      
      if (!seguidoresAtuais.includes(usuario.email)) {
        novosUsuarios[usuarioSeguidoEmail] = {
          ...novosUsuarios[usuarioSeguidoEmail],
          seguidores: [...seguidoresAtuais, usuario.email]
        };
      }

      // Adicionar aos seguindo do usuário atual
      const seguindoAtuais = Array.isArray(novosUsuarios[usuario.email].seguindo) 
        ? novosUsuarios[usuario.email].seguindo 
        : [];
      
      if (!seguindoAtuais.includes(usuarioSeguidoEmail)) {
        novosUsuarios[usuario.email] = {
          ...novosUsuarios[usuario.email],
          seguindo: [...seguindoAtuais, usuarioSeguidoEmail]
        };

        const usuarioAtualizado = {
          ...usuario,
          seguindo: [...seguindoAtuais, usuarioSeguidoEmail]
        };

        salvarDados(novosUsuarios, usuarioAtualizado);
        console.log('✅ Usuário seguido com sucesso');
      }
    } catch (error) {
      console.error('❌ Erro ao seguir usuário:', error);
    }
  };

  // Deixar de seguir usuário - VERSÃO CORRIGIDA
  const deixarSeguir = (usuarioSeguidoEmail) => {
    if (!usuario) return;

    try {
      console.log('👤 Deixando de seguir:', usuarioSeguidoEmail);
      
      const novosUsuarios = { ...usuarios };
      
      // Remover dos seguidores do usuário seguido
      if (Array.isArray(novosUsuarios[usuarioSeguidoEmail]?.seguidores)) {
        novosUsuarios[usuarioSeguidoEmail] = {
          ...novosUsuarios[usuarioSeguidoEmail],
          seguidores: novosUsuarios[usuarioSeguidoEmail].seguidores.filter(
            email => email !== usuario.email
          )
        };
      }

      // Remover dos seguindo do usuário atual
      if (Array.isArray(novosUsuarios[usuario.email]?.seguindo)) {
        novosUsuarios[usuario.email] = {
          ...novosUsuarios[usuario.email],
          seguindo: novosUsuarios[usuario.email].seguindo.filter(
            email => email !== usuarioSeguidoEmail
          )
        };

        const usuarioAtualizado = {
          ...usuario,
          seguindo: novosUsuarios[usuario.email].seguindo
        };

        salvarDados(novosUsuarios, usuarioAtualizado);
        console.log('✅ Deixou de seguir com sucesso');
      }
    } catch (error) {
      console.error('❌ Erro ao deixar de seguir:', error);
    }
  };

  const value = {
    usuario,
    carregando,
    usuarios,
    login,
    logout,
    criarPost,
    curtirPost,
    seguirUsuario,
    deixarSeguir,
    atualizarPerfil,
    adicionarFoto,
    adicionarPet
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};