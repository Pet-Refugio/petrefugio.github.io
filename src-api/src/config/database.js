// src-api/src/config/database.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // Carrega o .env da raiz do src-api

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('🔗 Conectado ao banco de dados PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('❌ Erro inesperado no cliente do banco de dados', err);
  process.exit(-1);
});

export default pool;