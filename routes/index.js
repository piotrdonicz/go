'use strict';


var fs = require('fs');
var path = require('path');


/**
 * GET: Return the home page containing an empty form.
 */
exports.index = function(req, res) {
    res.render('index');
};


/**
 * POST: Process a submitted URL.
 */
exports.shorten = function(req, res) {
    var fullUri = req.body.fullUri;
    var shortUri = req.body.shortUri;

    // TODO: Put the redirect into the DB here
    console.log('Shortening ' + fullUri + ' to ' + shortUri);

    res.redirect('/');
};


/**
 * GET: Return the not found page.
 */
exports.notFound = function(req, res) {
    res.render('not-found');
};


/**
 * GET: Determines the URL to redirect to based on supplied shortcode.
 */
exports.redirect = function(req, res) {
    var shortUri = req.params.shortcode;
    var fullUri = '';

    // Read in the URLs from a file for testing purposes.
    var filename = path.join(__dirname, '..', 'fixtures', 'urimap.json');

    fs.readFile(filename, function(err, data) {
        // If there is and error reading the file...
        if (err) {
            console.log(filename, __dirname,  err);
            return res.sendStatus(500);
        }

        // If there is an error parsing the file into JSON...
        try {
            var uriMap = JSON.parse(data)
            console.log(uriMap);
        } catch (err) {
            console.log('No JSON', err);
            res.sendStatus(500);
        }

        // Redirect
        if (fullUri = uriMap[shortUri]) {
            // TODO: Analytics would go here.
            res.redirect(fullUri);
        } else {
            console.log('shortUri not found: ' + shortUri)
            res.render('not-found');
        }
    });
};
