var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://questor:iloveu@ds053638.mongolab.com:53638/questor_db";

// Use connect method to connect to the Server
// var db_connection = MongoClient.connect(url, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', url);




//     //module.exports.db = db;


//   }
// });


var dataAccess = {

    // tasks : single data or array list of data
    insertTasks : function (tasks, callback){
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            }
            else{
                console.log("Insert data into collection task");
                var collection = db.collection('task');
                collection.insert(tasks, function (err, result){
                    if (err) {
                        console.log(err);
                        //return err;
                        callback({
                            status: 0,
                            msg: err
                        })
                    } 
                    else {
                        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                         callback({
                            status: 1,
                            msg: "OK"
                        });
                    }
                });
            }
        });
    }
}

module.exports.dataAccess = dataAccess;

