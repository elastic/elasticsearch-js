## Interface `SearchResponseBody`

| Name | Type | Description |
| - | - | - |
| `_clusters` | [ClusterStatistics](./ClusterStatistics.md) | &nbsp; |
| `_scroll_id` | [ScrollId](./ScrollId.md) | The identifier for the search and its search context. You can use this scroll ID with the scroll API to retrieve the next batch of search results for the request. This property is returned only if the `scroll` query parameter is specified in the request. |
| `_shards` | [ShardStatistics](./ShardStatistics.md) | A count of shards used for the request. |
| `aggregations` | TAggregations | &nbsp; |
| `fields` | Record<string, any> | &nbsp; |
| `hits` | [SearchHitsMetadata](./SearchHitsMetadata.md)<TDocument> | The returned documents and metadata. |
| `max_score` | [double](./double.md) | &nbsp; |
| `num_reduce_phases` | [long](./long.md) | &nbsp; |
| `pit_id` | [Id](./Id.md) | &nbsp; |
| `profile` | [SearchProfile](./SearchProfile.md) | &nbsp; |
| `suggest` | Record<[SuggestionName](./SuggestionName.md), [SearchSuggest](./SearchSuggest.md)<TDocument>[]> | &nbsp; |
| `terminated_early` | boolean | &nbsp; |
| `timed_out` | boolean | If `true`, the request timed out before completion; returned results may be partial or empty. |
| `took` | [long](./long.md) | The number of milliseconds it took Elasticsearch to run the request. This value is calculated by measuring the time elapsed between receipt of a request on the coordinating node and the time at which the coordinating node is ready to send the response. It includes: * Communication time between the coordinating node and data nodes * Time the request spends in the search thread pool, queued for execution * Actual run time It does not include: * Time needed to send the request to Elasticsearch * Time needed to serialize the JSON response * Time needed to send the response to a client |
