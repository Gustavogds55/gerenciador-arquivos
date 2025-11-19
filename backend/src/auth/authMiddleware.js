const jwt = require('jsonwebtoken');
const userService = require('./userService');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Middleware para verificar JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Token de acesso requerido' });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Buscar usuário no banco
    const user = await userService.getUserByEmail(decoded.email);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Token inválido ou usuário inativo' });
    }

    // Adicionar usuário ao request
    req.user = user;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(403).json({ error: 'Token inválido' });
  }
};

// Gerar JWT
const generateToken = (user) => {
  const payload = {
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

module.exports = {
  authenticateToken,
  generateToken
};