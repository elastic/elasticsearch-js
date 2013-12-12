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

  [![Build Status](https://spenceralger.com/jenkins-badge/es/es-js_nightly)](http://build.elasticsearch.com/job/es-js_nightly)

 - Browsers (see [browser builds](#browser-builds)):

  [![current browser support](https://spenceralger.com/jenkins-browser-badge/es_js)](http://build.elasticsearch.com/job/es-js_nightly)


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
 - [Quick Start](http://spenceralger.github.io/elasticsearch-js/index.html#quick-start)
 - [API](http://spenceralger.github.io/elasticsearch-js/api.html)
 - [Configuration](http://spenceralger.github.io/elasticsearch-js/index.html#configuration)
 - [Extending Core Components](http://spenceralger.github.io/elasticsearch-js/index.html#extending)
 - [Logging](http://spenceralger.github.io/elasticsearch-js/index.html#logging)
 - [Contributing](http://spenceralger.github.io/elasticsearch-js/index.html#contributing)

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