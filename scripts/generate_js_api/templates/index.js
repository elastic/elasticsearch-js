
var _ = require('../../../src/lib/toolbelt')
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

  writeUrls: function (indent, urls, urlParams, queryStringParams) {
    var l = lines(indent);

    function urlVarIsRequired(varDetails) {
      varDetails = typeof varDetails === 'string' ? urlParams[varDetails] : varDetails;
      return varDetails && (varDetails.required || !varDetails.default);
    }

    // turn a url string into an object describing the url, then sort them in decending order by how many args they have
    urls = _.sortBy(urls, function (url) {
      var requiredVars = _.filter(_.collectMatches(url, urlParamRE), function (match) {
        return urlVarIsRequired(urlParams[match[1]]);
      });
      return requiredVars ? requiredVars.length * -1 : 0;
    });

    _.each(urls, function (url, urlIndex) {
      // collect the vars from the url and replace them to form the js that will build the url
      var makeL = lines(), vars = [];

      makeL('request.url = \'' + url.replace(urlParamRE, function (match, varName) {
        var varDetails = urlParams[varName];
        varDetails.name = varName;
        vars.push(varDetails);
        if (urlVarIsRequired(varDetails)) {
          return '\' + encodeURIComponent(url.' + varName + ') + \'';
        } else {
          return '\' + encodeURIComponent(url.' + varName + ' || ' + stringify(varDetails.default) + ') + \'';
        }
      }) + '\';');

      makeL(_.filter(_.map(vars, function (v, i) {
        if (_.has(queryStringParams, v.name)) {
          // delete the param so that it's not used later on in the queryString
          return 'delete params.' + v.name + ';';
        }
      })).join(' '));

      if (vars.length || urlIndex) {
        var requiredVars = _.filter(vars, urlVarIsRequired);

        var condition = _.map(requiredVars, function (v) {
          return 'url.hasOwnProperty(\'' + v.name + '\')';
        }).join(' && ');

        l((urlIndex > 0 ? 'else ' : '') + (condition ? 'if (' + condition + ') ' : '') + '{').in();
        l.split(makeL.toString()).out();
        l('}');

        if (urlIndex === urls.length - 1 && condition) {
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
    case 'list':
      return 'String|ArrayOfStrings|Boolean';
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
