# AsyncSearchAsyncSearch

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `aggregations?` | [`TAggregations`](TAggregations.md) | Partial aggregations results, coming from the shards that have already completed running the query. |
| `_clusters?` | [`ClusterStatistics`](ClusterStatistics.md) | - |
| `fields?` | `Record<string, any>` | - |
| `hits` | `SearchHitsMetadata<TDocument>` | - |
| `max_score?` | `double` | - |
| `num_reduce_phases?` | `long` | Indicates how many reductions of the results have been performed.
If this number increases compared to the last retrieved results for a get asynch search request, you can expect additional results included in the search response. |
| `profile?` | [`SearchProfile`](SearchProfile.md) | - |
| `pit_id?` | [`Id`](Id.md) | - |
| `_scroll_id?` | [`ScrollId`](ScrollId.md) | - |
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | Indicates how many shards have run the query.
Note that in order for shard results to be included in the search response, they need to be reduced first. |
| `suggest?` | `Record<SuggestionName, SearchSuggest<TDocument>[]>` | - |
| `terminated_early?` | `boolean` | - |
| `timed_out` | `boolean` | - |
| `took` | `long` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
