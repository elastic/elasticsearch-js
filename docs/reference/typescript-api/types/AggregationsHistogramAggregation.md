# AggregationsHistogramAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `extended_bounds?` | [`AggregationsExtendedBounds`](AggregationsExtendedBounds.md)<double> | Enables extending the bounds of the histogram beyond the data itself. |
| `hard_bounds?` | [`AggregationsExtendedBounds`](AggregationsExtendedBounds.md)<double> | Limits the range of buckets in the histogram.
It is particularly useful in the case of open data ranges that can result in a very large number of buckets. |
| `field?` | [`Field`](Field.md) | The name of the field to aggregate on. |
| `interval?` | [`double`](double.md) | The interval for the buckets.
Must be a positive decimal. |
| `min_doc_count?` | [`integer`](integer.md) | Only returns buckets that have `min_doc_count` number of documents.
By default, the response will fill gaps in the histogram with empty buckets. |
| `missing?` | [`double`](double.md) | The value to apply to documents that do not have a value.
By default, documents without a value are ignored. |
| `offset?` | [`double`](double.md) | By default, the bucket keys start with 0 and then continue in even spaced steps of `interval`.
The bucket boundaries can be shifted by using the `offset` option. |
| `order?` | [`AggregationsAggregateOrder`](AggregationsAggregateOrder.md) | The sort order of the returned buckets.
By default, the returned buckets are sorted by their key ascending. |
| `script?` | `Script | ScriptSource` | - |
| `format?` | `string` | - |
| `keyed?` | `boolean` | If `true`, returns buckets as a hash instead of an array, keyed by the bucket keys. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
