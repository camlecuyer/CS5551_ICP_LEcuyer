/**
 * Created by Marmik on 04/10/2016.*/
var http = require('http');
var fs = require("fs");
var url = require('url');
var cors = require('cors');
var express = require('express');
var request = require('request');

var app = express();
app.use(cors());
var httpServer = http.createServer(app);
httpServer.listen(8081);

app.all('/', function(req,res,next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

app.get('/index.html', function(req, res,next) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            //Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'});

            // Write the content of the file to response body
            res.write(data.toString());
        }
        // Send the response body
        res.end();
    });
});

app.get('/app.js', function(req, res,next) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            //Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'});

            // Write the content of the file to response body
            res.write(data.toString());
        }
        // Send the response body
        res.end();
    });
});

app.get('/app.css', function(req, res,next) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            //Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'});

            // Write the content of the file to response body
            res.write(data.toString());
        }
        // Send the response body
        res.end();
    });
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
console.log('Client Server running at http://127.0.0.1:8081/');