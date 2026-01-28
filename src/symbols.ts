/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This symbol is exported in a separate module to avoid circular dependency issues in ESM.
 *
 * Without this separation, there would be a circular dependency:
 * - API files import kAcceptedParams from client.ts
 * - client.ts imports from api/index.ts
 *
 * In ESM (unlike CommonJS), this creates a "Cannot access 'kAcceptedParams' before initialization"
 * error because the symbol is used in class property definitions during module initialization.
 *
 * By placing the symbol in its own module, it can be imported by both client.ts and API files
 * without creating a circular dependency chain.
 */
export const kAcceptedParams = Symbol('elasticsearchjs-accepted-params')
