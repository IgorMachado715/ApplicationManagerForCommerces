const Sequelize = require('sequelize');
const database = require('../db');


const clientsModel = database.define('clients', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rg: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birth: {
    type: Sequelize.DATE,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE

}, {
  indexes: [{
    unique: true,   //**Recomendação para não permitir emails repetidos */
    fields: ['cpf', 'rg']
  },
  {
    fields: ["name"],
  }]
});


module.exports = clientsModel;