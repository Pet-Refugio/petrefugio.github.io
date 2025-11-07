// src-api/src/controllers/authController.js
import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Função auxiliar para gerar o Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const cadastrar = async (req, res) => {
  const { tipoConta, nome, nascimento, email, documento, senha } = req.body;

  try {
    // 1. Verificar se o usuário já existe
    const userCheck = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Usuário já cadastrado com este email.' });
    }

    // 2. Hashing da Senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    
    // 3. Preparar os dados para o INSERT - 🎯 CORREÇÃO AQUI
    // PostgreSQL espera 'null' para datas e campos opcionais não utilizados.
    // Garante que o campo 'nascimento' seja null se a conta não for 'pessoal'.
    const nascimentoDB = tipoConta === 'pessoal' ? nascimento : null;
    
    // Garante que o campo 'documento' seja null se a conta for 'pessoal'.
    const documentoDB = tipoConta !== 'pessoal' ? (documento || null) : null;
    
    // Certifique-se de que se nascimento for uma string vazia (""), ele ainda seja tratado como null
    const finalNascimentoDB = (nascimentoDB && nascimentoDB.trim() !== "") ? nascimentoDB : null;
    const finalDocumentoDB = (documentoDB && documentoDB.trim() !== "") ? documentoDB : null;


    const query = `
      INSERT INTO usuarios (tipo_conta, nome, nascimento, email, documento, senha_hash)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, tipo_conta, nome, email
    `;
    const values = [
        tipoConta, 
        nome, 
        finalNascimentoDB, // Use a variável que pode ser 'null'
        email, 
        finalDocumentoDB, // Use a variável que pode ser 'null'
        senhaHash
    ];

    // 4. Executar o INSERT
    const result = await pool.query(query, values);
    const user = result.rows[0];

    // 5. Retornar sucesso com o Token JWT
    res.status(201).json({
      success: true,
      message: `Bem-vindo(a), ${user.nome}! Cadastro efetuado com sucesso.`,
      data: {
        id: user.id,
        tipo_conta: user.tipo_conta,
        nome: user.nome,
        email: user.email,
      },
      token: generateToken(user.id),
    });

  } catch (error) {
    console.error("❌ Erro grave no cadastro:", error); // 👈 Adicionado LOG detalhado
    // Retorna 500 (Internal Server Error)
    res.status(500).json({ success: false, message: 'Erro interno do servidor durante o cadastro. Verifique o console do backend.' });
  }
};
export const logar = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Buscar o usuário pelo email
    const userResult = await pool.query('SELECT id, nome, email, tipo_conta, senha_hash FROM usuarios WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
      // Usar mensagem genérica por segurança
      return res.status(401).json({ success: false, message: 'Email ou senha incorretos.' });
    }

    // 2. Comparar a senha fornecida com o hash salvo
    const isMatch = await bcrypt.compare(senha, user.senha_hash);

    if (isMatch) {
      // 3. Retornar sucesso com o Token JWT
      res.json({
        success: true,
        message: 'Login realizado com sucesso!',
        data: {
          usuario: {
            id: user.id,
            tipo_conta: user.tipo_conta,
            nome: user.nome,
            email: user.email,
          },
          token: generateToken(user.id),
        },
      });
    } else {
      // Senha não confere
      res.status(401).json({ success: false, message: 'Email ou senha incorretos.' });
    }

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor durante o login.' });
  }
};