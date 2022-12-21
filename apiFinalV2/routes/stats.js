var express = require('express');
var router = express.Router();
const mongo = require("mongodb");
const mongoose = require('mongoose');
const Ville = require('../models/ville');


/**
 * @openapi
 * /stats/:
 *   get:
 *     tags:
 *        - stats
 *     description: Permet d'obtenir un message de bienvenue
 *     responses:
 *      '200':
 *        description: Message de bienvenue
 *        content: 
 *          application/json:
 *            schema: 
 *                type: string
 *                example: 'Statistiques des villes'
 *      '500':
 *        description: Une erreur est survenue
 */
router.get('/', function(req, res, next) {
    res.send('Statistiques des villes');
});

/**
 * @openapi
 * /stats/moypopulation:
 *   get:
 *     tags:
 *        - stats
 *     description: Permet d'obtenir la liste de la moyenne de population par region
 *     responses:
 *      '200':
 *        description: Moyennes de population par region
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Statistiques'
 *      '500':
 *        description: Une erreur est survenue
 */
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

/**
 * @openapi
 * /stats/moydensite:
 *   get:
 *     tags:
 *        - stats
 *     description: Permet d'obtenir la liste de la moyenne de densite par region
 *     responses:
 *      '200':
 *        description: Moyennes de densite par region
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Statistiques'
 *      '500':
 *        description: Une erreur est survenue
 */
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
