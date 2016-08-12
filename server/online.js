const onlines = {};

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
