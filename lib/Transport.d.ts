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

export default class Transport {
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
