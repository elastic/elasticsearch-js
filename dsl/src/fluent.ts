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

const kState = Symbol('dsl-query-state')

// TODO: the client should detect a fluent query
//       and automatically call `query.build()`

class FluentQ {
  [kState]: Record<string, any>[]
  constructor () {
    this[kState] = []
  }

  build (): Record<string, any> {
    return Q(...this[kState])
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

  match (key: string, val: string | Symbol, opts?: Record<string, any>): this
  match (key: string, val: string[], opts?: Record<string, any>): this
  match (key: string, val: any, opts?: Record<string, any>): this {
    this[kState].push(Q.match(key, val, opts))
    return this
  }

  matchPhrase (key: string, val: string | Symbol, opts?: Record<string, any>): this {
    this[kState].push(Q.matchPhrase(key, val, opts))
    return this
  }

  matchPhrasePrefix (key: string, val: string | Symbol, opts?: Record<string, any>): this {
    this[kState].push(Q.matchPhrasePrefix(key, val, opts))
    return this
  }

  multiMatch (keys: string[], val: string | Symbol, opts?: Record<string, any>): this {
    this[kState].push(Q.multiMatch(keys, val, opts))
    return this
  }

  matchAll (opts?: Record<string, any>): this {
    this[kState].push(Q.matchAll(opts))
    return this
  }

  matchNone (): this {
    this[kState].push(Q.matchNone())
    return this
  }

  common (key: string, val: string | Symbol, opts: Record<string, any>): this {
    this[kState].push(Q.common(key, val, opts))
    return this
  }

  queryString (val: string | Symbol, opts: Record<string, any>): this {
    this[kState].push(Q.queryString(val, opts))
    return this
  }

  simpleQueryString (val: string | Symbol, opts: Record<string, any>): this {
    this[kState].push(Q.simpleQueryString(val, opts))
    return this
  }

  term (key: string, val: string | string[] | Symbol, opts?: Record<string, any>): this {
    if (Array.isArray(val)) {
      return this.terms(key, val, opts)
    }
    this[kState].push(Q.term(key, val, opts))
    return this
  }

  terms (key: string, val: string[] | Symbol, opts?: Record<string, any>): this {
    this[kState].push(Q.terms(key, val, opts))
    return this
  }

  termsSet (key: string, val: string[] | Symbol, opts: Record<string, any>): this {
    this[kState].push(Q.termsSet(key, val, opts))
    return this
  }

  range (key: string, opts: Record<string, any>): this {
    this[kState].push(Q.range(key, opts))
    return this
  }

  exists (key: string | Symbol): this
  exists (key: string[]): this
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

  prefix (key: string, val: string | Symbol, opts?: Record<string, any>): this
  prefix (key: string, val: string[], opts?: Record<string, any>): this
  prefix (key: string, val: any, opts?: Record<string, any>): this {
    this[kState].push(Q.prefix(key, val, opts))
    return this
  }

  wildcard (key: string, val: string | Symbol, opts?: Record<string, any>): this
  wildcard (key: string, val: string[], opts?: Record<string, any>): this
  wildcard (key: string, val: any, opts?: Record<string, any>): this {
    this[kState].push(Q.wildcard(key, val, opts))
    return this
  }

  regexp (key: string, val: string | Symbol, opts?: Record<string, any>): this
  regexp (key: string, val: string[], opts?: Record<string, any>): this
  regexp (key: string, val: any, opts?: Record<string, any>): this {
    this[kState].push(Q.regexp(key, val, opts))
    return this
  }

  fuzzy (key: string, val: string | Symbol, opts?: Record<string, any>): this
  fuzzy (key: string, val: string[], opts?: Record<string, any>): this
  fuzzy (key: string, val: any, opts?: Record<string, any>): this {
    this[kState].push(Q.fuzzy(key, val, opts))
    return this
  }

  ids (key: string, val: string[] | Symbol, opts: Record<string, any>): this {
    this[kState].push(Q.ids(key, val, opts))
    return this
  }

  must (...queries: FluentQ[]): this {
    this[kState].push(Q.must(...queries.map(q => q.build())))
    return this
  }

  should (...queries: FluentQ[]): this {
    this[kState].push(Q.should(...queries.map(q => q.build())))
    return this
  }

  mustNot (...queries: FluentQ[]): this {
    this[kState].push(Q.mustNot(...queries.map(q => q.build())))
    return this
  }

  filter (...queries: FluentQ[]): this {
    this[kState].push(Q.filter(...queries.map(q => q.build())))
    return this
  }

  bool (...queries: FluentQ[]): this {
    this[kState].push(Q.bool(...queries.map(q => q.build())))
    return this
  }

  and (...queries: FluentQ[]): this {
    this[kState].push(Q.and(...queries.map(q => q.build())))
    return this
  }

  or (...queries: FluentQ[]): this {
    this[kState].push(Q.or(...queries.map(q => q.build())))
    return this
  }

  not (query: FluentQ): this {
    this[kState].push(Q.not(query.build()))
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

  nested (path: string, query: any, opts: Record<string, any>): this {
    this[kState].push(Q.nested(path, query, opts))
    return this
  }

  constantScore (query: any, boost: number): this {
    this[kState].push(Q.constantScore(query, boost))
    return this
  }

  disMax (queries: t.AnyQuery[], opts?: Record<string, any>): this {
    this[kState].push(Q.disMax(queries, opts))
    return this
  }

  functionScore (function_score: any): this {
    this[kState].push(Q.functionScore(function_score))
    return this
  }

  boosting (boostOpts: Record<string, any>): this {
    this[kState].push(Q.boosting(boostOpts))
    return this
  }

  sort (key: string | any[], opts: Record<string, any>): this
  sort (key: string | any[], opts: any): this {
    this[kState].push(Q.sort(key, opts))
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
}

export default function build () {
  return new FluentQ()
}
