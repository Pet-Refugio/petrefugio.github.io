require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// servir uploads (se salvar localmente)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
