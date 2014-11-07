#!/usr/bin/env node

'use strict';


/**
 * Prepopulates the local database with some Go-links read from file.
 */
var goLinks = require('../fixtures/goLinksFixture.json');
var mongoose = require('mongoose');


// Connect to database.
// TODO(allard); Move all of this DB stuff into config or sth.
mongoose.connect('mongodb://localhost:27017/go?auto_reconnect');

var GoLinkSchema = new mongoose.Schema({
    shortUri: String,
    longUri: String,
    owner: String
});

var GoLinkModel = mongoose.model('golinks', GoLinkSchema);


var count = 0;

goLinks.forEach(function(goLink) {
    new GoLinkModel({
        shortUri: goLink.shortUri,
        longUri: goLink.longUri,
        owner: goLink.owner
    }).save(function(err, docs) {
        if (err) {
            console.err('Failed to save go-link: ', goLink, err);
            process.exit(-1);
        }

        count++;

        if (count >= goLinks.length) {
            console.log('Successfully added', count, 'go-links to the database.');
            process.exit(0);
        }
    });
});

