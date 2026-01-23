# MlDatafeedTimingStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `bucket_count` | [`long`](long.md) | The number of buckets processed. |
| `exponential_average_search_time_per_hour_ms` | [`DurationValue`](DurationValue.md)<UnitFloatMillis> | The exponential average search time per hour, in milliseconds. |
| `exponential_average_calculation_context?` | [`MlExponentialAverageCalculationContext`](MlExponentialAverageCalculationContext.md) | - |
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `search_count` | [`long`](long.md) | The number of searches run by the datafeed. |
| `total_search_time_ms` | [`DurationValue`](DurationValue.md)<UnitFloatMillis> | The total time the datafeed spent searching, in milliseconds. |
| `average_search_time_per_bucket_ms?` | [`DurationValue`](DurationValue.md)<UnitFloatMillis> | The average search time per bucket, in milliseconds. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
