const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findOne({ where: { id: decoded.id, active: true } });

    if (!admin) {
      throw new Error();
    }

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Por favor, faça autenticação.' });
  }
};

const generateToken = (admin) => {
  return jwt.sign({ id: admin.id }, JWT_SECRET, {
    expiresIn: '24h'
  });
};

module.exports = {
  auth,
  generateToken
}; 