const Sequelize = require('sequelize');
const database = require('../db');


const settingsModel = database.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}, {
    indexes: [{     //**Recomendação para não permitir emails repetidos */
        fields: ['email'],
        unique: true
    }]
})


module.exports = settingsModel;