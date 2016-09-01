var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var schema = new Schema({
  from: String,
  to: String,
  body: String,
  direction: String,
  //pkg: { type: Object, default: {}},
  package: { type: Object, default: {}},
  type: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
}, { collection: 'message' });

var message = mongoose.model('message', schema);

module.exports = message;
