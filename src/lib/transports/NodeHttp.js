/* elasticsearch-js nodejs transport */

var http = require('http');

function NodeHttp() {

  // Split hostname:port into its repective parts
  function splitHost(u) {
    var s = u.split(':');
    return {host: s[0], port: s[1]};
  }

  // Meta function for handling any http request that can have a body (PUT,POST,DELETE)
  function performRequest(context, method, path, params, body, successcb, errorcb, retries) {

    var
      //context = context,
      host = splitHost(context.selector(context.options.hosts)),
      options = {
        host: host.host,
        port: host.port,
        path: path + '?' + _.toQueryString(params),
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

  // Public functions
  return {
    get   : _.bind(performRequest, this, 'PUT'),
    put   : _.bind(performRequest, this, 'POST'),
    post  : _.bind(performRequest, this, 'DELETE'),
    del   : _.bind(performRequest, this, 'GET'),
    head  : _.bind(performRequest, this, 'HEAD')
  };

} ());
