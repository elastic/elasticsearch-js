var _ = require('./utils');

exports.bulkBody = function (val, serializer) {
  var body = '', i;

  if (_.isArray(val)) {
    for (i = 0; i < val.length; i++) {
      body += serializer.serialize(val[i]) + '\n';
    }
  } else if (typeof val === 'string') {
    // make sure the string ends in a new line
    body = val + (val[val.length - 1] === '\n' ? '' : '\n');
  } else {
    throw new TypeError('Bulk body should either be an Array of commands/string, or a String');
  }

  return body;
};
