    import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middlewares básicos
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API PetRefugio funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Rota de cadastro simples (sem banco de dados)
app.post('/api/auth/cadastrar', (req, res) => {
  console.log('📥 Dados recebidos:', req.body);
  
  // Simular processamento
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Usuário cadastrado com sucesso! (Modo teste)',
      data: {
        id: 1,
        tipo_conta: req.body.tipoConta,
        nome: req.body.nome,
        email: req.body.email,
        criado_em: new Date().toISOString()
      }
    });
  }, 1000);
});

// Rota de login simples
app.post('/api/auth/login', (req, res) => {
  console.log('📥 Login attempt:', req.body);
  
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Login realizado com sucesso! (Modo teste)',
      data: {
        usuario: {
          id: 1,
          tipo_conta: 'pessoal',
          nome: 'Usuário Teste',
          email: req.body.email
        },
        token: 'token_teste_123456'
      }
    });
  }, 1000);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor SIMPLES rodando na porta ${PORT}`);
  console.log(`✅ Teste: http://localhost:${PORT}/api/health`);
});