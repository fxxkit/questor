var mongodb = require('mongodb'),
    debug = require('debug')('dataAccess');

var MongoClient = mongodb.MongoClient;
var url = "mongodb://questor:iloveu@ds053638.mongolab.com:53638/questor_db";

var dataAccess = {

    /*
    * @param tasks : single data or array list of data
    */
    insertTasks: function(tasks, callback){
        var dbReq = tasks,
            dbAction = EnumDbAction.INSERT,
            collectionName = "task";

        this._doQuery(dbReq,dbAction,collectionName,function(err,result){
            callback(err,result);
        });

    },

    getTask: function (req_taskId, callback){
        req_taskId = parseInt(req_taskId);
        var dbReq = {"taskId": req_taskId},
            dbAction = EnumDbAction.FIND_ONE,
            collectionName = "task";

        this._doQuery(dbReq,dbAction,collectionName,function(err, result){
            callback(err,result);
        });
    },

    getNearByTasks: function(borderData,callback){
        //Force convert type
        borderData.nrthEstLat = parseFloat(borderData.nrthEstLat);
        borderData.nrthEstLng = parseFloat(borderData.nrthEstLng);
        borderData.sthWstLat = parseFloat(borderData.sthWstLat);
        borderData.sthWstLng = parseFloat(borderData.sthWstLng);

        debug(" = getNearByTasks =");
        debug(borderData);

        var dbReq = { "lat" : {$gte: borderData.sthWstLat, $lte:borderData.nrthEstLat}, 
                      "lng" : {$gte: borderData.nrthEstLng , $lte: borderData.sthWstLng}},
            dbAction = EnumDbAction.FIND,
            collectionName = "task";

        this._doQuery(dbReq,dbAction,collectionName,function(err, result){
            callback(err,result);
        });
    },

    _doQuery: function(dbReq, dbAction, collectionName ,callback){
        MongoClient.connect(url, function(err, db){
            if(err){
                console.log('Unable to connect to the mongoDB server. Error:', err);
                db.close();
            }
            else{
                var collection = db.collection(collectionName);
                if(dbAction == EnumDbAction.FIND){
                    collection[dbAction](dbReq).toArray(function (err,result){
                        if(err){
                            debug("[DB Action Error!]");
                            debug(err);
                            callback(err,"");
                        }
                        else{
                            debug("[DB Action Success!]");
                            debug(result);
                            callback("",result);
                        }
                        db.close();
                    });
                }
                else{
                    collection[dbAction](dbReq , function (err, result){
                        if(err){
                            debug("[DB Action Error!]");
                            debug(err);
                            callback(err,"");
                        }
                        else{
                            debug("[DB Action Success!]");
                            debug(result);
                            callback("",result);
                        }
                        db.close();
                    });  
                }
            }
        });
    }
}

var EnumDbAction = {
    FIND_ONE: "findOne",
    FIND: "find",
    INSERT: "insert",
    UPDATE: "update"
}


module.exports.dataAccess = dataAccess;

