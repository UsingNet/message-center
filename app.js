const server = require('./server');
const port = require('./config').port;
const logger = require('./lib/logger');

server.listen(port, () => logger.info(`Server Listen On ${port}`));
