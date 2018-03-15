var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://cred:Mon_lock@ds115219.mlab.com:15219/clock";

var findUserwithName = function(db,callback) {
    var cursor = db.collection('users').find({"Mobile":"913-555-5555"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("ID:" + doc.UserID);
            console.log("First Name:" + doc.FirstName);
            console.log("Last Name:" + doc.LastName);
            console.log("City:" + doc.City);
        }
    });
}

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected to db");

    var db = client.db('clock');
    findUserwithName(db, function() {
        client.close();
    });
});