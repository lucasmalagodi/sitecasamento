const Admin = require('../models/Admin');
const { generateToken } = require('../middlewares/auth');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email, active: true } });
    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await admin.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken(admin);
    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const admin = await Admin.create({
      name,
      email,
      password
    });

    const token = generateToken(admin);
    res.status(201).json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

const getProfile = async (req, res) => {
  try {
    const admin = req.admin;
    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const admin = req.admin;
    const { name, email, currentPassword, newPassword } = req.body;

    // Verifica se o email já está em uso por outro usuário
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }
    }

    // Atualiza os dados básicos
    const updateData = {
      name: name || admin.name,
      email: email || admin.email
    };

    // Se houver alteração de senha
    if (currentPassword && newPassword) {
      const isPasswordValid = await admin.checkPassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Senha atual incorreta' });
      }

      // Criptografa a nova senha
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    // Atualiza o admin
    await admin.update(updateData);

    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

const listAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: ['id', 'name', 'email', 'active', 'createdAt', 'updatedAt'],
      // where: { active: true }
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar admins' });
  }
};

const updateAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Não permite desativar o próprio usuário
    if (admin.id === req.admin.id) {
      return res.status(400).json({ error: 'Não é possível desativar seu próprio usuário' });
    }

    await admin.update({ active });
    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status do usuário' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    // Não permite deletar o próprio usuário
    if (admin.id === req.admin.id) {
      return res.status(400).json({ error: 'Não é possível excluir seu próprio usuário' });
    }
    await admin.destroy();
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};

module.exports = {
  login,
  register,
  getProfile,
  updateProfile,
  listAdmins,
  updateAdminStatus,
  deleteAdmin
}; 