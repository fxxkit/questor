var express = require('express'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    debug = require('debug')('handle'),
    mock_data = require('./mock_data/task-data');
    //db_connection = require('./datamodel/my-mongo');     

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


// server route
app.get('/', function (req, res, next) {
    res.render('index', {
        title: "Home"
    });
});

app.get('/greeting', function (req, res) {
    res.render('greeting', {
        title: "Hola!",
        name: req.query.name
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
    @GET /api/tasks/near?lat=25.0562402&lon=121.6241145
*/
app.get('/api/tasks/near', function (req, res){
    var lat = req.query.lat;
    var lon = req.query.lon;

    debug(req.query);

    // collect nearby tasks by filtering taskId in allTasks
    var nearbytasks =  mock_data._mock_nearbyTask.nearbyTaskIdList.map(function (taskId, idx) {
        return mock_data._mock_allTasks[idx];
    });
    res.send(nearbytasks);
});
