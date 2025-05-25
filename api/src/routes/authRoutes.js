const express = require('express');
const router = express.Router();
const { login, register, getProfile, updateProfile, listAdmins, updateAdminStatus, deleteAdmin } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

// Rotas públicas
router.post('/login', login);
router.post('/register', register);

// Rotas protegidas
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/admins', auth, listAdmins);
router.put('/admins/:id/status', auth, updateAdminStatus);
router.delete('/admins/:id', auth, deleteAdmin);

module.exports = router; 