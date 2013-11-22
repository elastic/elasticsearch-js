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
 - [Configuration](docs/configuration.md)
 - [Examples](docs/examples.md)
 - [API](docs/api.md)
 - [Replacing Core Components](docs/replacing_core_components.md)
 - [Errors](docs/errors.md)
 - [Customize Logging](docs/customize_logging.md)
