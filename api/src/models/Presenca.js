const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Presenca = sequelize.define('Presenca', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false
  },
  confirmacao: {
    type: DataTypes.ENUM('sim', 'nao'),
    allowNull: false
  },
  acompanhantes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  nomesAcompanhantes: {
    type: DataTypes.TEXT,
    get() {
      const value = this.getDataValue('nomesAcompanhantes');
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue('nomesAcompanhantes', JSON.stringify(value));
    }
  },
  mensagem: {
    type: DataTypes.TEXT
  },
  dataConfirmacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'presencas',
  timestamps: false
});

module.exports = Presenca; 