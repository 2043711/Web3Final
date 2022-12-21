var express = require('express');
var router = express.Router();
const mongo = require("mongodb");
const mongoose = require('mongoose');
const { token } = require('morgan');
const ville = require('../models/ville');
const Ville = require('../models/ville');
const bcrypt = require('bcrypt');

//Get les ville but do not show the token
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

//Get les villes par nom
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


//Get les villes par region
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



//Post une ville en verifiant si elle existe deja bycrypt le token
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


//Update une ville par id et verifie si le token est bon crypter
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
    


//delete une ville par id avec verification du token
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