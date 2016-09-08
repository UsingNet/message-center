'use strict';

const Logger = require('mini-logger');
const config = require('../config');

const logger = new Logger({
  dir: config.logDir,
  categories: ['error', 'info', 'warning'],
  format: 'YYYY-MM-DD-[{category}][.log]',
});

module.exports = logger;
