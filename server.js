'use strict';


// Module dependencies.
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var routes = require('./routes');


var app = express();


app.use(bodyParser.urlencoded({extended: false}));


// Set templating engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Routing
app.get('/', routes.index);
app.post('/create-link', routes.shorten);
app.get('/not-found', routes.notFound);
app.get('/:shortcode', routes.redirect);


// Server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
