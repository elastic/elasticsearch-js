/*
 * Copyright Elasticsearch B.V. and contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Opt-in types for the ES|QL Arrow helpers. Import this module once
// (`import '@elastic/elasticsearch/helpers-arrow'`) in a project that has
// apache-arrow installed to give `esql().toArrowTable()` and `toArrowReader()`
// their precise apache-arrow types. Projects that never import it do not need
// apache-arrow installed to type-check the rest of the client.
import type { Table, TypeMap, AsyncRecordBatchStreamReader } from 'apache-arrow/Arrow.node'

declare module './helpers' {
  interface EsqlArrowRegistry {
    table: Table<TypeMap>
    reader: AsyncRecordBatchStreamReader
  }
}
