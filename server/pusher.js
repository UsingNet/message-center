'use strict';

const zmq = require('zmq');
const co = require('co');
const Message = require('../models').message;
const Token = require('../lib/token');
const online = require('../lib/online');
const config = require('../config');

const socket = zmq.socket('router');

socket.bindSync(config.pusher);

socket.on('message', (identity, _message) => {
  co(function* () {
    const message = _message.toString();
    let store = null;
    let to = null;
    try {
      store = JSON.parse(message);
    } catch (e) {
      return socket.send([identity, JSON.stringify({
        ok: false, error: 'message is invalid JSON',
      })]);
    }

    const resp = { ok: false };
    if (typeof store !== 'object' || !Array.isArray(store.params)) {
      resp.data = 'params invild';
      return socket.send([identity, JSON.stringify(resp)]);
    }

    switch (store.method) {
      case 'generate': {
        const token = yield Token.generate(store.params[0]);
        if (token) {
          resp.ok = true;
          resp.data = token;
        }
        break;
      }
      case 'update': {
        //const updated = yield Token.update(store.params[0], store.params[1]);
        resp.ok = true;
        break;
      }
      case 'emit': {
        const msg = store.params[0];
        const messageModel = new Message(msg);
        yield messageModel.save();
        resp.ok = true;
        to = online.get(msg.to, msg.direction === 'SEND' ? 'client' : 'agent');
        resp.data = { connectors: { im: false } };
        if (to) {
          //const replied = yield Message.findOne({from: store.params[0].to});
          to.socket.send(store.params[0]);
          /*
          if (replied) {
            to.socket.emit('message', store.params[0]);
          } else {
            to.socket.emit('message', store.params[0]);
          }
          */
          resp.data = { connectors: { im: true } };
        }
        break;
      }
      case 'notify': {
        const messageModel = new Message(store.params[0]);
        yield messageModel.save();
        to = online.get(store.params[0].to);
        if (to) {
          to.socket.send(store.params);
        }
        break;
      }
      case 'clients': {
        resp.ok = true;
        resp.data = online.getClients(store.params[0]);
        break;
      }
      case 'agents': {
        resp.ok = true;
        resp.data = online.getAgents(store.params[0]);
        break;
      }
      case 'onlines': {
        resp.ok = true;
        resp.data = online.all();
        break;
      }
      default: {
        resp.ok = false;
        resp.data = 'Method not allow';
        break;
      }
    }

    console.log(resp);

    socket.send([identity, JSON.stringify(resp)]);
  }).catch(() => {
  });
});

/*
module.exports = function* () {
  socket.on('message', function (message) {
    console.log(message)
  });
}
*/
