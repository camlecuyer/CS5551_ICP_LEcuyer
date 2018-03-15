var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://cred:Mon_lock@ds115219.mlab.com:15219/clock";

var insertDocument = function(db, callback) {
    db.collection('users').insertOne( {
        "UserID": 17,
        "FirstName" : "Cameron",
        "LastName" : "LEcuyer",
        "Mobile": "913-555-5555",
        "City":"Shawnee"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into users");
        callback();
    });
};

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected to db");

    var db = client.db('clock');
    insertDocument(db, function() {
        client.close();
    });
});
