# AsyncSearchAsyncSearchResponseException

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `is_partial` | `boolean` | - |
| `is_running` | `boolean` | - |
| `expiration_time?` | [`DateTime`](DateTime.md) | - |
| `expiration_time_in_millis` | `EpochTime<UnitMillis>` | - |
| `start_time?` | [`DateTime`](DateTime.md) | - |
| `start_time_in_millis` | `EpochTime<UnitMillis>` | - |
| `completion_time?` | [`DateTime`](DateTime.md) | - |
| `completion_time_in_millis?` | `EpochTime<UnitMillis>` | - |
| `error?` | [`ErrorCause`](ErrorCause.md) | - |
| `response?` | `AsyncSearchAsyncSearch<TDocument, Record<AggregateName, AggregationsAggregate>>` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
