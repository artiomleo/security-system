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

router.route('/getRooms')
    .get((req, res, ) => {
        if (req.body) {
            Model.Room.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

    router.route('/getRoom')
    .post((req, res, ) => {
        var room = req.body;
        if (req.body) {
            Model.Room.findAll({
                where: {
                    buildingId: room.buildingId
                }
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

    router.route('/getRoomsByFloor')
    .post((req, res, ) => {
        var room = req.body;
        if (req.body) {
            Model.Room.findAll({
                where: {
                    buildingId: room.buildingId,
                    floorId: room.floorId
                }
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

    router.route('/addRoom')
    .post((req, res, next) => {
        var room = req.body;
        Model.Room.findOne({
            where: {
                name: room.name,
            }
        }).then(result => {
            if (result) {
                res.status(401).end();
            } else {
                Model.Room.create({
                    name: room.name,
                    roomRfid: room.roomRfid,
                    floorId: room.floorId,
                    buildingId: room.buildingId,
                    status: room.status
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
    });


router.route('/updateRoom')
.post((req, res, next) => {
    var room = req.body;
    if (room.name == undefined ) {
        res.status(400).end();
        return next();
    }
    Model.Room.update({
        name: room.name,
        buildingId: room.buildingId,
        floorId: room.floorId,
        roomRfid: room.roomRfid,
        status: room.status

    },
        {
            where: { id: room.id }
        }
    );
    res.status(200).end();
});

router.route('/updateRoomStatus')
.post((req, res, next) => {
    var room = req.body;
    if (room.id == undefined ) {
        res.status(400).end();
        return next();
    }
    Model.Room.update({
       status: room.status
    },
        {
            where: { id: room.id }
        }
    );
    res.status(200).end();
});

    router.route('/deleteRoom')
    .delete((req, res, next) => {
        var room = req.body;
        if (room.id === "" ) {
            res.status(400).end();
            return next();
        }
        Model.Room.destroy({
          where: { id: room.id }
        });
        res.status(200).end();
    });