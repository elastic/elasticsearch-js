
var _ = require('../../../../src/lib/utils')
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
    if (line === '') {
      // no indent on empty lines
      l.lines.push('');
    } else if (typeof line !== 'undefined') {
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

  writeBrowserParams: function (indent, params, namespace) {
    var l = lines(indent);

    _.each(params, function (param, name) {
      if (!param.required) {
        l('if (_.has(params, ' + stringify(name) + ')) {').in();
      }
      switch (param.type) {
      case 'enum':
        l(
          namespace + name + ' = _.' +
          (param.type || 'any') + 'Param(params.' + name + ', ' + stringify(param.options) +
          ');'
        );
        break;
      default:
        l(namespace + name + ' = _.' + (param.type || 'any') + 'Param(params.' + name + ');');
        break;
      }
      if (!param.required) {
        l.out('}');
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

      makeL('request.path = \'' + url.replace(urlParamRE, function (match, varName) {
        var varDetails = urlParams[varName];
        varDetails.name = varName;
        vars.push(varDetails);
        if (urlVarIsRequired(varDetails)) {
          return '\' + encodeURIComponent(parts.' + varName + ') + \'';
        } else {
          return '\' + encodeURIComponent(parts.' + varName + ' || ' + stringify(varDetails.default) + ') + \'';
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
          return 'parts.' + v.name + ')';
        }).join(' && ');

        l((urlIndex > 0 ? 'else ' : '') + (condition ? 'if (' + condition + ') ' : '') + '{')
          .in()
            .split(makeL.toString())
          .out('}');

        if (urlIndex === urls.length - 1 && condition) {
          l('else {')
            .in('throw new TypeError(\'Unable to build a path with those params. Supply at least ' +
              vars.join(', ') + '\');'
            )
          .out('}');
        }

      } else {
        l.split(makeL.toString());
      }
    });
    l('');

    return l.toString();
  },

  writeRequestObjectBody: function (indent, name, body, methods) {
    var parts = [], l = lines(indent);
    if (~name.indexOf('exists')) {
      parts.push('ignore: _.union([404], params.ignore)');
    } else {
      parts.push('ignore: params.ignore');
    }

    if (body) {
      if (_.contains(['bulk', 'msearch'], name)) {
        parts.push('body: this.client.config.serializer.bulkBody(params.body || null)');
      } else {
        parts.push('body: params.body || null');
      }
    }

    if (methods.length === 1) {
      parts.push('method: ' + stringify(methods[0]));
    }

    _.each(parts, function (part, i) {
      l(part + (i < parts.length - 1 ? ',' : ''));
    });

    return l.toString();
  },

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

  returnStatement: function (indent, name) {
    var l = lines(indent);
    if (name.match(/(^|\.)exists/)) {
      l('this.client.request(request, function (err, response) {')
        .in('if (err instanceof errors.NotFound) {')
          .in('cb(err, false);')
        .out('} else {')
          .in('cb(err, true);')
        .out('}')
      .out('});');
    } else {
      l('this.client.request(request, cb);');
    }
    return l.toString();
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
  apiFile: templates.api_file,
  urlParamRE: urlParamRE
};
