// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType, expectError, expectAssignable } from 'tsd'
import { Client } from '../../'
import {
  BulkHelper,
  BulkStats,
  BulkHelperOptions,
  ScrollSearchResponse
} from '../../lib/Helpers'

const client = new Client({
  node: 'http://localhost:9200'
})

/// .helpers.bulk

const b = client.helpers.bulk({
  datasource: [],
  onDocument (doc) {
    expectType<Record<string, any>>(doc)
    return { index: { _index: 'test' } }
  },
  flushBytes: 5000000,
  concurrency: 5,
  retries: 3,
  wait: 5000,
  onDrop (doc) {
    expectType<Record<string, any>>(doc)
  },
  refreshOnCompletion: true,
  pipeline: 'my-pipeline'
})

expectType<BulkHelper<BulkStats>>(b)
expectType<BulkHelper<BulkStats>>(b.abort())
b.then(stats => expectType<BulkStats>(stats))

// body can't be provided
expectError(
  client.helpers.bulk({
    datasource: [],
    onDocument (doc) {
      return { index: { _index: 'test' } }
    },
    body: []
  })
)

// test onDocument actions
// index
{
  const options = {
    datasource: [],
    onDocument (doc: Record<string, any>) {
      return { index: { _index: 'test' } } 
    }
  }
  expectAssignable<BulkHelperOptions>(options)
}
// create
{
  const options = {
    datasource: [],
    onDocument (doc: Record<string, any>) {
      return { create: { _index: 'test' } }
    }
  }
  expectAssignable<BulkHelperOptions>(options)
}
// update
{
  // without `:BulkHelperOptions` this test cannot pass
  // but if we write these options inline inside
  // a `.helper.bulk`, it works as expected
  const options: BulkHelperOptions = {
    datasource: [],
    onDocument (doc: Record<string, any>) {
      return [{ update: { _index: 'test' } }, doc]
    }
  }
  expectAssignable<BulkHelperOptions>(options)
}
// delete
{
  const options = {
    datasource: [],
    onDocument (doc: Record<string, any>) {
      return { delete: { _index: 'test' } }
    }
  }
  expectAssignable<BulkHelperOptions>(options)
}

/// .helpers.scrollSearch

// just search params
{
  async function test () {
    const scrollSearch = client.helpers.scrollSearch({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })

    for await (const response of scrollSearch) {
      expectAssignable<ScrollSearchResponse>(response)
    }
  }
}

// search params and options
{
  async function test () {
    const scrollSearch = client.helpers.scrollSearch({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    }, { ignore: [404] })

    for await (const response of scrollSearch) {
      expectAssignable<ScrollSearchResponse>(response)
      expectType<Record<string, any>>(response.body)
      expectType<unknown[]>(response.documents)
      expectType<unknown>(response.meta.context)
    }
  }
}

// with type defs
{  
  interface ShardsResponse {
    total: number;
    successful: number;
    failed: number;
    skipped: number;
  }
  
  interface Explanation {
    value: number;
    description: string;
    details: Explanation[];
  }
  
  interface SearchResponse<T> {
    took: number;
    timed_out: boolean;
    _scroll_id?: string;
    _shards: ShardsResponse;
    hits: {
      total: number;
      max_score: number;
      hits: Array<{
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: T;
        _version?: number;
        _explanation?: Explanation;
        fields?: any;
        highlight?: any;
        inner_hits?: any;
        matched_queries?: string[];
        sort?: string[];
      }>;
    };
    aggregations?: any;
  }
  
  interface Source {
    foo: string
  }

  async function test () {
    const scrollSearch = client.helpers.scrollSearch<Source, SearchResponse<Source>>({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })

    for await (const response of scrollSearch) {
      expectAssignable<ScrollSearchResponse>(response)
      expectType<SearchResponse<Source>>(response.body)
      expectType<Source[]>(response.documents)
      expectType<unknown>(response.meta.context)
    }
  }
}

{
  interface SearchBody {
    query: {
      match: { foo: string }
    }
  }
  
  interface ShardsResponse {
    total: number;
    successful: number;
    failed: number;
    skipped: number;
  }
  
  interface Explanation {
    value: number;
    description: string;
    details: Explanation[];
  }
  
  interface SearchResponse<T> {
    took: number;
    timed_out: boolean;
    _scroll_id?: string;
    _shards: ShardsResponse;
    hits: {
      total: number;
      max_score: number;
      hits: Array<{
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: T;
        _version?: number;
        _explanation?: Explanation;
        fields?: any;
        highlight?: any;
        inner_hits?: any;
        matched_queries?: string[];
        sort?: string[];
      }>;
    };
    aggregations?: any;
  }
  
  interface Source {
    foo: string
  }

  async function test () {
    const scrollSearch = client.helpers.scrollSearch<Source, SearchResponse<Source>, SearchBody, string>({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })

    for await (const response of scrollSearch) {
      expectAssignable<ScrollSearchResponse>(response)
      expectType<SearchResponse<Source>>(response.body)
      expectType<Source[]>(response.documents)
      expectType<string>(response.meta.context)
    }
  }
}

/// .helpers.scrollDocuments

// just search params
{
  async function test () {
    const scrollDocuments = client.helpers.scrollDocuments({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })

    for await (const document of scrollDocuments) {
      expectType<unknown>(document)
    }
  }
}

// search params and options
{
  async function test () {
    const scrollDocuments = client.helpers.scrollDocuments({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    }, { ignore: [404] })

    for await (const document of scrollDocuments) {
      expectType<unknown>(document)
    }
  }
}

// with type defs
{ 
  interface Source {
    foo: string
  }

  async function test () {
    const scrollDocuments = client.helpers.scrollDocuments<Source>({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })

    for await (const document of scrollDocuments) {
      expectType<Source>(document)
    }
  }
}

{
  interface SearchBody {
    query: {
      match: { foo: string }
    }
  }
  
  interface Source {
    foo: string
  }

  async function test () {
    const scrollDocuments = client.helpers.scrollDocuments<Source, SearchBody>({
      index: 'test',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    })

    for await (const document of scrollDocuments) {
      expectType<Source>(document)
    }
  }
}

/// .helpers.search

// just search params
{
  const p = client.helpers.search({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<Promise<unknown[]>>(p)
  expectType<unknown[]>(await p)
}

// search params and options
{
  const p = client.helpers.search({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  }, { ignore: [404] })

  expectType<Promise<unknown[]>>(p)
  expectType<unknown[]>(await p)
}

// with type defs
{
  interface Source {
    foo: string
  }

  const p = client.helpers.search<Source>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<Promise<Source[]>>(p)
  expectType<Source[]>(await p)
}

{
  interface SearchBody {
    query: {
      match: { foo: string }
    }
  }
  
  interface Source {
    foo: string
  }

  const p = client.helpers.search<Source, SearchBody>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<Promise<Source[]>>(p)
  expectType<Source[]>(await p)
}