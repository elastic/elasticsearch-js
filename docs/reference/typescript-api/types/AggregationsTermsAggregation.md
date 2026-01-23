# AggregationsTermsAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `collect_mode?` | [`AggregationsTermsAggregationCollectMode`](AggregationsTermsAggregationCollectMode.md) | Determines how child aggregations should be calculated: breadth-first or depth-first. |
| `exclude?` | [`AggregationsTermsExclude`](AggregationsTermsExclude.md) | Values to exclude.
Accepts regular expressions and partitions. |
| `execution_hint?` | [`AggregationsTermsAggregationExecutionHint`](AggregationsTermsAggregationExecutionHint.md) | Determines whether the aggregation will use field values directly or global ordinals. |
| `field?` | [`Field`](Field.md) | The field from which to return terms. |
| `include?` | [`AggregationsTermsInclude`](AggregationsTermsInclude.md) | Values to include.
Accepts regular expressions and partitions. |
| `min_doc_count?` | [`integer`](integer.md) | Only return values that are found in more than `min_doc_count` hits. |
| `missing?` | [`AggregationsMissing`](AggregationsMissing.md) | The value to apply to documents that do not have a value.
By default, documents without a value are ignored. |
| `missing_order?` | [`AggregationsMissingOrder`](AggregationsMissingOrder.md) | - |
| `missing_bucket?` | `boolean` | - |
| `value_type?` | `string` | Coerced unmapped fields into the specified type. |
| `order?` | [`AggregationsAggregateOrder`](AggregationsAggregateOrder.md) | Specifies the sort order of the buckets.
Defaults to sorting by descending document count. |
| `script?` | `Script | ScriptSource` | - |
| `shard_min_doc_count?` | [`long`](long.md) | Regulates the certainty a shard has if the term should actually be added to the candidate list or not with respect to the `min_doc_count`.
Terms will only be considered if their local shard frequency within the set is higher than the `shard_min_doc_count`. |
| `shard_size?` | [`integer`](integer.md) | The number of candidate terms produced by each shard.
By default, `shard_size` will be automatically estimated based on the number of shards and the `size` parameter. |
| `show_term_doc_count_error?` | `boolean` | Set to `true` to return the `doc_count_error_upper_bound`, which is an upper bound to the error on the `doc_count` returned by each shard. |
| `size?` | [`integer`](integer.md) | The number of buckets returned out of the overall terms list. |
| `format?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
