/// <reference types="node" />

import { SecureContextOptions } from 'tls';
import Connection, { AgentOptions } from './Connection';

export interface nodeSelectorFn {
  (connections: Connection[]): Connection;
}

export interface nodeFilterFn {
  (connection: Connection): boolean;
}

interface ConnectionPoolOptions {
  ssl?: SecureContextOptions;
  agent?: AgentOptions;
  pingTimeout?: number;
  randomizeHost?: boolean;
  Connection: typeof Connection;
  resurrectStrategy?: string;
  nodeFilter?: nodeFilterFn;
  nodeSelector?: string | nodeSelectorFn;
}

export interface getConnectionOptions {
  filter?: nodeFilterFn;
  selector?: nodeSelectorFn;
}

export interface ResurrectMeta {
  strategy: string;
  isAlive: boolean;
  connection: Connection;
}

export default class ConnectionPool {
  static resurrectStrategies: {
    none: number;
    ping: number;
    optimistic: number;
  };
  connections: any;
  dead: string[];
  _ssl: SecureContextOptions | null;
  _agent: AgentOptions | null;
  resurrectTimeout: number;
  resurrectTimeoutCutoff: number;
  pingTimeout: number;
  randomizeHost: boolean;
  nodeFilter: nodeFilterFn;
  nodeSelector: nodeSelectorFn;
  Connection: typeof Connection;
  resurrectStrategy: number;
  constructor(opts?: ConnectionPoolOptions);
  /**
   * Marks a connection as 'alive'.
   * If needed removes the connection from the dead list
   * and then resets the `deadCount`.
   *
   * @param {object} connection
   */
  markAlive(connection: Connection): void;
  /**
   * Marks a connection as 'dead'.
   * If needed adds the connection to the dead list
   * and then increments the `deadCount`.
   *
   * @param {object} connection
   */
  markDead(connection: Connection): void;
  /**
   * If enabled, tries to resurrect a connection with the given
   * resurrect strategy ('ping', 'optimistic', 'none').
   *
   * @param {number} epoch
   * @param {function} callback (isAlive, connection)
   */
  resurrect(now?: number, callback?: (isAlive: boolean | null, connection: Connection | null) => void): void;
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
  addConnection(opts: any): Connection | void;
  /**
   * Removes a new connection to the pool.
   *
   * @param {object} connection
   * @returns {ConnectionPool}
   */
  removeConnection(connection: Connection): ConnectionPool;
  /**
   * Empties the connection pool.
   *
   * @returns {ConnectionPool}
   */
  empty(): ConnectionPool;
  /**
   * Update the ConnectionPool with new connections.
   *
   * @param {array} array of connections
   * @returns {ConnectionPool}
   */
  update(connections: Connection[]): ConnectionPool;
  /**
   * Transforms the nodes objects to a host object.
   *
   * @param {object} nodes
   * @returns {array} hosts
   */
  nodesToHost(nodes: any): any[];
  /**
   * Transforms an url string to a host object
   *
   * @param {string} url
   * @returns {object} host
   */
  urlToHost(url: string): any;
}

declare function defaultNodeFilter(node: Connection): boolean;
declare function roundRobinSelector(): (connections: Connection[]) => Connection;
declare function randomSelector(connections: Connection[]): Connection;

export declare const internals: {
  defaultNodeFilter: typeof defaultNodeFilter;
  roundRobinSelector: typeof roundRobinSelector;
  randomSelector: typeof randomSelector;
};

export {};
