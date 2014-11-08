// Exports only the config for the current environment.
// As per http://dailyjs.com/2014/01/02/recipe-for-express-configuration/
module.exports = require('./' + (process.env.NODE_ENV || 'development') + '.json');
