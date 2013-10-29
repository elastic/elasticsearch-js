
var _ = require('../../../../src/lib/utils');
var fs = require('fs');
var path = require('path');


/**
 * Simple manager to take care of indentation
 * @param  {number} i - Width of the indentation
 * @return {function} - Call this to add a new line to the output
 */
function lines(i) {

  function l(line) {
    if (line === '') {
      // no indent on empty lines
      l.lines.push('');
    } else if (line === void 0) {
      l.lines.push(_.repeat(' ', l.indent) + line);
    }
    return l;
  }

  l.lines = [];
  l.indent = i || 0;

  l.split = function (toSplit) {
    _.each(toSplit.split(/\r?\n/), l);
    return l;
  };

  l.in = function (line) {
    l.indent += 2;
    return l(line);
  };

  l.out = function (line) {
    l.indent -= 2;
    return l(line);
  };

  l.toString = function () {
    return l.lines.join('\n');
  };

  return l;
}

/**
 * we want strings in code to use single-quotes, so this will JSON encode vars, but then
 * modify them to follow our code standards.
 *
 * @param  {*} thing - Any thing
 * @return {String}  - our pretty string
 */
function stringify(thing, pretty) {
  return (pretty ? JSON.stringify(thing, null, '  ') : JSON.stringify(thing))
    .replace(/\'/g, '\\\'')
    .replace(/\\?"/g, function (quote) {
      // replace external (unescaped) double quotes with single quotes
      return quote === '\\"' ? '"' : '\'';
    })
    // inject a space between STRING array parts
    .replace(/([^\\])','/g, '$1\', \'')
    // remove quotes around key names that are only made up of letters
    .replace(/^( +)'([a-zA-Z_]+)':/gm, '$1$2:')
    // requote "special" key names
    .replace(/^( +)(default):/gm, '$1\'$2\':');
}

/**
 * We'll collect the templates here
 * @type {Object}
 */
var templates = {};

/**
 * These keys will be available as local variables to each template
 * @type {Object}
 */
var templateGlobals = {

  stringify: stringify,

  _: _,

  paramType: function (type) {
    switch (type && type.toLowerCase ? type.toLowerCase() : 'any') {
    case 'time':
      return 'Date|Number';
    case 'any':
      return '*';
    case 'enum':
      return 'String';
    case 'list':
      return 'String|ArrayOfStrings|Boolean';
    default:
      return _.ucfirst(type);
    }
  },

  paramWithDefault: function (name, def) {
    if (def) {
      return '[' + name + '=' + def + ']';
    } else {
      return name;
    }
  },

  partials: templates
};

fs.readdirSync(path.resolve(__dirname)).forEach(function (filename) {
  var name = filename.replace(/\..+$/, '');
  if (name !== 'index') {
    templates[name] = _.template(
      fs.readFileSync(path.resolve(__dirname, filename), {
        encoding: 'utf8'
      }),
      null,
      {
        imports: templateGlobals
      }
    );
  }
});
templates.text = templates.string;

module.exports = {
  apiFile: templates.api_file
};
