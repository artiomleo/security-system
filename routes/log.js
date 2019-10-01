var express = require("express");
var Model = require("../models/model.js").Model;
var router = (module.exports = express.Router());
var date = new Date().toLocaleString()

router.route('/getLogs')
    .get((req, res, ) => {
        if (req.body) {
            Model.Log.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

router.route('/getLogsByRoom')
    .post((req, res, ) => {
        var log = req.body;
        if (req.body) {
            Model.Log.findAll({
                where: {
                    buildingId: log.buildingId,
                    roomId: log.roomId
                }
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })

router.route('/addLog')
    .post((req, res, next) => {
        var log = req.body;
        Model.Log.create({
            text: date + ":  " + log.text,
            buildingId: log.buildingId,
            roomId: log.roomId,
        }).then(result => {
            if (result) {
                res.status(200);
                res.send(result);
            } else {
                res.status(401).end();
            }
        })
    });


