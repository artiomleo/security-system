var Sequelize = require('sequelize');
var config = require('../config.json');
var sequelize = module.exports.sequelize = new Sequelize(config.database, {logging: false});
var Model = module.exports.Model = {};

Model.User = require('./schemas/user.js');
Model.Employee = require('./schemas/employee.js');
Model.Building = require('./schemas/building.js');
Model.Room = require('./schemas/room.js');
Model.Key = require('./schemas/key.js');
Model.Log = require('./schemas/log.js');


sequelize.sync().catch(error => console.log('This error occured', error));
