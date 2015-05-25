var express     = require('express'),
    router      = express.Router(),
    mock_data   = require('../mock_data/task-data'),
    debug       = require('debug')('handle'),
    db          = require('../datamodel/my-mongo');

//REST API

/*
    @GET /api/tasks/<taskId>
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
    @GET /api/tasks/near?nrthEstLat=25.0562402&nrthEstLng=121.6241145&sthWstLat=25.0562402&sthWstLng=121.6241145
*/
router.get('/tasks/near', function (req, res){
    var borderData = {
        nrthEstLat : req.query.nrthEstLat,
        nrthEstLng : req.query.nrthEstLng,
        sthWstLat : req.query.sthWstLat,
        sthWstLng : req.query.sthWstLng
    };

    debug(req.query);
    if(req.query.mock){
        var resData = null;
        //The data in _mock_nearbyTask
        //resData =  mock_data._mock_nearbyTask.nearbyTaskIdList.map(function (taskId, idx) {
        //   return mock_data._mock_allTasks[idx];
        //});    
        //All mock data
        resData = mock_data._mock_allTasks;

        res.send(resData);   
    }
    else{
        db.dataAccess.getNearByTasks(borderData,function(err,data){
            if(!err){
                res.send(data);
            }
            else{
                res.send("");
            }
        });
    }    
});

/*
    @GET /api/tasks/my?uid=5566
*/
router.get('/tasks/my', function (req,res){
    var uid = req.query.uid;
    res.send('You are ' + uid);
});


/*
    @POST /api/login/
*/

module.exports = router;
