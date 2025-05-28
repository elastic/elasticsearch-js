# `AggregationsFiltersAggregation` [interface-AggregationsFiltersAggregation]

| Name | Type | Description |
| - | - | - |
| `filters` | [AggregationsBuckets](./AggregationsBuckets.md)<[QueryDslQueryContainer](./QueryDslQueryContainer.md)> | Collection of queries from which to build buckets. |
| `keyed` | boolean | By default, the named filters aggregation returns the buckets as an object. Set to `false` to return the buckets as an array of objects. |
| `other_bucket_key` | string | The key with which the other bucket is returned. |
| `other_bucket` | boolean | Set to `true` to add a bucket to the response which will contain all documents that do not match any of the given filters. |
