  /* elasticsearch-js nodejs transport */

  var http = require('http');

  esj.Transport.prototype = (function() {

    // Split hostname:port into its repective parts
    var splitHost = function(u) {
      var s = u.split(':');
      return {host:s[0],port:s[1]};
    };

    // Meta function for handling any http request that can have a body (PUT,POST,DELETE)
    var performRequest = function (context,method, path, params, body, successcb, errorcb, retries) {

      var
        //context = context, 
        host = splitHost(context.selector(context.options.hosts)),
        options = {
          host: host.host,
          port: host.port,
          path: path + '?' + queryString(params),
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        };
      var request = http.request(options, function (res) {

        var data = '';
        res.setEncoding('utf8');

        res.on('data', function (d) {
          data = data + d;
        });

        res.on('end', function () {

          var response = {
            data : data.charAt(0) === '{' ? JSON.parse(data) : data,
            headers : res.headers,
            status : res.statusCode
          };

          if (successcb != null && response.status < 300) {
            successcb(response);
          } else if (errorcb != null) {
            errorcb(response);
          }
        });
        
      });

      if (errorcb != null) {
        request.on('error', errorcb);
      }

      if(method !== 'GET' && method !== 'HEAD') {    
        request.write(body);
      }

      request.end();
    };

    // Aliases to performRequest
    var put   = function (path, params, body, successcb, errorcb) {performRequest(this, 'PUT', path, params, body, successcb, errorcb);};
    var post  = function (path, params, body, successcb, errorcb) {performRequest(this, 'POST', path, params, body, successcb, errorcb);};
    var del   = function (path, params, body, successcb, errorcb) {performRequest(this, 'DELETE', path, params, body, successcb, errorcb);};
    var get   = function (path, params, body, successcb, errorcb) {performRequest(this, 'GET', path, params, body, successcb, errorcb);};
    var head  = function (path, params, body, successcb, errorcb) {performRequest(this, 'GET', path, params, body, successcb, errorcb);};

    // Public functions
    return {
      get   : get,
      put   : put,
      post  : post,
      del   : del,
      head  : head
    };

  } ());
