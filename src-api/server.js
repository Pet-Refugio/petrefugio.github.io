import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import pool from './src/config/database.js'; // <-- COMENTADO: Descomentaremos quando o banco de dados estiver pronto.
import authRoutes from './src/routes/authRoutes.js'; // Importa as rotas de autenticação

// Carrega variáveis de ambiente do .env
dotenv.config();

const app = express();
// Seu código indicou 5001 como porta, vamos manter.
const PORT = process.env.PORT || 5001; 

// === Middlewares ===

// 1. CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin:['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

// 2. Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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