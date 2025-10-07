import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'petrefugio',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Criar tabelas automaticamente
const createTables = async () => {
  const client = await pool.connect();
  try {
    // Tabela de usuários
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        tipo_conta VARCHAR(20) NOT NULL CHECK (tipo_conta IN ('pessoal', 'ong', 'petshop', 'prestador', 'veterinario', 'hotel')),
        nome VARCHAR(100) NOT NULL,
        nascimento DATE,
        email VARCHAR(100) UNIQUE NOT NULL,
        documento VARCHAR(20),
        senha_hash VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Tabelas criadas/verificadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
  } finally {
    client.release();
  }
};

export { pool, createTables };