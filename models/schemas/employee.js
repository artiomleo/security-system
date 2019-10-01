var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Employee = module.exports = sequelize.define('employees', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    rfid: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    }
});

