'use strict';

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
    var exists = false;
    var fullUri = '';

    // TODO: Look up shortcode in DB here.
    if (shortUri === 'bw') {
        exists = true;
        fullUri = 'http://www.brandwatch.com/';
    }

    // Redirect
    if (exists) {
        // TODO: Analytics would go here.
        res.redirect(fullUri);
    } else {
        res.redirect('/not-found');
    }
};
