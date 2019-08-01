// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

/// <reference types="node" />

import { SecureContextOptions } from 'tls';
import Connection, { AgentOptions } from '../Connection';
import { nodeFilterFn, nodeSelectorFn } from '../Transport';

interface BaseConnectionPoolOptions {
  ssl?: SecureContextOptions;
  agent?: AgentOptions;
  auth?: BasicAuth | ApiKeyAuth;
  emit: (event: string | symbol, ...args: any[]) => boolean;
  pingTimeout?: number;
  Connection: typeof Connection;
  resurrectStrategy?: string;
}

interface ConnectionPoolOptions extends BaseConnectionPoolOptions {
  pingTimeout?: number;
  resurrectStrategy?: string;
  sniffEnabled?: boolean;
}

interface getConnectionOptions {
  filter?: nodeFilterFn;
  selector?: nodeSelectorFn;
  requestId?: string | number;
  name?: string;
  now?: number;
}

interface ApiKeyAuth {
  apiKey:
    | string
    | {
        id: string;
        api_key: string;
      }
}

interface BasicAuth {
  username: string;
  password: string;
}

interface resurrectOptions {
  now?: number;
  requestId: string;
  name: string;
}

interface ResurrectEvent {
  strategy: string;
  isAlive: boolean;
  connection: Connection;
  name: string;
  request: {
    id: any;
  };
}


declare class BaseConnectionPool {
  connections: Connection[];
  _ssl: SecureContextOptions | null;
  _agent: AgentOptions | null;
  auth: BasicAuth | ApiKeyAuth;
  Connection: typeof Connection;
  constructor(opts?: BaseConnectionPoolOptions);
  /**
   * Marks a connection as 'alive'.
   * If needed removes the connection from the dead list
   * and then resets the `deadCount`.
   *
   * @param {object} connection
   */
  markAlive(connection: Connection): this;
  /**
   * Marks a connection as 'dead'.
   * If needed adds the connection to the dead list
   * and then increments the `deadCount`.
   *
   * @param {object} connection
   */
  markDead(connection: Connection): this;
  /**
   * Returns an alive connection if present,
   * otherwise returns null.
   * By default it filters the `master` only nodes.
   * It uses the selector to choose which
   * connection return.
   *
   * @param {object} options (filter and selector)
   * @returns {object|null} connection
   */
  getConnection(opts?: getConnectionOptions): Connection | null;
  /**
   * Adds a new connection to the pool.
   *
   * @param {object|string} host
   * @returns {ConnectionPool}
   */
  addConnection(opts: any): Connection;
  /**
   * Removes a new connection to the pool.
   *
   * @param {object} connection
   * @returns {ConnectionPool}
   */
  removeConnection(connection: Connection): this;
  /**
   * Empties the connection pool.
   *
   * @returns {ConnectionPool}
   */
  empty(): this;
  /**
   * Update the ConnectionPool with new connections.
   *
   * @param {array} array of connections
   * @returns {ConnectionPool}
   */
  update(connections: any[]): this;
  /**
   * Transforms the nodes objects to a host object.
   *
   * @param {object} nodes
   * @returns {array} hosts
   */
  nodesToHost(nodes: any, protocol: string): any[];
  /**
   * Transforms an url string to a host object
   *
   * @param {string} url
   * @returns {object} host
   */
  urlToHost(url: string): any;
}

declare class ConnectionPool extends BaseConnectionPool {
  static resurrectStrategies: {
    none: number;
    ping: number;
    optimistic: number;
  };
  dead: string[];
  _sniffEnabled: boolean;
  resurrectTimeout: number;
  resurrectTimeoutCutoff: number;
  pingTimeout: number;
  resurrectStrategy: number;
  constructor(opts?: ConnectionPoolOptions);

  /**
   * If enabled, tries to resurrect a connection with the given
   * resurrect strategy ('ping', 'optimistic', 'none').
   *
   * @param {object} { now, requestId, name }
   * @param {function} callback (isAlive, connection)
   */
  resurrect(opts: resurrectOptions, callback?: (isAlive: boolean | null, connection: Connection | null) => void): void;
}

declare class CloudConnectionPool extends BaseConnectionPool {
  cloudConnection: Connection | null
  constructor(opts?: BaseConnectionPoolOptions);
  getConnection(): Connection;
}

declare function defaultNodeFilter(node: Connection): boolean;
declare function roundRobinSelector(): (connections: Connection[]) => Connection;
declare function randomSelector(connections: Connection[]): Connection;

declare const internals: {
  defaultNodeFilter: typeof defaultNodeFilter;
  roundRobinSelector: typeof roundRobinSelector;
  randomSelector: typeof randomSelector;
};

export {
  // Interfaces
  ConnectionPoolOptions,
  getConnectionOptions,
  ApiKeyAuth,
  BasicAuth,
  internals,
  resurrectOptions,
  ResurrectEvent,
  // Classes
  BaseConnectionPool,
  ConnectionPool,
  CloudConnectionPool
};
