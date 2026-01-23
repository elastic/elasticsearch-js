# FleetSearchResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `took` | `long` | - |
| `timed_out` | `boolean` | - |
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | - |
| `hits` | `SearchHitsMetadata<TDocument>` | - |
| `aggregations?` | `Record<AggregateName, AggregationsAggregate>` | - |
| `_clusters?` | [`ClusterStatistics`](ClusterStatistics.md) | - |
| `fields?` | `Record<string, any>` | - |
| `max_score?` | `double` | - |
| `num_reduce_phases?` | `long` | - |
| `profile?` | [`SearchProfile`](SearchProfile.md) | - |
| `pit_id?` | [`Id`](Id.md) | - |
| `_scroll_id?` | [`ScrollId`](ScrollId.md) | - |
| `suggest?` | `Record<SuggestionName, SearchSuggest<TDocument>[]>` | - |
| `terminated_early?` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
