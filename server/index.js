
var connect = require('./connect');
var koa = require('koa.io');
var track = require('./track');
var app = koa();

require('./pusher');

app.io.use(connect);


app.use(track)

module.exports = app;
