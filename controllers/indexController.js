'use strict';


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
    console.log('Redirecting:', req.goLink);
    // TODO(allard): Analytics would go here.
    res.redirect(req.goLink.longUri);
};
