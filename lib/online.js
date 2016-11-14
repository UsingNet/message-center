'use strict';

const onlines = [];

exports.add = (store) => {
  onlines.push(store);
};

exports.get = (token, direction) => {
  let onlineUser = null;
  onlines.forEach(online => {
    if (online.direction === direction && online.token === token) {
      onlineUser = online;
    }
  });

  return onlineUser;
};

exports.del = (store) => {
  let index = -1;
  onlines.forEach((online, i) => {
    if (online.direction === store.direction && online.token === store.token) {
      index = i;
    }
  });

  if (index > -1) {
    onlines.splice(index, 1);
  }
};

exports.getAgents = (teamToken) => {
  const agents = [];
  onlines.forEach(online => {
    if (online.direction === 'agent' && online.team_token === teamToken) {
      agents.push(online.id);
    }
  });

  return agents;
};

exports.getClients = (teamToken) => {
  const clients = [];
  onlines.forEach(online => {
    if (online.direction === 'client' && online.team_token === teamToken) {
      clients.push(online.id);
    }
  });
  return clients;
};

exports.all = () => {
  const all = [];
  onlines.forEach(online => {
    if (online.socket) {
      delete online.socket;
    }
    all.push(online);
  });
  return all;
};
