var express = require('express');
var router = express.Router();
const mongo = require("mongodb");
const mongoose = require('mongoose');
const Ville = require('../models/ville');


//Text dans la page index
router.get('/', function(req, res, next) {
    res.send('Statistiques des villes');
});

//GET moyenne de population par region
router.get('/moypopulation', async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_APP_URI);
        res.json(await Ville.aggregate([
            {
                $group: {
                    _id: "$region",
                    avg: { $avg: "$population" }
                }
            }
        ]));
    } catch (err) {
        console.log(err.message);
    } finally {
        mongoose.connection.close();
    }
});

//Get moyenne de densite par region
router.get('/moydensite', async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_APP_URI);
        res.json(await Ville.aggregate([
            {
                $group: {
                    _id: "$region",
                    avg: { $avg: "$densite" }
                }
            }
        ]));
    } catch (err) {
        console.log(err.message);
    } finally {
        mongoose.connection.close();
    }
});
module.exports = router;
