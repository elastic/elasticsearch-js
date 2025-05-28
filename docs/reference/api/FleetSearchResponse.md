# `FleetSearchResponse` [interface-FleetSearchResponse]

| Name | Type | Description |
| - | - | - |
| `_clusters` | [ClusterStatistics](./ClusterStatistics.md) | &nbsp; |
| `_scroll_id` | [ScrollId](./ScrollId.md) | &nbsp; |
| `_shards` | [ShardStatistics](./ShardStatistics.md) | &nbsp; |
| `aggregations` | Record<[AggregateName](./AggregateName.md), [AggregationsAggregate](./AggregationsAggregate.md)> | &nbsp; |
| `fields` | Record<string, any> | &nbsp; |
| `hits` | [SearchHitsMetadata](./SearchHitsMetadata.md)<TDocument> | &nbsp; |
| `max_score` | [double](./double.md) | &nbsp; |
| `num_reduce_phases` | [long](./long.md) | &nbsp; |
| `pit_id` | [Id](./Id.md) | &nbsp; |
| `profile` | [SearchProfile](./SearchProfile.md) | &nbsp; |
| `suggest` | Record<[SuggestionName](./SuggestionName.md), [SearchSuggest](./SearchSuggest.md)<TDocument>[]> | &nbsp; |
| `terminated_early` | boolean | &nbsp; |
| `timed_out` | boolean | &nbsp; |
| `took` | [long](./long.md) | &nbsp; |
