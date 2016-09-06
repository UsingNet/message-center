var onlines = {};

exports.add = function(k, v) {
  onlines[k] = v;
}

exports.get = function(k) {
  return onlines[k];
}

exports.del = function(k) {
  if (onlines[k]) {
    delete onlines[k];
  }
}

exports.all = function(type, teamToken) {
  return onlines;
}

exports.getAgents = function(teamToken) {
    var agents = [];
    for (var key in onlines) {
        var agent = onlines[key];
        if (agent.team && agent.team.token === teamToken) {
          agents.push(agent.id);
        }
    }

    return agents;
}

exports.getClients = function(teamToken) {
  console.log(teamToken);
  var clients = [];
  for (var key in onlines) {
    console.log(key);
    var client = onlines[key];
    if (client.team_token === teamToken) {
      delete client.socket;
      clients.push(client);
    }
  }

  return clients;
}
