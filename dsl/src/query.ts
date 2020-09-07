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
/* eslint no-inner-declarations: 0 */

import * as t from './types'

function Q (...blocks: t.AnyQuery[]): Record<string, any> {
  blocks = blocks.flat()
  const topLevelKeys = [
    'aggs',
    'collapse',
    'explain',
    'from',
    'highlight',
    'indices_boost',
    'min_score',
    'post_filter',
    'profile',
    'rescore',
    'script_fields',
    'search_after',
    'size',
    'slice',
    'sort',
    '_source',
    'suggest',
    'terminate_after',
    'timeout',
    'track_scores',
    'version'
  ]

  const queries = blocks.filter(block => !topLevelKeys.includes(Object.keys(block)[0]))
  const body: Record<string, any> = queries.length === 1 && !isClause(queries[0])
    ? isQuery(queries[0]) ? queries[0] : { query: queries[0] }
    : queries.length > 0 ? Q.bool(...queries) : {}
  for (const block of blocks) {
    const key = Object.keys(block)[0]
    if (topLevelKeys.includes(key)) {
      // @ts-expect-error
      body[key] = block[key]
    }
  }

  return body
}

Object.defineProperty(Q, 'name', { writable: true })

namespace Q {
  export function param (key: string): Symbol {
    return Symbol(key)
  }

  export function compileUnsafe<TInput extends Record<string, any> = Record<string, any>> (query: Record<string, any>): t.compiledFunction<TInput> {
    let stringified = JSON.stringify(query, (key, value) => typeof value === 'symbol' ? `###${value.description!}###` : value)
    const keys: string[] = []
    const matches = stringified.match(/"###\w+###"/g)
    if (matches === null) {
      throw new Error('The query does not contain any use of `Q.params`')
    }
    for (const match of matches) {
      const key = match.slice(4, -4)
      keys.push(key)
      stringified = stringified.replace(new RegExp(match), `input[${JSON.stringify(key)}]`)
    }
    const code = `
      if (input == null) {
        throw new Error('Input must not be empty')
      }
      const keys = ${JSON.stringify(keys)}
      for (const key of keys) {
        if (input[key] === undefined) {
          throw new Error('Missing key: ' + key)
        }
      }
      return ${stringified}
    `
    // @ts-ignore
    return new Function('input', code) // eslint-disable-line
  }

