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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const kClient = Symbol('elasticsearch-client');
const kMetaHeader = Symbol('meta header');
const kMaxRetries = Symbol('max retries');
class Helpers {
    constructor(opts) {
        Object.defineProperty(this, _a, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, _b, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, _c, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this[kClient] = opts.client;
        this[kMetaHeader] = opts.metaHeader;
        this[kMaxRetries] = opts.maxRetries;
    }
}
exports.default = Helpers;
_a = kClient, _b = kMetaHeader, _c = kMaxRetries;
//# sourceMappingURL=Helpers.js.map