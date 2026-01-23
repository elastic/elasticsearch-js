# EqlEqlSearchResponseBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | Identifier for the search. |
| `is_partial?` | `boolean` | If true, the response does not contain complete search results. |
| `is_running?` | `boolean` | If true, the search request is still executing. |
| `took?` | `DurationValue<UnitMillis>` | Milliseconds it took Elasticsearch to execute the request. |
| `timed_out?` | `boolean` | If true, the request timed out before completion. |
| `hits` | `EqlEqlHits<TEvent>` | Contains matching events and sequences. Also contains related metadata. |
| `shard_failures?` | `ShardFailure[]` | Contains information about shard failures (if any), in case allow_partial_search_results=true |

## See Also

- [All Types](./)
- [API Methods](../index.md)
