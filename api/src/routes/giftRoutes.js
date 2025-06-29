const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const { auth } = require('../middlewares/auth');

// Rota para criar um novo presente (pública)
router.post('/', giftController.createGift);

// Rotas protegidas que precisam de autenticação
router.use(auth);

// Rota para listar todos os presentes
router.get('/', giftController.getAllGifts);

// Rota para buscar um presente específico
router.get('/:id', giftController.getGiftById);

// Rota para atualizar um presente
router.put('/:id', giftController.updateGift);

// Rota para deletar um presente
router.delete('/:id', giftController.deleteGift);

module.exports = router; 