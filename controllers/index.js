// Models
var GoLinkModel = require('../models/GoLinkModel');

// Controllers
var indexController = require('./indexController');
// var goLink = require('./goLink');


module.exports = function(app) {
    app.get('/', indexController.index);
    // app.post('/go-link', goLink.add);
    // app.delete('/go-link/:link_id', links.delete);
    // app.get('/not-found', indexController.notFound);
    // app.get('/:shortUri', indexController.redirect);


    // TODO(allard): All of this needs to be moved to it's corresponding modules.
    app.param('shortUri', function(req, res, next, shortUri) {
        console.log('Matching shortUri: ' + shortUri);
        GoLinkModel.find({shortUri: shortUri}, function(err, docs) {
            if (err) {
                res.json(err);
            }
            console.log(docs);
            req.goLink = docs[0];
            next();
        });
    });
    app.get('/go-link', function(req, res) {
        // Show all links
        GoLinkModel.find({}, function(err, docs) {
            res.json(docs);
        });
    });
    app.post('/go-link', function(req, res) {
        // Create a new link
        var b = req.body;
        new GoLinkModel({
            shortUri: b.shortUri,
            longUri: b.longUri,
            owner: 'null'
        }).save(function(err, docs) {
            if (err) {
                res.json(err);
            }
            res.redirect('/');
        });
    });
    app.get('/go-link/:shortUri', function(req, res) {
        // Show single link.
        res.json(req.goLink);
    });
    app.get('/:shortUri', function(req, res) {
        // Redirect
        console.log(res.goLink);
        var longUri = req.goLink.longUri;
        console.log('Redirecting to ', longUri);
        res.redirect(longUri);
    });
};
