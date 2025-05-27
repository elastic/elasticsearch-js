## Interface `EqlEqlSearchResponseBase`

| Name | Type | Description |
| - | - | - |
| `hits` | [EqlEqlHits](./EqlEqlHits.md)<TEvent> | Contains matching events and sequences. Also contains related metadata. |
| `id` | [Id](./Id.md) | Identifier for the search. |
| `is_partial` | boolean | If true, the response does not contain complete search results. |
| `is_running` | boolean | If true, the search request is still executing. |
| `shard_failures` | [ShardFailure](./ShardFailure.md)[] | Contains information about shard failures (if any), in case allow_partial_search_results=true |
| `timed_out` | boolean | If true, the request timed out before completion. |
| `took` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Milliseconds it took Elasticsearch to execute the request. |
