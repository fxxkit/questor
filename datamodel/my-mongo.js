var mongodb = require('mongodb'),
    debug = require('debug')('dataAccess');

var MongoClient = mongodb.MongoClient;
var url = "mongodb://questor:iloveu@ds053638.mongolab.com:53638/questor_db";

var dataAccess = {

    /*
    * @param tasks : single data or array list of data
    */
    insertTasks: function(tasks, callback){
        var reqData = tasks,
            dbAction = EnumDbAction.INSERT,
            collectionName = "task";

        this._doQuery(reqData,dbAction,collectionName,function(err,result){
            callback(err,result);
        });

    },

    getTask: function (req_taskId, callback){
        req_taskId = parseInt(req_taskId);
        var reqData = {"taskId": req_taskId},
            dbAction = EnumDbAction.FIND_ONE,
            collectionName = "task";

        this._doQuery(reqData,dbAction,collectionName,function(err, result){
            callback(err,result);
        });
    },

    _doQuery: function(reqData, dbAction, collectionName ,callback){
        MongoClient.connect(url, function(err, db){
            if(err){
                console.log('Unable to connect to the mongoDB server. Error:', err);
            }
            else{
                var collection = db.collection(collectionName);
                // var method = dbAction;
                collection[dbAction](reqData , function (err, result){
                    if(err){
                        // console.log("[DB Error]");
                        // console.log(err);
                        debug("[DB Error]");
                        debug(err);
                        callback(err,"");
                    }
                    else{
                        // console.log()
                        debug("[DB Action Success!]");
                        debug(result);
                        callback("",result);
                    }
                });
            }
        });
    }
}

var EnumDbAction = {
    FIND_ONE: "findOne",
    FIND: "find",
    INSERT: "insert",
}


module.exports.dataAccess = dataAccess;

