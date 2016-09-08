const connect = require('./connect');
const koa = require('koa.io');
const track = require('./track');

const app = koa();

require('./pusher');

app.io.use(connect);

app.use(track);

module.exports = app;
