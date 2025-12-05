import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

const usuariosPreCadastrados = {
  "wenderviana@gmail.com": {
    senha: "12345678",
    nome: "Wender Viana",
    username: "wender_viana",
    bio: "Amo animais e tenho 3 gatos resgatados 🐱 | Fotógrafo de pets",
    tipo: "usuario",
    online: true,
    fotoPerfil: null,
    fotoCapa: null,
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
        capa: null,
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
    fotoPerfil: null,
    fotoCapa: null,
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
        capa: null,
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
    fotoPerfil: null,
    fotoCapa: null,
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
        capa: null,
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
  }
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [usuarios, setUsuarios] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioPetRefugio');
    const usuariosSalvos = localStorage.getItem('usuariosPetRefugio');

    let usuariosCarregados = usuariosPreCadastrados;

    if (usuariosSalvos) {
      try {
        usuariosCarregados = JSON.parse(usuariosSalvos);
        
        Object.keys(usuariosPreCadastrados).forEach(email => {
          if (usuariosCarregados[email]) {
            usuariosCarregados[email] = {
              ...usuariosPreCadastrados[email],
              ...usuariosCarregados[email],
              fotoPerfil: usuariosCarregados[email].fotoPerfil || null,
              fotoCapa: usuariosCarregados[email].fotoCapa || null,
            };
          }
        });
      } catch (error) {
        usuariosCarregados = usuariosPreCadastrados;
      }
    }

    setUsuarios(usuariosCarregados);

    if (usuarioSalvo) {
      try {
        const usuarioData = JSON.parse(usuarioSalvo);
        if (usuariosCarregados[usuarioData.email]) {
          const usuarioAtualizado = {
            ...usuariosCarregados[usuarioData.email],
            email: usuarioData.email
          };
          setUsuario(usuarioAtualizado);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }

    const todosPosts = Object.values(usuariosCarregados).flatMap(user => 
      (user.posts || []).map(post => ({
        ...post,
        usuario: {
          username: user.username,
          nome: user.nome,
          foto: user.fotoPerfil
        }
      }))
    );
    setPosts(todosPosts);

    setCarregando(false);
  }, []);

  useEffect(() => {
    const todosPosts = Object.values(usuarios).flatMap(user => 
      (user.posts || []).map(post => ({
        ...post,
        usuario: {
          username: user.username,
          nome: user.nome,
          foto: user.fotoPerfil
        }
      }))
    );
    setPosts(todosPosts);
  }, [usuarios]);

  // Atualize a função salvarDados para garantir que as imagens sejam sempre base64
const salvarDados = (novosUsuarios, usuarioAtualizado = null) => {
  try {
    // Garantir que todas as imagens sejam strings válidas
    Object.keys(novosUsuarios).forEach(email => {
      const user = novosUsuarios[email];
      if (user) {
        if (user.fotoPerfil && !user.fotoPerfil.startsWith('data:image')) {
          novosUsuarios[email] = {
            ...user,
            fotoPerfil: null
          };
        }
        if (user.fotoCapa && !user.fotoCapa.startsWith('data:image')) {
          novosUsuarios[email] = {
            ...user,
            fotoCapa: null
          };
        }
      }
    });
    
    setUsuarios(novosUsuarios);
    localStorage.setItem('usuariosPetRefugio', JSON.stringify(novosUsuarios));
    
    if (usuarioAtualizado) {
      setUsuario(usuarioAtualizado);
      localStorage.setItem('usuarioPetRefugio', JSON.stringify(usuarioAtualizado));
    }

    const todosPosts = Object.values(novosUsuarios).flatMap(user => 
      (user.posts || []).map(post => ({
        ...post,
        usuario: {
          username: user.username,
          nome: user.nome,
          foto: user.fotoPerfil
        }
      }))
    );
    setPosts(todosPosts);
    
    return true;
  } catch (error) {
    return false;
  }
};
  const cadastrar = (email, senha, nome, username, tipo = 'usuario') => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Object.values(usuarios).some(u => u.username === username)) {
          reject({ success: false, message: 'Nome de usuário já existe' });
          return;
        }
        
        if (usuarios[email]) {
          reject({ success: false, message: 'Email já cadastrado' });
          return;
        }

        const novoUsuario = {
          senha,
          nome,
          username,
          tipo,
          online: true,
          fotoPerfil: null,
          fotoCapa: null,
          bio: '',
          seguidores: [],
          seguindo: [],
          pets: [],
          posts: []
        };

        const novosUsuarios = {
          ...usuarios,
          [email]: novoUsuario
        };

        const usuarioLogado = {
          email,
          ...novoUsuario
        };

        if (salvarDados(novosUsuarios, usuarioLogado)) {
          resolve({ success: true, usuario: usuarioLogado });
        } else {
          reject({ success: false, message: 'Erro ao salvar dados' });
        }
      }, 500);
    });
  };

  const login = (email, senha) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarioEncontrado = usuarios[email];
        
        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
          const usuarioLogado = {
            email,
            ...usuarioEncontrado
          };
          
          const novosUsuarios = {
            ...usuarios,
            [email]: {
              ...usuarioEncontrado,
              online: true
            }
          };
          
          if (salvarDados(novosUsuarios, usuarioLogado)) {
            resolve({ success: true, usuario: usuarioLogado });
          } else {
            reject({ success: false, message: 'Erro ao salvar dados' });
          }
        } else {
          reject({ success: false, message: 'Email ou senha incorretos' });
        }
      }, 500);
    });
  };

  const logout = () => {
    if (usuario) {
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
    window.location.href = '/login';
  };

  const atualizarPerfil = (novosDados) => {
    if (!usuario) {
      return false;
    }

    try {
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
      return false;
    }
  };

  const adicionarFoto = async (tipo, base64) => {
    if (!usuario) return false;

    try {
      let imagemParaSalvar = base64;
      if (base64.length > 100000) {
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
      return false;
    }
  };

  const adicionarPet = (novoPet) => {
    if (!usuario) {
      return false;
    }

    try {
      const petComId = {
        id: Date.now(),
        ...novoPet,
        foto: novoPet.foto || '🐾',
        capa: novoPet.capa || null,
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
      return sucesso;
    } catch (error) {
      return false;
    }
  };

  const criarPost = async (conteudo, imagem = null) => {
    if (!usuario) {
      return null;
    }

    try {
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
        return novoPost;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const curtirPost = (postId) => {
    if (!usuario) return;

    try {
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
        return;
      }

      const curtidasAtuais = Array.isArray(postEncontrado.curtidas) ? postEncontrado.curtidas : [];
      const novasCurtidas = curtidasAtuais.includes(usuario.email)
        ? curtidasAtuais.filter(email => email !== usuario.email)
        : [...curtidasAtuais, usuario.email];

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
      }
    } catch (error) {
      console.error('Erro ao curtir post:', error);
    }
  };

  const seguirUsuario = (usuarioSeguidoEmail) => {
    if (!usuario || !usuarios[usuarioSeguidoEmail] || usuarioSeguidoEmail === usuario.email) {
      return;
    }

    try {
      const novosUsuarios = { ...usuarios };
      
      const seguidoresAtuais = Array.isArray(novosUsuarios[usuarioSeguidoEmail].seguidores) 
        ? novosUsuarios[usuarioSeguidoEmail].seguidores 
        : [];
      
      if (!seguidoresAtuais.includes(usuario.email)) {
        novosUsuarios[usuarioSeguidoEmail] = {
          ...novosUsuarios[usuarioSeguidoEmail],
          seguidores: [...seguidoresAtuais, usuario.email]
        };
      }

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
      }
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
    }
  };

  const deixarSeguir = (usuarioSeguidoEmail) => {
    if (!usuario) return;

    try {
      const novosUsuarios = { ...usuarios };
      
      if (Array.isArray(novosUsuarios[usuarioSeguidoEmail]?.seguidores)) {
        novosUsuarios[usuarioSeguidoEmail] = {
          ...novosUsuarios[usuarioSeguidoEmail],
          seguidores: novosUsuarios[usuarioSeguidoEmail].seguidores.filter(
            email => email !== usuario.email
          )
        };
      }

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
      }
    } catch (error) {
      console.error('Erro ao deixar de seguir:', error);
    }
  };

  const value = {
    usuario,
    carregando,
    usuarios,
    posts,
    cadastrar,
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

export const ProtectedRoute = ({ children }) => {
  const { usuario, carregando } = useAuth();
  
  if (carregando) {
    return <div>Carregando...</div>;
  }

  return usuario ? children : null;
};