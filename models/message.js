var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var schema = new Schema({
  from: String,
  to: String,
  body: String,
  direction: String,
  pacakge: Object,
  type: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'message' });

var message = mongoose.model('message', schema);

module.exports = message;
