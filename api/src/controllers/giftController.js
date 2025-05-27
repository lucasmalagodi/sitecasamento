const Gift = require('../models/Gift');

// Criar um novo presente
exports.createGift = async (req, res) => {
  try {
    const { guestName, giftName, value, message } = req.body;
    
    const gift = await Gift.create({
      guestName,
      giftName,
      value,
      message
    });

    return res.status(201).json(gift);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Listar todos os presentes
exports.getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.findAll({
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(gifts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar um presente específico
exports.getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    if (!gift) {
      return res.status(404).json({ error: 'Presente não encontrado' });
    }
    return res.status(200).json(gift);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar um presente
exports.updateGift = async (req, res) => {
  try {
    const { id } = req.params;
    const { guestName, giftName, value, message } = req.body;

    const gift = await Gift.findByPk(id);
    if (!gift) {
      return res.status(404).json({ error: 'Presente não encontrado' });
    }

    await gift.update({
      guestName,
      giftName,
      value,
      message
    });

    return res.status(200).json(gift);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Deletar um presente
exports.deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    if (!gift) {
      return res.status(404).json({ error: 'Presente não encontrado' });
    }

    await gift.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 