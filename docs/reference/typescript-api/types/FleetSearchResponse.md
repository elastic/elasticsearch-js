# FleetSearchResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `took` | [`long`](long.md) | - |
| `timed_out` | `boolean` | - |
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | - |
| `hits` | [`SearchHitsMetadata`](SearchHitsMetadata.md)<TDocument> | - |
| `aggregations?` | `Record<AggregateName, AggregationsAggregate>` | - |
| `_clusters?` | [`ClusterStatistics`](ClusterStatistics.md) | - |
| `fields?` | `Record<string, any>` | - |
| `max_score?` | [`double`](double.md) | - |
| `num_reduce_phases?` | [`long`](long.md) | - |
| `profile?` | [`SearchProfile`](SearchProfile.md) | - |
| `pit_id?` | [`Id`](Id.md) | - |
| `_scroll_id?` | [`ScrollId`](ScrollId.md) | - |
| `suggest?` | `Record<SuggestionName, SearchSuggest<TDocument>[]>` | - |
| `terminated_early?` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
