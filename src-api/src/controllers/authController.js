// src-api/src/controllers/auth.controller.js
import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    // 1. Extrair dados do corpo da requisição [cite: 38]
    const { tipoConta, nome, nascimento, email, documento, senha } = req.body;

    // 2. Validar se o email já existe
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Este email já está cadastrado.' });
    }

    // 3. Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // 4. Inserir no banco de dados [cite: 36]
    const newUser = await pool.query(
      'INSERT INTO usuarios (tipo_conta, nome, nascimento, email, documento, senha_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nome, email, tipo_conta',
      [tipoConta, nome, nascimento, email, documento, senhaHash]
    );

    // 5. Enviar resposta de sucesso
    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso!',
      data: newUser.rows[0],
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

const login = async (req, res) => {
  try {
    // 1. Extrair dados do corpo [cite: 40]
    const { email, senha } = req.body;

    // 2. Verificar se o usuário existe
    const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Email ou senha inválidos.' });
    }
    const usuario = userResult.rows[0];

    // 3. Comparar a senha
    const isMatch = await bcrypt.compare(senha, usuario.senha_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email ou senha inválidos.' });
    }

    // 4. Criar o Token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo_conta },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token expira em 7 dias
    );

    // 5. Enviar resposta de sucesso
    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso!',
      data: {
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo_conta: usuario.tipo_conta
        }
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

export { register, login };