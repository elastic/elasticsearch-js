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

/* eslint camelcase: 0 */
/* eslint no-undef: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-dupe-class-members: 0 */
/* eslint lines-between-class-members: 0 */

import Q from './query'
import A from './aggregation'
import * as t from './types'
import T from '../es-types'

type SearchRequest = Required<T.SearchRequest>['body']
interface BoolQuery {
  filter?: T.QueryContainer[]
  minimum_should_match?: T.MinimumShouldMatch
  must?: T.QueryContainer[]
  must_not?: T.QueryContainer[]
  should?: T.QueryContainer[]
  _name?: string
}

const kState = Symbol('dsl-query-state')
type MultiType = string | number | boolean

// TODO: the client should detect a fluent query
//       and automatically call `query.build()`

class FluentQ {
  [kState]: (SearchRequest | T.QueryContainer | T.QueryContainer[] | BoolQuery)[]
  constructor () {
    this[kState] = []
  }

  build (): SearchRequest {
    return Q(...this[kState])
  }

  buildQuery (): T.QueryContainer {
    const b = Q(...this[kState])
    return b.query != null ? b.query : {}
  }

  param (key: string): Symbol {
    return Q.param(key)
  }

  compileUnsafe<TInput extends Record<string, any> = Record<string, any>> (): t.compiledFunction<TInput> {
    return Q.compileUnsafe(this.build())
  }

  compile<TInput extends Record<string, any> = Record<string, any>> (): t.compiledFunction<TInput> {
    return Q.compile(this.build())
  }

  match (key: string, val: MultiType | Symbol): this
  match (key: string, val: MultiType | Symbol, opts: T.MatchQuery): this
  match (key: string, val: (MultiType | Symbol)[]): this
  match (key: string, val: (MultiType | Symbol)[], opts: T.MatchQuery): this
  match (key: string, val: any, opts?: any): this {
    this[kState].push(Q.match(key, val, opts))
    return this
  }

  matchPhrase (key: string, val: string | Symbol): this
  matchPhrase (key: string, val: string | Symbol, opts: T.MatchPhraseQuery): this
  matchPhrase (key: string, val: (string | Symbol)[]): this
  matchPhrase (key: string, val: (string | Symbol)[], opts: T.MatchPhraseQuery): this
  matchPhrase (key: string, val: any, opts?: any): this {
    this[kState].push(Q.matchPhrase(key, val, opts))
    return this
  }

  matchPhrasePrefix (key: string, val: string | Symbol): this
  matchPhrasePrefix (key: string, val: string | Symbol, opts: T.MatchPhrasePrefixQuery): this
  matchPhrasePrefix (key: string, val: (string | Symbol)[]): this
  matchPhrasePrefix (key: string, val: (string | Symbol)[], opts: T.MatchPhrasePrefixQuery): this
  matchPhrasePrefix (key: string, val: any, opts?: any): this {
    this[kState].push(Q.matchPhrasePrefix(key, val, opts))
    return this
  }

  multiMatch (keys: string[], val: string | Symbol, opts?: T.MultiMatchQuery): this {
    this[kState].push(Q.multiMatch(keys, val, opts))
    return this
  }

  matchAll (opts?: T.MatchAllQuery): this {
    this[kState].push(Q.matchAll(opts))
    return this
  }

  matchNone (): this {
    this[kState].push(Q.matchNone())
    return this
  }

  common (key: string, val: string | Symbol): this
  common (key: string, val: string | Symbol, opts: T.CommonTermsQuery): this
  common (key: string, val: (string | Symbol)[]): this
  common (key: string, val: (string | Symbol)[], opts: T.CommonTermsQuery): this
  common (key: string, val: any, opts?: any): this {
    this[kState].push(Q.common(key, val, opts))
    return this
  }

  queryString (val: string | Symbol, opts: T.QueryStringQuery): this {
    this[kState].push(Q.queryString(val, opts))
    return this
  }

  simpleQueryString (val: string | Symbol, opts: T.SimpleQueryStringQuery): this {
    this[kState].push(Q.simpleQueryString(val, opts))
    return this
  }

  term (key: string, val: MultiType | Symbol): this
  term (key: string, val: MultiType | Symbol, opts: T.TermQuery): this
  term (key: string, val: (MultiType | Symbol)[]): this
  term (key: string, val: (MultiType | Symbol)[], opts: T.TermsQuery): this
  term (key: string, val: any, opts?: any): this {
    if (Array.isArray(val) && opts == null) {
      return this.terms(key, val)
    }
    this[kState].push(Q.term(key, val, opts))
    return this
  }

  terms (key: string, val: (MultiType | Symbol)[]): this
  terms (key: string, val: (MultiType | Symbol)[], opts: T.TermsQuery): this
  terms (key: string, val: (MultiType | Symbol)[], opts?: any): this {
    this[kState].push(Q.terms(key, val, opts))
    return this
  }

  termsSet (key: string, val: (string | Symbol)[], opts?: T.TermsSetQuery): this {
    this[kState].push(Q.termsSet(key, val, opts))
    return this
  }

  range (key: string, opts: T.RangeQuery): this {
    this[kState].push(Q.range(key, opts))
    return this
  }

  exists (key: string | Symbol): this
  exists (key: (string | Symbol)[]): this
  exists (key: any): this {
    if (Array.isArray(key)) {
      for (const k of key) {
        this[kState].push(Q.exists(k))
      }
      return this
    }
    this[kState].push(Q.exists(key))
    return this
  }

