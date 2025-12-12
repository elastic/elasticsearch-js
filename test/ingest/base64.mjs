/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFile } from "node:fs/promises"
import { existsSync, createWriteStream, mkdirSync } from "node:fs"
import { Readable } from "node:stream"
import { finished } from "node:stream/promises"
import inly from 'inly'
import { Client } from '../../index.js'
import { Serializer } from '@elastic/transport'

const client = new Client({
  node: process.env.ES_URL,
  auth: {
    username: process.env.ES_USERNAME,
    password: process.env.ES_PASSWORD,
  },
  compression: false
})

const indexName = "b64-test"

const indexSettings = {
  index: indexName,
  wait_for_active_shards: 'all',
  mappings: {
    properties: {
      docid: { type: "keyword" },
      emb: {
        dims: 1536,
        index: true,
        index_options: { type: "flat" },
        similarity: "cosine",
        type: "dense_vector"
      },
      text: {
        fields: {
          keyword: {
            ignore_above: 256,
            type: "keyword"
          }
        },
        type: "text"
      },
      title: {
        type: "text"
      }
    }
  }
}

const dataset_size = 20000

/**
 * Fetches vector data set
 */
async function fetchDataSet () {
  const url = 'https://rally-tracks.elastic.co/openai_vector/open_ai_corpus-initial-indexing-1k.json.bz2'
  const dir = 'base64-data'
  const filePath = `./${dir}/open_ai_corpus-initial-indexing-1k.json`
  const filePathBz2 = `./${dir}/open_ai_corpus-initial-indexing-1k.json.bz2`

  if (!existsSync(filePath)) {
    mkdirSync(dir, { recursive: true })

    // download archive
    if (!existsSync(filePathBz2)) {
      console.log(`Downloading ${url}`)
      const { body } = await fetch(url)
      const stream = createWriteStream(filePathBz2)
      await finished(Readable.fromWeb(body).pipe(stream))
    }

    // extract archive
    await new Promise((resolve, reject) => {
      console.log(`Extracting ${filePathBz2} to ${dir}`)
      const extract = inly(filePathBz2, dir)
      extract.on('error', reject)
      extract.on('end', resolve)
    })
  }

  return await readFile(filePath, 'utf8')
}

/**
 * Loops over an array until a certain number of records has be yielded
 */
function* loopDataSet (data) {
  let count = 0
  while (true) {
    for (const item of data) {
      yield item
      count++
      if (count >= dataset_size) return
    }
  }
}

/**
  * Bulk ingest the dataset
  * @param {number} chunkSize number of documents to serialize before running bulk request
  * @param {boolean} base64 If true, encode float32 embeddings array as a base64 string
  * @returns {number} Milliseconds the serialize+index operations took
  */
async function index (chunkSize, base64 = false) {
  const raw = await fetchDataSet()
  const serializer = new Serializer()
  let chunk = []

  await client.indices.create(indexSettings)

  const start = Date.now()

  const lines = raw.split(/[\r\n]+/).filter(row => row.trim().length > 0)
  for (const line of loopDataSet(lines)) {
    const doc = JSON.parse(line)
    if (base64) doc.emb = serializer.encodeFloat32Vector(doc.emb)
    chunk.push(doc)
    if (chunk.length >= chunkSize) {
      const operations = chunk.flatMap(doc => [{ index: { _index: indexName } }, doc])
      await client.bulk({ operations })
      chunk = []
    }
  }

  const duration = Date.now() - start

  await client.indices.delete({ index: indexName })

  return duration
}

async function run () {
  const measurements = []

  for (const chunk_size of [100, 250, 500, 1000]) {
    const measurement = { dataset_size, chunk_size }

    const float32Duration = []
    const base64Duration = []

    for (const _ of [1, 2, 3]) {
      float32Duration.push(await index(chunk_size))
      base64Duration.push(await index(chunk_size, true))
    }

    measurement.float32 = { duration: float32Duration.reduce((a, b) => a + b, 0) / float32Duration.length }
    measurement.base64 = { duration: base64Duration.reduce((a, b) => a + b, 0) / base64Duration.length }

    measurements.push(measurement)
  }

  console.log(JSON.stringify(measurements, null, 2))
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
