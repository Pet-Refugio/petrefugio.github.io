// src-api/src/routes/auth.routes.js
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();


router.post('/cadastrar', register);


router.post('/login', login);

export default router;