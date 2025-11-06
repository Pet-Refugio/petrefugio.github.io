import * as authService from '../services/authService.js'; 
// OBS: Certifique-se que o arquivo authService.js existe ou o servidor vai quebrar!

export const cadastrarUsuario = async (req, res) => {
  try {
    const dados = req.body;
    
    // Verificação de dados básicos
    if (!dados || !dados.email || !dados.senha) {
      // Retorna 400 se os dados estiverem incompletos
      return res.status(400).json({ success: false, message: 'Dados incompletos para cadastro.' });
    }

    // Chama o Service (SIMULADO - ainda não interage com o DB)
    const novoUsuario = await authService.cadastrar(dados);

    // Resposta de SUCESSO (Status 201 Created)
    return res.status(201).json({ 
        success: true, 
        message: 'Cadastro realizado com sucesso!',
        data: novoUsuario
    });

  } catch (error) {
    console.error("Erro interno no cadastro (Backend):", error.message);
    // Retorna 500 com um JSON válido para evitar o erro "Unexpected end of JSON input" no frontend
    return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor. Consulte o log do backend.' 
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios.' });
    }

    // Chama o Service (SIMULADO)
    const resultadoLogin = await authService.login(email, senha);

    // Resposta de SUCESSO (Status 200 OK)
    return res.status(200).json({ 
        success: true, 
        message: 'Login bem-sucedido (Simulado)!',
        token: resultadoLogin.token,
        usuario: resultadoLogin.usuario
    });

  } catch (error) {
    console.error("Erro interno no login (Backend):", error.message);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};