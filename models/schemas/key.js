var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Key = module.exports = sequelize.define('keys', {
    roomId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    }

});

