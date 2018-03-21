/**
 * Created by Marmik on 04/10/2016.*/
var url = require('url');
var cors = require('cors');
var express = require('express');
var request = require('request');

var app = express();
app.use(cors());
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.all('/', function(req,res,next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/api/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var data = pathname.substr(5, pathname.length - 1);

   request("https://api.indix.com/v2/summary/products?countryCode=US&q="+ data + "&app_key=w2xqtl4uBXLJnCk0zscGrt86TEh80bmx", function (error, response, body) {
       //Check for error
       if (error) {
           return console.log('Error:', error);
       }

       //Check for right status code
       if (response.statusCode !== 200) {
           return console.log('Invalid Status Code Returned:', response.statusCode);
       }

       body = JSON.parse(body);
       var ven = body.text;
      ven = JSON.stringify(body.result.products[0]);
       res.send(ven);
   });
});

app.listen(port, function() {
    console.log('app running')
})
console.log('Client Server running at http://127.0.0.1:8080/');