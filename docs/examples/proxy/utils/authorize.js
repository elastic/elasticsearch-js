/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
