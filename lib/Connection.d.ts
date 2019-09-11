// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

/// <reference types="node" />

import { URL } from 'url';
import { inspect, InspectOptions } from 'util';
import { ApiKeyAuth, BasicAuth } from './pool'
import * as http from 'http';
import { ConnectionOptions as TlsConnectionOptions } from 'tls';

export declare type agentFn = () => any;

interface ConnectionOptions {
  url: URL;
  ssl?: TlsConnectionOptions;
  id?: string;
  headers?: any;
  agent?: AgentOptions | agentFn;
  status?: string;
  roles?: any;
  auth?: BasicAuth | ApiKeyAuth;
}

interface RequestOptions extends http.ClientRequestArgs {
  asStream?: boolean;
  body?: any;
  querystring?: string;
}

export interface AgentOptions {
  keepAlive: boolean;
  keepAliveMsecs: number;
  maxSockets: number;
  maxFreeSockets: number;
}

export default class Connection {
  static statuses: {
    ALIVE: string;
    DEAD: string;
  };
  static roles: {
    MASTER: string;
    DATA: string;
    INGEST: string;
    ML: string;
  };
  url: URL;
  ssl: TlsConnectionOptions | null;
  id: string;
  headers: any;
  deadCount: number;
  resurrectTimeout: number;
  statuses: any;
  roles: any;
  makeRequest: any;
  _openRequests: number;
  _status: string;
  _agent: http.Agent;
  constructor(opts?: ConnectionOptions);
  request(params: RequestOptions, callback: (err: Error | null, response: http.IncomingMessage | null) => void): http.ClientRequest;
  close(): Connection;
  setRole(role: string, enabled: boolean): Connection;
  status: string;
  buildRequestObject(params: any): http.ClientRequestArgs;
  // @ts-ignore
  [inspect.custom](object: any, options: InspectOptions): string;
  toJSON(): any;
}

export {};
