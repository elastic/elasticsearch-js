
var _ = require('../../../src/lib/utils')
  , fs = require('fs')
  , path = require('path')
  , urlParamRE = /\{(\w+)\}/g;


/**
 * Simple manager to take care of indentation
 * @param  {number} i - Width of the indentation
 * @return {function} - Call this to add a new line to the output
 */
function lines(i) {

  function l(line) {
    l.lines.push(_.repeat(' ', l.indent) + line);
    return l;
  }

  l.lines = [];
  l.indent = i || 0;

  l.split = function (toSplit) {
    _.each(_.filter(toSplit.split(/\r|\n/)), l);
    return l;
  };

  l.in = function () {
    l.indent += 2;
    return l;
  };

  l.out = function () {
    l.indent -= 2;
    return l;
  };

  l.toString = function () {
    return l.lines.join('\n');
  };

  return l;
}

function stringify(thing) {
  return JSON.stringify(thing)
    .replace('\'', '\\\'')
    .replace(/\\?"/g, function (quote) {
      // replace external (unescaped) double quotes with single quotes
      return quote === '\\"' ? '"' : '\'';
    })
    // inject a space between array parts
    .replace(/([^\\])','/g, '$1\', \'');
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

  writeParams: function (indent, params, namespace) {
    var l = lines(indent);

    _.each(params, function (param, name) {
      if (!param.required) {
        l('if (typeof params.' + name + ' !== \'undefined\') {').in();
      }

      l.split(templates[param.type || 'any']({
        get: 'params.' + name,
        set: namespace + name,
        name: name
      }));

      if (!param.required) {
        l.out();
        l('}');
      }
      l('');
    });

    return l.toString();
  },

  writeUrls: function (indent, urls) {
    var l = lines(indent);

    _.each(urls, function (url, urlIndex) {
      // collect the vars from the url and replace them to form the js that will build the url
      var makeL = lines(), vars = [];

      makeL('request.url = \'' + url.replace(urlParamRE, function (match, varName) {
        vars.push(varName);
        return '\' + url.' + varName + ' + \'';
      }) + '\';');

      if (vars.length || urlIndex) {
        var condition = _.map(vars, function (v) { return 'url.hasOwnProperty(\'' + v + '\')'; }).join(' && ');
        l((urlIndex > 0 ? 'else ' : '') + (condition ? 'if (' + condition + ') ' : ' ') + '{').in();
        l.split(makeL.toString()).out();
        l('}');

        if (urlIndex === urls.length - 1 && vars.length) {
          l('else {').in();
          l('throw new TypeError(\'Unable to build a url with those params. Supply at least ' + vars.join(', ') + '\');').out();
          l('}');
        }

      } else {
        l.split(makeL.toString());
      }
    });
    l('');

    return l.toString();
  },

  /**
   * we want strings in code to use single-quotes, so this will JSON encode vars, but then
   * modify them to follow our code standards.
   *
   * @param  {*} thing - Any thing
   * @return {String}  - our pretty string
   */
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
    default:
      return type;
    }
  },

  paramWithDefault: function (name, def) {
    if (def) {
      return '[' + name + '=' + def + ']';
    } else {
      return name;
    }
  }
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
  action: templates.action,
  urlParamRE: urlParamRE
};