var express = require('express');
var router = express.Router();

router.post('/hackathonServices', function(req, res) {

    var actionType = req.body.queryResult.parameters['actionType'];
    var returnString;

    switch (actionType) {
        case "offers":
            returnString = getOffers();
            break;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"fulfillmentText" : returnString}));
});

function getOffers() {

    var responseFromAPI = testString;

    var jsonForResponse = JSON.parse(responseFromAPI);

    var offers = jsonForResponse.Offers;

    var returnString = "";

    offers.forEach(function(offer) {
        var validity = "from " + offer.validityFromDate + " until "+ offer.validityToDate;
        var offerName = offer.offerShortDescription['text'];
         returnString  +=  offerName + " " +validity +" ";
    });

    return returnString;

};

var testString = "{" +
    "\"Offers\" : [{" +
    "\"validityFromDate\" : \"Sep 15, 2014 GMT\"," +
    "\"validityToDate\" : \"Dec 31, 2018 GMT\"," +
    "\"offerShortDescription\" : {\n" +
    "\"richText\" : \"Save $10 on $75 or more at acehardware.com\"," +
    "\"text\" : \"Save $10 on $75 or more at acehardware.com\"" +
    "}" +
    "" +
    "}, {" +
    "\"validityFromDate\" : \"Dec 30, 2016 GMT\"," +
    "\"validityToDate\" : \"Sep 31, 2018 GMT\"," +
    "\"offerShortDescription\" : {" +
    "\"richText\" : \"Save $20 on $100 or more at Frette\"," +
    "\"text\" : \"Save $20 on $100 or more at Frette\"" +
    "}" +
    "}]" +
    "}";
module.exports = router;
