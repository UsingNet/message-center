const Token = require('../lib/token');
const online = require('../lib/online');
const Message = require('../models').message;

module.exports = function* connect(next) {
  const token = this.query.token;
  if (!token) {
    this.disconnect();
  }

  const store = yield Token.get(token);
  if (!store) {
    this.disconnect();
  }

  store.socket = this;
  online.add(store.team.token, store);

  // 发送未读消息
  const messages = yield Message.find({
    to: store.token, 'package.read': { $exists: false },
  }).limit(50);
  this.send(messages);
  yield next;
  online.del(store.self.token);
};
