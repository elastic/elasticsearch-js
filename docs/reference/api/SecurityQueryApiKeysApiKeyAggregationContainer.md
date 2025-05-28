# `SecurityQueryApiKeysApiKeyAggregationContainer` [interface-SecurityQueryApiKeysApiKeyAggregationContainer]

| Name | Type | Description |
| - | - | - |
| `aggregations` | Record<string, [SecurityQueryApiKeysApiKeyAggregationContainer](./SecurityQueryApiKeysApiKeyAggregationContainer.md)> | Sub-aggregations for this aggregation. Only applies to bucket aggregations. |
| `aggs` | Record<string, [SecurityQueryApiKeysApiKeyAggregationContainer](./SecurityQueryApiKeysApiKeyAggregationContainer.md)> | Sub-aggregations for this aggregation. Only applies to bucket aggregations. aggregations |
| `cardinality` | [AggregationsCardinalityAggregation](./AggregationsCardinalityAggregation.md) | A single-value metrics aggregation that calculates an approximate count of distinct values. |
| `composite` | [AggregationsCompositeAggregation](./AggregationsCompositeAggregation.md) | A multi-bucket aggregation that creates composite buckets from different sources. Unlike the other multi-bucket aggregations, you can use the `composite` aggregation to paginate *all* buckets from a multi-level aggregation efficiently. |
| `date_range` | [AggregationsDateRangeAggregation](./AggregationsDateRangeAggregation.md) | A multi-bucket value source based aggregation that enables the user to define a set of date ranges - each representing a bucket. |
| `filter` | [SecurityQueryApiKeysApiKeyQueryContainer](./SecurityQueryApiKeysApiKeyQueryContainer.md) | A single bucket aggregation that narrows the set of documents to those that match a query. |
| `filters` | [SecurityQueryApiKeysApiKeyFiltersAggregation](./SecurityQueryApiKeysApiKeyFiltersAggregation.md) | A multi-bucket aggregation where each bucket contains the documents that match a query. |
| `meta` | [Metadata](./Metadata.md) | &nbsp; |
| `missing` | [AggregationsMissingAggregation](./AggregationsMissingAggregation.md) | &nbsp; |
| `range` | [AggregationsRangeAggregation](./AggregationsRangeAggregation.md) | A multi-bucket value source based aggregation that enables the user to define a set of ranges - each representing a bucket. |
| `terms` | [AggregationsTermsAggregation](./AggregationsTermsAggregation.md) | A multi-bucket value source based aggregation where buckets are dynamically built - one per unique value. |
| `value_count` | [AggregationsValueCountAggregation](./AggregationsValueCountAggregation.md) | A single-value metrics aggregation that counts the number of values that are extracted from the aggregated documents. |
