# IndicesGetDataLifecycleStatsResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `data_stream_count` | [`integer`](integer.md) | The count of data streams currently being managed by the data stream lifecycle. |
| `data_streams` | [`IndicesGetDataLifecycleStatsDataStreamStats`](IndicesGetDataLifecycleStatsDataStreamStats.md)[] | Information about the data streams that are managed by the data stream lifecycle. |
| `last_run_duration_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | The duration of the last data stream lifecycle execution. |
| `time_between_starts_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | The time that passed between the start of the last two data stream lifecycle executions.
This value should amount approximately to `data_streams.lifecycle.poll_interval`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
