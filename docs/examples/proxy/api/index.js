/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// IMPORTANT: this is not a production ready code & purely for demonstration purposes,
//            we make no guarantees on it's security and stability

// NOTE: to make this endpoint work, you should create an ApiKey with 'write' permissions

'use strict'

const { Client } = require('@elastic/elasticsearch')
const authorize = require('../utils/authorize')

const INDEX = '<index-name>'
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID
  }
})

module.exports = async (req, res) => {
  const [err, token] = authorize(req)
  if (err) {
    res.status(401)
    res.json(err)
    return
  }

  if (typeof req.body !== 'object') {
    res.status(400)
    res.json({
      error: 'Bad Request',
      message: 'The document should be an object',
      statusCode: 400
    })
    return
  }

  try {
    const response = await client.index({
      index: INDEX,
      id: req.query.id,
      document: req.body
    }, {
      headers: {
        Authorization: `ApiKey ${token}`
      },
      meta: true
    })

    res.status(response.statusCode)
    res.json(response.body)
  } catch (err) {
    res.status(err.statusCode || 500)
    res.json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode || 500
    })
  }
}
