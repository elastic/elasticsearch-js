// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const BaseConnectionPool = require('./BaseConnectionPool')
const ConnectionPool = require('./ConnectionPool')
const CloudConnectionPool = require('./CloudConnectionPool')

module.exports = {
  BaseConnectionPool,
  ConnectionPool,
  CloudConnectionPool
}
