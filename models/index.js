var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongodb);

exports.track = require('./track');
exports.message = require('./message');
