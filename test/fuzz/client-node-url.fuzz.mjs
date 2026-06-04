/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

// Fuzz target: Client node/nodes URL parsing
// Exercises the URL parsing and normalisation path inside the Client
// constructor with arbitrary byte-string node URLs.

import { Client, errors } from '../../index.js'

const EXPECTED_MESSAGES = [
  'Invalid URL',
  'Missing node',
  'invalid url',
  'Invalid protocol',
  'node',
  'protocol',
  'auth'
]

function fuzz (buf) {
  const url = buf.toString('utf8')

  try {
    // eslint-disable-next-line no-new
    new Client({ node: url })
  } catch (err) {
    // These are all expected failure modes for invalid URLs / options.
    if (
      err instanceof TypeError ||
      err instanceof errors.ConfigurationError ||
      err.constructor.name === 'InvalidArgumentError' ||
      EXPECTED_MESSAGES.some(msg => err.message?.includes(msg))
    ) {
      return
    }
    throw err
  }
}

export { fuzz }
