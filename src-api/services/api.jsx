const API_BASE_URL = 'http://localhost:5000/api';

// Função genérica para fazer requisições
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }
    
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Serviço de autenticação
export const authService = {
  // Cadastro
  cadastrar: (dadosUsuario) => 
    apiRequest('/auth/cadastrar', {
      method: 'POST',
      body: dadosUsuario
    }),

  login: (credenciais) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: credenciais
    }),

  verificarUsuario: (token) => 
    apiRequest('/auth/verificar', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
};

export default apiRequest;