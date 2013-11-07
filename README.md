# elasticsearch.js

Official *low-level* client for Elasticsearch.

## Features

 - One-to-one mapping with REST API and other language clients
 - Generalized, pluggable architecture. See [replacing core components](TODO: details the peices that are replaceable)
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all availible nodes.

## Node and the browser

elasticsearch.js works great in node, as well as modern browsers (many thanks to [browserify](https://github.com/substack/browserify)!!).

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

 - [elasticsearch.js](dist/elasticsearch.min.js) - [dev](dist/elasticsearch.js)
   - uses the browser's native XMLHttpRequest object
   - Fully Compatible with IE 10+, Chrome, Firefox, Safari, Opera
   - Only GET and POST requests available in IE 8 & 9
   - Node style callbacks or promises provided by [when.js](https://github.com/cujojs/when)

```
bower install elasticsearch
```

 - [elasticsearch.angular.js](dist/elasticsearch.angular.min.js) - [dev](dist/elasticsearch.angular.js)
   - Uses angular's $http servive
   - Returns promisses using angular's $q servive (Adds an `abort()` method)

```
bower install elasticsearch-angular
```

## Configuration

The `Client` constructor accepts a single object as it's argument, and the following keys can be used to configure that client instance:

```js
var elasticsearch = require('elasticsearch');
var es = new elasticsearch.Client({
  ...
});

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

Unless a constructor is specified, this sets the output settings for the bundled logger. See [setting up logging](TODO: detail logging why) for more information.

### connectionClass
Type: `String`, `Constructor`

Default:
 - Node: `'http'`
 - Browser: `'xhr'`
 - Angular Build: `'angular'`

Options:
 - Node: `'http'`
 - Browser: based on bundle, `'xhr'`, `'angular'`, and `'jquery'` are currently available

Defines the class that will be created once for each node/host that the client communicates with. If you are looking to implement a special protocol you will probably start by writing a Connection class and specifying it here.

### selector
Type: `String`, `Function`

Default: `'roundRobin'`

Options:
  - `'roundRobin'`
  - `'random'`

Defined a function that will be used to select a connection from the ConnectionPool. It should received a single argument, the list of "active" connections, and return the connection to use. Use this selector to implement special logic for your client such as prefering connections in a certain rack, or datacenter.

To make this function asynchronous, accept a second argument which will be the callback which should be called as a Node style callback with a possible error: `cb(err, selectedConnection)`.

### sniffOnStart
Type: `Boolean`

Default: `false`

Should the client attempt to detect the rest of the cluster when it is first instanciated?

### sniffAfterRequests
Type: `Number` or `false`

Default: `false`

After `n` requests, perform a sniff operation and ensure out list of nodes is up to date


### sniffOnConnectionFail
Type: `Boolean`

Default: `false`

Should the client immediately sniff for a more current list of nodes when a connection dies? (see [node death](#node-death))

### maxRetries
Type: `Number`

Defailt: `3`

How many times should the client try to connect to other nodes before returning a [ConnectionFault](TODO: error types) error. (see [node death](#node-death))

### timeout
Type: `Number`

Default: 10000

How many milliseconds can the connection take before the request is aboorted and retried. (TODO: timeout errors shouldn't cause a retry).

### deadTimeout
Type: `Number`

Default: 30000

How many milliseconds should a dead a connection/node sit and wait before it is ping-ed? (see [node death](#node-death))

### maxSockets
Type: `Number`

Default: 10

How many sockets should a connection/node keep to the server? These sockets are currently kept alive ***forever*** (not like nodes current "keep alive" sockets).

### nodesToHostCallback
Type: `Function`

Default: simple, not much going on [here](src/lib/client_config.js#L65).

This function will receive a list of nodes received durring a sniff. The list of nodes should be transformed into an array of objects which will be fed to the [Host](src/lib/host.js) class. (TODO: allow this function to be async).

## API

To maintain consistency across all the low-level clients ([PHP](https://github.com/elasticsearch/elasticsearch-php), [Python](https://github.com/elasticsearch/elasticsearch-ph), [Ruby](https://github.com/elasticsearch/elasticsearch-ruby), [Perl](https://github.com/elasticsearch/elasticsearch-perl)), all API methods accept an object with parameters and a callback. If you don't pass the callback, the functions will return a promise.

### Generic Params

Several parameters work on all API methods, and control the way that those requests are carried out:

### ignore
Type: `Number` or `Number[]`

Default: `null`

Don't treat these HTTP status codes as "errors". Example use cases could be `ignore: 404` or `ignore: [404]`

### timeout
Type: `Number`

Default: `client.config.timeout`

The number of milliseconds this request has to complete. It defaults to the timeout specified at the client level, which defaults to 10 seconds.

### Methods

All the methods can be seen [here](TODO: api docs), or take a look at [api.js](src/lib/api.js).

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

A; A connection is considered dead when a request to it does not complete properly. If the server responds with any status, even 500, it is not considered dead.
