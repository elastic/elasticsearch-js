# elasticsearch.js

Official *low-level* client for Elasticsearch.

## Features

 - One-to-one mapping with REST API and other language clients
 - Generalized, pluggable architecture. See [replacing core components](docs/replacing_core_components.md)
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all available nodes.

## Node and the browser

elasticsearch.js works great in node, as well as modern browsers (many thanks to [browserify](https://github.com/substack/node-browserify)!!).

 - Node:

  [![Build Status](https://magnum.travis-ci.com/spenceralger/elasticsearch-js.png?token=tsFxSKHtVKG8EZavSjXY)](https://magnum.travis-ci.com/spenceralger/elasticsearch-js)

 - Browsers (see [browser builds](#browser-builds)):

  ![testling results for browser clients](https://ci.testling.com/spenceralger/xhr-method-test.png)


## Install in Node

```
npm install --save elasticsearch
```

## Browser Builds

Download one of these browser-ready builds, or install them with `bower`

NOTE: The entire API is compatible with IE 10+, Chrome, Firefox, Safari, and Opera. **IE 8 & 9** only support GET and POST requests cross-domain which is how the `XhrConnection` class makes it's requests.

 - [elasticsearch.js](dist/elasticsearch.min.js) - [dev](dist/elasticsearch.js)
   - uses the browser's native XMLHttpRequest object
   - Node style callbacks or promises provided by [when.js](https://github.com/cujojs/when)

```
bower install elasticsearch
```

 - [elasticsearch.angular.js](dist/elasticsearch.angular.min.js) - [dev](dist/elasticsearch.angular.js)
   - Uses Angular's $http service
   - Returns promises using Angular's $q service (Adds an `abort()` method)

```
bower install elasticsearch-angular
```

 - [elasticsearch.jquery.js](dist/elasticsearch.jquery.min.js) - [dev](dist/elasticsearch.jquery.js)
   - Uses jQuery's .ajax() method
   - Returns jQuery promises (Adds an `abort()` method)

```
bower install elasticsearch-jquery
```

## Docs
 - [Configuration](#configuration)
 - [API](docs/api.md)
 - [Replacing Core Components](docs/replacing_core_components.md)
 - [Errors](docs/errors.md)
 - [Setting Up Logging](docs/setting_up_logging.md)
 - [FAQ](#faq)

## Configuration

The `Client` constructor accepts a single object as it's argument, and the following keys can be used to configure that client instance:

```js
var elasticsearch = require('elasticsearch');
var es = new elasticsearch.Client({
  ...
});
```

### hosts
Type: `String`, `String[]` or `Object[]`

Default:
```js
hosts: [
  {
    host: 'localhost', port: '9200', protocol: 'http'
  }
]
```

Specify the list of hosts that this client will connect to. If sniffing is enabled, or you call sniff, this list will be used as seeds for discovery of the rest of the cluster.

### log
Type: `String`, `String[]`, `Object`, `Object[]`, or `Constructor`

Default:
```js
log: {
  type: 'stdio',
  levels: ['error', 'warning']
}
```

Unless a constructor is specified, this sets the output settings for the bundled logger. See [setting up logging](docs/setting_up_logging.md) for more information.

### connectionClass
Type: `String`, `Constructor`

Default:
 - Node: `'http'`
 - Browser: `'xhr'`
 - Angular Build: `'angular'`
 - jQuery Build: `'jquery'`

Defines the class that will be used to create connections. If you are looking to implement a protocol besides HTTP you will probably start by writing a Connection class and specifying it here.

### selector
Type: `String`, `Function`

Default: `'roundRobin'`

Options:
  - `'roundRobin'`
  - `'random'`

This function will be used to select a connection from the ConnectionPool. It should received a single argument, the list of "active" connections, and return the connection to use. Use this selector to implement special logic for your client such as preferring nodes in a certain rack or data-center.

To make this function asynchronous, accept a second argument which will be the callback to use. The callback should be called Node-style, with a possible error like `cb(err, selectedConnection)`.

### sniffOnStart
Type: `Boolean`

Default: `false`

Should the client attempt to detect the rest of the cluster when it is first instantiated?

### sniffAfterRequests
Type: `Number` or `false`

Default: `false`

After `n` requests, perform a sniff operation and ensure our list of nodes is up to date.


### sniffOnConnectionFail
Type: `Boolean`

Default: `false`

Should the client immediately sniff for a more current list of nodes when a connection dies? (see [node death](#node-death))

### maxRetries
Type: `Number`

Defailt: `3`

How many times should the client try to connect to other nodes before returning a [ConnectionFault](docs/error.md#connectionfault) error. (see [node death](#node-death))

### timeout
Type: `Number`

Default: 10000

How many milliseconds can the connection take before the request is aborted and retried. (TODO: timeout errors shouldn't cause a retry).

### deadTimeout
Type: `Number`

Default: 30000

How many milliseconds should a dead connection/node sit and wait before it is ping-ed? (see [node death](#node-death))

### maxSockets
Type: `Number`

Default: 10

How many sockets should a connection keep to it's corresponding Elasticsearch node? These sockets are currently kept alive ***forever*** (not like nodes current "keep alive" sockets).

### nodesToHostCallback
Type: `Function`

Default: simple, not much going on [here](src/lib/client_config.js#L65).

This function will receive a list of nodes received during a sniff. The list of nodes should be transformed into an array of objects which will each be used to create [Host](src/lib/host.js) objects. (TODO: allow this function to be async).

## API

To maintain consistency across all the low-level clients ([PHP](https://github.com/elasticsearch/elasticsearch-php), [Python](https://github.com/elasticsearch/elasticsearch-ph), [Ruby](https://github.com/elasticsearch/elasticsearch-ruby), [Perl](https://github.com/elasticsearch/elasticsearch-perl)) all API methods accept an object with parameters and a callback. If you don't pass the callback, the functions will return a promise.

For full details on the API, check out [api.md](docs/api.md).

### Examples

#### create the client
```js
var es = new elasticsearch.Client({
  hosts: [
    'localhost:9200'
  ],
  log: 'trace',
  sniffOnStart: true
});
```

#### call an endpoint
```js
es.cluster.nodeInfo({
  clear: true,
  jvm: true,
  os: ture
}, function (err, resp, status) {
    // do your thing
})
```

#### skip the callback to get a promise back
```js
es.search({
  q: 'pants'
}).then(function (resp) {
  // use resp.body and resp.status
}, function (err) {
  // freak out!
})
```

#### abort a request
```js
var req = es.search({
  q: 'robots'
}, function (err, body, status) {
  clearTimeout(timeout);
  // do something
});

var timeout = setTimeout(function () {
  req.abort();
}, 200);
```

#### or just use the timeout param
```js
es.search({
  q: '*',
  timeout: 200
}).then(function (resp) {
  // Iterate all the hits
})
```

## FAQ

### dead nodes
Q: When is a connection/node considered dead?

A: A connection is considered dead when a request to it does not complete properly. If the server responds with any status, even 500, it is not considered dead.
