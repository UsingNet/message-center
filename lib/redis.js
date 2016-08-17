var redis = require('redis');
var Promise = require('bluebird');
var config = require('../config');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var client = redis.createClient(config.redis);

module.exports = client;
