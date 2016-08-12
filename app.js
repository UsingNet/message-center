const server = require('./server')
const port = require('./config').port

server.listen(port, function() {
  console.log('Listend port of %s', port);
});
