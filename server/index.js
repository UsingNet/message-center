
const connect = require('./connect');
const koa = require('koa.io');
const app = koa();

require('./pusher');

app.io.use(connect);


app.use(function* () {
  this.body = 'hello';
})

module.exports = app;
