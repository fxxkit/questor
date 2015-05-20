var express = require('express'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    debug = require('debug')('handle'),
    db_connection = require('./datamodel/my-mongo');     

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
    @GET /api/mytask?uid=12345
*/
app.get('/api/myTask', function (req, res) {
    var uid = req.query.uid;
    var mock_response = {
        uid: uid,
        taskList: [
            {
                title: 'HAHAHA_TASK',
                type: 'running'        
            },
            {
                title: 'BABABA_TASK',
                type: 'poopoo'        
            },
            {
                title: 'GGG_TASK',
                type: 'sockmydxxk'        
            }
        ]
        
    };
    res.send(mock_response);
});

/*
    @GET /api/nearbyTask?lat=25.0562402&lng=121.6241145
*/
app.get('/api/nearbyTask', function (req, res){
    var lat = req.query.lat;
    var lng = req.query.lng;
    var mock_response = {
        query_lat: lat,
        query_lng: lng,
        nearbyTaskIdList: [1,2,3,4,5,6,7,8,9]
    }
    res.send(mock_response);
});
