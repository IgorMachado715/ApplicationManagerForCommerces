const Sequelize = require('sequelize');
const database = require('../db');


const productsModel = database.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      units: {
        type: Sequelize.STRING,
      },
      buyPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ncm: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
      },
      obs: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
  indexes: [
  {
    fields: ["productName"],
  }]
});


module.exports = productsModel;