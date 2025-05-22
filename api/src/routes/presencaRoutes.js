const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

// Rota para criar nova confirmação de presença
router.post('/', presencaController.criarPresenca);

// Rota para listar todas as confirmações
router.get('/', presencaController.listarPresencas);

// Rota para buscar uma confirmação específica
router.get('/:id', presencaController.buscarPresenca);

module.exports = router; 