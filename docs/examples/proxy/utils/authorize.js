/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// IMPORTANT: this is not a production ready code & purely for demonstration purposes,
//            we make no guarantees on it's security and stability

'use strict'

module.exports = (req) => {
  const auth = req.headers.authorization
  if (typeof auth !== 'string') {
    return [{
      error: 'Unauthorized',
      message: 'Missing authorization header',
      statusCode: 401
    }, null]
  }

  const [type, token] = req.headers.authorization.split(' ')

  if (type !== 'Bearer') {
    return [{
      error: 'Unauthorized',
      message: 'Bad authorization type',
      statusCode: 401
    }, null]
  }

  if (token.length === 0) {
    return [{
      error: 'Unauthorized',
      message: 'Bad authorization token',
      statusCode: 401
    }, null]
  }

  return [null, token]
}
