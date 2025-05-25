const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');
const { auth } = require('../middlewares/auth');

// Rota para criar nova confirmação de presença (pública)
router.post('/', presencaController.criarPresenca);

// Rotas protegidas que precisam de autenticação
router.use(auth);

// Rota para listar todas as confirmações
router.get('/', presencaController.listarPresencas);

// Rota para buscar uma confirmação específica
router.get('/:id', presencaController.buscarPresenca);

// Rota para atualizar confirmação
router.put('/:id/confirmar', presencaController.atualizarConfirmacao);

// Rota para excluir uma confirmação
router.delete('/:id', presencaController.excluirPresenca);

module.exports = router; 