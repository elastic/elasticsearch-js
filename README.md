# elasticsearch.js 16.1.1

---

#### We have released the [new JavaScript client](https://www.elastic.co/blog/new-elasticsearch-javascript-client-released)!
*In the next months this client will be deprecated, so you should start migrating your codebase as soon as possible.<br/>
We have built a [migration guide](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/breaking-changes.html) that will help you move to the new client quickly, and if you have questions or need help, please [open an issue](https://github.com/elastic/elasticsearch-js/issues/new/choose).*

---

The official low-level Elasticsearch client for Node.js and the browser.

[![Coverage Status](http://img.shields.io/coveralls/elastic/elasticsearch-js/master.svg?style=flat-square)](https://coveralls.io/r/elastic/elasticsearch-js?branch=master)
[![Dependencies up to date](http://img.shields.io/david/elastic/elasticsearch-js.svg?style=flat-square)](https://david-dm.org/elastic/elasticsearch-js)

## Features

 - One-to-one mapping with REST API and the other official clients
 - Generalized, pluggable architecture. See [Extending Core Components](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/extending_core_components.html)
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all available nodes.

## Use in Node.js

```
npm install elasticsearch
```

[![NPM Stats](https://nodei.co/npm/elasticsearch.png?downloads=true)](https://npmjs.org/package/elasticsearch)

## Use in the Browser

Check out the [Browser Builds](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/browser-builds.html) doc page for help downloading and setting up the client for use in the browser.

## Docs
 - [Quick Start](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/quick-start.html)
 - [Browser Builds](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/browser-builds.html)
 - [API](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-reference.html)
 - [Configuration](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/configuration.html)
 - [Development/Contributing](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/contributing.html)
 - [Extending Core Components](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/extending_core_components.html)
 - [Logging](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/logging.html)


## Questions?
You can probably find help in [#kibana](https://kiwiirc.com/client/irc.freenode.net/?#kibana) on freenode.


## Supported Elasticsearch Versions

Elasticsearch.js provides support for, and is regularly tested against, Elasticsearch releases 0.90.12 and greater. We also test against the latest changes in several branches in the Elasticsearch repository. To tell the client which version of Elastisearch you are using, and therefore the API it should provide, set the `apiVersion` config param. [More info](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/configuration.html#config-options)

## Examples

Create a client instance
```js
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

Send a HEAD request to `/` and allow up to 1 second for it to complete.
```js
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
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
try {
  const response = await client.search({
    q: 'pants'
  });
  console.log(response.hits.hits)
} catch (error) {
  console.trace(error.message)
}
```

Find tweets that have "elasticsearch" in their body field
```js
const response = await client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
})

for (const tweet of response.hits.hits) {
  console.log('tweet:', tweet);
}
```

More examples and detailed information about each method are available [here](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/index.html)

## License

This software is licensed under the Apache 2 license, quoted below.

    Copyright (c) 2014 Elasticsearch <http://www.elasticsearch.org>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
