// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType } from 'tsd'
import { Client, ApiResponse } from '../../'

const client = new Client({
  node: 'http://localhost:9200'
})

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

// No generics
{
  const response = await client.search({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<any>(response.body)
  expectType<any>(response.meta.context)
}

// Define only the request body
{
  const response = await client.search<SearchBody>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<any>(response.body)
  expectType<any>(response.meta.context)
}

// Define request body and response body
{
  const response = await client.search<SearchBody, SearchResponse<Source>>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<SearchResponse<Source>>(response.body)
  expectType<any>(response.meta.context)
}

// Define request body, response body and the context
{
  const response = await client.search<SearchBody, SearchResponse<Source>, string>({
    index: 'test',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  })

  expectType<SearchResponse<Source>>(response.body)
  expectType<string>(response.meta.context)
}
