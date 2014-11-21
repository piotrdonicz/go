var mongoose = require('mongoose');

// var UserSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

var GoLinkSchema = new mongoose.Schema({
    shortUri: String,
    longUri: String,
    owner: String
});

// var userModel = mongoose.model('users', UserSchema);
var GoLinkModel = mongoose.model('golinks', GoLinkSchema);

// Export the Mongoose model
module.exports = GoLinkModel;
