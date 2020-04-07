// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

interface SearchResponse<TSource = unknown, TAggregations = unknown> {
  took: number
  timed_out: boolean
  _scroll_id?: string
  _shards: Shards
  hits: {
    total: {
      value: number
      relation: string
    }
    max_score: number
    hits: Array<{
      _index: string
      _type: string
      _id: string
      _score: number
      _source: TSource
      _version?: number
      _explanation?: Explanation
      fields?: Record<string, unknown>
      highlight?: Record<string, string[]>
      inner_hits?: Record<string, unknown>
      matched_queries?: string[]
      sort?: any[]
    }>
  }
  aggregations?: TAggregations
}

interface Shards {
  total: number
  successful: number
  failed: number
  skipped: number
}

interface Explanation {
  value: number
  description: string
  details: Explanation[]
}

interface MSearchResponse<TSource = unknown, TAggregations = unknown> {
  responses: Array<SearchResponse<TSource, TAggregations>>
}

interface CreateResponse {
  _shards: Shards
  _index: string
  _type: string
  _id: string
  _version: number
  _seq_no: number
  _primary_term: number
  result: string
}

interface IndexResponse extends CreateResponse {}

interface DeleteResponse {
  _shards: Shards
  _index: string
  _type: string
  _id: string
  _version: number
  _seq_no: number
  _primary_term: number
  result: string
}

interface UpdateResponse {
  _shards: Shards
  _index: string
  _type: string
  _id: string
  _version: number
  result: string
}

interface GetResponse<TSource = unknown> {
  _index: string
  _type: string
  _id: string
  _version: number
  _seq_no: number
  _primary_term: number
  found: boolean
  _source: TSource
}

interface BulkResponse {
  took: number
  errors: boolean
  items: BulkItem[]
}

type BulkItem =
  | { index: BulkIndex }
  | { create: BulkCreate }
  | { update: BulkUpdate }
  | { delete: BulkDelete }

interface BulkIndex extends IndexResponse {
  status: number
}

interface BulkCreate extends CreateResponse {
  status: number
}

interface BulkUpdate extends UpdateResponse {
  status: number
}

interface BulkDelete extends DeleteResponse {
  status: number
}

export {
  SearchResponse,
  MSearchResponse,
  CreateResponse,
  IndexResponse,
  DeleteResponse,
  UpdateResponse,
  GetResponse,
  BulkResponse
}