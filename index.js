/**
 * Go - Brandwatch Internal Custom URL Creator
 *
 *         |
 *        / \
 *       / _ \
 *      |.o '.|
 *      |'._.'|
 *      |     |
 *    ,'|  |  |`.
 *   /  |  |  |  \
 *   |,-'--|--'-.|
 *
 * Main application entry file. This does all the configuration loading, and booting of controllers and custom
 * error handlers. Please note, the order of loading is important.
 */

'use strict';


// Module dependencies.
var bodyParser = require('body-parser');
var config = require('./config');
var exphbs = require('express-handlebars');
var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
// var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var router = require('./controllers');


// Initialise the app.
var app = express();


// Set environment variables - ALL
app.set('port', process.env.PORT || config.http.port);

// Set database.
mongoose.connect(config.mongodb.uri);


// Set view engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set logging.
app.use(morgan('dev'));
app.enable('case sensitive routes');
app.enable('strict routing');

// Set envirionment variables - DEV
if ('development' === app.get('env')) {
    // app.use(express.errorHandler());
}

// Set envirionment variables - PROD
if ('production' === app.get('env')) {
    app.enable('view cache');
}


// Set pre-route Middleware.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// Set Routes.
app.use(router);


// Set post-routing Middleware.
app.use(function(req, res) {
    res.status(404).render('not-found');
});


// Run the server.
var server = app.listen(app.get('port'), function() {
    fs.readFile(path.join(__dirname, 'fixtures', 'LAUNCH_MESSAGE.txt'), 'utf-8', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data);
        console.log('Express server listening on http://localhost:' + app.get('port'));
    });
});
