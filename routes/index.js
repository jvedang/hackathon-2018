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

    var value = req.body.result.parameters['Promos'];
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"fulfillmentText" : "You have 20% off now on "+ value +" !"}));
});

module.exports = router;
