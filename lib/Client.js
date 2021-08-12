"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License") you may
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const url_1 = require("url");
const transport_1 = require("@elastic/transport");
const BaseConnection_1 = require("@elastic/transport/lib/connection/BaseConnection");
const kChild = Symbol('elasticsearchjs-child');
const kInitialOptions = Symbol('elasticsearchjs-initial-options');
let clientVersion = require('../package.json').version; // eslint-disable-line
/* istanbul ignore next */
if (clientVersion.includes('-')) {
    // clean prerelease
    clientVersion = clientVersion.slice(0, clientVersion.indexOf('-')) + 'p';
}
let transportVersion = require('@elastic/transport/package.json').version; // eslint-disable-line
/* istanbul ignore next */
if (transportVersion.includes('-')) {
    // clean prerelease
    transportVersion = transportVersion.slice(0, transportVersion.indexOf('-')) + 'p';
}
const nodeVersion = process.versions.node;
class SniffingTransport extends transport_1.Transport {
    sniff(opts) {
        var _a;
        if (this.isSniffing)
            return;
        this.isSniffing = true;
        const request = {
            method: 'GET',
            path: (_a = this.sniffEndpoint) !== null && _a !== void 0 ? _a : '/_nodes/_all/http'
        };
        this.request(request, { id: opts.requestId, meta: true })
            .then(result => {
            var _a, _b;
            assert_1.default(isObject(result.body), 'The body should be an object');
            this.isSniffing = false;
            const protocol = (_b = (_a = result.meta.connection) === null || _a === void 0 ? void 0 : _a.url.protocol) !== null && _b !== void 0 ? _b : 'http:';
            const hosts = this.connectionPool.nodesToHost(result.body.nodes, protocol);
            this.connectionPool.update(hosts);
            result.meta.sniff = { hosts, reason: opts.reason };
            this.diagnostic.emit('sniff', null, result);
        })
            .catch(err => {
            this.isSniffing = false;
            err.meta.sniff = { hosts: [], reason: opts.reason };
            this.diagnostic.emit('sniff', err, null);
        });
    }
}
function isObject(obj) {
    return typeof obj === 'object';
}
class Client {
    constructor(opts) {
        var _a, _b, _c, _d;
        Object.defineProperty(this, "diagnostic", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "connectionPool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "transport", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serializer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-expect-error kChild symbol is for internal use only
        if ((opts.cloud != null) && opts[kChild] === undefined) {
            const { id } = opts.cloud;
            // the cloud id is `cluster-name:base64encodedurl`
            // the url is a string divided by two '$', the first is the cloud url
            // the second the elasticsearch instance, the third the kibana instance
            const cloudUrls = Buffer.from(id.split(':')[1], 'base64').toString().split('$');
            opts.node = `https://${cloudUrls[1]}.${cloudUrls[0]}`;
            // Cloud has better performances with compression enabled
            // see https://github.com/elastic/elasticsearch-py/pull/704.
            // So unless the user specifies otherwise, we enable compression.
            if (opts.compression == null)
                opts.compression = true;
            if (opts.ssl == null ||
                (opts.ssl != null && opts.ssl.secureProtocol == null)) {
                opts.ssl = (_a = opts.ssl) !== null && _a !== void 0 ? _a : {};
                opts.ssl.secureProtocol = 'TLSv1_2_method';
            }
        }
        if (opts.node == null && opts.nodes == null) {
            throw new transport_1.errors.ConfigurationError('Missing node(s) option');
        }
        // @ts-expect-error kChild symbol is for internal use only
        if (opts[kChild] === undefined) {
            const checkAuth = getAuth((_b = opts.node) !== null && _b !== void 0 ? _b : opts.nodes);
            if ((checkAuth != null) && checkAuth.username !== '' && checkAuth.password !== '') {
                opts.auth = Object.assign({}, opts.auth, { username: checkAuth.username, password: checkAuth.password });
            }
        }
        const options = Object.assign({}, {
            Connection: transport_1.HttpConnection,
            Transport: SniffingTransport,
            Serializer: transport_1.Serializer,
            ConnectionPool: (opts.cloud != null) ? transport_1.CloudConnectionPool : transport_1.WeightedConnectionPool,
            maxRetries: 3,
            requestTimeout: 30000,
            pingTimeout: 3000,
            sniffInterval: false,
            sniffOnStart: false,
            sniffEndpoint: '_nodes/_all/http',
            sniffOnConnectionFault: false,
            resurrectStrategy: 'ping',
            compression: false,
            ssl: null,
            caFingerprint: null,
            agent: null,
            headers: {},
            nodeFilter: null,
            generateRequestId: null,
            name: 'elasticsearch-js',
            auth: null,
            opaqueIdPrefix: null,
            context: null,
            proxy: null,
            enableMetaHeader: true
        }, opts);
        if (options.caFingerprint !== null && isHttpConnection((_c = opts.node) !== null && _c !== void 0 ? _c : opts.nodes)) {
            throw new transport_1.errors.ConfigurationError('You can\'t configure the caFingerprint with a http connection');
        }
        if (options.enableMetaHeader) {
            options.headers['x-elastic-client-meta'] = `es=${clientVersion},js=${nodeVersion},t=${transportVersion},hc=${nodeVersion}`;
        }
        this.name = options.name;
        // @ts-expect-error kInitialOptions symbol is for internal use only
        this[kInitialOptions] = options;
        // @ts-expect-error kChild symbol is for internal use only
        if (opts[kChild] !== undefined) {
            // @ts-expect-error kChild symbol is for internal use only
            this.serializer = opts[kChild].serializer;
            // @ts-expect-error kChild symbol is for internal use only
            this.connectionPool = opts[kChild].connectionPool;
            // @ts-expect-error kChild symbol is for internal use only
            this.diagnostic = opts[kChild].diagnostic;
        }
        else {
            this.diagnostic = new transport_1.Diagnostic();
            this.serializer = new options.Serializer();
            this.connectionPool = new options.ConnectionPool({
                pingTimeout: options.pingTimeout,
                resurrectStrategy: options.resurrectStrategy,
                ssl: options.ssl,
                agent: options.agent,
                proxy: options.proxy,
                Connection: options.Connection,
                auth: options.auth,
                diagnostic: this.diagnostic
            });
            this.connectionPool.addConnection((_d = options.node) !== null && _d !== void 0 ? _d : options.nodes);
        }
        this.transport = new options.Transport({
            diagnostic: this.diagnostic,
            connectionPool: this.connectionPool,
            serializer: this.serializer,
            maxRetries: options.maxRetries,
            requestTimeout: options.requestTimeout,
            sniffInterval: options.sniffInterval,
            sniffOnStart: options.sniffOnStart,
            sniffOnConnectionFault: options.sniffOnConnectionFault,
            sniffEndpoint: options.sniffEndpoint,
            compression: options.compression,
            headers: options.headers,
            nodeFilter: options.nodeFilter,
            nodeSelector: options.nodeSelector,
            generateRequestId: options.generateRequestId,
            name: options.name,
            opaqueIdPrefix: options.opaqueIdPrefix,
            context: options.context,
            productCheck: 'Elasticsearch'
        });
    }
    child(opts) {
        // Merge the new options with the initial ones
        // @ts-expect-error kChild symbol is for internal use only
        const options = Object.assign({}, this[kInitialOptions], opts);
        // Pass to the child client the parent instances that cannot be overriden
        // @ts-expect-error kInitialOptions symbol is for internal use only
        options[kChild] = {
            connectionPool: this.connectionPool,
            serializer: this.serializer,
            diagnostic: this.diagnostic,
            initialOptions: options
        };
        /* istanbul ignore else */
        if (options.auth !== undefined) {
            options.headers = BaseConnection_1.prepareHeaders(options.headers, options.auth);
        }
        return new Client(options);
    }
    async close() {
        return await this.connectionPool.empty();
    }
}
exports.default = Client;
function isHttpConnection(node) {
    if (Array.isArray(node)) {
        return node.some((n) => (typeof n === 'string' ? new url_1.URL(n).protocol : n.url.protocol) === 'http:');
    }
    else {
        if (node == null)
            return false;
        return (typeof node === 'string' ? new url_1.URL(node).protocol : node.url.protocol) === 'http:';
    }
}
function getAuth(node) {
    if (Array.isArray(node)) {
        for (const url of node) {
            const auth = getUsernameAndPassword(url);
            if (auth != null && auth.username !== '' && auth.password !== '') {
                return auth;
            }
        }
        return null;
    }
    else {
        const auth = getUsernameAndPassword(node);
        if (auth != null && auth.username !== '' && auth.password !== '') {
            return auth;
        }
        return null;
    }
    function getUsernameAndPassword(node) {
        /* istanbul ignore else */
        if (typeof node === 'string') {
            const { username, password } = new url_1.URL(node);
            return {
                username: decodeURIComponent(username),
                password: decodeURIComponent(password)
            };
        }
        else if (node != null && node.url instanceof url_1.URL) {
            return {
                username: decodeURIComponent(node.url.username),
                password: decodeURIComponent(node.url.password)
            };
        }
        else {
            return null;
        }
    }
}
//# sourceMappingURL=Client.js.map