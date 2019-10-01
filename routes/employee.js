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

router.route('/getEmployees')
    .get((req, res, ) => {
        if (req.body) {
            Model.Employee.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
            });
        } else {
            res.status(400).end();
        }
    })


router.route('/getEmployeesByKey')
    .post((req, res, ) => {
        var keys = req.body;
        var length = keys.key.length;
        var arr = [];
        console.log(keys.key.length);
        console.log(keys.key);

        var mykey = keys.key;
        if (mykey == '') {
            res.status(401).end();            }
        
            for (let i in mykey) {
                ((i)=> {
            var key = mykey[i];
            // console.log(key.rfid);
            console.log("2nd!!");
            console.log( key.value);

            Model.Employee.findOne({
                where: {
                    rfid: key.value
                }
            }).then(result => {
                length --
                if(result!==null)
                arr.push(result)

                if (length === 0) {
                    res.status(200).send(arr);
                }
      
            });
        })(i)
        }
      
    })


router.route('/addEmployee')
    .post((req, res, next) => {
        var employee = req.body;
        Model.Employee.findOne({
            where: {
                name: employee.name,
            }
        }).then(result => {
            if (result) {
                res.status(401).end();
            } else {
                Model.Employee.create({
                    name: employee.name,
                    rfid: employee.rfid
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


router.route('/updateEmployee')
    .post((req, res, next) => {
        var employee = req.body;
        if (employee.name == undefined) {
            res.status(400).end();
            return next();
        }
        Model.Employee.update({
            rfid: employee.rfid
        },
            {
                where: { name: employee.name }
            }
        );
        res.status(200).end();
    });

router.route('/deleteEmployee')
    .delete((req, res, next) => {
        var employee = req.body;
        if (employee.id === "") {
            res.status(400).end();
            return next();
        }
        Model.Employee.destroy({
            where: { id: employee.id }
        });
        res.status(200).end();
    });