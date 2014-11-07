'use strict';


// Module dependencies.
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');
// var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');


// Controllers
var indexController = require('./controllers/indexController');
// var goLink = require('./controllers/goLink');


// Initialise the app.
var app = express();


// Set envirionment variables - ALL
app.set('title', 'Go');
app.set('port', process.env.PORT || 3000);

// Set database.
mongoose.connect('mongodb://localhost:27017/go?auto_reconnect');

// Schema
// TODO(allard): the schemas needs to moved to a seperate file or sth.
// var UserSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });
var GoLinkSchema = new mongoose.Schema({
    shortUri: String,
    longUri: String,
    owner: String
});

// var userModel = mongoose.model('users', UserSchema);
var GoLinkModel = mongoose.model('golinks', GoLinkSchema);


// Set view engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set logging.
app.use(morgan('dev'));

app.enable('case sensitive routes');
app.enable('strict routing');

// Set envirionment variables - DEV
// if ('development' === app.get('env')) {
//   // empty
// }

// Set envirionment variables - PROD
if ('production' === app.get('env')) {
    app.enable('view cache');
}


// Set pre-route Middleware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// Routing
app.get('/', indexController.index);
// app.post('/go-link', goLink.add);
// app.delete('/go-link/:link_id', links.delete);
// app.get('/not-found', indexController.notFound);
// app.get('/:shortUri', indexController.redirect);


// START PRACTICE!!!
// TODO(allard): All of this needs to be moved to it's corresponding modules.
app.param('shortUri', function(req, res, next, shortUri) {
    console.log('Matching shortUri: ' + shortUri);
    GoLinkModel.find({shortUri: shortUri}, function(err, docs) {
        if (err) {
            res.json(err);
        }
        console.log(docs);
        req.goLink = docs[0];
        next();
    });
});
app.get('/go-link', function(req, res) {
    // Show all links
    GoLinkModel.find({}, function(err, docs) {
        res.json(docs);
    });
});
app.post('/go-link', function(req, res) {
    // Create a new link
    var b = req.body;
    new GoLinkModel({
        shortUri: b.shortUri,
        longUri: b.longUri,
        owner: 'null'
    }).save(function(err, docs) {
        if (err) {
            res.json(err);
        }
        res.redirect('/');
    });
});
app.get('/go-link/:shortUri', function(req, res) {
    // Show single link.
    res.json(req.goLink);
});
app.get('/:shortUri', function(req, res) {
    // Redirect
    console.log(res.goLink);
    var longUri = req.goLink.longUri;
    console.log('Redirecting to ', longUri);
    res.redirect(longUri);
});
// END PRACTICE!!!


// Set post-routing Middleware.
app.use(function(req, res) {
    res.status(404).render('not-found');
});


// Run the server.
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});
