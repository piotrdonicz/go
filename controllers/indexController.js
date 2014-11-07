'use strict';


var fs = require('fs');
var path = require('path');


/**
 * GET: the home page.
 */
exports.index = function(req, res) {
    res.render('index');
};


/**
 * GET: Return the not found page.
 */
exports.notFound = function(req, res) {
    res.render('not-found');
};


/**
 * GET: the URL to redirect to based on supplied shortUri.
 */
exports.redirect = function(req, res) {
    var shortUri = req.params.shortUri;
    var fullUri;

    // Read in the URLs from a file for testing purposes.
    var filename = path.join(__dirname, '..', 'fixtures', 'urimap.json');

    fs.readFile(filename, function(err, data) {
        // If there is and error reading the file...
        if (err) {
            console.log(filename, __dirname,  err);
            return res.sendStatus(500);
        }

        // If there is an error parsing the file into JSON...
        var uriMap;

        try {
            uriMap = JSON.parse(data);
        } catch (err) {
            console.log('No JSON', err);
            res.sendStatus(500);
        }

        // Redirect
        fullUri = uriMap[shortUri];
        if (fullUri) {
            // TODO: Analytics would go here.
            console.log('Redirecting to ', fullUri);
            res.redirect(fullUri);
        } else {
            console.log('shortUri not found: ' + shortUri);
            // next();
        }
    });
};
