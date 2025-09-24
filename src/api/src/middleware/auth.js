import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acesso não fornecido'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_secret_aqui');
    req.usuarioId = decoded.id;
    req.tipoConta = decoded.tipoConta;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

export default authMiddleware;