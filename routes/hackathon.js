var express = require('express');
const fs = require('fs');
var router = express.Router();

router.post('/hackathonServices', function(req, res) {

    console.log(JSON.parse(req.body.originalDetectIntentRequest.payload.user));
    var actionType = req.body.queryResult.parameters['actionType'];
    var firstName = req.body.queryResult.parameters['firstName'];
    var lastName = req.body.queryResult.parameters['lastName'];
    var emailAddress = req.body.queryResult.parameters['emailAddress'];
    console.log(actionType+" "+firstName+" "+lastName+" "+emailAddress);
    var returnString;

    switch (actionType) {
        case "offers" :
        case "Offers":
        case "deals":
        case "Deals":
        case "promotions":
        case "Promotions":
            returnString = getOffers();
            break;
        case "enrollment":
        case "Enrollment":
        case "Enroll":
        case "create an account":
            returnString = enrollUser(firstName,lastName,emailAddress);
            break;
       default:
            returnString = "Something went wrong, Please try again";
    }

    console.log(returnString);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"fulfillmentText" : returnString}));
});

// function getOffers() {
//
//     var responseFromAPI = testString;
//
//     var jsonForResponse = JSON.parse(responseFromAPI);
//
//     var offers = jsonForResponse.Offers;
//
//     var returnString = "";
//
//     offers.forEach(function(offer) {
//         var validity = "from " + offer.validityFromDate + " until "+ offer.validityToDate;
//         var offerName = offer.offerShortDescription['text'];
//          returnString  +=  offerName + " " +validity +" ";
//     });
//
//     return returnString;
//
// };

function getOffers() {
    var responseFromAPI = testString;
    actualOffers = JSON.parse(responseFromAPI);
    var offers = actualOffers.Offers;
    var returnString = "";
    var index = 1;
    offers.forEach(function(offer) {
        if(offer.indexNumber == 1 || offer.indexNumber == 40 ) {
            var validity = "and is valid from " + offer.validityFromDate + " till " + offer.validityToDate;
            var offerName = offer.offerShortDescription['text'];
            returnString += "Offer number " + index + " is " + offerName + " " + validity + ". ";
            console.log("the returnString is " + returnString);
            ++index;
        }

    });
    return returnString;
}

function enrollUser(firstName, lastName, emailAddress) {
    var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    var users = obj.Users;

    for(var i=0 ; i < users.length; i++) {
        var storedEmailAddress =  users[i]["emailAddress"];
        console.log("StoredEmail :" +storedEmailAddress);
        console.log("Email: "+ emailAddress);
        if(storedEmailAddress.toString().trim() == emailAddress.toString().trim()) {
            console.log("Inside");
            return "Hi "+firstName + ", you already have an account in Visa Checkout";
        }
    }
    // users.forEach(function(user) {
    //
    // });

    users.push({"emailAddress": ""+emailAddress+"", "firstName": ""+firstName+"", "lastName": ""+lastName+""});
    obj = JSON.stringify(obj);
    try {
        fs.writeFileSync('users.json', obj);
        return "Hi "+firstName+", you have successfully enrolled in Visa Checkout";
    }catch(err) {
        return "Could not enroll, Please try again";
    }
}

// var testString = "{" +
//     "\"Offers\" : [{" +
//     "\"validityFromDate\" : \"Sep 15, 2014 GMT\"," +
//     "\"validityToDate\" : \"Dec 31, 2018 GMT\"," +
//     "\"offerShortDescription\" : {\n" +
//     "\"richText\" : \"Save $10 on $75 or more at acehardware.com\"," +
//     "\"text\" : \"Save $10 on $75 or more at acehardware.com\"" +
//     "}" +
//     "" +
//     "}, {" +
//     "\"validityFromDate\" : \"Dec 30, 2016 GMT\"," +
//     "\"validityToDate\" : \"Sep 31, 2018 GMT\"," +
//     "\"offerShortDescription\" : {" +
//     "\"richText\" : \"Save $20 on $100 or more at Frette\"," +
//     "\"text\" : \"Save $20 on $100 or more at Frette\"" +
//     "}" +
//     "}]" +
//     "}";
var testString = "{" +
    "\"Offers\" : [{" +
    "\"indexNumber\": 1,"+
    "\"validityFromDate\" : \"Sep 15, 2014\"," +
    "\"validityToDate\" : \"Dec 31, 2018\"," +
    "\"offerShortDescription\" : {\n" +
    "\"richText\" : \"Pay with Visa Checkout and get $20 oﬀ your $100+ UnderArmour.com order\"," +
    "\"text\" : \"Pay with Visa Checkout and get $20 oﬀ your $100+ UnderArmour.com order\"" +
    "}" +
    "}, {" +
    "\"indexNumber\": 2,"+
    "\"validityFromDate\" : \"Sep 15, 2014\"," +
    "\"validityToDate\" : \"Dec 31, 2018\"," +
    "\"offerShortDescription\" : {\n" +
    "\"richText\" : \"Save $11 on $75 or more at acehardware.com\"," +
    "\"text\" : \"Save $11 on $75 or more at acehardware.com\"" +
    "}" +
    "}, {" +
    "\"indexNumber\": 40,"+
    "\"validityFromDate\" : \"Dec 30, 2016\"," +
    "\"validityToDate\" : \"Sep 31, 2018\"," +
    "\"offerShortDescription\" : {" +
    "\"richText\" : \"Get $10 off when you shop at Presidio Coffee and Tea\"," +
    "\"text\" : \"Get $10 off when you shop at Presidio Coffee and Tea using Visa Checkout\"" +
    "}" +
    "}]" +
    "}";
module.exports = router;
