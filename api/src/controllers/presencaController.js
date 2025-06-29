const Presenca = require('../models/Presenca');

// Criar nova confirmação de presença
exports.criarPresenca = async (req, res) => {
  try {
    // Garantir que confirmacao seja um número
    const dados = {
      ...req.body,
      confirmacao: parseInt(req.body.confirmacao) || 1
    };
    
    const presenca = await Presenca.create(dados);
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

// Atualizar confirmação
exports.atualizarConfirmacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { confirmacao } = req.body;
    const presenca = await Presenca.findByPk(id);
    
    if (!presenca) {
      return res.status(404).json({ success: false, message: 'Confirmação não encontrada' });
    }

    // Usar o status enviado no body ou fazer toggle se não for enviado
    const novoStatus = confirmacao !== undefined ? parseInt(confirmacao) : (presenca.confirmacao === 1 ? 0 : 1);
    presenca.confirmacao = novoStatus;
    await presenca.save();

    res.json({ success: true, data: presenca });
  } catch (error) {
    console.error('Erro ao atualizar confirmação:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar confirmação', error: error.message });
  }
};

// Excluir confirmação
exports.excluirPresenca = async (req, res) => {
  try {
    const { id } = req.params;
    const presenca = await Presenca.findByPk(id);
    
    if (!presenca) {
      return res.status(404).json({ success: false, message: 'Confirmação não encontrada' });
    }

    await presenca.destroy();
    res.json({ success: true, message: 'Confirmação excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir confirmação:', error);
    res.status(500).json({ success: false, message: 'Erro ao excluir confirmação', error: error.message });
  }
};

// Atualizar dados completos da confirmação
exports.atualizarPresenca = async (req, res) => {
  try {
    const { id } = req.params;
    const presenca = await Presenca.findByPk(id);
    
    if (!presenca) {
      return res.status(404).json({ success: false, message: 'Confirmação não encontrada' });
    }

    // Atualiza os campos permitidos
    const camposPermitidos = ['nome', 'email', 'celular', 'confirmacao', 'acompanhantes', 'nomesAcompanhantes', 'mensagem'];
    const dadosAtualizados = {};
    
    camposPermitidos.forEach(campo => {
      if (req.body[campo] !== undefined) {
        if (campo === 'confirmacao') {
          dadosAtualizados[campo] = parseInt(req.body[campo]) || 1;
        } else {
          dadosAtualizados[campo] = req.body[campo];
        }
      }
    });

    await presenca.update(dadosAtualizados);

    res.json({ 
      success: true, 
      data: presenca,
      message: 'Confirmação atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar confirmação:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao atualizar confirmação', 
      error: error.message 
    });
  }
}; 