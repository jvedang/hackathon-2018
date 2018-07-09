var express = require('express');
var router = express.Router();

router.post('/hackathonServices', function(req, res) {

    var actionType = req.body.queryResult.parameters['actionType'];

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"fulfillmentText" : actionType}));
});

module.exports = router;
