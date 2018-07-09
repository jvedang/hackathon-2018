var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPromos', function(req, res, next) {
  res.send("You have 20% off on the next purchase at Walmart !");
});

module.exports = router;
