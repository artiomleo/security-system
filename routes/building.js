var express = require("express");
var Model = require("../models/model.js").Model;
var router = (module.exports = express.Router());
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function sessionChecker(request, response) {
    return new Promise(function (resolve, reject) {
        if (!request.headers.token) {
            response.status(401);
            response.end();
            resolve(0);
        }
        var token = request.headers.token;
        return Model.User.findOne({ where: { token: token } }).then(function (user) {
            if (user) {
                sessionUser = user;
                resolve(1);
            } else {
                response.status(401);
                response.end();
                resolve(0);
            }
        });
    });
}

router.route('/getBuildings')
    .get((req, res, ) => {
        if (req.body) {
            Model.Building.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

    router.route('/getBuilding')
    .post((req, res, ) => {
        var id = req.body.id;
        if (req.body) {
            Model.Building.findOne({ where: {id: id}
            }).then(result => {
                       res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })


router.route('/addBuilding')
    .post((req, res, next) => {
    //    sessionChecker(req, res).then(res => {
        var building = req.body;

        Model.Building.findOne({
            where: {
                 name: building.name,
            }
        }
        ).then(result => {
            if (result) {
                res.status(401).end();
            } else {
                Model.Building.create({
            name: building.name,
            floors: building.floors
        }).then(result => {
            if(result) {
            res.status(200);
            res.send(result);
            } else {
                res.status(401).end();
            }
        })
            }
        });
        
    //    });
    });

    router.route('/deleteBuilding')
    .delete((req, res, next) => {
        var building = req.body;
        if (building.id === "" ) {
            res.status(400).end();
            return next();
        }
        Model.Building.destroy({
          where: { id: building.id }
        });
        res.status(200).end();
    });