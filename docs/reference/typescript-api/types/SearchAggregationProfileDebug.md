# SearchAggregationProfileDebug

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `segments_with_multi_valued_ords?` | `integer` | - |
| `collection_strategy?` | `string` | - |
| `segments_with_single_valued_ords?` | `integer` | - |
| `total_buckets?` | `integer` | - |
| `built_buckets?` | `integer` | - |
| `result_strategy?` | `string` | - |
| `has_filter?` | `boolean` | - |
| `delegate?` | `string` | - |
| `delegate_debug?` | [`SearchAggregationProfileDebug`](SearchAggregationProfileDebug.md) | - |
| `chars_fetched?` | `integer` | - |
| `extract_count?` | `integer` | - |
| `extract_ns?` | `integer` | - |
| `values_fetched?` | `integer` | - |
| `collect_analyzed_ns?` | `integer` | - |
| `collect_analyzed_count?` | `integer` | - |
| `surviving_buckets?` | `integer` | - |
| `ordinals_collectors_used?` | `integer` | - |
| `ordinals_collectors_overhead_too_high?` | `integer` | - |
| `string_hashing_collectors_used?` | `integer` | - |
| `numeric_collectors_used?` | `integer` | - |
| `empty_collectors_used?` | `integer` | - |
| `deferred_aggregators?` | `string[]` | - |
| `segments_with_doc_count_field?` | `integer` | - |
| `segments_with_deleted_docs?` | `integer` | - |
| `filters?` | `SearchAggregationProfileDelegateDebugFilter[]` | - |
| `segments_counted?` | `integer` | - |
| `segments_collected?` | `integer` | - |
| `map_reducer?` | `string` | - |
| `brute_force_used?` | `integer` | - |
| `dynamic_pruning_attempted?` | `integer` | - |
| `dynamic_pruning_used?` | `integer` | - |
| `skipped_due_to_no_data?` | `integer` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
