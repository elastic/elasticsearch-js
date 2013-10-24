elasticsearch-js
[![Build Status](https://travis-ci.org/spenceralger/elasticsearch-js.png)](https://travis-ci.org/spenceralger/elasticsearch-js)
=================
Official *low-level* client for Elasticsearch.

This project's goal it to give the JavaScript community a solif foundation for all Elasticsearch-related code. It features a complete API, provides a module for use in Node.js as well as several different build for use in the browser. We have tried to be opinion-free and very plugable.

To maintain consistency across all the low-level clients (Ruby, Python, etc), clients accept all of their parameters via a single object, along with a single callback.

Features
--------

 - One-to-one mapping with REST API and other language clients
 - Configurable, automatic discovery of cluster nodes
 - Persistent, Keep-Alive connections
 - Load balancing (with pluggable selection strategy) across all availible nodes. Defaults to round-robin
 - Pluggable connection pools to offer different connection strategies
 - Generalized, pluggable architecture - most components can be replaced with your own custom class if specialized behavior is required
