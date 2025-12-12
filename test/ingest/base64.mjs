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

// const client = new Client({
//   node: process.env.ES_URL,
//   compression: false
// })

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

  const contents = await readFile(filePath, 'utf8')
  const rows = []
  for (let line of contents.split(/[\r\n]+/)) {
    line = line.trim()
    if (line.length > 0) rows.push(JSON.parse(line))
  }

  return rows
}

async function createIndex (name) {
  await client.indices.create({
    name,
    wait_for_active_shards: 'all',
    settings: {
      mappings: {
        properties: {
          emb: { type: 'dense_vector', dims: 1536, index: true, similarity: 'l2_norm' },
          docid: { type: 'keyword' },
          title: { type: 'text' },
          text: { type: 'text' }
        }
      }
    }
  })
}

async function run () {
  const runs = [
    { index: "run1-baseline", type: "baseline" },
    { index: "run1-base64", type: "base64" },
    { index: "run2-baseline", type: "baseline" },
    { index: "run2-base64", type: "base64" },
    { index: "run3-baseline", type: "baseline" },
    { index: "run3-base64", type: "base64" },
  ]

  const dataSet = await fetchDataSet()
  console.log(dataSet)

  // for (const run of runs) {
  //   await createIndex(run.index)
  //
  //   start = Date.now()
  //   await client.helpers.bulk({
  //   })
  // }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
