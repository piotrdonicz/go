'use strict';

// Module dependencies.
var express = require('express');
var app = express();

// Routing
app.get('/', function(req, res) {
    res.send('Hello World');
});

// Server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
