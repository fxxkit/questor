var express     = require('express'),
    router      = express.Router(),
    mock_data   = require('../mock_data/task-data'),
    debug       = require('debug')('api'),
    db          = require('../datamodel/my-mongo');

//REST API

/*
    @GET /api/tasks/<taskId>[&mock=true]
*/
router.get('/tasks/:_id([0-9]{1,8})', function (req, res) {
    debug('get task id:', taskId);
    var taskId = req.params._id;

    if(req.query.mock){
        res.send(mock_data._mock_allTasks[taskId]);
    }
    else{
        db.dataAccess.getTask(taskId, function(err, data){
            if(!err){
                res.send(data);
            }
            else{
                res.send("");
            }
        })    
    }
});

/*
    @POST /api/tasks (feed)
*/
router.post('/tasks',function  (req,res) {
    var taskData = null;

    if(req.query.mock){
        taskData = mock_data._mock_allTasks;        
    }
    else{
        // Need To Add!
    }

    db.dataAccess.insertTasks(taskData,function(err, data){
        //console.log(data);
        res.send(data);
    });
});

/*
    @PUT /api/tasks (update)
*/
router.post('/tasks',function(req,res){

});

/*
    @GET /api/tasks/near?nrthEstLat=25.0562402&nrthEstLng=121.6241145&sthWstLat=25.0562402&sthWstLng=121.6241145
    [&mock=true]
*/
router.get('/tasks/near', function (req, res){
    var borderData = {
        nrthEstLat : parseFloat(req.query.nrthEstLat),
        nrthEstLng : parseFloat(req.query.nrthEstLng),
        sthWstLat : parseFloat(req.query.sthWstLat),
        sthWstLng : parseFloat(req.query.sthWstLng)
    };

    debug(req.query);
    if(req.query.mock){
        var resData = null; 
        //All mock data
        resData = mock_data._mock_allTasks.filter(function(obj){
            return obj.lat >= borderData.sthWstLat && obj.lat <= borderData.nrthEstLat
                && obj.lng >= borderData.sthWstLng && obj.lng <= borderData.nrthEstLng
        });

        res.send(resData);   
    }
    else{
        db.dataAccess.getNearByTasks(borderData,function(err,data){
            if(!err){
                debug(data);
                res.send(data);
            }
            else{
                res.send("");
            }
        });
    }    
});

/*
    @GET /api/tasks/my?uid=5566[&mock=true] 
    (Need to change to session!!!)
*/
router.get('/tasks/my', function (req,res){
    var uid = req.query.uid;
    if(req.query.mock){
        var resData = mock_data._mock_allTasks.filter(function(obj){
            return obj.owner_uid == uid;
            
        });
        res.send(resData);
    }
    else{
        db.dataAccess.getMyTaskList(uid,function(err,data){
            if(!err){
                debug(data);
                res.send(data);
            }
            else{
                debug(err);
                res.send("");
            }
        });
    }
});


/*
    @POST /api/login/
*/

module.exports = router;
