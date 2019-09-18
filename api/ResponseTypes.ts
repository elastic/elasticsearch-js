// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

export interface Search<T = any> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: Shards;
  hits: {
    total: {
      value: number;
      relation: string;
    };
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

export interface MSearch<T = any> {
  responses?: Array<Search<T>>;
}

export interface Shards {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

export interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}

export interface Create {
  _shards: Shards;
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  result: string;
}

export interface Index extends Create {}

export interface Delete {
  _shards: Shards;
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  result: string;
}

export interface Update {
  _shards: Shards;
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  result: string;
}

export interface Get<T = any> {
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  found: boolean;
  _source: T
}


export interface Bulk {
  took: number;
  errors: boolean;
  items: Array<BulkItem>;
}

type BulkItem =
  | { index: BulkIndex }
  | { create: BulkCreate }
  | { update: BulkUpdate }
  | { delete: BulkDelete }

interface BulkIndex extends Index {
  status: number;
}

interface BulkCreate extends Create {
  status: number;
}

interface BulkUpdate extends Update {
  status: number;
}

interface BulkDelete extends Delete {
  status: number;
}
