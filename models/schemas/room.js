var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Room = module.exports = sequelize.define('rooms', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    buildingId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    floorId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
    },
    roomRfid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        unique: false,
        allowNull: false,
    }

});