  export function compile<TInput extends Record<string, any> = Record<string, any>> (query: Record<string, any>): t.compiledFunction<TInput> {
    const params: Array<{ path: string[], key: string }> = []
    traverse(query, [])
    if (params.length === 0) {
      throw new Error('The query does not contain any use of `Q.params`')
    }

    return function (input: TInput): Record<string, any> {
      let q = query
      for (const param of params) {
        q = setParam(q, param.path, input[param.key])
      }
      return q
    }

    function traverse (obj: Record<string, any>, path: string[]) {
      for (const key in obj) {
        const value = obj[key]
        if (typeof value === 'symbol') {
          params.push({ path: path.concat(key), key: value.description! })
        } else if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            traverse(value[i], path.concat(key, '' + i))
          }
        } else if (typeof value === 'object' && value !== null) {
          traverse(value, path.concat(key))
        } else {
          // do nothing
        }
      }
    }
  }

  export function compileJson<TInput extends Record<string, any> = Record<string, any>> (query: Record<string, any>): t.compiledFunction<TInput> {
    const params: Array<{ path: string[], key: string }> = []
    traverse(query, [])
    if (params.length === 0) {
      throw new Error('The query does not contain any use of `Q.params`')
    }

    const stringified = JSON.stringify(query, (key, value) => typeof value === 'symbol' ? `###${value.description!}###` : value)

    return function (input: TInput): Record<string, any> {
      const q = JSON.parse(stringified)
      for (const param of params) {
        setParam2(q, param.path, input[param.key])
      }
      return q
    }

    function traverse (obj: Record<string, any>, path: string[]) {
      for (const key in obj) {
        const value = obj[key]
        if (typeof value === 'symbol') {
          params.push({ path: path.concat(key), key: value.description! })
        } else if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            traverse(value[i], path.concat(key, '' + i))
          }
        } else if (typeof value === 'object' && value !== null) {
          traverse(value, path.concat(key))
        } else {
          // do nothing
        }
      }
    }
  }
    return generateQueryObject('match', key, val, opts)
  }

  export function matchPhrase (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition {
    return generateQueryObject('match_phrase', key, val, opts)
  }

  export function matchPhrasePrefix (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition {
    return generateQueryObject('match_phrase_prefix', key, val, opts)
  }

  export function multiMatch (keys: string[], val: string | Symbol, opts?: Record<string, any>): t.Condition {
    return {
      multi_match: {
        query: val,
        fields: keys,
        ...opts
      }
    }
  }

  export function matchAll (opts?: Record<string, any>): t.Condition {
    return { match_all: { ...opts } }
  }

  export function matchNone (): t.Condition {
    return { match_none: {} }
  }

  export function common (key: string, val: string | Symbol, opts: Record<string, any>): t.Condition {
    return generateQueryObject('common', key, val, opts)
  }

  export function queryString (val: string | Symbol, opts: Record<string, any>): t.Condition {
    return {
      query_string: {
        query: val,
        ...opts
      }
    }
  }

  export function simpleQueryString (val: string | Symbol, opts: Record<string, any>): t.Condition {
    return {
      simple_query_string: {
        query: val,
        ...opts
      }
    }
  }

  export function term (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
  export function term (key: string, val: string[], opts?: Record<string, any>): t.Condition
  export function term (key: string, val: any, opts?: Record<string, any>): t.Condition {
    if (Array.isArray(val)) {
      return Q.terms(key, val, opts)
    }
    return generateValueObject('term', key, val, opts)
  }

  export function terms (key: string, val: string[] | Symbol, opts?: Record<string, any>): t.Condition {
    return {
      terms: {
        [key]: val,
        ...opts
      }
    }
  }

  export function termsSet (key: string, val: string[] | Symbol, opts: Record<string, any>): t.Condition {
    return {
      terms_set: {
        [key]: {
          terms: val,
          ...opts
        }
      }
    }
  }

  export function range (key: string, val: any): t.Condition {
    return { range: { [key]: val } }
  }

  export function exists (key: string): t.Condition
  export function exists (key: string[]): t.Condition[]
  export function exists (key: any): t.Condition | t.Condition[] {
    if (Array.isArray(key)) {
      return key.map(k => exists(k))
    }
    return { exists: { field: key } }
  }

  export function prefix (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
  export function prefix (key: string, val: string[], opts?: Record<string, any>): t.Condition[]
  export function prefix (key: string, val: any, opts?: Record<string, any>): t.Condition | t.Condition[] {
    return generateValueObject('prefix', key, val, opts)
  }

  export function wildcard (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
  export function wildcard (key: string, val: string[], opts?: Record<string, any>): t.Condition[]
  export function wildcard (key: string, val: any, opts?: Record<string, any>): t.Condition | t.Condition[] {
    return generateValueObject('wildcard', key, val, opts)
  }

  export function regexp (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
  export function regexp (key: string, val: string[], opts?: Record<string, any>): t.Condition[]
  export function regexp (key: string, val: any, opts?: Record<string, any>): t.Condition | t.Condition[] {
    return generateValueObject('regexp', key, val, opts)
  }

  export function fuzzy (key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
  export function fuzzy (key: string, val: string[], opts?: Record<string, any>): t.Condition[]
  export function fuzzy (key: string, val: any, opts?: Record<string, any>): t.Condition | t.Condition[] {
    return generateValueObject('fuzzy', key, val, opts)
  }

  export function ids (key: string, val: string[] | Symbol, opts: Record<string, any>): t.Condition {
    return {
      ids: {
        [key]: {
          values: val,
          ...opts
        }
      }
    }
  }

  export function must (...queries: t.AnyQuery[]): t.MustClause {
    return { must: queries.flatMap(mergeableMust) }
  }

  export function should (...queries: t.AnyQuery[]): t.ShouldClause {
    return { should: queries.flatMap(mergeableShould) }
  }

  export function mustNot (...queries: t.AnyQuery[]): t.MustNotClause {
    return { must_not: queries.flatMap(mergeableMustNot) }
  }

  export function filter (...queries: t.AnyQuery[]): t.FilterClause {
    return { filter: queries.flatMap(mergeableFilter) }
  }

  export function bool (...queries: t.AnyBoolQuery[]): t.BoolQuery {
    if (queries.length === 0) {
      return { query: { bool: {} } }
    }

    // @ts-expect-error
    const defaultClause = queries.find(q => q && !!q.minimum_should_match) ? 'should' : 'must'
    const normalizedQueries: t.BoolQueryOptions[] = queries
      .flat()
      .filter(val => {
        // filters empty objects/arrays as well
        if (typeof val === 'object' && val != null) {
          return Object.keys(val).length > 0
        }
        return !!val
      })
      .map(q => toClause(q, defaultClause))

    const mustClauses: t.AnyQuery[] = []
    const mustNotClauses: t.AnyQuery[] = []
    const shouldClauses: t.AnyQuery[] = []
    const filterClauses: t.AnyQuery[] = []
    let minimum_should_match: number | null = null
    let _name: string | null = null

    for (const query of normalizedQueries) {
      if (query.must) {
        mustClauses.push.apply(mustClauses, query.must)
      }
      if (query.must_not) {
        mustNotClauses.push.apply(mustNotClauses, query.must_not)
      }
      if (query.should) {
        shouldClauses.push.apply(shouldClauses, query.should)
      }
      if (query.filter) {
        filterClauses.push.apply(filterClauses, query.filter)
      }
      if (query._name) {
        if (_name !== null) {
          throw new Error('The query name has already been defined')
        }
        _name = query._name
      }
      if (query.minimum_should_match) {
        if (minimum_should_match !== null) {
          throw new Error('minimum_should_match has already been defined')
        }
        minimum_should_match = query.minimum_should_match
      }
    }

    // If minimum_should_match is the same of should.length,
    // then all the should clauses are required.
    if (shouldClauses.length === minimum_should_match) {
      mustClauses.push.apply(mustClauses, shouldClauses)
      shouldClauses.length = 0
      minimum_should_match = null
    }

    return {
      query: {
        bool: booptimize({
          ...(mustClauses.length && Q.must(...mustClauses)),
          ...(mustNotClauses.length && Q.mustNot(...mustNotClauses)),
          ...(shouldClauses.length && Q.should(...shouldClauses)),
          ...(filterClauses.length && Q.filter(...filterClauses)),
          ...(_name && { _name }),
          ...(minimum_should_match && { minimum_should_match })
        })
      }
    }
  }

  export function and (...queries: t.AnyBoolQuery[]): t.BoolQuery {
    let query = queries[0]
    for (let i = 1; i < queries.length; i++) {
      query = andOp(query, queries[i])
    }
    return { query: toBoolBlock(query) }

    function andOp (q1: t.AnyBoolQuery, q2: t.AnyBoolQuery): t.BoolBlock {
      const b1: t.BoolQueryOptions = toClause(q1)
      const b2: t.BoolQueryOptions = toClause(q2)
      if (b1.should == null && b2.should == null) {
        const mustClauses: t.AnyQuery[] = (b1.must || []).concat(b2.must || [])
        const mustNotClauses: t.AnyQuery[] = (b1.must_not || []).concat(b2.must_not || [])
        const filterClauses: t.AnyQuery[] = (b1.filter || []).concat(b2.filter || [])
        return {
          bool: booptimize({
            ...(mustClauses.length && Q.must(...mustClauses)),
            ...(mustNotClauses.length && Q.mustNot(...mustNotClauses)),
            ...(filterClauses.length && Q.filter(...filterClauses))
          })
        }
      } else {
        const { must, ...clauses } = b1
        return {
          bool: booptimize({
            ...(must == null ? Q.must(toBoolBlock(b2)) : Q.must(must, toBoolBlock(b2))),
            ...clauses
          })
        }
      }
    }
  }

  export function or (...queries: t.AnyBoolQuery[]): t.BoolQuery {
    return {
      query: {
        bool: booptimize(Q.should(...queries))
      }
    }
  }

  export function not (q: t.AnyBoolQuery): t.BoolQuery {
    if (!isBool(q) && !isBoolBlock(q) && !isClause(q)) {
      return {
        query: {
          bool: Q.mustNot(q)
        }
      }
    }

    const b = toClause(q)

    if (onlyMust(b)) {
      return {
        query: {
          bool: booptimize(Q.mustNot(...b.must))
        }
      }
    } else if (onlyMustNot(b)) {
      return {
        query: {
          bool: booptimize(Q.must(...b.must_not))
        }
      }
    } else {
      return {
        query: {
          bool: booptimize(Q.mustNot(toBoolBlock(b)))
        }
      }
    }
  }

  export function minShouldMatch (int: number): t.BoolQueryOptions {
    return { minimum_should_match: int }
  }

  export function name (queryName: string): t.BoolQueryOptions {
    return { _name: queryName }
  }

  export function nested (path: string, query: any, opts: Record<string, any>): t.QueryBlock {
    return {
      query: {
        nested: {
          path,
          ...opts,
          ...query
        }
      }
    }
  }

  export function constantScore (query: any, boost: number): t.QueryBlock {
    return {
      query: {
        constant_score: {
          ...query,
          boost
        }
      }
    }
  }

  export function disMax (queries: t.AnyQuery[], opts?: Record<string, any>): t.QueryBlock {
    return {
      query: {
        dis_max: {
          ...opts,
          queries: queries.flat()
        }
      }
    }
  }

  export function functionScore (function_score: any): t.QueryBlock {
    return { query: { function_score } }
  }

  export function boosting (boostOpts: Record<string, any>): t.QueryBlock {
    return { query: { boosting: boostOpts } }
  }

  export function sort (key: string | any[], opts?: Record<string, any>): t.Condition {
    if (Array.isArray(key) === true) {
      return { sort: key }
    }
    return {
      // @ts-ignore
      sort: [{ [key]: opts }]
    }
  }

  export function size (s: number | Symbol): t.Condition {
    return { size: s }
  }
}

// Tries to flat a bool query based on the content
function booptimize (q: t.BoolQueryOptions): t.BoolQueryOptions {
  const clauses: t.BoolQueryOptions = {}

  if (q.minimum_should_match !== undefined ||
      q.should !== undefined || q._name !== undefined) {
    return q
  }

  if (q.must) {
    for (const c of q.must) {
      if (isBoolBlock(c)) {
        if (c.bool.should || c.bool._name) {
          clauses.must = clauses.must || []
          clauses.must.push(c)
        } else {
          // if we are in a BoolBlock and there is not a should clause
          // then we can "merge up" the other clauses safely
          if (c.bool.must) {
            clauses.must = clauses.must || []
            clauses.must.push.apply(clauses.must, c.bool.must)
          }

          if (c.bool.must_not) {
            clauses.must_not = clauses.must_not || []
            clauses.must_not.push.apply(clauses.must_not, c.bool.must_not)
          }

          if (c.bool.filter) {
            clauses.filter = clauses.filter || []
            clauses.filter.push.apply(clauses.filter, c.bool.filter)
          }
        }
      } else {
        clauses.must = clauses.must || []
        clauses.must.push(c)
      }
    }
  }

  if (q.filter) {
    for (const c of q.filter) {
      if (isBoolBlock(c)) {
        if (c.bool.should || c.bool.must_not || c.bool._name) {
          clauses.filter = clauses.filter || []
          clauses.filter.push(c)
        } else {
          // if there are must clauses and we are inside
          // a filter clause, we can safely move them to the upper
          // filter clause, since the score is not influenced
          if (c.bool.must) {
            clauses.filter = clauses.filter || []
            clauses.filter.push.apply(clauses.filter, c.bool.must)
          }

          if (c.bool.filter) {
            clauses.filter = clauses.filter || []
            clauses.filter.push.apply(clauses.filter, c.bool.filter)
          }
        }
      } else {
        clauses.filter = clauses.filter || []
        clauses.filter.push(c)
      }
    }
  }

  if (q.must_not) {
    for (const c of q.must_not) {
      if (isBoolBlock(c)) {
        if (c.bool.should || c.bool.filter || c.bool._name) {
          clauses.must_not = clauses.must_not || []
          clauses.must_not.push(c)
        } else {
          // if 'c' is a BoolBlock and there are only must and must_not,
          // then we can swap them safely
          if (c.bool.must) {
            clauses.must_not = clauses.must_not || []
            clauses.must_not.push.apply(clauses.must_not, c.bool.must)
          }

          if (c.bool.must_not) {
            clauses.must = clauses.must || []
            clauses.must.push.apply(clauses.must, c.bool.must_not)
          }
        }
      } else {
        clauses.must_not = clauses.must_not || []
        clauses.must_not.push(c)
      }
    }
  }

  return clauses
}

function generateQueryObject (queryType: string, key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
function generateQueryObject (queryType: string, key: string, val: string[], opts?: Record<string, any>): t.Condition[]
function generateQueryObject (queryType: string, key: string, val: any, opts?: Record<string, any>): t.Condition | t.Condition[] {
  if (Array.isArray(val)) {
    return val.map(v => generateQueryObject(queryType, key, v, opts))
  }
  if (opts === undefined) {
    return { [queryType]: { [key]: val } }
  }
  return {
    [queryType]: {
      [key]: {
        query: val,
        ...opts
      }
    }
  }
}

function generateValueObject (queryType: string, key: string, val: string | Symbol, opts?: Record<string, any>): t.Condition
function generateValueObject (queryType: string, key: string, val: string[], opts?: Record<string, any>): t.Condition[]
function generateValueObject (queryType: string, key: string, val: any, opts?: Record<string, any>): t.Condition | t.Condition[] {
  if (Array.isArray(val)) {
    return val.map(v => generateValueObject(queryType, key, v, opts))
  }
  if (opts === undefined) {
    return { [queryType]: { [key]: val } }
  }
  return {
    [queryType]: {
      [key]: {
        value: val,
        ...opts
      }
    }
  }
}

function isQuery (q: any): q is t.QueryBlock {
  return !!q.query
}

function isBool (q: any): q is t.BoolQuery {
  return q.query && q.query.bool
}

function isBoolBlock (q: any): q is t.BoolBlock {
  return !!q.bool
}

function isClause (q: any): q is t.BoolQueryOptions {
  if (q.must !== undefined) return true
  if (q.should !== undefined) return true
  if (q.must_not !== undefined) return true
  if (q.filter !== undefined) return true
  if (q.minimum_should_match !== undefined) return true
  if (q._name !== undefined) return true
  return false
}

function onlyShould (bool: t.BoolQueryOptions): bool is t.ShouldClause {
  if (bool.must !== undefined) return false
  if (bool.must_not !== undefined) return false
  if (bool.filter !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

function onlyMust (bool: t.BoolQueryOptions): bool is t.MustClause {
  if (bool.should !== undefined) return false
  if (bool.must_not !== undefined) return false
  if (bool.filter !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

function onlyMustNot (bool: t.BoolQueryOptions): bool is t.MustNotClause {
  if (bool.should !== undefined) return false
  if (bool.must !== undefined) return false
  if (bool.filter !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

function onlyFilter (bool: t.BoolQueryOptions): bool is t.FilterClause {
  if (bool.should !== undefined) return false
  if (bool.must !== undefined) return false
  if (bool.must_not !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

// for a given query it always return a bool block:
//  - if is a bool query returns the bool block
//  - if is a clause, wraps the query in a bool block
//  - if is condition, wraps the query into a must clause and then in a bool block
function toBoolBlock (query: t.AnyBoolQuery): t.BoolBlock {
  if (isBool(query)) {
    return query.query
  }

  if (isBoolBlock(query)) {
    return query
  }

  if (isClause(query)) {
    return { bool: query }
  }

  return { bool: { must: [query] } }
}

// for a given query it always return a bool query options:
//  - if is a bool query returns the bool query options
//  - if is a clause, it returns it
//  - if is condition, wraps the query into a must clause and returns it
type toClauseDefault = 'must' | 'must_not' | 'should' | 'filter'
function toClause (query: t.AnyBoolQuery, def: toClauseDefault = 'must'): t.BoolQueryOptions {
  if (isBool(query)) {
    if (query.query.bool._name) {
      return { [def]: [query.query] }
    }
    if (query.query.bool.minimum_should_match) {
      return { [def]: [query.query] }
    }
    return query.query.bool
  }

  if (isBoolBlock(query)) {
    if (query.bool._name) {
      return { [def]: [query] }
    }
    if (query.bool.minimum_should_match) {
      return { [def]: [query] }
    }
    return query.bool
  }

  if (isClause(query)) {
    return query
  }

  return { [def]: [query] }
}

// the aim of this mergeable functions
// is to reduce the depth of the query objects
function mergeableMust (q: t.AnyQuery): t.AnyQuery | t.AnyQuery[] {
  if (Array.isArray(q)) {
    return q.map(mergeableMust)
  }
  if (isBool(q)) {
    if (onlyMust(q.query.bool)) {
      return q.query.bool.must
    } else {
      return q.query
    }
  } else if (isBoolBlock(q)) {
    if (onlyMust(q.bool)) {
      return q.bool.must
    } else {
      return q
    }
  } else if (isClause(q)) {
    if (onlyMust(q)) {
      return q.must
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

function mergeableShould (q: t.AnyQuery): t.AnyQuery | t.AnyQuery[] {
  if (Array.isArray(q)) {
    return q.map(mergeableShould)
  }
  if (isBool(q)) {
    if (onlyShould(q.query.bool)) {
      return q.query.bool.should
    } else {
      return q.query
    }
  } else if (isBoolBlock(q)) {
    if (onlyShould(q.bool)) {
      return q.bool.should
    } else {
      return q
    }
  } else if (isClause(q)) {
    if (onlyShould(q)) {
      return q.should
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

function mergeableMustNot (q: t.AnyQuery): t.AnyQuery | t.AnyQuery[] {
  if (Array.isArray(q)) {
    return q.map(mergeableMustNot)
  }
  if (isBool(q)) {
    if (onlyMustNot(q.query.bool)) {
      return q.query.bool.must_not
    } else {
      return q.query
    }
  } else if (isBoolBlock(q)) {
    if (onlyMustNot(q.bool)) {
      return q.bool.must_not
    } else {
      return q
    }
  } else if (isClause(q)) {
    if (onlyMustNot(q)) {
      return q.must_not
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

function mergeableFilter (q: t.AnyQuery): t.AnyQuery | t.AnyQuery[] {
  if (Array.isArray(q)) {
    return q.map(mergeableFilter)
  }
  if (isBool(q)) {
    if (onlyFilter(q.query.bool)) {
      return q.query.bool.filter
    } else {
      return q.query
    }
  } else if (isBoolBlock(q)) {
    if (onlyFilter(q.bool)) {
      return q.bool.filter
    } else {
      return q
    }
  } else if (isClause(q)) {
    if (onlyFilter(q)) {
      return q.filter
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

// code from https://github.com/fwilkerson/clean-set
function setParam (source: Record<string, any>, keys: string[], update: any) {
  const next = copy(source)
  let last = next

  for (let i = 0, len = keys.length; i < len; i++) {
    // @ts-ignore
    last = last[keys[i]] = i === len - 1 ? update : copy(last[keys[i]])
  }

  return next

  function copy (source: Record<string, any> | any[]): Record<string, any> | any[] {
    const to = source && !!source.pop ? [] : {}
    for (const i in source) {
      // @ts-ignore
      to[i] = source[i]
    }
    return to
  }
}

// code from https://github.com/lukeed/dset
function setParam2 (obj: Record<string, any>, keys: string[], val: any) {
  let x
  for (let i = 0, len = keys.length; i < len; i++) {
    x = obj[keys[i]]
    if (i === len - 1) {
      obj = obj[keys[i]] = val
    } else if (x != null) {
      obj = obj[keys[i]] = x
    } else if (!!~keys[i + 1].indexOf('.') || !(+keys[i + 1] > -1)) {
      obj = obj[keys[i]] = {}
    } else {
      obj = obj[keys[i]] = []
    }
  }
}

export default Q
