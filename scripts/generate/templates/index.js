
var _ = require('../../../src/lib/utils');
var fs = require('fs');
var path = require('path');


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

  indent: function (block, spaces) {
    var indent = _.repeat(' ', spaces);
    return block.split('\n').map(function (line) {
      return indent + line;
    }).join('\n');
  },

  joinParagraphs: function (block) {
    return block.split('\n\n').join('\n+\n');
  },

  description: function (action) {
    try {
      return fs.readFileSync(path.join(__dirname, '../../../docs/_descriptions/' + action + '.asciidoc'));
    } catch (e) {
      if (~e.message.indexOf('ENOENT')) {
        return '// no description';
      } else {
        throw e;
      }
    }
  },

  examples: function (action) {
    try {
      return fs.readFileSync(path.join(__dirname, '../../../docs/_examples/' + action + '.asciidoc'));
    } catch (e) {
      if (~e.message.indexOf('ENOENT')) {
        return '// no examples';
      } else {
        throw e;
      }
    }
  },

  paramType: function (type) {
    switch (type && type.toLowerCase ? type.toLowerCase() : 'any') {
    case 'time':
      return 'Date, Number';
    case 'any':
      return 'Anything';
    case 'enum':
      return 'String';
    case 'list':
      return 'String, String[], Boolean';
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
      fs.readFileSync(path.resolve(__dirname, filename), 'utf8'),
      null,
      {
        imports: templateGlobals
      }
    );
  }
});
templates.text = templates.string;

module.exports = {
  apiFile: templates.api_file,
  apiMethodList: templates.api_method_list,
  apiMethods: templates.api_methods
};
