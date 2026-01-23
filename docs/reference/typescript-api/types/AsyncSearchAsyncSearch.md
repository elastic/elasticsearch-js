# AsyncSearchAsyncSearch

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `aggregations?` | `TAggregations` | Partial aggregations results, coming from the shards that have already completed running the query. |
| `_clusters?` | [`ClusterStatistics`](ClusterStatistics.md) | - |
| `fields?` | `Record<string, any>` | - |
| `hits` | [`SearchHitsMetadata`](SearchHitsMetadata.md)<TDocument> | - |
| `max_score?` | [`double`](double.md) | - |
| `num_reduce_phases?` | [`long`](long.md) | Indicates how many reductions of the results have been performed.
If this number increases compared to the last retrieved results for a get asynch search request, you can expect additional results included in the search response. |
| `profile?` | [`SearchProfile`](SearchProfile.md) | - |
| `pit_id?` | [`Id`](Id.md) | - |
| `_scroll_id?` | [`ScrollId`](ScrollId.md) | - |
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | Indicates how many shards have run the query.
Note that in order for shard results to be included in the search response, they need to be reduced first. |
| `suggest?` | `Record<SuggestionName, SearchSuggest<TDocument>[]>` | - |
| `terminated_early?` | `boolean` | - |
| `timed_out` | `boolean` | - |
| `took` | [`long`](long.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
