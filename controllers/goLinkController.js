'use strict';


/**
 * POST: Create a submitted Go link.
 */
exports.add = function(req, res, next) {
    if (!req.body || !req.body.longUri || !req.body.shortUri) {
        return next(new Error('No URL data provided.'));
    }

    var longUri = req.body.longUri;
    var shortUri = req.body.shortUri;

    req.db.links.save({
        longUri: longUri,
        shortUri: shortUri,
        owner: 'unknown',
        follows: []
    }, function(err, link) {
        if (err) {
            return next(err);
        }

        if (!link) {
            return next(new Error('Failed to save.'));
        }

        console.info('Added %s with id=%s', link.shortUri, link._id);
        res.redirect('/');
    });
};


/**
 * DEL: Delete a Go link.
 */
exports.delete = function(req, res, next) {
    req.db.links.removeById(req.link._id, function(err, count) {
        if (err) {
            return next(err);
        }
        if (count !== 1) {
            return next(new Error('Deletion went wrong.'));
        }

        console.info('Deleted link %s with id=%s.', req.link.shortUri, req.link._id);
        res.redirect('/');
    });
};


/**
 * GET: Sucess page after creating a Go link.
 */
exports.created = function(req, res, next) {
    res.render('created');
};
