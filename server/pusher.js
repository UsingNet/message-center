var zmq = require('zmq');
var socket = zmq.socket('router');
var co = require('co');
var Message = require('../models').message;
var Token = require('../lib/token');
var online = require('../lib/online');
var config = require('../config');

var allowMethods = ['generate', 'emit', 'online', 'update'];
socket.bindSync(config.pusher);
socket.on('message', function(identity, message) {
  co(function* () {
    message = message.toString();
    try {
      var store = JSON.parse(message);
    } catch (e) {
      return socket.send([identity, JSON.stringify({ok: false, error: 'message is invalid JSON'})])
    }

    var resp = {ok: false};
    if (typeof store !== 'object' || !Array.isArray(store.params)) {
      resp.data = 'params invild';
      return socket.send([identity, JSON.stringify(resp)]);
    }

    switch(store.method) {
      case 'generate':
        var token = yield Token.generate(store.params[0].self);
        if (token) {
          resp.ok = true;
          resp.data = token
        }
        break;
      case 'update':
        var updated = yield Token.update(store.params[0], store.params[1]);
        resp.ok = true;
      case 'emit':
        var messageModel = new Message(store.params[0]);
        console.log(store.params[0]);
        yield messageModel.save();
        resp.ok = true;
        var to = online.get(store.params[0].to);
        resp.data = {connectors: {im: false}};
        if (to) {
          var replied = yield Message.findOne({from: store.params[0].to});
          to.socket.send(store.params[0]);
          /*
          if (replied) {
            to.socket.emit('message', store.params[0]);
          } else {
            to.socket.emit('message', store.params[0]);
          }
          */
          resp.data = {connectors: {im: true}};
        }
        break;
      case 'notify':
        var messageModel = new Message(store.params[0]);
        yield messageModel.save();
        var to = online.get(store.params[0].to);
        if (to) {
          to.socket.send(store.params);
        }
        break;
      case 'clients':
        resp.ok = true;
        resp.data = online.getClients(store.params[0].teamToken);
        break;
      case 'agents':
        resp.ok = true
        resp.data = online.getAgents(store.params[0].teamToken);
        break;
      case 'onlines':
        resp.ok = true;
        resp.data = online.all();
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
