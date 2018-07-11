var express = require('express');
const fs = require('fs');
var router = express.Router();

router.post('/hackathonServices', function(req, res) {
    
    console.log(req.body.originalDetectIntentRequest.payload['user']);
    console.log(req.body.originalDetectIntentRequest.payload['inputs']);
    console.log(req.body.originalDetectIntentRequest.payload['conversation']);
    var actionType = req.body.queryResult.parameters['actionType'];
    var firstName = req.body.queryResult.parameters['firstName'];
    var lastName = req.body.queryResult.parameters['lastName'];
    var emailAddress = req.body.queryResult.parameters['emailAddress'];
    var userId = req.body.originalDetectIntentRequest.payload['user.userId'];
    var action = req.body.queryResult['action'];
    console.log(actionType+" "+firstName+" "+lastName+" "+emailAddress);
    var returnString;

    if(action == "input.welcome") {
        var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));

        var users = obj.Users;

        for(var i=0 ; i < users.length; i++) {
            var storedUserId =  users[i]["userId"];
            var firstName = users[i]['firstName'];
            console.log("storedUserId :" +storedUserId);
            console.log("userId: "+ userId);
            if(storedUserId.toString().trim() == userId.toString().trim()) {
                console.log("Inside");
                return "Hi "+firstName + ", Welcome to Visa Checkout, how can I help you?";
            } else {
                return "Welcome to Visa Checkout, how can I help you?";
            }
        }
    }
    switch (actionType) {
        case "offers" :
        case "Offers":
        case "deals":
        case "Deals":
        case "promotions":
        case "Promotions":
        case "Discounts":
        case "discounts":
            returnString = getOffers();
            break;
        case "enrollment":
        case "Enrollment":
        case "Enroll":
        case "create an account":
        case "Create an account":
        case "Create Account":
            returnString = enrollUser(firstName,lastName,emailAddress);
            break;
       default:
            returnString = "Something went wrong, Please try again";
    }

    console.log(returnString);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"fulfillmentText" : returnString}));
});

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

function enrollUser(firstName, lastName, emailAddress, userId) {
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

    users.push({"emailAddress": ""+emailAddress+"", "firstName": ""+firstName+"", "lastName": ""+lastName+"", "userId": ""+userId+""});
    obj = JSON.stringify(obj);
    try {
        fs.writeFileSync('users.json', obj);
        return "Hi "+firstName+", you have successfully enrolled in Visa Checkout";
    }catch(err) {
        return "Could not enroll, Please try again";
    }
}

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
