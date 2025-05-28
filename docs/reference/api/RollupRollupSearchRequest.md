# `RollupRollupSearchRequest` [interface-RollupRollupSearchRequest]

| Name | Type | Description |
| - | - | - |
| `aggregations` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | Specifies aggregations. |
| `aggs` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | Specifies aggregations. aggregations |
| `body` | string | ({ [key: string]: any; } & { index?: never; rest_total_hits_as_int?: never; typed_keys?: never; aggregations?: never; aggs?: never; query?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams and indices used to limit the request. This parameter has the following rules: * At least one data stream, index, or wildcard expression must be specified. This target can include a rollup or non-rollup index. For data streams, the stream's backing indices can only serve as non-rollup indices. Omitting the parameter or using `_all` are not permitted. * Multiple non-rollup indices may be specified. * Only one rollup index may be specified. If more than one are supplied, an exception occurs. * Wildcard expressions ( `*`) may be used. If they match more than one rollup index, an exception occurs. However, you can use an expression to match multiple non-rollup indices or data streams. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Specifies a DSL query that is subject to some limitations. |
| `querystring` | { [key: string]: any; } & { index?: never; rest_total_hits_as_int?: never; typed_keys?: never; aggregations?: never; aggs?: never; query?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `rest_total_hits_as_int` | boolean | Indicates whether hits.total should be rendered as an integer or an object in the rest search response |
| `size` | [integer](./integer.md) | Must be zero if set, as rollups work on pre-aggregated data. |
| `typed_keys` | boolean | Specify whether aggregation and suggester names should be prefixed by their respective types in the response |
