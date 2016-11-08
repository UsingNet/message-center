var co = require('co');
var assert = require('assert');
var Token = require('../lib/token');
var redis = require('../lib/redis');

describe('components/token', function () {
  var store = {};
  it('generate & get', function() {
    co(function* () {
      var token = yield Token.generate({});
      var _store = yield Token.get(token);
      yield redis.delAsync(token)
      assert(store === _store);
    });
  });
});
