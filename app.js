var server = require('./server');
var port = require('./config').port;
var logger = require('./lib/logger');

server.listen(port, function() {
  //logger.info('Server listen on ' + port);
});
