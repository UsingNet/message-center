const uuid = require('uuid');
const redis = require('./redis');
const REDIS_PREFIX = 'message_center:';
const TIMEOUT = 3600 * 24 * 30;

exports.generate = function* (store) {
  store = JSON.stringify(store);
  const token = uuid.v1().replace(/-/g, '');
  const resp = yield redis.setexAsync(REDIS_PREFIX + token, TIMEOUT, store);
  return resp ? token : null;
}

exports.get = function* (token) {
  var store = yield redis.getAsync(REDIS_PREFIX + token);
  var le = JSON.parse(store);

  return store ? JSON.parse(store) : null;
}

exports.update = function* (token, store) {
  return yield redis.setexAsync(REDIS_PREFIX + token, TIMEOUT, JSON.stringify(store));
}
