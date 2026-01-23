# SqlGetAsyncStatusResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `expiration_time_in_millis` | `EpochTime<UnitMillis>` | The timestamp, in milliseconds since the Unix epoch, when Elasticsearch will delete the search and its results, even if the search is still running. |
| `id` | `string` | The identifier for the search. |
| `is_running` | `boolean` | If `true`, the search is still running.
If `false`, the search has finished. |
| `is_partial` | `boolean` | If `true`, the response does not contain complete search results.
If `is_partial` is `true` and `is_running` is `true`, the search is still running.
If `is_partial` is `true` but `is_running` is `false`, the results are partial due to a failure or timeout. |
| `start_time_in_millis` | `EpochTime<UnitMillis>` | The timestamp, in milliseconds since the Unix epoch, when the search started.
The API returns this property only for running searches. |
| `completion_status?` | `uint` | The HTTP status code for the search.
The API returns this property only for completed searches. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
