const Presenca = require('../models/Presenca');

// Criar nova confirmação de presença
exports.criarPresenca = async (req, res) => {
  try {
    const presenca = await Presenca.create(req.body);
    res.status(201).json({
      success: true,
      data: presenca,
      message: 'Confirmação de presença registrada com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erro ao registrar presença',
      error: error.message
    });
  }
};

// Listar todas as confirmações
exports.listarPresencas = async (req, res) => {
  try {
    const presencas = await Presenca.findAll({
      order: [['dataConfirmacao', 'DESC']]
    });
    res.status(200).json({
      success: true,
      count: presencas.length,
      data: presencas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar confirmações',
      error: error.message
    });
  }
};

// Buscar confirmação por ID
exports.buscarPresenca = async (req, res) => {
  try {
    const presenca = await Presenca.findByPk(req.params.id);
    if (!presenca) {
      return res.status(404).json({
        success: false,
        message: 'Confirmação não encontrada'
      });
    }
    res.status(200).json({
      success: true,
      data: presenca
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar confirmação',
      error: error.message
    });
  }
}; 