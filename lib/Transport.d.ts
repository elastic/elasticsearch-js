import ConnectionPool from './ConnectionPool';
import Connection from './Connection';
import Serializer from './Serializer';

declare type noopFn = (...args: any[]) => void;
declare type emitFn = (event: string | symbol, ...args: any[]) => boolean;

interface TransportOptions {
  emit: emitFn & noopFn;
  connectionPool: ConnectionPool;
  serializer: Serializer;
  maxRetries: number;
  requestTimeout: number | string;
  suggestCompression: boolean;
  sniffInterval: number;
  sniffOnConnectionFault: boolean;
  sniffEndpoint: string;
  sniffOnStart: boolean;
}

export interface ApiResponse {
  body: any;
  statusCode: number | null;
  headers: any;
  warnings: any[] | null;
}

export interface EventMeta {
  connection: Connection;
  request: any;
  response: ApiResponse;
  attempts: number;
  aborted: boolean;
}

export interface SniffMeta {
  hosts: any[];
  reason: string;
}

export default class Transport {
  static sniffReasons: {
    SNIFF_ON_START: string;
    SNIFF_INTERVAL: string;
    SNIFF_ON_CONNECTION_FAULT: string;
    DEFAULT: string;
  };
  emit: emitFn & noopFn;
  connectionPool: ConnectionPool;
  serializer: Serializer;
  maxRetries: number;
  requestTimeout: number;
  suggestCompression: boolean;
  sniffInterval: number;
  sniffOnConnectionFault: boolean;
  sniffEndpoint: string;
  _sniffEnabled: boolean;
  _nextSniff: number;
  _isSniffing: boolean;
  constructor(opts: TransportOptions);
  request(params: any, callback: (err: Error | null, result: ApiResponse) => void): any;
  getConnection(): Connection | null;
  sniff(callback?: (...args: any[]) => void): void;
}

export {};
