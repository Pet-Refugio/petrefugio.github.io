import express from 'express';
import { cadastrarUsuario, loginUsuario } from '../controllers/authController.js';

const router = express.Router();

// Rota POST para Cadastro de Usuário
router.post('/cadastrar', cadastrarUsuario);

// Rota POST para Login de Usuário
router.post('/login', loginUsuario);

export default router;