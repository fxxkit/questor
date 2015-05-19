var express = require('express'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    debug = require('debug')('handle'),
    mongodb = require('mongodb');

var app = express();

var MongoClient = mongodb.MongoClient;
var url = "mongodb://questor:iloveu@ds053638.mongolab.com:53638/questor_db";

// Use connect method to connect to the Server
var db = MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    //db.close();
  }
});


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
