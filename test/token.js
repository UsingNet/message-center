const co = require('co');
const assert = require('assert');
const Token = require('../components/token');
const redis = require('../components/redis');

describe('components/token', function () {
  const store = {};
  it('generate & get', function() {
    co(function* () {
      const token = yield Token.generate({});
      const _store = yield Token.get(token);
      yield redis.delAsync(token)
      assert(store === _store);
    });
  });
});
