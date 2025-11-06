// src-api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './src/config/database.js'; // Importa o pool (corrige o erro )
import authRoutes from './src/routes/auth.routes.js'; // Importa as rotas de autenticação

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middlewares ===

// 1. CORS (Cross-Origin Resource Sharing)
// Isso é ESSENCIAL para corrigir o erro 'Failed to fetch' 
// Ele permite que seu frontend na porta 5173 [cite: 185] acesse o backend na porta 5000
app.use(cors({
  origin: 'http://localhost:5173', // Permitir requisições APENAS do seu frontend React
  credentials: true
}));

// 2. Middleware para processar JSON
app.use(express.json());

// === Rotas ===

// Rota de "saúde" para testar se a API está no ar
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API PetRefugio (Backend) funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rotas de Autenticação
app.use('/api/auth', authRoutes);

// === Inicialização do Servidor ===
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
  console.log(`✅ API disponível em http://localhost:${PORT}/api/health`);
});