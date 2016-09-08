'use strict';

const extend = require('util')._extend;


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
  const clineOnlines = extend(onlines);
  const agents = [];

  for (const key of clineOnlines) {
    const agent = onlines[key];
    if (agent.team && agent.team.token === teamToken) {
      delete agent.socket;
      agents.push(agent.id);
    }
  }

  return agents;
};

exports.getClients = (teamToken) => {
  const cloneOnlines = extend(onlines);
  const clients = [];
  for (const key of cloneOnlines) {
    const client = onlines[key];
    if (client.team_token === teamToken) {
      delete client.socket;
      clients.push(client);
    }
  }

  return clients;
};
