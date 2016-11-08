const Token = require('../lib/token');
const online = require('../lib/online');
const Message = require('../models').message;
const Track = require('../models').track;

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
  online.add(store);

  // 发送未读消息
  const messages = yield Message.find({
    to: store.token, 'package.read': { $exists: false },
  }).limit(50);
  this.send(messages);
  yield next;
  online.del(store);

  // 添加 track
  const lastTrack = yield Track.findOne({ contact_id: store.id }).sort({ id: -1 });
  if (lastTrack) {
    yield lastTrack.update({ count: lastTrack.count + 1 });
  } else {
    const track = new Track({
      title: store.package.title,
      url: store.package.referrer,
      contact_id: parseInt(store.id, 10),
      team_id: parseInt(store.team_id, 10),
      ip: store.package.ip,
      user_agent: store.package.user_agent,
      count: 0,
    });
    yield track.save();
  }
};
