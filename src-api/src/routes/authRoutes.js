// src-api/src/routes/authRoutes.js
import express from 'express';
import { cadastrar, logar } from '../controllers/authController.js';

const router = express.Router();

router.post('/cadastrar', cadastrar);
router.post('/login', logar);

export default router;