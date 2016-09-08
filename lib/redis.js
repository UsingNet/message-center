const redis = require('redis');
const Promise = require('bluebird');
const config = require('../config');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config.redis);

module.exports = client;
