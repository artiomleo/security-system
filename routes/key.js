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

router.route('/getKeys')
    .get((req, res, ) => {
        if (req.body) {
            Model.Key.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

router.route('/getKeysByRoom')
    .post((req, res, ) => {
        var key = req.body;
        if (req.body) {
            Model.Key.findAll({
                where: {
                    roomId: key.roomId
                }
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })


router.route('/addKey')
    .post((req, res, next) => {
        var key = req.body;
        //    sessionChecker(req, res).then(res => {
        Model.Key.findOne({
            where: {
                roomId: key.roomId,
                value: key.value
            }
        }).then(result => {
            if (result) {
                res.status(401).end();
            } else {
                Model.Key.create({
                    roomId: key.roomId,
                    value: key.value
                }).then(result => {
                    if (result) {
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

router.route('/deleteKey')
    .delete((req, res, next) => {
        var key = req.body;
        if (key.id === "") {
            res.status(400).end();
            return next();
        }
        Model.Key.destroy({
            where: { id: key.id }
        });
        res.status(200).end();
    });