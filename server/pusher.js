const zmq = require('zmq');
const socket = zmq.socket('router');
const co = require('co');
const Message = require('../models').message;
const Token = require('../lib/token');
const online = require('./online');
const config = require('../config');

const allowMethods = ['generate', 'emit', 'online', 'update'];
socket.bindSync(config.pusher);

socket.on('message', function(identity, message) {
  co(function* () {
    message = message.toString();
    var store = JSON.parse(message);
    var resp = {ok: false};

    if (typeof store !== 'object') {
      resp.data = 'params invild';
      return socket.send([identity, JSON.stringify(resp)]);
    }

    switch(store.method) {
      case 'generate':
        const token = yield Token.generate(store.params[1].self);
        if (token) {
          resp.ok = true;
          resp.data = token
        }
        break;
      case 'update':
        const updated = yield Token.update(store.params[0], store.params[1]);
        resp.ok = true;
      case 'emit':
        const messageModel = new Message(store.params);
        const saved = yield messageModel.save();
        if (saved) {
          resp.ok = true;
          var to = online.get(store.params[0].to);
          resp.data = {connectors: {im: false}};
          if (to) {
            to.socket.send(store.params);
            resp.data = {connectors: {im: true}};
          }
        }
        break;
      case 'online':
        resp.ok = true;
        resp.data = online.get(store.params.type, store.params.teamToken);
        break;
      case 'default':
        resp.ok = false,
        resp.data = 'Method not allow';
        break;
    }
    socket.send([identity, JSON.stringify(resp)]);
  }).catch((err) => {
    console.log(err);
  });
});

/*
module.exports = function* () {
  socket.on('message', function (message) {
    console.log(message)
  });
}
*/