  prefix (key: string, val: string | Symbol): this
  prefix (key: string, val: string | Symbol, opts: T.PrefixQuery): this
  prefix (key: string, val: (string | Symbol)[]): this
  prefix (key: string, val: (string | Symbol)[], opts: T.PrefixQuery): this
  prefix (key: string, val: any, opts?: any): this {
    this[kState].push(Q.prefix(key, val, opts))
    return this
  }

  wildcard (key: string, val: string | Symbol): this
  wildcard (key: string, val: string | Symbol, opts: T.WildcardQuery): this
  wildcard (key: string, val: (string | Symbol)[]): this
  wildcard (key: string, val: (string | Symbol)[], opts: T.WildcardQuery): this
  wildcard (key: string, val: any, opts?: any): any {
    this[kState].push(Q.wildcard(key, val, opts))
    return this
  }

  regexp (key: string, val: string | Symbol): this
  regexp (key: string, val: string | Symbol, opts: T.RegexpQuery): this
  regexp (key: string, val: (string | Symbol)[]): this
  regexp (key: string, val: (string | Symbol)[], opts: T.RegexpQuery): this
  regexp (key: string, val: any, opts?: any): this {
    this[kState].push(Q.regexp(key, val, opts))
    return this
  }

  fuzzy (key: string, val: string | Symbol): this
  fuzzy (key: string, val: string | Symbol, opts: T.FuzzyQuery): this
  fuzzy (key: string, val: (string | Symbol)[]): this
  fuzzy (key: string, val: (string | Symbol)[], opts: T.FuzzyQuery): this
  fuzzy (key: string, val: any, opts?: any): this {
    this[kState].push(Q.fuzzy(key, val, opts))
    return this
  }

  ids (key: string, val: (string | Symbol)[]): this {
    this[kState].push(Q.ids(key, val))
    return this
  }

  must (...queries: FluentQ[]): this {
    // @ts-expect-error
    this[kState].push(Q.must(...queries.flatMap(q => q[kState])))
    return this
  }

  should (...queries: FluentQ[]): this {
    // @ts-expect-error
    this[kState].push(Q.should(...queries.flatMap(q => q[kState])))
    return this
  }

  mustNot (...queries: FluentQ[]): this {
    // @ts-expect-error
    this[kState].push(Q.mustNot(...queries.flatMap(q => q[kState])))
    return this
  }

  filter (...queries: FluentQ[]): this {
    // @ts-expect-error
    this[kState].push(Q.filter(...queries.flatMap(q => q[kState])))
    return this
  }

  bool (...queries: FluentQ[]): this {
    // @ts-expect-error
    this[kState].push(Q.bool(...queries.flatMap(q => q[kState])))
    return this
  }

  and (...blocks: FluentQ[]): this {
    const { query = {}, ...searchRequest } = this.build()
    this[kState] = [searchRequest, Q.and(query, ...blocks.map(q => q.buildQuery()))]
    return this
  }

  or (...blocks: FluentQ[]): this {
    const { query = {}, ...searchRequest } = this.build()
    this[kState] = [searchRequest, Q.and(query, ...blocks.map(q => q.buildQuery()))]
    return this
  }

  not (query: FluentQ): this {
    this[kState].push(Q.not(query.buildQuery()))
    return this
  }

  minShouldMatch (int: number): this {
    this[kState].push(Q.minShouldMatch(int))
    return this
  }

  name (queryName: string): this {
    this[kState].push(Q.name(queryName))
    return this
  }

  nested (path: string, query: T.QueryContainer, opts: T.NestedQuery): this {
    this[kState].push(Q.nested(path, query, opts))
    return this
  }

  constantScore (query: T.QueryContainer, boost: number): this {
    this[kState].push(Q.constantScore(query, boost))
    return this
  }

  disMax (queries: T.QueryContainer[], opts?: T.DisMaxQuery): this {
    this[kState].push(Q.disMax(queries, opts))
    return this
  }

  functionScore (function_score: T.FunctionScoreQuery): this {
    this[kState].push(Q.functionScore(function_score))
    return this
  }

  boosting (boostOpts: T.BoostingQuery): this {
    this[kState].push(Q.boosting(boostOpts))
    return this
  }

  sort (key: string | string[]): this
  sort (key: string | string[], order: T.SortOrder): this
  sort (key: string | string[], opts: T.Sort): this
  sort (key: string | string[], opts?: any): this {
    this[kState].push(Q.sort(key, opts))
    return this
  }

  script (source: string): this
  script (source: string, lang: string): this
  script (source: string, params: Record<string, any>, lang?: string): this
  script (source: string, params?: any, lang?: any): this {
    this[kState].push(Q.script(source, params, lang))
    return this
  }

  size (s: number | Symbol): this {
    this[kState].push(Q.size(s))
    return this
  }

  aggs (...aggregations: Record<string, any>[]): this {
    this[kState].push(A(...aggregations))
    return this
  }

  raw (obj: Record<string, any>): this {
    this[kState].push(obj)
    return this
  }

  clone (): FluentQ {
    const F = new FluentQ()
    F[kState] = this[kState].slice()
    return F
  }

  toJSON () {
    return this.buildQuery()
  }
}

export default function build () {
  return new FluentQ()
}
