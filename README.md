# elasticsearch.js

The official low-level Elasticsearch client for Node.js and the browser.

[![Build Status](https://travis-ci.org/elasticsearch/elasticsearch-js.png?branch=master)](https://travis-ci.org/elasticsearch/elasticsearch-js) [![Coverage Status](https://coveralls.io/repos/elasticsearch/elasticsearch-js/badge.png)](https://coveralls.io/r/elasticsearch/elasticsearch-js) [![Build Status](https://build.elasticsearch.org/job/es-js_nightly/badge/icon)](https://build.elasticsearch.org/job/es-js_nightly/)

## Features

 - One-to-one mapping with REST API and the other official clients
 - Generalized, pluggable architecture. See [Extending Core Components](http://elasticsearch.github.io/elasticsearch-js/index.html#extending)
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all available nodes.

## Install

```
npm install elasticsearch
```

## Browser Builds

We also provide builds of the elasticsearch.js client for use in the browser. If your project uses Angular or jQuery we also provide specifc builds for you, simply include the `elasticsearch.{{lib}}.js` files in your project instead.

 - v1.1.0: [zip](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/elasticsearch-js-1.1.0.zip), [tar.gz](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/elasticsearch-js-1.1.0.tar.gz)
 - master: [zip](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/elasticsearch-js-master.zip), [tar.gz](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/elasticsearch-js-master.tar.gz)

## Docs
 - [Quick Start](http://elasticsearch.github.io/elasticsearch-js/index.html#quick-start)
 - [API](http://elasticsearch.github.io/elasticsearch-js/api.html)
 - [Configuration](http://elasticsearch.github.io/elasticsearch-js/index.html#configuration)
 - [Development/Contributing](http://elasticsearch.github.io/elasticsearch-js/index.html#dev)
 - [Extending Core Components](http://elasticsearch.github.io/elasticsearch-js/index.html#extending)
 - [Logging](http://elasticsearch.github.io/elasticsearch-js/index.html#logging)

## Examples

Create a client instance
```js
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

Send a HEAD request to "/?hello=elasticsearch" and allow up to 1 second for it to complete.
```js
client.ping({
  requestTimeout: 1000,
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
```

Skip the callback to get a promise back
```js
client.search({
  q: 'pants'
}).then(function (body) {
  var hits = body.hits.hits;
}, function (error) {
  console.trace(error.message);
});
```

Find tweets that have "elasticsearch" in their body field
```js
client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});
```

~~More examples and detailed information about each method are available [here](http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/master/index.html)~~

## License

This software is licensed under the Apache 2 license, quoted below.

    Copyright (c) 2013 Elasticsearch <http://www.elasticsearch.org>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
