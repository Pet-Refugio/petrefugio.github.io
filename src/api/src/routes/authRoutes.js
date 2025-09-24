import express from 'express';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.post('/cadastrar', AuthController.cadastrar);
router.post('/login', AuthController.login);

// Rota protegida
router.get('/verificar', authMiddleware, AuthController.verificarUsuario);

export default router;