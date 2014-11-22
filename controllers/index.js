'use strict';


var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Models
var GoLinkModel = require('../models/goLinkModel');

// Controllers
var indexController = require('./indexController');
var goLinkController = require('./goLinkController');


// Parameter parsing
router.param('shortUri', function(req, res, next, shortUri) {
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

// Routes
router.get('/', indexController.index);
router.get('/go-link', goLinkController.findAll);
router.get('/go-link/:shortUri', goLinkController.findByShortUri);
// router.post('/go-link', goLink.add);
// router.delete('/go-link/:link_id', links.delete);
// router.get('/not-found', indexController.notFound);
router.get('/:shortUri', indexController.redirect);

module.exports = router;
