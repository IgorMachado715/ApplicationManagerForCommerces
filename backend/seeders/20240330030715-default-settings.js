'use strict';
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const settingsId = await queryInterface.rawSelect('settings', { where: {}, limit: 1 }, ['id']);
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [{
        email: 'igor@admin.com',
        password: bcrypt.hashSync('123'), /**outra maneira é utilizar AES importando o file crypto e passando crypto.encrypt('senha'); */
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('settings', null, {});
  }
};
