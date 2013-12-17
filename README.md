# elasticsearch.js

The official low-level Elasticsearch client for Node.js and the browser. [![Build Status](http://build.elasticsearch.com/job/es-js_nightly/badge/icon)](http://build.elasticsearch.com/job/es-js_nightly/)

## Features

 - One-to-one mapping with REST API and the other official clients
 - Generalized, pluggable architecture. See [Extending Core Components](http://spenceralger.github.io/elasticsearch-js/index.html#extending)
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all available nodes.

## Install

```
npm install elasticsearch
```

## Browser Builds

We also provide builds of the elasticsearch.js client for use in the browser. If your project uses Angular or jQuery we also provide specifc builds for you, simply include the `elasticsearch.{{lib}}.js` files in your project instead.

 - v0.0.1: [zip](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/0.0.1/elasticsearch-js.zip), [tar.gz](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/0.0.1/elasticsearch-js.tar.gz)
 - master: [zip](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/master/elasticsearch-js.zip), [tar.gz](https://download.elasticsearch.org/elasticsearch/elasticsearch-js/master/elasticsearch-js.tar.gz)

## Docs
 - [Quick Start](http://spenceralger.github.io/elasticsearch-js/index.html#quick-start)
 - [API](http://spenceralger.github.io/elasticsearch-js/api.html)
 - [Configuration](http://spenceralger.github.io/elasticsearch-js/index.html#configuration)
 - [Development/Contributing](http://spenceralger.github.io/elasticsearch-js/index.html#dev)
 - [Extending Core Components](http://spenceralger.github.io/elasticsearch-js/index.html#extending)
 - [Logging](http://spenceralger.github.io/elasticsearch-js/index.html#logging)

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
