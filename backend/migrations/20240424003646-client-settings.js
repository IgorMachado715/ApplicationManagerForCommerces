'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
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
    });

    await queryInterface.addIndex("clients", ["name", "cpf", "rg"], {
      name: "clients_cpf_rg_interval_index",
      unique: true,
    });

    await queryInterface.addIndex("clients", ["name"], {
      name: "clients_name_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("clients", "clients_name_index");
    await queryInterface.removeIndex(
      "clients",
      "clients_cpf_rg_interval_index"
    );
    await queryInterface.dropTable("clients");
  }
};