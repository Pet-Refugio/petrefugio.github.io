// Configuração da API
const API_BASE_URL = 'http://localhost:5000/api';

// Função melhorada com timeout e retry
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log('🌐 Fazendo requisição para:', url);
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    // Timeout de 5 segundos
    signal: AbortSignal.timeout(5000)
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Resposta recebida:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Erro detalhado:', {
      message: error.message,
      endpoint: url,
      method: options.method || 'GET'
    });
    
    if (error.name === 'TimeoutError') {
      throw new Error('Timeout: Servidor não respondeu em 5 segundos');
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 5000.');
    } else {
      throw new Error(`Erro de conexão: ${error.message}`);
    }
  }
};

// Serviço de autenticação
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

  verificarUsuario: (token) => 
    apiRequest('/auth/verificar', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
};

// Função para testar conexão
export const testConnection = async () => {
  try {
    console.log('🔍 Testando conexão com backend...');
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend conectado:', data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Backend offline:', error.message);
    return false;
  }
};

export default apiRequest;