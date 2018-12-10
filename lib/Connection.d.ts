/// <reference types="node" />

import { URL } from 'url';
import * as http from 'http';
import { SecureContextOptions } from 'tls';

interface ConnectionOptions {
  url: URL;
  ssl?: SecureContextOptions;
  id?: string;
  headers?: any;
  agent?: AgentOptions;
  status?: string;
  roles?: any;
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
    COORDINATING: string;
    MACHINE_LEARNING: string;
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
  request(params: http.ClientRequestArgs, callback: (err: Error | null, response: http.IncomingMessage | null) => void): http.ClientRequest;
  close(): Connection;
  setRole(role: string, enabled: boolean): Connection;
  status: string;
  buildRequestObject(params: any): http.ClientRequestArgs;
}

export {};
