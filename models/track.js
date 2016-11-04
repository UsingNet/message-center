const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  url: String,
  contact_id: String,
  team_id: Number,
  ip: String,
  user_agent: String,
  count: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { collection: 'track' });

const track = mongoose.model('track', schema);

module.exports = track;
