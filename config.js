module.exports = {
  port: 20001,
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  mongodb: 'mongodb://127.0.0.1/message_server',
  pusher: 'tcp://127.0.0.1:20002'
}
