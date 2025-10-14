import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class Usuario {
  // Cadastrar usuário
  static async cadastrar(usuarioData) {
    const { tipoConta, nome, nascimento, email, documento, senha } = usuarioData;
    
    // Verificar se email já existe
    const usuarioExistente = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha
    const saltRounds = 12;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Inserir no banco
    const result = await pool.query(
      `INSERT INTO usuarios (tipo_conta, nome, nascimento, email, documento, senha_hash) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, tipo_conta, nome, email, criado_em`,
      [tipoConta, nome, nascimento, email, documento, senhaHash]
    );

    return result.rows[0];
  }

  // Login do usuário
  static async login(email, senha) {
    // Buscar usuário
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const usuario = result.rows[0];

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      throw new Error('Senha incorreta');
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email,
        tipoConta: usuario.tipo_conta 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem senha)
    const { senha_hash, ...usuarioSemSenha } = usuario;
    
    return {
      usuario: usuarioSemSenha,
      token
    };
  }

  // Buscar usuário por ID
  static async buscarPorId(id) {
    const result = await pool.query(
      `SELECT id, tipo_conta, nome, nascimento, email, documento, criado_em 
       FROM usuarios WHERE id = $1`,
      [id]
    );

    return result.rows[0];
  }
}

export default Usuario;