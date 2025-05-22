const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('paulaelucas_mysql', 'onzip', '1q2w3e4r', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize; 