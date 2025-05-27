## Interface `AggregationsMultiTermsAggregation`

| Name | Type | Description |
| - | - | - |
| `collect_mode` | [AggregationsTermsAggregationCollectMode](./AggregationsTermsAggregationCollectMode.md) | Specifies the strategy for data collection. |
| `min_doc_count` | [long](./long.md) | The minimum number of documents in a bucket for it to be returned. |
| `order` | [AggregationsAggregateOrder](./AggregationsAggregateOrder.md) | Specifies the sort order of the buckets. Defaults to sorting by descending document count. |
| `shard_min_doc_count` | [long](./long.md) | The minimum number of documents in a bucket on each shard for it to be returned. |
| `shard_size` | [integer](./integer.md) | The number of candidate terms produced by each shard. By default, `shard_size` will be automatically estimated based on the number of shards and the `size` parameter. |
| `show_term_doc_count_error` | boolean | Calculates the doc count error on per term basis. |
| `size` | [integer](./integer.md) | The number of term buckets should be returned out of the overall terms list. |
| `terms` | [AggregationsMultiTermLookup](./AggregationsMultiTermLookup.md)[] | The field from which to generate sets of terms. |
