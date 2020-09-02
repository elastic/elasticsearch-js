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

'use strict'

const minimist = require('minimist')
const Git = require('simple-git/promise')
const { Client } = require('@elastic/elasticsearch')

start(minimist(process.argv.slice(2), {
  string: ['elasticsearch', 'index', 'repository'],
  default: {
    elasticsearch: 'http://localhost:9200',
    index: 'git',
    repository: 'elasticsearch-js'
  }
}))

async function start ({ elasticsearch, index, repository }) {
  const client = new Client({ node: elasticsearch })
  await createIndex({ client, index })
  await loadHistory({ client, index, repository })
}

async function createIndex ({ client, index }) {
  const userMapping = {
    properties: {
      name: {
        type: 'text',
        fields: {
          keyword: { type: 'keyword' }
        }
      }
    }
  }

  await client.indices.create({
    index,
    body: {
      settings: {
        // just one shard, no replicas for testing
        number_of_shards: 1,
        number_of_replicas: 0,
        // custom analyzer for analyzing file paths
        analysis: {
          analyzer: {
            file_path: {
              type: 'custom',
              tokenizer: 'path_hierarchy',
              filter: ['lowercase']
            }
          }
        }
      },
      mappings: {
        properties: {
          repository: { type: 'keyword' },
          sha: { type: 'keyword' },
          author: userMapping,
          authored_date: { type: 'date' },
          committer: userMapping,
          committed_date: { type: 'date' },
          parent_shas: { type: 'keyword' },
          description: { type: 'text', analyzer: 'snowball' },
          files: { type: 'text', analyzer: 'file_path', fielddata: true }
        }
      }
    }
  })
}

async function loadHistory ({ client, index, repository }) {
  const git = Git(process.cwd())
  // Get the result of  'git log'
  const { all: history } = await git.log({
    format: {
      hash: '%H',
      parentHashes: '%P',
      authorName: '%an',
      authorEmail: '%ae',
      authorDate: '%ai',
      committerName: '%cn',
      committerEmail: '%ce',
      committerDate: '%cd',
      subject: '%s'
    }
  })

  // Get the stats for every commit
  for (var i = 0; i < history.length; i++) {
    const commit = history[i]
    const stat = await git.show(['--numstat', '--oneline', commit.hash])
    commit.files = []
    commit.stat = stat
      .split('\n')
      .slice(1)
      .filter(Boolean)
      .reduce((acc, val, index) => {
        const [insertions, deletions, file] = val.split('\t')
        commit.files.push(file)
        acc.files++
        acc.insertions += Number(insertions)
        acc.deletions += Number(deletions)
        return acc
      }, { insertions: 0, deletions: 0, files: 0 })
  }

  // Index the data, 500 commits at a time
  var count = 0
  var chunk = history.slice(count, count + 500)
  while (chunk.length > 0) {
    const { body } = await client.bulk({
      body: chunk.reduce((body, commit) => {
        body.push({ index: { _index: index, _id: commit.hash } })
        body.push({
          repository,
          sha: commit.hash,
          author: {
            name: commit.authorName,
            email: commit.authorEmail
          },
          authored_date: new Date(commit.authorDate).toISOString(),
          committer: {
            name: commit.committerName,
            email: commit.committerEmail
          },
          committed_date: new Date(commit.committerDate).toISOString(),
          parent_shas: commit.parentHashes,
          description: commit.subject,
          files: commit.files,
          stat: commit.stat
        })
        return body
      }, [])
    })
    if (body.errors) {
      console.log(JSON.stringify(body.items[0], null, 2))
      process.exit(1)
    }
    count += 500
    chunk = history.slice(count, count + 500)
  }
}
