var request = require('request');

var date = new Date();

request('http://numbersapi.com/' + (date.getMonth() + 1)+ '/' + date.getDate() + '/date?json', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }

    body = JSON.parse(body);
    var ven = body.text;

    console.log(ven);

});