'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
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
    });

    await queryInterface.addIndex("products", ["productName", "code", "ncm"], {
      name: "products_productName_code_ncm_interval_index",
      unique: true,
    });

    await queryInterface.addIndex("products", ["productName"], {
      name: "products_productName_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("products", "products_productName_index");
    await queryInterface.removeIndex(
      "products",
      "products_productName_code_ncm_interval_index"
    );
    await queryInterface.dropTable("products");
  }
};