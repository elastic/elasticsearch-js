# AggregationsMultiTermsAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `collect_mode?` | [`AggregationsTermsAggregationCollectMode`](AggregationsTermsAggregationCollectMode.md) | Specifies the strategy for data collection. |
| `order?` | [`AggregationsAggregateOrder`](AggregationsAggregateOrder.md) | Specifies the sort order of the buckets.
Defaults to sorting by descending document count. |
| `min_doc_count?` | `long` | The minimum number of documents in a bucket for it to be returned. |
| `shard_min_doc_count?` | `long` | The minimum number of documents in a bucket on each shard for it to be returned. |
| `shard_size?` | `integer` | The number of candidate terms produced by each shard.
By default, `shard_size` will be automatically estimated based on the number of shards and the `size` parameter. |
| `show_term_doc_count_error?` | `boolean` | Calculates the doc count error on per term basis. |
| `size?` | `integer` | The number of term buckets should be returned out of the overall terms list. |
| `terms` | `AggregationsMultiTermLookup[]` | The field from which to generate sets of terms. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
