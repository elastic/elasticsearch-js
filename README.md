# elasticsearch.js

Official *low-level* client for Elasticsearch.

This project's goal it to give the JavaScript community a solif foundation for all Elasticsearch-related code. It features a complete API, provides a module for use in Node.js as well as several different builds for use in the browser. We have tried to be opinion-free and very plugable.

## Features

 - One-to-one mapping with REST API and other language clients
 - Generalized, pluggable architecture. See [replacing core components](docs/replacing-core-components.md)
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all availible nodes. Defaults to round-robin
 - Pluggable connection pools to offer different connection strategies



## Node and the browser

elasticsearch.js works great in node, as well as the browser (many thanks to [browserify](https://github.com/substack/browserify)).

 - Node: [![Build Status](https://magnum.travis-ci.com/spenceralger/elasticsearch-js.png?token=tsFxSKHtVKG8EZavSjXY)](https://magnum.travis-ci.com/spenceralger/elasticsearch-js)
 - Browsers:
  + ![testling results for browser clients](https://ci.testling.com/spenceralger/xhr-method-test.png)

## Install in Node

```
npm install --save elasticsearch
```

## Browser Builds
Download one of these builds:

 - [elasticsearch.js](dist/elasticsearch.js) - [minified](dist/elasticsearch.min.js)
   - uses the browser's native XHR object
   - Node style callbacks with a bare-bones `.then()` method
 - [elasticsearch.angular.js](dist/elasticsearch.angular.js) - [minified](dist/elasticsearch.angular.min.js)
   - Uses angular's $http servive
   - returns promisses using angular's $q servive

## API

To maintain consistency across all the low-level clients (Ruby, Python, etc), clients accept all of their parameters via a single object, along with a single callback.

#### create the client
```
var es = new elasticsearch.Client({
  hosts: [
    'localhost:9200'
  ],
  log: 'trace',
  sniffOnStart: true
});
```

#### call an endpoint
```
es.cluster.nodeInfo({
  clear: true,
  jvm: true,
  os: ture
}, function (err, resp, status) {
    // do your thing
})
```

#### skip the callback to get a promise back
```
es.search({
  q: 'pants'
}).then(function (resp) {
  // use resp.body and resp.status
}, function (err) {
  // freak out!
})
```

#### abort a request
```
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
```
es.search({
  q: '*',
  timeout: 200
}).then(function (resp) {
  // Iterate all the hits
})
```
