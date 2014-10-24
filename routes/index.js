/**
 * GET: Return the home page containing an empty form.
 */
exports.index = function(req, res) {
    res.render('index');
};


/**
 * POST: Process a submitted URL.
 */
// TODO


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
    var shortcode = req.params.shortcode;
    var exists = false;
    var fullURI = '';

    // Look up shortcode in DB
    if (shortcode == 'bw') {
        exists = true;
        fullURI = 'http://www.brandwatch.com/';
    }

    // Redirect
    if (exists) {
        res.redirect(fullURI);
    } else {
        res.redirect('/not-found');
    }
};
