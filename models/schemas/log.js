var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Log = module.exports = sequelize.define('logs', {
    text: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    buildingId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    roomId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
    }

});

