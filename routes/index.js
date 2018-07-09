var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPromos', function(req, res, next) {
  res.send("You have 20% off on the next purchase at Walmart !");
});

router.post('/getPromos', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.stringify("{\"name\":\"Get 20% discount on your products now!\""));
});

module.exports = router;
