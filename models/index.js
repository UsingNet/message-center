const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.mongodb);

exports.track = require('./track');
exports.message = require('./message');
