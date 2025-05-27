## Interface `AsyncSearchAsyncSearch`

| Name | Type | Description |
| - | - | - |
| `_clusters` | [ClusterStatistics](./ClusterStatistics.md) | &nbsp; |
| `_scroll_id` | [ScrollId](./ScrollId.md) | &nbsp; |
| `_shards` | [ShardStatistics](./ShardStatistics.md) | Indicates how many shards have run the query. Note that in order for shard results to be included in the search response, they need to be reduced first. |
| `aggregations` | TAggregations | Partial aggregations results, coming from the shards that have already completed running the query. |
| `fields` | Record<string, any> | &nbsp; |
| `hits` | [SearchHitsMetadata](./SearchHitsMetadata.md)<TDocument> | &nbsp; |
| `max_score` | [double](./double.md) | &nbsp; |
| `num_reduce_phases` | [long](./long.md) | Indicates how many reductions of the results have been performed. If this number increases compared to the last retrieved results for a get asynch search request, you can expect additional results included in the search response. |
| `pit_id` | [Id](./Id.md) | &nbsp; |
| `profile` | [SearchProfile](./SearchProfile.md) | &nbsp; |
| `suggest` | Record<[SuggestionName](./SuggestionName.md), [SearchSuggest](./SearchSuggest.md)<TDocument>[]> | &nbsp; |
| `terminated_early` | boolean | &nbsp; |
| `timed_out` | boolean | &nbsp; |
| `took` | [long](./long.md) | &nbsp; |
