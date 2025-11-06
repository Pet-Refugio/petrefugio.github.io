// src/services/api.js

// A URL base da nossa API que está rodando na porta 5000
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Função central para fazer requisições à API
 * @param {string} endpoint - O endpoint da API (ex: '/auth/login')
 * @param {object} options - Opções da requisição (method, body, headers)
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Converte o body para JSON se for um objeto
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Tenta parsear a resposta como JSON
    const data = await response.json();

    if (!response.ok) {
      // Se a API retornar um erro (ex: 400, 404, 500), 'data.message' terá o erro
      throw new Error(data.message || 'Erro na requisição');
    }

    return data; // Retorna o objeto JSON (ex: { success: true, data: ... })

  } catch (error) {
    console.error('Erro na requisição:', error);
    // Retorna um objeto de erro padronizado
    return { 
      success: false, 
      message: error.message || 'Não foi possível conectar com o servidor.' 
    };
  }
};

// Serviços de Autenticação
export const authService = {
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
};