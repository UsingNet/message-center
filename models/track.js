var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.Promise = Promise;

var Schema = mongoose.Schema;
var config = require('../config');
//var db = mongoose.connect(config.mongodb);

var schema = new Schema({
  referrer: String,
  title: String,
  url: String,
  track_id: String,
  page_id: String,
  team_id: Number,
  ip: String,
  user_agent: String,
  location: String,
  date: String,
  counted: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'track' });

var track = mongoose.model('track', schema);

module.exports = track;
