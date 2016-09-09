'use strict';

const onlines = {};

exports.add = (k, v) => {
  onlines[k] = v;
};

exports.get = (k) => onlines[k];

exports.del = (k) => {
  if (onlines[k]) {
    delete onlines[k];
  }
};

exports.all = () => onlines;

exports.getAgents = (teamToken) => {
  const _onlines = Object.assign({}, onlines);
  const agents = [];

  Object.keys(_onlines).forEach(key => {
    const agent = onlines[key];
    if (agent.team && agent.team.token === teamToken) {
      delete agent.socket;
      agents.push(agent.id);
    }
  });

  return agents;
};

exports.getClients = (teamToken) => {
  const _onlines = Object.assign({}, onlines);
  const clients = [];
  Object.keys(_onlines).forEach(key => {
    const client = onlines[key];
    if (client.team_token === teamToken) {
      delete client.socket;
      clients.push(client);
    }
  });

  return clients;
};
