var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Building = module.exports = sequelize.define('buildings', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    floors: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    }

});

