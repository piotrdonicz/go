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
// var errorhandler = ('errorhandler');
var exphbs = require('express-handlebars');
var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
// var methodOverride = require('method-override');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var router = require('./routes');
var session = require('express-session');


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: '220594915165-cojb9eledf6ejpq2ivosc8umd2epam71.apps.googleusercontent.com',
        clientSecret: 'HClBfN5WAPZlhSna4GrkD8Ez',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile._json.hd === 'brandwatch.com') {
            process.nextTick(function() {
                return done(null, profile);
            });
        } else {
            done(new Error('Invalid host domain'));
        }

    }
));


// Set database.
mongoose.connect(config.mongodb.uri);


// Initialise the app.
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));  //
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || config.http.port);


app.use(morgan('dev'));  // Logging
// Favicon and Static paths need to go before Session middleware to avoid superfluous session creation.
app.use(favicon(path.join('.', 'public', 'favicon.ico')));
app.use(express.static(path.join('.', 'public')));
// TODO(allard); Does this need to be pulled out?
app.use(session({secret: 'keyboard cat'}));  // Session Auth
app.use(passport.initialize());
app.use(passport.session());
// TODO(allard); This probably needs to go somewhere nice.
app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// Set envirionment variables - DEV
// if (process.env.NODE_ENV === 'development') {
//     app.use(errorhandler());
// }

// Set envirionment variables - PROD
// if (app.get('env') === 'production') {
//     app.enable('view cache');
// }

app.use(bodyParser.urlencoded({extended: false}));
app.use(router);  // Routes


// Run the server.
app.listen(app.get('port'), function() {
    fs.readFile(path.join(__dirname, 'fixtures', 'LAUNCH_MESSAGE.txt'), 'utf-8', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data);
        console.log('Express server listening on http://localhost:' + app.get('port'));
    });
});
