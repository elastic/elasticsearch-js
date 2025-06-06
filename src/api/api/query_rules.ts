/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-misused-new */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */

// This file was automatically generated by elastic/elastic-client-generator-js
// DO NOT MODIFY IT BY HAND. Instead, modify the source open api file,
// and elastic/elastic-client-generator-js to regenerate this file again.

import {
  Transport,
  TransportRequestMetadata,
  TransportRequestOptions,
  TransportRequestOptionsWithMeta,
  TransportRequestOptionsWithOutMeta,
  TransportResult
} from '@elastic/transport'
import * as T from '../types'

interface That {
  transport: Transport
  acceptedParams: Record<string, { path: string[], body: string[], query: string[] }>
}

const commonQueryParams = ['error_trace', 'filter_path', 'human', 'pretty']

export default class QueryRules {
  transport: Transport
  acceptedParams: Record<string, { path: string[], body: string[], query: string[] }>
  constructor (transport: Transport) {
    this.transport = transport
    this.acceptedParams = {
      'query_rules.delete_rule': {
        path: [
          'ruleset_id',
          'rule_id'
        ],
        body: [],
        query: []
      },
      'query_rules.delete_ruleset': {
        path: [
          'ruleset_id'
        ],
        body: [],
        query: []
      },
      'query_rules.get_rule': {
        path: [
          'ruleset_id',
          'rule_id'
        ],
        body: [],
        query: []
      },
      'query_rules.get_ruleset': {
        path: [
          'ruleset_id'
        ],
        body: [],
        query: []
      },
      'query_rules.list_rulesets': {
        path: [],
        body: [],
        query: [
          'from',
          'size'
        ]
      },
      'query_rules.put_rule': {
        path: [
          'ruleset_id',
          'rule_id'
        ],
        body: [
          'type',
          'criteria',
          'actions',
          'priority'
        ],
        query: []
      },
      'query_rules.put_ruleset': {
        path: [
          'ruleset_id'
        ],
        body: [
          'rules'
        ],
        query: []
      },
      'query_rules.test': {
        path: [
          'ruleset_id'
        ],
        body: [
          'match_criteria'
        ],
        query: []
      }
    }
  }

