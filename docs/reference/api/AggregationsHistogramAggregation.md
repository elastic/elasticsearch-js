## Interface `AggregationsHistogramAggregation`

| Name | Type | Description |
| - | - | - |
| `extended_bounds` | [AggregationsExtendedBounds](./AggregationsExtendedBounds.md)<[double](./double.md)> | Enables extending the bounds of the histogram beyond the data itself. |
| `field` | [Field](./Field.md) | The name of the field to aggregate on. |
| `format` | string | &nbsp; |
| `hard_bounds` | [AggregationsExtendedBounds](./AggregationsExtendedBounds.md)<[double](./double.md)> | Limits the range of buckets in the histogram. It is particularly useful in the case of open data ranges that can result in a very large number of buckets. |
| `interval` | [double](./double.md) | The interval for the buckets. Must be a positive decimal. |
| `keyed` | boolean | If `true`, returns buckets as a hash instead of an array, keyed by the bucket keys. |
| `min_doc_count` | [integer](./integer.md) | Only returns buckets that have `min_doc_count` number of documents. By default, the response will fill gaps in the histogram with empty buckets. |
| `missing` | [double](./double.md) | The value to apply to documents that do not have a value. By default, documents without a value are ignored. |
| `offset` | [double](./double.md) | By default, the bucket keys start with 0 and then continue in even spaced steps of `interval`. The bucket boundaries can be shifted by using the `offset` option. |
| `order` | [AggregationsAggregateOrder](./AggregationsAggregateOrder.md) | The sort order of the returned buckets. By default, the returned buckets are sorted by their key ascending. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | &nbsp; |
