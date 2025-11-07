// src/services/api.js
// ⚠️ ATENÇÃO: Verifique se o seu backend está rodando na porta 5000
const API_URL = 'http://localhost:5000/api/auth'; 

/**
 * Função utilitária para fazer requisições à API
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}/${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, 
    },
  };

  try {
    const response = await fetch(url, config);

    // Se a resposta não for 2xx (ex: 400, 401, 500), joga um erro
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` }));
        // Lança o erro para ser capturado no Formulario
        throw new Error(errorBody.message || `Erro no servidor (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição para ${url}:`, error.message);
    // Erro de rede/conexão (ex: backend desligado)
    if (error.message.includes("Failed to fetch")) {
        throw new Error("Não foi possível conectar ao servidor. Verifique se o backend está ativo.");
    }
    throw error;
  }
};

/**
 * 🚀 Função para Login de Usuário
 * @param {object} dados - { email, senha }
 */
export const logar = async (dados) => {
  return apiRequest('login', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
};

/**
 * 🚀 Função para Cadastro de Usuário
 * @param {object} dados - { nome, email, senha, tipoConta }
 */
export const cadastrar = async (dados) => {
  return apiRequest('cadastrar', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
};