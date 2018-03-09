var request = require('request');

var date = new Date();

//request('http://numbersapi.com/' + (date.getMonth() + 1)+ '/' + date.getDate() + '/date?json', function (error, response, body) {
request("https://api.indix.com/v2/summary/products?countryCode=US&q=dress&app_key=w2xqtl4uBXLJnCk0zscGrt86TEh80bmx", function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }

    body = JSON.parse(body);
    //var ven = body.text;
    var ven = body.result.products[0];

    console.log(ven);

});