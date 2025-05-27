const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Gift extends Model {}

Gift.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  guestName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  giftName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Gift',
  tableName: 'gifts'
});

module.exports = Gift; 