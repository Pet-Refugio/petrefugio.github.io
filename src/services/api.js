const API_BASE_URL = 'http://localhost:5001/api'; 

const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido do servidor.' }));
        const errorMessage = errorData.message || `Erro do servidor com status ${response.status}`;
        throw new Error(errorMessage);
    }

    // Retorna a resposta JSON em caso de sucesso
    return response.json();
  } catch (error) {
    console.error(`Erro na requisição ${method} ${endpoint}:`, error.message);
    throw error;
  }
};


export const authService = {
  cadastrar: async (dados) => {
    return apiRequest('/auth/cadastrar', 'POST', dados);
  },
  
  login: async (email, senha) => {
    return apiRequest('/auth/login', 'POST', { email, senha });
  },
};