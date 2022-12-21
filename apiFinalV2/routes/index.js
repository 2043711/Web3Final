var express = require('express');
var router = express.Router();

/* GET la page d'index */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sus' });
});

module.exports = router;