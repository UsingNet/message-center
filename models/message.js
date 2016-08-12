const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const Schema = mongoose.Schema;
const config = require('../config');
const db = mongoose.connect(config.mongodb);

const schema = new Schema({
  from: String,
  to: String,
  body: String,
  direction: String,
  pacakge: Object,
  type: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'message' });

const message = mongoose.model('message', schema);

module.exports = message;
