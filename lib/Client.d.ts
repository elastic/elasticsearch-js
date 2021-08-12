/// <reference types="node" />
import { ConnectionOptions as TlsConnectionOptions } from 'tls';
import { URL } from 'url';
import { Transport, HttpConnection, UndiciConnection, WeightedConnectionPool, CloudConnectionPool, Serializer, Diagnostic, SniffOptions, ClusterConnectionPool } from '@elastic/transport';
import { HttpAgentOptions, UndiciAgentOptions, agentFn, nodeFilterFn, nodeSelectorFn, generateRequestIdFn, BasicAuth, ApiKeyAuth, BearerAuth, Context } from '@elastic/transport/lib/types';
declare class SniffingTransport extends Transport {
    sniff(opts: SniffOptions): void;
}
interface NodeOptions {
    url: URL;
    id?: string;
    agent?: HttpAgentOptions | UndiciAgentOptions;
    ssl?: TlsConnectionOptions;
    headers?: Record<string, any>;
    roles?: {
        master: boolean;
        data: boolean;
        ingest: boolean;
        ml: boolean;
    };
}
interface ClientOptions {
    node?: string | string[] | NodeOptions | NodeOptions[];
    nodes?: string | string[] | NodeOptions | NodeOptions[];
    Connection?: typeof HttpConnection | typeof UndiciConnection;
    ConnectionPool?: typeof CloudConnectionPool | typeof ClusterConnectionPool | typeof WeightedConnectionPool;
    Transport?: typeof Transport;
    Serializer?: typeof Serializer;
    maxRetries?: number;
    requestTimeout?: number;
    pingTimeout?: number;
    sniffInterval?: number | boolean;
    sniffOnStart?: boolean;
    sniffEndpoint?: string;
    sniffOnConnectionFault?: boolean;
    resurrectStrategy?: 'ping' | 'optimistic' | 'none';
    compression?: boolean;
    ssl?: TlsConnectionOptions;
    agent?: HttpAgentOptions | UndiciAgentOptions | agentFn | false;
    nodeFilter?: nodeFilterFn;
    nodeSelector?: nodeSelectorFn;
    headers?: Record<string, any>;
    opaqueIdPrefix?: string;
    generateRequestId?: generateRequestIdFn;
    name?: string | symbol;
    auth?: BasicAuth | ApiKeyAuth | BearerAuth;
    context?: Context;
    proxy?: string | URL;
    enableMetaHeader?: boolean;
    cloud?: {
        id: string;
    };
    disablePrototypePoisoningProtection?: boolean | 'proto' | 'constructor';
    caFingerprint?: string;
}
export default class Client {
    diagnostic: Diagnostic;
    name: string | symbol;
    connectionPool: CloudConnectionPool | WeightedConnectionPool | ClusterConnectionPool;
    transport: SniffingTransport;
    serializer: Serializer;
    constructor(opts: ClientOptions);
    child(opts: ClientOptions): Client;
    close(): Promise<void>;
}
export {};
