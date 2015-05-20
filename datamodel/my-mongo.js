var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://questor:iloveu@ds053638.mongolab.com:53638/questor_db";

// Use connect method to connect to the Server
var db_connection = MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    //Close connection
    //db.close();
  }
});

module.exports.db_connection = db_connection;