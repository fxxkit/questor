var express = require('express'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    debug = require('debug')('handle'),
    mock_data = require('./mock_data/task-data'),
    db = require('./datamodel/my-mongo');

var app = express();

// view engine setup
app.engine('.tpl', exphbs({
    defaultLayout: 'single', 
    extname: '.tpl'
}));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// set the template root to /views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.tpl');

var selectPage = function (tab) {
    return {
        explore: tab === "explore",
        mytasks: tab === "mytasks",
        create:  tab === "create",
        setting: tab === "setting"
    }
};

// server route
app.get('/', function (req, res, next) {
    res.render('index', {
        title: "Home",
        page: selectPage('explore')
    });
});

app.get('/mytasks', function (req, res) {
    var myTasks = mock_data._mock_myTask.myTaskIdList.map(function(taskId, idx){
        return mock_data._mock_allTasks[taskId]
    });
    debug(myTasks);
    res.render('mytasks', {
        tasks: myTasks,
        name: req.query.name,
        page: selectPage('mytasks')
    });
});

app.get('/create', function (req, res) {
    res.render('create', {
        page: selectPage('create')
    });
});

app.get('/setting', function (req, res) {
    res.render('setting', {
        page: selectPage('setting')
    });
});

// start the server
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});




//REST API
app.get('/api', function (req, res) {
    res.send('Questor API is running');
});

/*
    @GET /api/tasks/<taskId>
*/
app.get('/api/tasks/:_id([0-9]{1,8})', function (req, res) {
    var taskId = req.params._id;
    debug('get task id:', taskId);
    res.send(mock_data._mock_allTasks[taskId]);
});

/*
    @POST /api/tasks
*/
app.post('/api/tasks',function  (req,res) {
    var testData = [{
        "name": "Rose", 
        "title": "depurative and infrabranchial", 
        "taskId": 5, 
        "lat": 25.05964, 
        "lng": 121.652214, 
        "type": "Washoan"
        },
        {
        "name": "Ronalda", 
        "title": "semibalked and asomatous", 
        "taskId": 0, 
        "lat": 25.05674, 
        "lng": 121.596615, 
        "type": "Waaaaaaxxxxxxxllach"
    }];
    db.dataAccess.insertTasks(testData,function(data){
        console.log(data);
        res.send(data);
    });
});

/*
    @GET /api/tasks/near?nrthEstLat=25.0562402&nrthEstLng=121.6241145&sthWstLat=25.0562402&sthWstLng=121.6241145
        nrthEstLat : North East border lat
        nrthEstLng : North East border lng
        sthWstLat  : South West border lat
        sthWstLng  : South West border lng
*/
app.get('/api/tasks/near', function (req, res){
    var nrthEstLat = req.query.nrthEstLat;
    var nrthEstLng = req.query.nrthEstLng;
    var sthWstLat = req.query.sthWstLat;
    var sthWstLng = req.query.sthWstLng;

    debug(req.query);

    // collect nearby tasks by filtering taskId in allTasks
    // var nearbytasks =  mock_data._mock_nearbyTask.nearbyTaskIdList.map(function (taskId, idx) {
    //    return mock_data._mock_allTasks[idx];
    // });
    var nearbytasks = mock_data._mock_allTasks;
    res.send(nearbytasks);
});

/*
    @GET /api/tasks/my?uid=5566
*/
app.get('/api/tasks/my', function (req,res){
    var uid = req.query.uid;
    res.send('You are ' + uid);
});


/*
    @POST /api/login/
*/

