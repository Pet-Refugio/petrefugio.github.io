// src-api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTables } from './src/config/database.js'; // 👈 Importa a função
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Inicializa o banco de dados e cria as tabelas
createTables();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Rota de Saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API PetRefugio funcionando! (PostgreSQL)',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Rotas de Autenticação
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`✅ Teste: http://localhost:${PORT}/api/health`);
});