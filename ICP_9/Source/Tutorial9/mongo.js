
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');
var url = require('url');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var fs = require("fs");
var urlDB = "mongodb://cred:Mon_lock@ds115219.mlab.com:15219/clock";

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/index.js', function(req, res,next) {
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

app.post('/register/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var data = pathname.substr(10, pathname.length - 1);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('clock');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        findUserwithMobile(db, data, function() {
            console.log("Successfully selected");
            client.close();
        });
    });
});

var findUserwithMobile = function(db,data,callback) {
    var cursor = db.collection('users').find(data);
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("ID: " + doc.UserID);
            console.log("First Name: " + doc.FirstName);
            console.log("Last Name: " + doc.LastName);
            console.log("City: " + doc.City);
        }
    });
};

console.log('Client Server running at http://127.0.0.1:8081/');