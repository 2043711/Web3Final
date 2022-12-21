var express = require('express');
var router = express.Router();
const mongo = require("mongodb");
const mongoose = require('mongoose');
const { token } = require('morgan');
const ville = require('../models/ville');
const Ville = require('../models/ville');
const bcrypt = require('bcrypt');

//Get les ville but do not show the token
/**
 * @openapi
 * components:
 *   schemas:
 *     Ville:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: identifiant de l'enregistrement
 *         nom:
 *           type: string
 *           description: nom de la ville
 *         population:
 *           type: number
 *           description: population de la ville
 *         code_postal:
 *           type: [string]
 *           description: codes postaux de la ville 
 *         superficie:
 *          type: number
 *          description: superficie de la ville
 *         longitude:
 *           type: number
 *           description: longitude de la ville
 *         latitude:
 *           type: number
 *           description: latitude de la ville
 *         altitude:
 *           type: number
 *           description: altitude de la ville
 *         region:
 *           type: string
 *           description: region de la ville
 *         densite:
 *           type: number
 *           description: densite de la ville
 *         dateCreation:
 *           type: number
 *           description: l'année de creation de la ville
 *         fondateur:
 *           type: string
 *           description: le fondateur de la ville
 *         SiteTouristique:
 *           type: array
 *           description: les sites touristiques de la ville
 *         conservateurAuPouvoir:
 *           type: boolean
 *           description: si le conservateur est au pouvoir
 *         token:
 *           type: string
 *           description: token de la ville
 *       example:
 *        nom: 'Victoriaville'
 *        population: 20000
 *        code_postal: ['G6P 1A1', 'G6P 1A2']
 *        superficie: 100
 *        longitude: 45.0
 *        latitude: 45.0
 *        altitude: 45.0
 *        region: 'Estrie'
 *        densite: 200
 *        dateCreation: 2000
 *        fondateur: 'Jean'
 *        SiteTouristique: [{'nom': 'Parc', 'description':'un parc cool', 'addresse':'123 la rue'}]
 *        conservateurAuPouvoir: true
 *        token: '123456789'
 *     Statistiques:
 *       properties:
 *         region:
 *           type: string
 *           description: region regroupant les statistiques
 *         avg:
 *           description : moyenne de la population ou de densité dans la region
 *           type: number
 *       example:
 *         region: 'Estrie'
 *         avg: 20000
 */

/**
 * @openapi
 * /ville:
 *   get:
 *     tags:
 *        - ville
 *     description: Permet d'obtenir la liste des villes
 *     responses:
 *      '200':
 *        description: Tableau des villes
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Ville'
 *      '500':
 *        description: Une erreur est survenue
 */
router.get('/', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Ville.find({}, {
      token: 0
    }));
  } catch(err) {
    console.log(err.message);
  } finally {
    mongoose.connection.close();
  }
});

/**
 * @openapi
 * /ville/nom/{nom}:
 *   get:
 *     tags:
 *        - ville
 *     parameters:
 *      - in: path
 *        name: nom
 *        schema:
 *          type: string
 *          required: true
 *     description: Permet d'obtenir la liste des villes avec un nom en particulier
 *     responses:
 *      '200':
 *        description: Tableau des villes avec le nom en particulier
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Ville'
 *      '500':
 *        description: Une erreur est survenue
 */
router.get('/nom/:nom', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Ville.find({nom: req.params.nom}, {token: 0}));
  } catch(err) {
    console.log(err.message);
  } finally {
    mongoose.connection.close();
  }
});


/**
 * @openapi
 * /ville/region/{region}:
 *   get:
 *     tags:
 *        - ville
 *     parameters:
 *      - in: path
 *        name: region
 *        schema:
 *          type: string
 *          required: true
 *     description: Permet d'obtenir la liste des villes dans une region en particulier
 *     responses:
 *      '200':
 *        description: Tableau des villes dans une region en particulier
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Ville'
 *      '500':
 *        description: Une erreur est survenue
 */
router.get('/region/:region', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Ville.find({region: req.params.region}, {token: 0}));
  } catch(err) {
    console.log(err.message);
  } finally {
    mongoose.connection.close();
  }
});



/**
 * @openapi
 * /ville:
 *   post:
 *     tags:
 *        - ville
 *     description: Ajoute une ville
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ville'
 *     responses:
 *       200:
 *        description: Résultat de la requête d'ajout
 */
router.post('/', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    const ville = await Ville.findOne({nom: req.body.nom, region: req.body.region});
    if (ville) {
      res.status(400).json({msg: 'La ville existe deja'});
    } else {
      const ville = new Ville(req.body);
      const salt = await bcrypt.genSalt(10);
      ville.token = await bcrypt.hash(ville.token, salt);
      res.json(await ville.save());
    }
  } catch(err) {
    console.log(err.message);
  } finally {
    mongoose.connection.close();
  }
});


/**
 * @openapi
 * /ville/{id}/{token}:
 *   put:
 *    tags:
 *      - ville
 *    description: Modifie la ville à partir de son id et vérifie si le token est bon
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: id de la ville
 *    - name: token
 *      in: path
 *      required: true
 *      description: token de la ville
 *      schema:
 *        type: number
 *    responses:
 *       200:
 *         description: Résultat de la requête de modification
 *       500:
 *         description: Une erreur est survenue
 */
router.put('/:id/:token', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    const ville = await Ville.findById(req.params.id);
    const result = await bcrypt.compare(req.params.token, ville.token);
    if (result) {
      //token ne change pas
      req.body.token = ville.token;
      res.json(await Ville.findByIdAndUpdate(req.params.id, req.body));
    } else {
      res.status(400).json({msg: 'Le token est invalide'});
    }
  } catch(err) {
    console.log(err.message);
  } finally {
    mongoose.connection.close();
  }
});
    


/**
 * @openapi
 * /ville/{id}/{token}:
 *   delete:
 *    tags:
 *      - ville
 *    description: Supprime la ville à partir de son id et vérifie si le token est bon
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: id de la ville
 *    - name: token
 *      in: path
 *      required: true
 *      description: token de la ville
 *      schema:
 *        type: number
 *    responses:
 *       200:
 *         description: Résultat de la requête de suppression
 *       500:
 *         description: Une erreur est survenue
 */
router.delete('/:id/:token', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    const ville = await Ville.findById(req.params.id);
    const result = await bcrypt.compare(req.params.token, ville.token);
    if (result) {
      res.json(await Ville.findByIdAndDelete(req.params.id));
    } else {
      res.status(400).json({msg: 'Le token est invalide'});
    }
  } catch(err) {
    console.log(err.message);
  } finally {
    mongoose.connection.close();
  }
});




module.exports = router;