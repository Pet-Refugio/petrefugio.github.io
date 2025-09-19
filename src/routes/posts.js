const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middlewares/authenticate');
const prisma = new PrismaClient();

// config multer (salvar local em /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

// criar post (autenticado)
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Imagem é necessária' });

    const imageUrl = `/uploads/${req.file.filename}`; // ou URL S3
    const post = await prisma.post.create({
      data: {
        caption,
        imageUrl,
        userId: req.user.id
      }
    });
    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar post' });
  }
});

// listar posts (público)
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true } } }
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar posts' });
  }
});

module.exports = router;
