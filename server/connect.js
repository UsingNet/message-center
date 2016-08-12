const Token = require('../components/token');
const online = require('./online');
const Message = require('../model/message');

module.exports = function* (next) {
  var token = this.query.token;
  if (!token) {
    this.disconnect();
  }
  var store = yield Token.get(token);
  if (!store) {
    this.disconnect();
  }
  store.socket = this;
  online.add(store.token, store);
  // 发送未读消息
  const messages = yield Message.find({to: store.token, 'package.read': {$exists: false}}).limit(50);
  this.send(messages)
  yield next;
  online.del(store.self.token);
  console.log(online.all());
}
