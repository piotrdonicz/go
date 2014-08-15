'use strict';

// Module dependencies.
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// Set templating engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routing
app.get('/', function(req, res) {
    res.render('home');
});

// Server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
