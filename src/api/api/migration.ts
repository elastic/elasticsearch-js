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

export default class Migration {
  transport: Transport
  acceptedParams: Record<string, { path: string[], body: string[], query: string[] }>
  constructor (transport: Transport) {
    this.transport = transport
    this.acceptedParams = {
      'migration.deprecations': {
        path: [
          'index'
        ],
        body: [],
        query: []
      },
      'migration.get_feature_upgrade_status': {
        path: [],
        body: [],
        query: []
      },
      'migration.post_feature_upgrade': {
        path: [],
        body: [],
        query: []
      }
    }
  }

  /**
    * Get deprecation information. Get information about different cluster, node, and index level settings that use deprecated features that will be removed or changed in the next major version. TIP: This APIs is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-migration-deprecations | Elasticsearch API documentation}
    */
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationDeprecationsResponse>
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationDeprecationsResponse, unknown>>
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptions): Promise<T.MigrationDeprecationsResponse>
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['migration.deprecations']

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

    let method = ''
    let path = ''
    if (params.index != null) {
      method = 'GET'
      path = `/${encodeURIComponent(params.index.toString())}/_migration/deprecations`
    } else {
      method = 'GET'
      path = '/_migration/deprecations'
    }
    const meta: TransportRequestMetadata = {
      name: 'migration.deprecations',
      pathParts: {
        index: params.index
      }
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Get feature migration information. Version upgrades sometimes require changes to how features store configuration information and data in system indices. Check which features need to be migrated and the status of any migrations that are in progress. TIP: This API is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-migration-get-feature-upgrade-status | Elasticsearch API documentation}
    */
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationGetFeatureUpgradeStatusResponse>
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationGetFeatureUpgradeStatusResponse, unknown>>
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptions): Promise<T.MigrationGetFeatureUpgradeStatusResponse>
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['migration.get_feature_upgrade_status']

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
    const path = '/_migration/system_features'
    const meta: TransportRequestMetadata = {
      name: 'migration.get_feature_upgrade_status'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }

  /**
    * Start the feature migration. Version upgrades sometimes require changes to how features store configuration information and data in system indices. This API starts the automatic migration process. Some functionality might be temporarily unavailable during the migration process. TIP: The API is designed for indirect use by the Upgrade Assistant. We strongly recommend you use the Upgrade Assistant.
    * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-migration-get-feature-upgrade-status | Elasticsearch API documentation}
    */
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationPostFeatureUpgradeResponse>
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationPostFeatureUpgradeResponse, unknown>>
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptions): Promise<T.MigrationPostFeatureUpgradeResponse>
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptions): Promise<any> {
    const {
      path: acceptedPath
    } = this.acceptedParams['migration.post_feature_upgrade']

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

    const method = 'POST'
    const path = '/_migration/system_features'
    const meta: TransportRequestMetadata = {
      name: 'migration.post_feature_upgrade'
    }
    return await this.transport.request({ path, method, querystring, body, meta }, options)
  }
}
