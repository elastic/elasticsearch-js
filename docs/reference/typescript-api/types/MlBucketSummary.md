# MlBucketSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `anomaly_score` | `double` | The maximum anomaly score, between 0-100, for any of the bucket influencers. This is an overall, rate-limited
score for the job. All the anomaly records in the bucket contribute to this score. This value might be updated as
new data is analyzed. |
| `bucket_influencers` | `MlBucketInfluencer[]` | - |
| `bucket_span` | `DurationValue<UnitSeconds>` | The length of the bucket in seconds. This value matches the bucket span that is specified in the job. |
| `event_count` | `long` | The number of input data records processed in this bucket. |
| `initial_anomaly_score` | `double` | The maximum anomaly score for any of the bucket influencers. This is the initial value that was calculated at the
time the bucket was processed. |
| `is_interim` | `boolean` | If true, this is an interim result. In other words, the results are calculated based on partial input data. |
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `processing_time_ms` | `DurationValue<UnitMillis>` | The amount of time, in milliseconds, that it took to analyze the bucket contents and calculate results. |
| `result_type` | `string` | Internal. This value is always set to bucket. |
| `timestamp` | `EpochTime<UnitMillis>` | The start time of the bucket. This timestamp uniquely identifies the bucket. Events that occur exactly at the
timestamp of the bucket are included in the results for the bucket. |
| `timestamp_string?` | [`DateTime`](DateTime.md) | The start time of the bucket. This timestamp uniquely identifies the bucket. Events that occur exactly at the
timestamp of the bucket are included in the results for the bucket. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
