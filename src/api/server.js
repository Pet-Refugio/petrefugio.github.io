import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTables } from './src/config/database.js';

// Routes
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API PetRefugio funcionando!',
    version: '1.0.0'
  });
});

// Inicializar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  
  // Criar tabelas ao iniciar
  await createTables();
});