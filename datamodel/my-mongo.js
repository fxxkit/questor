var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://questor:iloveu@ds053638.mongolab.com:53638/questor_db";

var dataAccess = {

    // tasks : single data or array list of data
    insertTasks : function (tasks, callback){
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            }
            else{
                console.log("Insert data into task collection");
                var collection = db.collection('task');
                collection.insert(tasks, function (err, result){
                    if (err) {
                        console.log(err);
                        //return err;
                        callback(err,"");
                    } 
                    else {
                        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                         callback("","OK");
                    }
                    db.close();
                });
            }
        });
    },

    getTask: function (req_taskId, callback){
        req_taskId = parseInt(req_taskId);
        MongoClient.connect(url, function(err, db){
            if(err){
                console.log('Unable to connect to the mongoDB server. Error:', err);
            }
            else{
                console.log(" = get task from task collection = ");
                var collection = db.collection('task');

                //db.task.find( {taskId : 1 }  ).
                collection.findOne({"taskId": req_taskId}, function (err,result){
                    if(err){
                        console.log(err);
                        callback(err, "");
                    }
                    else{
                        console.log(result);
                        callback("", result);
                    }
                    db.close();
                });
            }
        });
    }
}

module.exports.dataAccess = dataAccess;

