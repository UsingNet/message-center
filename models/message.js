const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const schema = new Schema({
  from: String,
  to: String,
  body: String,
  direction: String,
  //pkg: { type: Object, default: {}},
  package: { type: Object, default: {} },
  type: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
}, { collection: 'message' });

const message = mongoose.model('message', schema);

module.exports = message;
