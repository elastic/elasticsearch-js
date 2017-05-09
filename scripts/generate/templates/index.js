
var _ = require('../../../src/lib/utils');
var utils = require('../../../grunt/utils');
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
    .replace(/'/g, '\\\'')
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

  paramType: function (type, paramName) {
    switch (type && type.toLowerCase ? type.toLowerCase() : 'any') {
      case 'time':
      case 'duration':
        if (paramName === 'timestamp') return 'Timestamp'
        return '<<api-param-type-duration-string,`DurationString`>>';
      case 'any':
        return 'anything';
      case 'enum':
      case 'string':
      case 'text':
        return '<<api-param-type-string,`String`>>';
      case 'boolean':
        return '<<api-param-type-boolean,`Boolean`>>';
      case 'number':
      case 'integer':
        return '<<api-param-type-number,`Number`>>';
      case 'list':
        return '<<api-param-type-string,`String`>>, <<api-param-type-string-array,`String[]`>>, <<api-param-type-boolean,`Boolean`>>';
      case 'bulkbody':
        return '<<api-param-type-object-array,`Object[]`>>, <<api-param-type-json-lines,`JSONLines`>>';
      case 'body':
        return '<<api-param-type-object,`Object`>>, <<api-param-type-json,`JSON`>>';
      default:
        throw new Error(`unknown type "${type}"`);
    }
  },

  paramWithDefault: function (name, def) {
    if (def) {
      return '[' + name + '=' + def + ']';
    } else {
      return name;
    }
  },

  partials: templates,

  utils: utils
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
  apiMethods: templates.api_methods,
  docsIndex: templates.docs_index,
  apiIndex: templates.api_index,
  apiIndexBrowser: templates.api_index_browser,
  configurationDocs: templates.configuration_docs,
};
