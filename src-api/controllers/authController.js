import Usuario from '../models/Usuario.js';

class AuthController {
  // Cadastro de usuário
  static async cadastrar(req, res) {
    try {
      const { tipoConta, nome, nascimento, email, documento, senha, confirmarSenha } = req.body;

      // Validações básicas
      if (senha !== confirmarSenha) {
        return res.status(400).json({ 
          success: false, 
          message: 'As senhas não coincidem' 
        });
      }

      if (senha.length < 6) {
        return res.status(400).json({ 
          success: false, 
          message: 'A senha deve ter pelo menos 6 caracteres' 
        });
      }

      const novoUsuario = await Usuario.cadastrar({
        tipoConta,
        nome,
        nascimento,
        email,
        documento,
        senha
      });

      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso!',
        data: novoUsuario
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Login de usuário
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }

      const resultado = await Usuario.login(email, senha);

      res.json({
        success: true,
        message: 'Login realizado com sucesso!',
        data: resultado
      });

    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  // Verificar usuário autenticado
  static async verificarUsuario(req, res) {
    try {
      const usuario = await Usuario.buscarPorId(req.usuarioId);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: usuario
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao verificar usuário'
      });
    }
  }
}

export default AuthController;