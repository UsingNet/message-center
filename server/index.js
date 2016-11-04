const connect = require('./connect');
const koa = require('koa.io');
const track = require('./track');
require('./pusher');

const app = koa();
app.io.use(connect);
app.use(track);

module.exports = app;