  /**
    * Delete a query rule. Delete a query rule within a query ruleset. This is a destructive action that is only recoverable by re-adding the same rule with the create or update query rule API.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-delete-rule | Elasticsearch API documentation}
    */
  async deleteRule (this: That, params: T.QueryRulesDeleteRuleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesDeleteRuleResponse>
  async deleteRule (this: That, params: T.QueryRulesDeleteRuleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesDeleteRuleResponse, unknown>>
  async deleteRule (this: That, params: T.QueryRulesDeleteRuleRequest, options?: TransportRequestOptions): Promise<T.QueryRulesDeleteRuleResponse>
  async deleteRule (this: That, params: T.QueryRulesDeleteRuleRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['query_rules.delete_rule']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'DELETE'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}/_rule/${encodeURIComponent(params.rule_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.delete_rule',
      pathParts: {
        ruleset_id: params.ruleset_id,
        rule_id: params.rule_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Delete a query ruleset. Remove a query ruleset and its associated data. This is a destructive action that is not recoverable.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-delete-ruleset | Elasticsearch API documentation}
    */
  async deleteRuleset (this: That, params: T.QueryRulesDeleteRulesetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesDeleteRulesetResponse>
  async deleteRuleset (this: That, params: T.QueryRulesDeleteRulesetRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesDeleteRulesetResponse, unknown>>
  async deleteRuleset (this: That, params: T.QueryRulesDeleteRulesetRequest, options?: TransportRequestOptions): Promise<T.QueryRulesDeleteRulesetResponse>
  async deleteRuleset (this: That, params: T.QueryRulesDeleteRulesetRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['query_rules.delete_ruleset']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'DELETE'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.delete_ruleset',
      pathParts: {
        ruleset_id: params.ruleset_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get a query rule. Get details about a query rule within a query ruleset.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-get-rule | Elasticsearch API documentation}
    */
  async getRule (this: That, params: T.QueryRulesGetRuleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesGetRuleResponse>
  async getRule (this: That, params: T.QueryRulesGetRuleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesGetRuleResponse, unknown>>
  async getRule (this: That, params: T.QueryRulesGetRuleRequest, options?: TransportRequestOptions): Promise<T.QueryRulesGetRuleResponse>
  async getRule (this: That, params: T.QueryRulesGetRuleRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['query_rules.get_rule']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}/_rule/${encodeURIComponent(params.rule_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.get_rule',
      pathParts: {
        ruleset_id: params.ruleset_id,
        rule_id: params.rule_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get a query ruleset. Get details about a query ruleset.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-get-ruleset | Elasticsearch API documentation}
    */
  async getRuleset (this: That, params: T.QueryRulesGetRulesetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesGetRulesetResponse>
  async getRuleset (this: That, params: T.QueryRulesGetRulesetRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesGetRulesetResponse, unknown>>
  async getRuleset (this: That, params: T.QueryRulesGetRulesetRequest, options?: TransportRequestOptions): Promise<T.QueryRulesGetRulesetResponse>
  async getRuleset (this: That, params: T.QueryRulesGetRulesetRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['query_rules.get_ruleset']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.get_ruleset',
      pathParts: {
        ruleset_id: params.ruleset_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get all query rulesets. Get summarized information about the query rulesets.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-list-rulesets | Elasticsearch API documentation}
    */
  async listRulesets (this: That, params?: T.QueryRulesListRulesetsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesListRulesetsResponse>
  async listRulesets (this: That, params?: T.QueryRulesListRulesetsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesListRulesetsResponse, unknown>>
  async listRulesets (this: That, params?: T.QueryRulesListRulesetsRequest, options?: TransportRequestOptions): Promise<T.QueryRulesListRulesetsResponse>
  async listRulesets (this: That, params?: T.QueryRulesListRulesetsRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['query_rules.list_rulesets']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = '/_query_rules'
    const meta: TransportRequestMetadata = {
      name: 'query_rules.list_rulesets'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Create or update a query rule. Create or update a query rule within a query ruleset. IMPORTANT: Due to limitations within pinned queries, you can only pin documents using ids or docs, but cannot use both in single rule. It is advised to use one or the other in query rulesets, to avoid errors. Additionally, pinned queries have a maximum limit of 100 pinned hits. If multiple matching rules pin more than 100 documents, only the first 100 documents are pinned in the order they are specified in the ruleset.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-put-rule | Elasticsearch API documentation}
    */
  async putRule (this: That, params: T.QueryRulesPutRuleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesPutRuleResponse>
  async putRule (this: That, params: T.QueryRulesPutRuleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesPutRuleResponse, unknown>>
  async putRule (this: That, params: T.QueryRulesPutRuleRequest, options?: TransportRequestOptions): Promise<T.QueryRulesPutRuleResponse>
  async putRule (this: That, params: T.QueryRulesPutRuleRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath,
      body: acceptedBody,
      query: acceptedQuery
    } = this.acceptedParams['query_rules.put_rule']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedBody.includes(key)) {
        body = body ?? {}
        // @ts-expect-error
        body[key] = params[key]
      } else if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        if (acceptedQuery.includes(key) || commonQueryParams.includes(key)) {
          // @ts-expect-error
          querystring[key] = params[key]
        } else {
          body = body ?? {}
          // @ts-expect-error
          body[key] = params[key]
        }
      }
    }

    const method = 'PUT'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}/_rule/${encodeURIComponent(params.rule_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.put_rule',
      pathParts: {
        ruleset_id: params.ruleset_id,
        rule_id: params.rule_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Create or update a query ruleset. There is a limit of 100 rules per ruleset. This limit can be increased by using the `xpack.applications.rules.max_rules_per_ruleset` cluster setting. IMPORTANT: Due to limitations within pinned queries, you can only select documents using `ids` or `docs`, but cannot use both in single rule. It is advised to use one or the other in query rulesets, to avoid errors. Additionally, pinned queries have a maximum limit of 100 pinned hits. If multiple matching rules pin more than 100 documents, only the first 100 documents are pinned in the order they are specified in the ruleset.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-put-ruleset | Elasticsearch API documentation}
    */
  async putRuleset (this: That, params: T.QueryRulesPutRulesetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesPutRulesetResponse>
  async putRuleset (this: That, params: T.QueryRulesPutRulesetRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesPutRulesetResponse, unknown>>
  async putRuleset (this: That, params: T.QueryRulesPutRulesetRequest, options?: TransportRequestOptions): Promise<T.QueryRulesPutRulesetResponse>
  async putRuleset (this: That, params: T.QueryRulesPutRulesetRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath,
      body: acceptedBody,
      query: acceptedQuery
    } = this.acceptedParams['query_rules.put_ruleset']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedBody.includes(key)) {
        body = body ?? {}
        // @ts-expect-error
        body[key] = params[key]
      } else if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        if (acceptedQuery.includes(key) || commonQueryParams.includes(key)) {
          // @ts-expect-error
          querystring[key] = params[key]
        } else {
          body = body ?? {}
          // @ts-expect-error
          body[key] = params[key]
        }
      }
    }

    const method = 'PUT'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.put_ruleset',
      pathParts: {
        ruleset_id: params.ruleset_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Test a query ruleset. Evaluate match criteria against a query ruleset to identify the rules that would match that criteria.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-test | Elasticsearch API documentation}
    */
  async test (this: That, params: T.QueryRulesTestRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesTestResponse>
  async test (this: That, params: T.QueryRulesTestRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.QueryRulesTestResponse, unknown>>
  async test (this: That, params: T.QueryRulesTestRequest, options?: TransportRequestOptions): Promise<T.QueryRulesTestResponse>
  async test (this: That, params: T.QueryRulesTestRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath,
      body: acceptedBody,
      query: acceptedQuery
    } = this.acceptedParams['query_rules.test']

    const userQuery = params?.querystring
    const querystring: Record<string, any> = userQuery != null ? { ...userQuery } : {}

    let body: Record<string, any> | string | undefined
    const userBody = params?.body
    if (userBody != null) {
      if (typeof userBody === 'string') {
        body = userBody
      } else {
        body = { ...userBody }
      }
    }

    for (const key in params) {
      if (acceptedBody.includes(key)) {
        body = body ?? {}
        // @ts-expect-error
        body[key] = params[key]
      } else if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body' && key !== 'querystring') {
        if (acceptedQuery.includes(key) || commonQueryParams.includes(key)) {
          // @ts-expect-error
          querystring[key] = params[key]
        } else {
          body = body ?? {}
          // @ts-expect-error
          body[key] = params[key]
        }
      }
    }

    const method = 'POST'
    const path = `/_query_rules/${encodeURIComponent(params.ruleset_id.toString())}/_test`
    const meta: TransportRequestMetadata = {
      name: 'query_rules.test',
      pathParts: {
        ruleset_id: params.ruleset_id
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }
}
