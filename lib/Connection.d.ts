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

/// <reference types="node" />

import { URL } from 'url';
import { inspect, InspectOptions } from 'util';
import * as http from 'http';
import { SecureContextOptions } from 'tls';

export declare type agentFn = () => any;

interface ConnectionOptions {
  url: URL;
  ssl?: SecureContextOptions;
  id?: string;
  headers?: any;
  agent?: AgentOptions | agentFn;
  status?: string;
  roles?: any;
}

interface RequestOptions extends http.ClientRequestArgs {
  asStream?: boolean;
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
  ssl: SecureContextOptions | null;
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
  [inspect.custom](object: any, options: InspectOptions): string;
}

export {};
