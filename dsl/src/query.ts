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
import T from '../es-types'

type SearchRequest = Required<T.SearchRequest>['body']
type BoolBlock = { bool: T.BoolQuery }
type QueryBlock = { query: T.QueryContainer }
function Q (...blocks: (SearchRequest | T.QueryContainer | T.QueryContainer[])[]): SearchRequest {
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

  // @ts-ignore
  const queries: (T.QueryContainer | T.BoolQuery)[] = blocks.filter(block => !topLevelKeys.includes(Object.keys(block)[0]))

  let body: SearchRequest
  if (queries.length === 1 && !isBoolQuery(queries[0])) {
    if (isQuery(queries[0])) {
      body = queries[0]
    } else {
      body = { query: queries[0] }
    }
  } else {
    if (queries.length > 0) {
      body = { query: Q.bool(...queries) }
    } else {
      body = {}
    }
  }
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
    let stringified = JSON.stringify(query, (key, value) => {
      if (typeof value === 'symbol') {
        return `###${value.description!}###`
      } else if (key === '__proto__') {
        return undefined
      } else if (key === 'constructor' && typeof value === 'object' &&
                 value !== null && value.prototype !== undefined) {
        return undefined
      } else {
        return value
      }
    })

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

    const stringified = JSON.stringify(query, (key, value) => {
      if (typeof value === 'symbol') {
        return `###${value.description!}###`
      } else if (key === '__proto__') {
        return undefined
      } else if (key === 'constructor' && typeof value === 'object' &&
                 value !== null && value.prototype !== undefined) {
        return undefined
      } else {
        return value
      }
    })

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

  export function match (key: string, val: string | Symbol): { match: Record<string, string> }
  export function match (key: string, val: string | Symbol, opts: T.MatchQuery): { match: Record<string, T.MatchQuery> }
  export function match (key: string, val: (string | Symbol)[]): { match: Record<string, string> }[]
  export function match (key: string, val: (string | Symbol)[], opts: T.MatchQuery): { match: Record<string, T.MatchQuery> }[]
  export function match (key: string, val: any, opts?: T.MatchQuery): any {
    return generateQueryObject('match', key, val, opts)
  }

  export function matchPhrase (key: string, val: string | Symbol): { match_phrase: Record<string, string> }
  export function matchPhrase (key: string, val: string | Symbol, opts: T.MatchPhraseQuery): { match_phrase: Record<string, T.MatchPhraseQuery> }
  export function matchPhrase (key: string, val: (string | Symbol)[]): { match_phrase: Record<string, string> }[]
  export function matchPhrase (key: string, val: (string | Symbol)[], opts: T.MatchPhraseQuery): { match_phrase: Record<string, T.MatchPhraseQuery> }[]
  export function matchPhrase (key: string, val: any, opts?: T.MatchPhraseQuery): any {
    return generateQueryObject('match_phrase', key, val, opts)
  }

  export function matchPhrasePrefix (key: string, val: string | Symbol): { match_phrase_prefix: Record<string, string> }
  export function matchPhrasePrefix (key: string, val: string | Symbol, opts: T.MatchPhrasePrefixQuery): { match_phrase_prefix: Record<string, T.MatchPhrasePrefixQuery> }
  export function matchPhrasePrefix (key: string, val: (string | Symbol)[]): { match_phrase_prefix: Record<string, string> }[]
  export function matchPhrasePrefix (key: string, val: (string | Symbol)[], opts: T.MatchPhrasePrefixQuery): { match_phrase_prefix: Record<string, T.MatchPhrasePrefixQuery> }[]
  export function matchPhrasePrefix (key: string, val: any, opts?: T.MatchPhrasePrefixQuery): any {
    return generateQueryObject('match_phrase_prefix', key, val, opts)
  }

  export function multiMatch (keys: string[], val: string | Symbol, opts?: T.MultiMatchQuery): { multi_match: T.MultiMatchQuery } {
    return {
      multi_match: {
        // @ts-expect-error
        query: val,
        fields: keys,
        ...opts
      }
    }
  }

  export function matchAll (opts?: T.MatchAllQuery): { match_all: T.MatchAllQuery } {
    return { match_all: { ...opts } }
  }

  export function matchNone (): { match_none: {} } {
    return { match_none: {} }
  }

  export function common (key: string, val: string | Symbol): { common: Record<string, string> }
  export function common (key: string, val: string | Symbol, opts: T.CommonTermsQuery): { common: Record<string, T.CommonTermsQuery> }
  export function common (key: string, val: (string | Symbol)[]): { common: Record<string, string> }[]
  export function common (key: string, val: (string | Symbol)[], opts: T.CommonTermsQuery): { common: Record<string, T.CommonTermsQuery> }[]
  export function common (key: string, val: any, opts?: T.CommonTermsQuery): any {
    return generateQueryObject('common', key, val, opts)
  }

  export function queryString (val: string | Symbol, opts: T.QueryStringQuery): { query_string: T.QueryStringQuery } {
    return {
      query_string: {
        // @ts-expect-error
        query: val,
        ...opts
      }
    }
  }

  export function simpleQueryString (val: string | Symbol, opts: T.SimpleQueryStringQuery): { simple_query_string: T.SimpleQueryStringQuery } {
    return {
      simple_query_string: {
        // @ts-expect-error
        query: val,
        ...opts
      }
    }
  }

  export function term (key: string, val: string | Symbol): { term: Record<string, string> }
  export function term (key: string, val: string | Symbol, opts: T.TermQuery): { term: Record<string, T.TermQuery> }
  export function term (key: string, val: (string | Symbol)[]): { terms: T.TermsQuery }
  export function term (key: string, val: (string | Symbol)[], opts: T.TermsQuery): { terms: T.TermsQuery }
  export function term (key: string, val: any, opts?: any): any {
    if (Array.isArray(val)) {
      return Q.terms(key, val, opts)
    }
    return generateValueObject('term', key, val, opts)
  }

  export function terms (key: string, val: string[] | Symbol, opts?: T.TermsQuery): { terms: T.TermsQuery } {
    return {
      terms: {
        [key]: val,
        ...opts
      }
    }
  }

  export function termsSet (key: string, val: (string | Symbol)[], opts?: T.TermsSetQuery): { terms_set: Record<string, T.TermsSetQuery> } {
    return {
      // @ts-ignore
      terms_set: {
        [key]: {
          terms: val,
          ...opts
        }
      }
    }
  }

  export function range (key: string, val: T.RangeQuery): { range: Record<string, T.RangeQuery> } {
    return { range: { [key]: val } }
  }

  export function exists (key: string | Symbol): { exists: T.ExistsQuery }
  export function exists (key: (string | Symbol)[]): { exists: T.ExistsQuery }[]
  export function exists (key: any): any {
    if (Array.isArray(key)) {
      return key.map(k => exists(k))
    }
    return { exists: { field: key } }
  }

  export function prefix (key: string, val: string | Symbol): { prefix: Record<string, string> }
  export function prefix (key: string, val: string | Symbol, opts: T.PrefixQuery): { prefix: Record<string, T.PrefixQuery> }
  export function prefix (key: string, val: (string | Symbol)[]): { prefix: Record<string, string> }[]
  export function prefix (key: string, val: (string | Symbol)[], opts: T.PrefixQuery): { prefix: Record<string, T.PrefixQuery> }
  export function prefix (key: string, val: any, opts?: any): any {
    return generateValueObject('prefix', key, val, opts)
  }

  export function wildcard (key: string, val: string | Symbol): { wildcard: Record<string, string> }
  export function wildcard (key: string, val: string | Symbol, opts: T.WildcardQuery): { wildcard: Record<string, T.WildcardQuery> }
  export function wildcard (key: string, val: (string | Symbol)[]): { wildcard: Record<string, string> }[]
  export function wildcard (key: string, val: (string | Symbol)[], opts: T.WildcardQuery): { wildcard: Record<string, T.WildcardQuery> }
  export function wildcard (key: string, val: any, opts?: any): any {
    return generateValueObject('wildcard', key, val, opts)
  }

  export function regexp (key: string, val: string | Symbol): { regexp: Record<string, string> }
  export function regexp (key: string, val: string | Symbol, opts: T.RegexpQuery): { regexp: Record<string, T.RegexpQuery> }
  export function regexp (key: string, val: (string | Symbol)[]): { regexp: Record<string, string> }[]
  export function regexp (key: string, val: (string | Symbol)[], opts: T.RegexpQuery): { regexp: Record<string, T.RegexpQuery> }
  export function regexp (key: string, val: any, opts?: any): any {
    return generateValueObject('regexp', key, val, opts)
  }

  export function fuzzy (key: string, val: string | Symbol): { fuzzy: Record<string, string> }
  export function fuzzy (key: string, val: string | Symbol, opts: T.FuzzyQuery): { fuzzy: Record<string, T.FuzzyQuery> }
  export function fuzzy (key: string, val: (string | Symbol)[]): { fuzzy: Record<string, string> }[]
  export function fuzzy (key: string, val: (string | Symbol)[], opts: T.FuzzyQuery): { fuzzy: Record<string, T.FuzzyQuery> }
  export function fuzzy (key: string, val: any, opts?: any): any {
    return generateValueObject('fuzzy', key, val, opts)
  }

  export function ids (key: string, val: (string | Symbol)[]): { ids: Record<string, T.IdsQuery> } {
    return {
      // @ts-expect-error
      ids: {
        [key]: {
          values: val
        }
      }
    }
  }

  type AnyQueryWithArray = T.QueryContainer | T.BoolQuery | T.QueryContainer[] | T.BoolQuery[]
  type AnyQuery = T.QueryContainer | T.BoolQuery
  export function must (...queries: AnyQueryWithArray[]): { must: T.QueryContainer[] } {
    // @ts-ignore
    return { must: queries.flatMap(mergeableMust) }
  }

  export function should (...queries: AnyQueryWithArray[]): { should: T.QueryContainer[] } {
    // @ts-ignore
    return { should: queries.flatMap(mergeableShould) }
  }

  export function mustNot (...queries: AnyQueryWithArray[]): { must_not: T.QueryContainer[] } {
    // @ts-ignore
    return { must_not: queries.flatMap(mergeableMustNot) }
  }

  export function filter (...queries: AnyQueryWithArray[]): { filter: T.QueryContainer[] } {
    // @ts-ignore
    return { filter: queries.flatMap(mergeableFilter) }
  }

  export function bool (...queries: (T.QueryContainer | T.QueryContainer[] | T.BoolQuery)[]): BoolBlock {
    if (queries.length === 0) {
      return { bool: {} }
    }

    // @ts-expect-error
    const defaultClause = queries.find(q => q && !!q.minimum_should_match) ? 'should' : 'must'
    const normalizedQueries = queries
      .flat()
      .filter(val => {
        // filters empty objects/arrays as well
        if (typeof val === 'object' && val != null) {
          return Object.keys(val).length > 0
        }
        return !!val
      })
      .map(q => toBoolQuery(q, defaultClause))

    const mustClauses: T.QueryContainer[] = []
    const mustNotClauses: T.QueryContainer[] = []
    const shouldClauses: T.QueryContainer[] = []
    const filterClauses: T.QueryContainer[] = []
    let minimum_should_match: number | string | null = null
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

  export function and (...queries: AnyQuery[]): BoolBlock {
    let query = queries[0]
    for (let i = 1; i < queries.length; i++) {
      query = andOp(query, queries[i])
    }
    return toBoolBlock(query)

    function andOp (q1: AnyQuery, q2: AnyQuery): BoolBlock {
      const b1 = toBoolQuery(q1)
      const b2 = toBoolQuery(q2)
      if (b1.should == null && b2.should == null) {
        const mustClauses: T.QueryContainer[] = (b1.must || []).concat(b2.must || [])
        const mustNotClauses: T.QueryContainer[] = (b1.must_not || []).concat(b2.must_not || [])
        const filterClauses: T.QueryContainer[] = (b1.filter || []).concat(b2.filter || [])
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

  export function or (...queries: AnyQuery[]): BoolBlock {
    return {
      bool: booptimize(Q.should(...queries))
    }
  }

  export function not (q: T.QueryContainer): BoolBlock
  export function not (q: T.BoolQuery): BoolBlock
  export function not (q: any): BoolBlock {
    const b = toBoolQuery(q)

    if (onlyMust(b)) {
      return {
        bool: booptimize(Q.mustNot(...b.must))
      }
    } else if (onlyMustNot(b)) {
      return {
        bool: booptimize(Q.must(...b.must_not))
      }
    } else {
      return {
        bool: booptimize(Q.mustNot(toBoolBlock(b)))
      }
    }
  }

  export function minShouldMatch (int: number): T.BoolQuery {
    return { minimum_should_match: int }
  }

  export function name (queryName: string): T.BoolQuery {
    return { _name: queryName }
  }

  export function nested (path: string, query: T.QueryContainer, opts: T.NestedQuery): { nested: T.NestedQuery } {
    return {
      nested: {
        path,
        ...opts,
        ...query
      }
    }
  }

  export function constantScore (query: T.QueryContainer, boost: number): { constant_score: T.ConstantScoreQuery } {
    return {
      constant_score: {
        filter: query,
        boost
      }
    }
  }

  export function disMax (queries: T.QueryContainer[], opts?: T.DisMaxQuery): { dis_max: T.DisMaxQuery } {
    return {
      dis_max: {
        ...opts,
        queries: queries.flat()
      }
    }
  }

  export function functionScore (function_score: T.FunctionScoreQuery): { function_score: T.FunctionScoreQuery } {
    return { function_score }
  }

  export function boosting (boostOpts: T.BoostingQuery): { boosting: T.BoostingQuery } {
    return { boosting: boostOpts }
  }

  export function sort (key: string | any[], opts: Record<string, any> | string): Record<string, any> | Record<string, any>[] {
    if (Array.isArray(key) === true) {
      return { sort: key }
    }
    return {
      // @ts-ignore
      sort: [{ [key]: opts }]
    }
  }

  export function size (s: number | Symbol): { size: number | Symbol } {
    return { size: s }
  }
}

// Tries to flat a bool query based on the content
function booptimize (q: T.BoolQuery): T.BoolQuery {
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
function generateQueryObject (queryType: string, key: string, val: any, opts?: Record<string, any>): any {
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
function generateValueObject (queryType: string, key: string, val: any, opts?: Record<string, any>): any {
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

function isQuery (q: any): q is QueryBlock {
  return !!q.query
}

function isBoolBlock (q: any): q is BoolBlock {
  return !!q.bool
}

function isBoolQuery (q: any): q is T.BoolQuery {
  if (q.must !== undefined) return true
  if (q.should !== undefined) return true
  if (q.must_not !== undefined) return true
  if (q.filter !== undefined) return true
  if (q.minimum_should_match !== undefined) return true
  if (q._name !== undefined) return true
  return false
}

function onlyShould (bool: T.BoolQuery): bool is t.ShouldClause {
  if (bool.must !== undefined) return false
  if (bool.must_not !== undefined) return false
  if (bool.filter !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

function onlyMust (bool: T.BoolQuery): bool is t.MustClause {
  if (bool.should !== undefined) return false
  if (bool.must_not !== undefined) return false
  if (bool.filter !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

function onlyMustNot (bool: T.BoolQuery): bool is t.MustNotClause {
  if (bool.should !== undefined) return false
  if (bool.must !== undefined) return false
  if (bool.filter !== undefined) return false
  if (bool.minimum_should_match !== undefined) return false
  if (bool._name !== undefined) return false
  return true
}

function onlyFilter (bool: T.BoolQuery): bool is t.FilterClause {
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
function toBoolBlock (query: T.QueryContainer | T.BoolQuery): BoolBlock {
  if (isBoolQuery(query)) {
    return { bool: query }
  }

  if (isBoolBlock(query)) {
    return query
  }

  return { bool: { must: [query] } }
}

// for a given query it always return a bool query options:
//  - if is a bool query returns the bool query options
//  - if is a clause, it returns it
//  - if is condition, wraps the query into a must clause and returns it
type toBoolQueryDefault = 'must' | 'must_not' | 'should' | 'filter'
function toBoolQuery (query: T.QueryContainer | T.BoolQuery, def: toBoolQueryDefault = 'must'): T.BoolQuery {
  if (isBoolQuery(query)) {
    return query
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

  return { [def]: [query] }
}

// the aim of this mergeable functions
// is to reduce the depth of the query objects
function mergeableMust (q: T.QueryContainer | T.BoolQuery): T.QueryContainer
function mergeableMust (q: (T.QueryContainer | T.BoolQuery)[]): T.QueryContainer[]
function mergeableMust (q: any): any {
  if (Array.isArray(q)) {
    return q.map(mergeableMust)
  }
  if (isBoolBlock(q)) {
    if (onlyMust(q.bool)) {
      return q.bool.must
    } else {
      return q
    }
  } else if (isBoolQuery(q)) {
    if (onlyMust(q)) {
      return q.must
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

function mergeableShould (q: T.QueryContainer | T.BoolQuery): T.QueryContainer
function mergeableShould (q: (T.QueryContainer | T.BoolQuery)[]): T.QueryContainer[]
function mergeableShould (q: any): any {
  if (Array.isArray(q)) {
    return q.map(mergeableShould)
  }
  if (isBoolBlock(q)) {
    if (onlyShould(q.bool)) {
      return q.bool.should
    } else {
      return q
    }
  } else if (isBoolQuery(q)) {
    if (onlyShould(q)) {
      return q.should
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

function mergeableMustNot (q: T.QueryContainer | T.BoolQuery): T.QueryContainer
function mergeableMustNot (q: (T.QueryContainer | T.BoolQuery)[]): T.QueryContainer[]
function mergeableMustNot (q: any): any {
  if (Array.isArray(q)) {
    return q.map(mergeableMustNot)
  }

  if (isBoolBlock(q)) {
    if (onlyMustNot(q.bool)) {
      return q.bool.must_not
    } else {
      return q
    }
  } else if (isBoolQuery(q)) {
    if (onlyMustNot(q)) {
      return q.must_not
    } else {
      return { bool: q }
    }
  } else {
    return q
  }
}

function mergeableFilter (q: T.QueryContainer | T.BoolQuery): T.QueryContainer
function mergeableFilter (q: (T.QueryContainer | T.BoolQuery)[]): T.QueryContainer[]
function mergeableFilter (q: any): any {
  if (Array.isArray(q)) {
    return q.map(mergeableFilter)
  }
  if (isBoolBlock(q)) {
    if (onlyFilter(q.bool)) {
      return q.bool.filter
    } else {
      return q
    }
  } else if (isBoolQuery(q)) {
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
