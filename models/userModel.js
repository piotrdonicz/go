'use strict';


var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    name: String,
    email: String
});


// Expose the model
module.exports = mongoose.model('users', UserSchema);
