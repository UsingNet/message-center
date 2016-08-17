var Logger = require('mini-logger');
var config = require('../config');

var logger = Logger({
  dir: config.logDir,
  categories: ['error', 'info', 'warning'],
  format: 'YYYY-MM-DD-[{category}][.log]'
});

module.exports = logger;
