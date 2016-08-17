var uuid = require('uuid');
var redis = require('./redis');
var REDIS_PREFIX = 'message_center:';
var TIMEOUT = 3600 * 24 * 30;

exports.generate = function* (store) {
  store = JSON.stringify(store);
  var token = uuid.v1().replace(/-/g, '');
  var resp = yield redis.setexAsync(REDIS_PREFIX + token, TIMEOUT, store);
  return resp ? token : null;
}

exports.get = function* (token) {
  var store = yield redis.getAsync(REDIS_PREFIX + token);

  return store ? JSON.parse(store) : null;
}

exports.update = function* (token, store) {
  return yield redis.setexAsync(REDIS_PREFIX + token, TIMEOUT, JSON.stringify(store));
}
