const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
const Schema = mongoose.Schema;
const config = require('../config');
const db = mongoose.connect(config.mongodb);

const schema = new Schema({
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

const track = mongoose.model('track', track);

module.exports = track;
